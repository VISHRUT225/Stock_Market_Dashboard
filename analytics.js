// Global variables for charts and selected stock
let selectedSymbol = 'AAPL'; // Default symbol
let selectedYear = new Date().getFullYear(); // Default year
let barChart, candlestickChart, areaChart;

// Fetch and render candlestick data
function fetchAndRenderCandlestickData(timeFrame) {
    fetch(`/get_stock_data?symbol=${selectedSymbol}&timeframe=${timeFrame}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            if (data.openPrices && data.closePrices && data.lowPrices && data.highPrices) {
                const ohlcData = data.time.map((date, i) => [
                    data.openPrices[i].toFixed(2),  // Open price
                    data.closePrices[i].toFixed(2), // Close price
                    data.lowPrices[i].toFixed(2),   // Low price
                    data.highPrices[i].toFixed(2)   // High price
                ]);

                // Candlestick Chart
                candlestickChart.setOption({
                    title: { text: `${selectedSymbol} - Candlestick Chart` },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' },
                        formatter: function (params) {
                            const values = params[0].data.map(value => `$${parseFloat(value).toFixed(2)}`);
                            return `
                                Open: ${values[0]}<br>
                                Close: ${values[1]}<br>
                                Low: ${values[2]}<br>
                                High: ${values[3]}
                            `;
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: data.time,
                        scale: true,
                        boundaryGap: true
                    },
                    yAxis: {
                        type: 'value',
                        scale: true
                    },
                    series: [{
                        type: 'candlestick',
                        data: ohlcData,
                        itemStyle: {
                            color: '#c23531',       // Down color
                            color0: '#2f4554',      // Up color
                            borderColor: '#c23531', // Border for down
                            borderColor0: '#2f4554' // Border for up
                        }
                    }]
                });
            } else {
                console.warn('Candlestick data not available.');
            }
        })
        .catch(error => console.error("Error fetching candlestick data:", error));
}

// Load analytics data for selected stock
function loadAnalyticsData(symbol) {
    selectedSymbol = symbol;
    fetchAndRenderCandlestickData('3mo'); // Fetch candlestick data for 1 year initially
    fetchBarChartData();  // Fetch the bar chart data immediately after stock selection
    fetchAreaChartData(); // Fetch area chart data
}

// Fetch and render bar chart data for the last 10 years
function fetchBarChartData() {
    fetch(`/get_stock_data?symbol=${selectedSymbol}&timeframe=max`)
        .then(response => response.json())
        .then(data => {
            const currentYear = new Date().getFullYear();
            const startYear = currentYear - 10;
            const yearlyClosePrices = {};

            // Filter for the last 10 years of data
            data.time.forEach((date, index) => {
                const year = date.split('-')[0];
                const closePrice = data.closePrices[index].toFixed(2);
                
                if (year >= startYear && year <= currentYear) {
                    if (!yearlyClosePrices[year]) {
                        yearlyClosePrices[year] = closePrice;
                    }
                }
            });

            const years = Object.keys(yearlyClosePrices);
            const barClosePrices = years.map(year => yearlyClosePrices[year]);

            // Bar Chart
            barChart.setOption({
                title: { text: `${selectedSymbol} - Yearly Closing Prices (Last 10 Years)` },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        const price = `$${parseFloat(params[0].data).toFixed(2)}`;
                        return `${params[0].axisValue}: ${price}`;
                    }
                },
                xAxis: { type: 'category', data: years },
                yAxis: {
                    type: 'value',
                    axisLabel: { formatter: value => `$${value}` } // Add $ to y-axis labels
                },
                series: [{
                    type: 'bar',
                    data: barClosePrices,
                    itemStyle: { color: '#5b9bd5' }
                }]
            });
        })
        .catch(error => console.error("Error fetching bar chart data:", error));
}
// Fetch and render area chart data
function fetchAreaChartData() {
    fetch(`/get_stock_data?symbol=${selectedSymbol}&timeframe=max`)
        .then(response => response.json())
        .then(data => {
            const monthlyPrices = Array(12).fill(0); // Total prices for each month
            const monthlyCounts = Array(12).fill(0); // Count of entries for each month

            // Loop through data to populate monthlyPrices and monthlyCounts
            data.time.forEach((date, index) => {
                const year = date.split('-')[0];
                const month = parseInt(date.split('-')[1], 10) - 1; // Months are 0-indexed
                const price = data.closePrices[index]; // Use closing price

                if (year == selectedYear) { // Only consider data for the selected year
                    monthlyPrices[month] += price; // Sum prices for the month
                    monthlyCounts[month] += 1; // Count number of entries for the month
                }
            });

            // Prepare data for the area chart
            const areaData = monthlyCounts.map((count, index) => {
                const avgPrice = monthlyCounts[index] > 0 ? (monthlyPrices[index] / monthlyCounts[index]) : 0; // Average price
                return avgPrice; // Return average price for the month
            });

            // Area Chart
            areaChart.setOption({
                title: { text: `${selectedSymbol} - Monthly Average Prices for ${selectedYear}` },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        const monthName = new Date(0, params[0].dataIndex).toLocaleString('default', { month: 'long' });
                        const price = params[0].data.toFixed(2); // Average price, rounded to two decimals
                        return `${monthName}: $${price}`; // Show month name and price
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                yAxis: { type: 'value' },
                series: [{
                    type: 'line',
                    data: areaData,
                    itemStyle: { color: '#7cb5ec' }, // Line color
                    areaStyle: {
                        color: 'rgba(124, 181, 236, 0.3)', // New area color with opacity
                        opacity: 0.3                    // Adjust opacity as needed
                    }
                }]
            });
        })
        .catch(error => console.error("Error fetching area chart data:", error));
}

// Set selected year for area chart
function setSelectedYear(year) {
    selectedYear = year;
    fetchAreaChartData(); // Update the area chart with the new year
}

// Initialize charts on DOM load
document.addEventListener("DOMContentLoaded", () => {
    barChart = echarts.init(document.getElementById('barChart'));
    candlestickChart = echarts.init(document.getElementById('candlestickChart'));
    areaChart = echarts.init(document.getElementById('areaChart'));

    // Load default analytics data
    loadAnalyticsData(selectedSymbol);
});
