import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DimossLandingPage from './components/DimossLandingPage';
import Catalog from './components/Catalog';
import DimossAboutUs from './components/DimossAboutUs';
import './App.css';
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<DimossLandingPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/us" element={<DimossAboutUs />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;