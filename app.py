from flask import Flask, render_template, jsonify, request
import yfinance as yf
import pandas as pd

app = Flask(__name__)

@app.route('/')
def dashboard():
    """Render the dashboard page with trending stocks."""
    return render_template('dashboard.html')

@app.route('/get_stock_data')
def get_stock_data():
    symbol = request.args.get('symbol', 'AAPL')
    timeframe = request.args.get('timeframe', '1y')
    period_mapping = {'1mo': '1mo', '3mo': '3mo', '1y': '1y', '5y': '5y', 'max': 'max'}

    try:
        period = period_mapping.get(timeframe, '1y')
        stock_data = yf.Ticker(symbol).history(period=period)
        time = stock_data.index.strftime('%Y-%m-%d').tolist()
        open_prices = stock_data['Open'].tolist()
        close_prices = stock_data['Close'].tolist()
        low_prices = stock_data['Low'].tolist()
        high_prices = stock_data['High'].tolist()
        volumes = stock_data['Volume'].tolist()
        current_price = float(close_prices[-1]) if close_prices else 'N/A'
        high_price = float(stock_data['High'].max())
        low_price = float(stock_data['Low'].min())
        turnover = int(stock_data['Volume'].sum())
        volume = int(stock_data['Volume'].iloc[-1]) if not stock_data['Volume'].empty else 0
        stock_data.index = stock_data.index.tz_localize(None)
        stock_data['Month'] = stock_data.index.to_period('M')
        monthly_volume = stock_data.groupby('Month')['Volume'].sum().tolist()

        data = {
            'symbol': symbol,
            'time': time,
            'openPrices': open_prices,
            'closePrices': close_prices,
            'currentPrice': current_price,
            'highPrice': high_price,
            'lowPrice': low_price,
            'turnover': turnover,
            'volume': volume,
            'lowPrices': low_prices,
            'highPrices': high_prices,
            'monthlyVolume': monthly_volume,
        }
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/analytics')
def analytics():
    """Render the analytics page for deeper insights."""
    return render_template('analytics.html')

@app.route('/future_analytics')
def future_analytics():
    """Render the future analytics page for predictions."""
    return render_template('future_analytics.html')

if __name__ == '__main__':
    app.run(debug=True)
