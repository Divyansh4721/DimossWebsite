import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DimossLandingPage from './components/LandingPage';
import Catalog from './components/Catalog';
import AboutUs from './components/AboutUs';
import Preloader from './Preloader';
import DimossJewelleryNewArrivals from './components/NewArrivals';
import DimossJewelleryCollections from './components/Collections';
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
    <Router>
      {loading && <Preloader />}
      <Routes>
        <Route path="/" element={<DimossLandingPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/us" element={<AboutUs />} />
        <Route path="/na" element={<DimossJewelleryNewArrivals />} />
        <Route path="/collections" element={<DimossJewelleryCollections />} />
      </Routes>
    </Router>
  );
}
export default App;