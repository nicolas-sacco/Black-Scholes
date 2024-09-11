from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from io import BytesIO
from scipy.stats import norm
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React frontend
# Black-Scholes functions
def black_scholes_call(S0, K, r, sigma, T):
    d1 = (np.log(S0 / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    return S0 * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
def black_scholes_put(S0, K, r, sigma, T):
    d1 = (np.log(S0 / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    return K * np.exp(-r * T) * norm.cdf(-d2) - S0 * norm.cdf(-d1)
@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    S0 = data['assetPrice']
    K = data['strike']
    r = data['rate'] / 100
    sigma = data['impliedVolatility'] / 100
    T = data['maturity'] / 365
    
    call_value = black_scholes_call(S0, K, r, sigma, T)
    put_value = black_scholes_put(S0, K, r, sigma, T)
    
    return jsonify({'callValue': call_value, 'putValue': put_value})
@app.route('/heatmap', methods=['POST'])
def heatmap():
    data = request.json
    minprice = data['minAsset']
    maxprice = data['maxAsset']
    minvol = data['minVolatility']
    maxvol = data['maxVolatility']
    K = data['strike']
    r = data['rate'] / 100
    T = data['maturity'] / 365
    
    option_type = data.get('optionType', 'call')  # default to call option
    # Create price and volatility ranges
    prices = np.linspace(minprice, maxprice, 10)
    vols = np.linspace(minvol, maxvol, 10)
    # Initialize DataFrame with numeric data
    df = pd.DataFrame(index=prices, columns=vols)
    # Populate DataFrame with option prices
    for price in prices:
        for vol in vols:
            try:
                if option_type == 'call':
                    price_value = black_scholes_call(price, K, r, vol / 100, T)
                else:
                    price_value = black_scholes_put(price, K, r, vol / 100, T)
                df.loc[price, vol] = round(price_value, 2)
            except Exception as e:
                df.loc[price, vol] = np.nan
    df = df.apply(pd.to_numeric, errors='coerce')
    # Plotting the heatmap
    plt.figure(figsize=(12, 10))
    heatmap = sns.heatmap(df, cmap="inferno", annot=True, fmt=".2f", cbar=True, xticklabels=2, yticklabels=2)
    heatmap.set_xticks(np.arange(len(vols)) + 0.5)
    heatmap.set_yticks(np.arange(len(prices)) + 0.5)
    heatmap.set_xticklabels([f'{v:.2f}' for v in vols])
    heatmap.set_yticklabels([f'{p:.2f}' for p in prices])
    plt.title(f"{option_type.capitalize()} Option Prices Heatmap")
    plt.xlabel("Volatility (%)")
    plt.ylabel("Asset Price ($)")
    # Save the heatmap to a BytesIO object
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plt.close()
    return send_file(buffer, mimetype='image/png')
if __name__ == '__main__':
    app.run(debug=True)