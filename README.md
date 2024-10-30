
# 📈 Stock Market Dashboard

> A user-friendly stock analysis platform providing real-time stock data, interactive visualizations, and analytics insights. Developed by Vishrut Patel and Rishabh Chavda.

---

## 📝 Project Overview

The **Stock Market Dashboard** is a web-based application that retrieves stock data from Yahoo Finance to display essential financial metrics, including current prices, high/low prices, volumes, and trends over time. This dashboard empowers users to analyze stocks visually and interpret financial data interactively. Future updates will incorporate predictive analytics for forecasting stock trends.

---

## 📂 Project Structure

```plaintext
📁 Stock Market Dashboard
├── 📁 Images
├── 📁 Report
├── app.py                # Main backend application file
├── dashboard.html        # HTML structure for the Dashboard page
├── analytics.html        # HTML structure for the Analytics page
├── future_analytics.html # HTML structure for Future Analytics page
├── dashboard.js          # JavaScript for handling data on the Dashboard page
├── analytics.js          # JavaScript for visualizations on the Analytics page
├── style.css             # CSS for the overall styling of the application
└── requirements.txt      # Python dependencies file
```

---

## ✨ Features

- **Real-time Stock Data** 🕒: Fetches live stock data using `yfinance` API.
- **Interactive Dashboard** 📊: Visualize stock data over different timeframes and view metrics such as current price, high/low price, volume, and turnover.
- **Advanced Analytics** 🔍: Access candlestick charts, bar charts, and area charts to explore stock performance over time.
- **User-Friendly Design** 🎨: A responsive and intuitive interface designed with HTML, CSS, and JavaScript.

---

## 📖 Getting Started

### Prerequisites

Ensure you have Python installed (preferably version 3.7 or above). Install `pip` if it’s not already installed, as it’s needed to install project dependencies.

### Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/stock-market-dashboard.git
   cd stock-market-dashboard
   ```

2. **Install Dependencies**  
   Install the required packages listed in `requirements.txt`.
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application**  
   Start the Flask server to launch the dashboard.
   ```bash
   python app.py
   ```

4. **Access the Dashboard**  
   Open your browser and go to [http://127.0.0.1:5000](http://127.0.0.1:5000) to access the Stock Market Dashboard.

---

## 📊 Project Pages and Functionality

1. **Dashboard Page**  
   - **Select Stocks**: Choose from major stocks like Apple, Google, and Tesla.
   - **View Metrics**: See current price, high/low prices, and volume.
   - **Set Timeframes**: Choose from various timeframes to view historical stock data.
   - **Interactive Chart**: Visualize stock prices with a line chart that updates based on your selections.

2. **Analytics Page**  
   - **Candlestick Chart**: Shows detailed price movements (open, close, high, low).
   - **Bar Chart**: Visualizes yearly closing prices for the last decade.
   - **Area Chart**: Displays monthly average prices, selectable by year.

3. **Future Analytics Page**  
   - Placeholder for future development, intended to provide predictive stock analytics based on historical trends.

---

## 📜 Code Explanation

### `app.py`

- **Purpose**: This file is the main backend of the application, built with Flask. It sets up routes and endpoints to load pages and fetch stock data.
- **Key Routes**:
  - `/`: Loads the Dashboard page.
  - `/get_stock_data`: Endpoint to retrieve stock data from Yahoo Finance.
  - `/analytics` and `/future_analytics`: Load Analytics and Future Analytics pages.

### `dashboard.js` and `analytics.js`

- **dashboard.js**: Handles the Dashboard page’s interaction and updates chart data when users select different stocks or timeframes.
- **analytics.js**: Powers the visualizations in the Analytics section, including candlestick, bar, and area charts.

### `style.css`

- **Purpose**: Defines the styling of the application, including the navbar, buttons, charts, and overall layout to ensure a professional look and responsive design.

---

## 🌐 Tech Stack

- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript
- **APIs/Libraries**: `yfinance` (Yahoo Finance), ECharts (for data visualization)

---

## 📚 Future Enhancements

- **Predictive Analytics** 📈: Add machine learning models to forecast stock prices based on historical data.
- **User Authentication** 🔐: Enable personalized user sessions with saved preferences.
- **Additional Stocks** 📃: Broaden the stock options and add sector-based filters.

---

## 📹 Project Demo

> **[Watch our video demo on YouTube!](https://youtu.be/JRfSxT3SLpc)**  

---

## 🛠️ Troubleshooting

- **Error with `yfinance` API**: Ensure you have a stable internet connection. Occasionally, Yahoo Finance data may have temporary outages.
- **Port Conflict on 5000**: Change the port in `app.py` by modifying `app.run(debug=True, port=<new_port>)`.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Acknowledgments

Special thanks to **Yahoo Finance** for providing free access to stock data, and to **ECharts** for their robust charting library.

---

