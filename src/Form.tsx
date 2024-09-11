import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { FcStatistics } from "react-icons/fc";

interface MyFormProps {
  onSubmit: (data: {
    assetPrice: number;
    strike: number;
    maturity: number;
    impliedVolatility: number;
    rate: number;
    minAsset: number;
    maxAsset: number;
    minVolatility: number;
    maxVolatility: number;
  }) => void;
  initialValues: {
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

function MyForm({ onSubmit, initialValues }: MyFormProps) {
  const [currentAssetPrice, setCurrentAssetPrice] = useState<string>(initialValues.assetPrice.toString());
  const [strikePrice, setStrikePrice] = useState<string>(initialValues.strike.toString());
  const [timeToMaturity, setTimeToMaturity] = useState<string>(initialValues.maturity.toString());
  const [impliedVol, setImpliedVol] = useState<string>(initialValues.impliedVolatility.toString());
  const [interestRate, setInterestRate] = useState<string>(initialValues.rate.toString());
  const [minAssetPrice, setMinAssetPrice] = useState<string>(initialValues.minAsset.toString());
  const [maxAssetPrice, setMaxAssetPrice] = useState<string>(initialValues.maxAsset.toString());
  const [minVol, setMinVol] = useState<string>(initialValues.minVolatility.toString());
  const [maxVol, setMaxVol] = useState<string>(initialValues.maxVolatility.toString());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'currentAssetPrice':
        setCurrentAssetPrice(value);
        break;
      case 'strikePrice':
        setStrikePrice(value);
        break;
      case 'timeToMaturity':
        setTimeToMaturity(value);
        break;
      case 'impliedVol':
        setImpliedVol(value);
        break;
      case 'interestRate':
        setInterestRate(value);
        break;
      case 'minAssetPrice':
        setMinAssetPrice(value);
        break;
      case 'maxAssetPrice':
        setMaxAssetPrice(value);
        break;
      case 'minVol':
        setMinVol(value);
        break;
      case 'maxVol':
        setMaxVol(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      assetPrice: Number(currentAssetPrice),
      strike: Number(strikePrice),
      maturity: Number(timeToMaturity),
      impliedVolatility: Number(impliedVol),
      rate: Number(interestRate),
      minAsset: Number(minAssetPrice),
      maxAsset: Number(maxAssetPrice),
      minVolatility: Number(minVol),
      maxVolatility: Number(maxVol)
    };

    onSubmit(data);
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'minVol') {
      setMinVol(value);
    } else if (name === 'maxVol') {
      setMaxVol(value);
    }
  };

  return (
    <>
      <h1 className="Title"><FcStatistics className="icon"/>Black-Scholes Model</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <p className="SubTitle">Input Parameters</p>
        <hr className="thin-white-line" />
        <div className="form-component">
          <label htmlFor="currentAssetPrice" className="form-label">Current Asset Price</label>
          <input
            id="currentAssetPrice"
            name="currentAssetPrice"
            type="number"
            placeholder="105.00"
            min="0"
            className="form-control"
            value={currentAssetPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-component">
          <label htmlFor="strikePrice" className="form-label">Strike Price</label>
          <input
            id="strikePrice"
            name="strikePrice"
            type="number"
            placeholder="100.00"
            min="0"
            className="form-control"
            value={strikePrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-component">
          <label htmlFor="timeToMaturity" className="form-label">Time to Maturity (Days)</label>
          <input
            id="timeToMaturity"
            name="timeToMaturity"
            type="number"
            placeholder="365"
            min="0"
            className="form-control"
            value={timeToMaturity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-component">
          <label htmlFor="impliedVol" className="form-label">Annualized Implied Volatility (σ)</label>
          <input
            id="impliedVol"
            name="impliedVol"
            type="number"
            placeholder="20.0"
            min="0"
            className="form-control"
            value={impliedVol}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-component">
          <label htmlFor="interestRate" className="form-label">Risk-Free Interest Rate</label>
          <input
            id="interestRate"
            name="interestRate"
            type="number"
            placeholder="5.0"
            min="0"
            className="form-control"
            value={interestRate}
            onChange={handleInputChange}
          />
        </div>
        <p className="SubTitle">Heatmap Parameters</p>
        <hr className="thin-white-line" />
        <div className="form-component">
          <label htmlFor="minAssetPrice" className="form-label">Minimum Asset Price for Heatmap</label>
          <input
            id="minAssetPrice"
            name="minAssetPrice"
            type="number"
            placeholder="80.00"
            min="0"
            className="form-control"
            value={minAssetPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-component">
          <label htmlFor="maxAssetPrice" className="form-label">Maximum Asset Price for Heatmap</label>
          <input
            id="maxAssetPrice"
            name="maxAssetPrice"
            type="number"
            placeholder="120.00"
            min="0"
            className="form-control"
            value={maxAssetPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-component-slider">
          <label htmlFor="minVol" className="form-label">Minimum Volatility for Heatmap</label>
          <input
            id="minVol"
            name="minVol"
            type="range"
            min="0"
            max="100"
            value={minVol}
            onChange={handleSliderChange}
            className="form-control"
          />
        </div>
        <div className="slider-tooltip" style={{ left: `calc(${minVol}% + (${minVol} * 0.2px))` }}>
          {minVol}%
        </div>
        <div className="form-component-slider">
          <label htmlFor="maxVol" className="form-label">Maximum Volatility for Heatmap</label>
          <input
            id="maxVol"
            name="maxVol"
            type="range"
            min="0"
            max="100"
            value={maxVol}
            onChange={handleSliderChange}
            className="form-control"
          />
        </div>
        <div className="slider-tooltip" style={{ left: `calc(${maxVol}% + (${maxVol} * 0.2px))` }}>
          {maxVol}%
        </div>
        <button className="submit" type="submit">Submit</button>
      </form>
    </>
  );
}

export default MyForm;
