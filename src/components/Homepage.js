import React, { useState, useEffect } from 'react';
const Homepage = () => {
  const [loaded, setLoaded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  const FloatingDot = ({ delay, size, top, left, opacity }) => {
    return (
      <div
        className={`absolute rounded-full bg-[#bf9347] transition-all duration-1000 delay-${delay} ${loaded ? 'opacity-' + opacity : 'opacity-0'}`}
        style={{
          width: size,
          height: size,
          top: `${top}%`,
          left: `${left}%`,
          transform: loaded ? 'scale(1)' : 'scale(0)',
        }}
      />
    );
  };
  return (
    <div className="relative h-screen bg-[#fcf6eb] text-[#212121] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingDot delay="300" size="6px" top={15} left={20} opacity="20" />
        <FloatingDot delay="500" size="8px" top={35} left={85} opacity="15" />
        <FloatingDot delay="700" size="4px" top={70} left={15} opacity="10" />
        <FloatingDot delay="900" size="12px" top={80} left={75} opacity="5" />
        <div className={`absolute top-0 left-0 w-full h-px bg-[#bf9347] origin-left transform rotate-30 opacity-5 transition-opacity duration-1000 ${loaded ? 'opacity-5' : 'opacity-0'}`} style={{ width: '200%' }}></div>
        <div className={`absolute top-0 right-0 w-full h-px bg-[#bf9347] origin-right transform -rotate-15 opacity-5 transition-opacity duration-1000 ${loaded ? 'opacity-5' : 'opacity-0'}`} style={{ width: '200%' }}></div>
        <div
          className="absolute w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(191,147,71,0.1) 0%, rgba(191,147,71,0) 70%)',
            transform: 'translate(-50%, -50%)',
            left: cursorPosition.x,
            top: cursorPosition.y,
          }}
        />
      </div>
      <div className={`flex flex-col items-center justify-center h-full p-4 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full max-w-xl mb-8 p-2">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#bf9347] opacity-60"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#bf9347] opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#bf9347] opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#bf9347] opacity-60"></div>
          <img src="/assets/images/nuseum-logo.png" alt="The Nuseum Logo" className="w-full" />
        </div>
        <a href="/catalogue" className="group relative overflow-hidden mb-16 inline-block">
          <div className="px-12 py-3 border border-[#bf9347] text-[#bf9347] uppercase tracking-widest font-light text-sm relative z-10 transition-colors duration-500">
            Enter the Catalogue
          </div>
          <div className="absolute inset-0 bg-[#bf9347] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0"></div>
          <div className="absolute inset-0 bg-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-500 ease-in-out delay-500 z-0"></div>
          <div className="absolute inset-0 flex items-center justify-center uppercase tracking-widest font-light text-sm text-[#fcf6eb] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            Enter the Catalogue
          </div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 z-30"></div>
        </a>
        <div className="absolute bottom-8 w-full max-w-xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-px bg-[#bf9347] opacity-30"></div>
            <div className="w-1 h-1 rounded-full bg-[#bf9347] mx-2"></div>
            <div className="w-8 h-px bg-[#bf9347] opacity-30"></div>
          </div>
          <div className="flex justify-center space-x-8 text-xs text-[#bf9347] tracking-widest">
            <a href="/about" className="opacity-70 hover:opacity-100 transition-opacity relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#bf9347] hover:after:w-full after:transition-all after:duration-300">ABOUT</a>
            <a href="/visit" className="opacity-70 hover:opacity-100 transition-opacity relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#bf9347] hover:after:w-full after:transition-all after:duration-300">VISIT</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;