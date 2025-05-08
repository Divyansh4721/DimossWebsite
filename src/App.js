import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DimossLandingPage from './components/DimossLandingPage';
import Catalog from './components/Catalog';
import AboutUs from './components/DimossAboutUs';
import Preloader from './Preloader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <Routes>
        <Route path="/" element={<DimossLandingPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;