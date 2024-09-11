import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkedIn from "./header-components/linkedin";
import Github from "./header-components/github";
import About from "./header-components/aboutme";
import MyForm from "./Form";
import TitleAndTable from "./TitleAndTable";
import CallValue from "./CallValue";
import PutValue from "./PutValue";
import HeatMapTitles from './HeatMapTitles';

const defaultFormData = {
  assetPrice: 105.00,
  strike: 100.00,
  maturity: 365,
  impliedVolatility: 20.00,
  rate: 5.00,
  minAsset: 80.00,
  maxAsset: 120.00,
  minVolatility: 10.00,
  maxVolatility: 30.00
};

function App() {
  const [formData, setFormData] = useState(defaultFormData);
  const [callValue, setCallValue] = useState<number | null>(null);
  const [putValue, setPutValue] = useState<number | null>(null);
  const [callHeatmapUrl, setCallHeatmapUrl] = useState<string | null>(null);
  const [putHeatmapUrl, setPutHeatmapUrl] = useState<string | null>(null);

  useEffect(() => {
    calculateOptionValues(formData);
    fetchHeatmaps(formData);
  }, [formData]);

  const calculateOptionValues = async (data: typeof defaultFormData) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/calculate', data);
      setCallValue(response.data.callValue);
      setPutValue(response.data.putValue);
    } catch (error) {
      console.error('Error calculating option values:', error);
    }
  };

  const fetchHeatmaps = async (data: typeof defaultFormData) => {
    try {
      // Fetch Call Heatmap
      const callResponse = await axios.post('http://127.0.0.1:5000/heatmap', { ...data, optionType: 'call' }, { responseType: 'blob' });
      const callImageUrl = URL.createObjectURL(new Blob([callResponse.data], { type: 'image/png' }));
      setCallHeatmapUrl(callImageUrl);

      // Fetch Put Heatmap
      const putResponse = await axios.post('http://127.0.0.1:5000/heatmap', { ...data, optionType: 'put' }, { responseType: 'blob' });
      const putImageUrl = URL.createObjectURL(new Blob([putResponse.data], { type: 'image/png' }));
      setPutHeatmapUrl(putImageUrl);

    } catch (error) {
      console.error('Error fetching heatmaps:', error);
    }
  };

  const handleFormSubmit = (data: typeof defaultFormData) => {
    setFormData(data);
  };

  return (
    <>
      <div className="sidebar">
        <MyForm onSubmit={handleFormSubmit} initialValues={defaultFormData} />
      </div>
      <div className="topbar">
        <About />
        <LinkedIn />
        <Github />
      </div>
      <div className="main">
        <TitleAndTable data={formData} />
        <div className="value-row">
          <CallValue value={callValue} />
          <PutValue value={putValue} />
        </div>
        <div className="HeatMapT">
          <HeatMapTitles />
        </div>
        <div className="heatmaps-container">
          <div className="sub_title_map">
          <div className="fill">Call Price Heatmap</div>
          <div className="fill">Put Price Heatmap </div>
          </div>
          <div className="heatmaps">
          {callHeatmapUrl && <img src={callHeatmapUrl} alt="Call Option Heatmap" style={{ width: "49%" }} />}
          {putHeatmapUrl && <img src={putHeatmapUrl} alt="Put Option Heatmap"  style={{ width: "49%" }}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
