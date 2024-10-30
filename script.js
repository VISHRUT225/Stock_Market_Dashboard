// Fetch and render the main dashboard chart here
document.addEventListener("DOMContentLoaded", () => {
    const mainChart = echarts.init(document.getElementById('main'));

    fetch('/get_stock_data/AAPL?timeframe=1d')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            mainChart.setOption({
                title: { text: 'AAPL Stock Prices' },
                xAxis: { type: 'category', data: data.time },
                yAxis: { type: 'value' },
                series: [{
                    type: 'line',
                    data: data.candlestick.map(item => item[2])  // Close prices
                }]
            });
        });
});
