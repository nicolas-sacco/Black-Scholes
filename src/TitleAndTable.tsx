import React from 'react';

interface TitleAndTableProps {
  data: {
    assetPrice: number;
    strike: number;
    maturity: number;
    impliedVolatility: number;
    rate: number;
    minAsset: number;
    maxAsset: number;
    minVolatility: number;
    maxVolatility: number;
  };
}

function TitleAndTable({ data }: TitleAndTableProps) {
  return (
    <div className="main-display">
      <div className="main-title">Black-Scholes Option Pricing Model</div>
      <div className="input-table-display">
        <table>
          <thead>
            <tr>
              <th>Current Asset Price</th>
              <th>Strike Price</th>
              <th>Time to Maturity (Days)</th>
              <th>Annualized Implied Volatility (σ)</th>
              <th>Risk-Free Interest Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data.assetPrice}</td>
              <td>${data.strike}</td>
              <td>{data.maturity} Days</td>
              <td>{data.impliedVolatility}%</td>
              <td>{data.rate}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TitleAndTable;
