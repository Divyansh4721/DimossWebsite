import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DimossLandingPage from './components/LandingPage';
import Catalog from './components/Catalog';
import AboutUs from './components/AboutUs';
import Preloader from './Preloader';
import DimossJewelleryNewArrivals from './components/NewArrivals';
import DimossJewelleryCollections from './components/Collections';
import './App.css';
function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const isLandingPage = location.pathname === '/';
    if (isLandingPage) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 15000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);
  return (
    <>
      {loading && <Preloader />}
      <Routes>
        <Route path="/" element={<DimossLandingPage />} />
        <Route path="/catalog/*" element={<Catalog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/new-arrival" element={<DimossJewelleryNewArrivals />} />
        <Route path="/collections" element={<DimossJewelleryCollections />} />
      </Routes>
    </>
  );
}
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;