import React, { useState, useEffect } from 'react';
import { Menu, ShoppingBag, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isShimmering, setIsShimmering] = useState(false);
  const [hoverLetter, setHoverLetter] = useState(null);
  useEffect(() => {
    const shimmerInterval = setInterval(() => {
      setIsShimmering(true);
      setTimeout(() => setIsShimmering(false), 1500);
    }, 7000);
    return () => clearInterval(shimmerInterval);
  }, []);
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('header-animations')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'header-animations';
      styleSheet.innerHTML = `
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 2px rgba(209, 74, 97, 0.3); }
          50% { text-shadow: 0 0 10px rgba(209, 74, 97, 0.6), 0 0 20px rgba(209, 74, 97, 0.3); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.1); }
        }
        
        @keyframes wave {
          0% { transform: translateY(0); }
          25% { transform: translateY(-5px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(5px); }
          100% { transform: translateY(0); }
        }
        
        .shimmer-effect {
          background: linear-gradient(
            90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.8) 50%, 
            rgba(255,255,255,0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out;
        }
        
        .logo-float {
          animation: float-subtle 3s ease-in-out infinite;
        }
        
        .letter-bounce {
          animation: bounce 0.5s ease-in-out;
        }
        
        .sparkle {
          position: absolute;
          pointer-events: none;
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          animation: sparkle 1s ease-in-out infinite;
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);
  const addSparkle = (e) => {
    const logo = e.currentTarget;
    const logoRect = logo.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const size = Math.random() * 6 + 3;
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${Math.random() * logoRect.width}px`;
      sparkle.style.top = `${Math.random() * logoRect.height}px`;
      sparkle.style.opacity = Math.random() * 0.5 + 0.3;
      logo.appendChild(sparkle);
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  };
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-white text-brand-800 border-b border-brand-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <button
                className="md:hidden text-brand-800 hover:text-brand-500 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu size={22} />
              </button>
              <div className="flex items-center">
                <Link to="/" className="flex items-center group relative">
                  <div
                    className="relative h-10 w-10 rounded-full overflow-hidden mr-3 shadow-md transition-all duration-500 group-hover:shadow-brand-200 logo-float"
                    onMouseEnter={addSparkle}
                  >
                    <img
                      src="/assets/logo.png"
                      alt="Dimoss Jewellery Logo"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-serif font-bold tracking-wider text-brand-800 relative">
                      <span
                        className={`inline-block transition-transform duration-300 hover:text-brand-500 ${hoverLetter === 0 ? 'letter-bounce' : ''}`}
                        onMouseEnter={() => setHoverLetter(0)}
                        onMouseLeave={() => setHoverLetter(null)}
                        style={{ transformOrigin: 'bottom center' }}
                      >D</span>
                      <span
                        className={`inline-block transition-transform duration-300 hover:text-brand-500 ${hoverLetter === 1 ? 'letter-bounce' : ''}`}
                        onMouseEnter={() => setHoverLetter(1)}
                        onMouseLeave={() => setHoverLetter(null)}
                        style={{ transformOrigin: 'bottom center' }}
                      >i</span>
                      <span
                        className={`inline-block transition-transform duration-300 hover:text-brand-500 ${hoverLetter === 2 ? 'letter-bounce' : ''}`}
                        onMouseEnter={() => setHoverLetter(2)}
                        onMouseLeave={() => setHoverLetter(null)}
                        style={{ transformOrigin: 'bottom center' }}
                      >m</span>
                      <span
                        className={`inline-block transition-transform duration-300 hover:text-brand-500 ${hoverLetter === 3 ? 'letter-bounce' : ''}`}
                        onMouseEnter={() => setHoverLetter(3)}
                        onMouseLeave={() => setHoverLetter(null)}
                        style={{ transformOrigin: 'bottom center' }}
                      >o</span>
                      <span
                        className={`inline-block transition-transform duration-300 hover:text-brand-500 ${hoverLetter === 4 ? 'letter-bounce' : ''}`}
                        onMouseEnter={() => setHoverLetter(4)}
                        onMouseLeave={() => setHoverLetter(null)}
                        style={{ transformOrigin: 'bottom center' }}
                      >s</span>
                      <span
                        className={`inline-block transition-transform duration-300 hover:text-brand-500 ${hoverLetter === 5 ? 'letter-bounce' : ''}`}
                        onMouseEnter={() => setHoverLetter(5)}
                        onMouseLeave={() => setHoverLetter(null)}
                        style={{ transformOrigin: 'bottom center' }}
                      >s</span>
                    </h1>
                    <p className="text-xs tracking-wider text-brand-500 relative overflow-hidden">
                      <span className="inline-block relative">
                        THE SOLITAIRE
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <nav className="hidden md:flex items-center justify-center space-x-8 text-brand-700 font-medium text-sm">
              <Link to="/" className="py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-500 after:transition-all hover:text-brand-500 hover:after:w-full">
                HOME
              </Link>
              <Link to="/collections" className="py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-500 after:transition-all hover:text-brand-500 hover:after:w-full">
                COLLECTIONS
              </Link>
              <Link to="/catalog" className="py-3 border-b border-brand-100 text-sm font-medium hover:text-brand-500 transition-colors">
                CATALOG
              </Link>
              <Link to="/new-arrival" className="py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-500 after:transition-all hover:text-brand-500 hover:after:w-full">
                NEW ARRIVALS
              </Link>
              <Link to="/about" className="py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-500 after:transition-all hover:text-brand-500 hover:after:w-full">
                ABOUT US
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden bg-white text-brand-800 border-b border-brand-200 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'
          }`}
      >
        <nav className="container mx-auto px-4 py-2 flex flex-col">
          <Link to="/" className="py-3 border-b border-brand-100 text-sm font-medium hover:text-brand-500 transition-colors">
            HOME
          </Link>
          <Link to="/collections" className="py-3 border-b border-brand-100 text-sm font-medium hover:text-brand-500 transition-colors">
            COLLECTIONS
          </Link>
          <Link to="/catalog" className="py-3 border-b border-brand-100 text-sm font-medium hover:text-brand-500 transition-colors">
            CATALOG
          </Link>
          <Link to="/new-arrival" className="py-3 border-b border-brand-100 text-sm font-medium hover:text-brand-500 transition-colors">
            NEW ARRIVALS
          </Link>
          <Link to="/about" className="py-3 text-sm font-medium hover:text-brand-500 transition-colors">
            ABOUT US
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Header;