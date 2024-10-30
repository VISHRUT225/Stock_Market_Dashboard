// JavaScript for predictive analysis
document.addEventListener("DOMContentLoaded", () => {
    const futureChart = echarts.init(document.getElementById('futureMain'));

    fetch('/get_stock_data/AAPL?timeframe=1mo')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            futureChart.setOption({
                title: { text: 'Future Predictions for AAPL' },
                xAxis: { type: 'category', data: data.time },
                yAxis: { type: 'value' },
                series: [{
                    type: 'line',
                    data: data.candlestick.map(item => item[2]), // Close prices
                }]
            });
        });
});
