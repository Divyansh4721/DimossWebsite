import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Catalogue from './components/Catalogue';
import Collections from './components/Collections';
import About from './components/About';
import Visit from './components/Visit';
import Contact from './components/Contact';
import './App.css';
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </main>
      {/* Optional shared footer */}
      <footer className="p-4 bg-[#bf9347] text-[#fffdf8] text-center text-sm">
        © 2025 THE NUSEUM - A Museum Without Walls
      </footer>
    </div>
  );
}
export default App;
