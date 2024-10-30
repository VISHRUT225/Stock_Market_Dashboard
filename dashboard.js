// static/dashboard.js

let chart;
let currentTimeframe = '1d'; // Default timeframe
let selectedStock = 'AAPL'; // Default stock symbol

document.addEventListener('DOMContentLoaded', function () {
    chart = echarts.init(document.getElementById('main'));
    loadStockData('AAPL');  // Default stock on load
});

function loadStockData(symbol) {
    fetch(`/get_stock_data?symbol=${symbol}&timeframe=1d`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                console.error(data.error);
                return;
            }
            updateStockInfo(data);
            renderChart(data);
        })
        .catch(error => console.error('Error fetching stock data:', error));
}

function updateStockInfo(data) {
    document.getElementById('currentPrice').textContent = `$${data.currentPrice.toFixed(2)}`;
    document.getElementById('highPrice').textContent = `$${data.highPrice.toFixed(2)}`;
    document.getElementById('lowPrice').textContent = `$${data.lowPrice.toFixed(2)}`;
    document.getElementById('turnover').textContent = `$${data.turnover.toFixed(2)}`;
    document.getElementById('volume').textContent = data.volume.toFixed(2); // No $ symbol for volume
}


// Function to fetch stock data and render the chart
function fetchDataAndRenderChart() {
    fetch(`/get_stock_data?symbol=${selectedStock}&timeframe=${currentTimeframe}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            renderChart(data);
            updateStockDetails(data);
        });
}

// Function to render the chart
function renderChart(data) {
    // Format closePrices to 2 decimal places
    const formattedClosePrices = data.closePrices.map(price => parseFloat(price).toFixed(2));

    const chartOptions = {
        title: {
            text: `${data.symbol} Stock Price`,
            left: 'center',
            textStyle: { color: '#0073e6', fontWeight: 'bold' } // Blue title
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#f9f9f9',
            formatter: function (params) {
                // Format tooltip to show two decimal places
                const tooltipData = params[0];
                return `${tooltipData.name}: $${parseFloat(tooltipData.value).toFixed(2)}`;
            }
        },
        xAxis: {
            type: 'category',
            data: data.time,
            axisLine: { lineStyle: { color: '#444' } }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#444' } }
        },
        series: [{
            name: 'Close Price',
            type: 'line',
            data: formattedClosePrices,
            itemStyle: { color: '#ff9900' }, // Orange line
            lineStyle: { color: '#0073e6' }, // Blue line
            areaStyle: { color: 'rgba(0, 115, 230, 0.2)' } // Light blue area
        }]
    };
    chart.setOption(chartOptions);
}



// Function to set timeframe
function setTimeFrame(timeframe) {
    currentTimeframe = timeframe;
    fetchDataAndRenderChart();
}

// Initial fetch
fetchDataAndRenderChart();