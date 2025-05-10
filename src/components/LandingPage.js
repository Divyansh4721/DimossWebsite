import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import WhatsappBubble from './Catalog/WhatsappBubble';
const DimossLandingPage = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);
    return () => {
      clearTimeout(animationTimer);
    };
  }, []);
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('landing-animations')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'landing-animations';
      styleSheet.innerHTML = `
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes letter-wave {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-5px);
          }
          75% {
            transform: translateY(5px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0px rgba(209, 74, 97, 0.4), 0 0 0px rgba(233, 30, 99, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(209, 74, 97, 0.6), 0 0 30px rgba(233, 30, 99, 0.4);
          }
        }
        
        @keyframes btn-border-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes arrow-bounce {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .animate-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.5) 50%, 
            rgba(255,255,255,0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 0.5s;
        }
        
        .rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        
        .letter {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        
        .letter:hover {
          color: #d14a61;
          transform: translateY(-5px);
        }
        
        .catalog-btn {
          position: relative;
          z-index: 1;
          overflow: hidden;
          transition: all 0.5s;
        }
        
        .catalog-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          background: linear-gradient(90deg, #d14a61, #e91e63, #d14a61);
          background-size: 200% 100%;
          border-radius: 9999px;
          animation: btn-border-animation 8s ease infinite;
          transition: all 0.5s;
        }
        
        .catalog-btn:hover {
          animation: pulse-glow 2s infinite;
          transform: translateY(-3px) scale(1.05);
        }
        
        .catalog-btn:hover .arrow-icon {
          animation: arrow-bounce 1s ease infinite;
        }
        
        .catalog-btn .btn-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        
        .catalog-btn .btn-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .catalog-btn:hover .btn-shine {
          opacity: 0.15;
          transform: rotate(45deg);
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-8 md:my-16">
          <div className={`transition-all duration-1000 ${animationComplete ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}>
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-lg mb-8 overflow-hidden bg-white p-1 relative animate-shimmer">
              <div className="absolute inset-2 rounded-full border border-dashed border-brand-200 rotate-slow opacity-70"></div>
              <img
                src="/assets/logo.png"
                alt="Dimoss Jewellery Logo"
                className="w-full h-full object-cover rounded-full relative z-10"
              />
            </div>
          </div>
          <p className={`text-xl md:text-2xl text-brand-500 mb-12 transition-all duration-1000 delay-300 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            THE SOLITAIRE
          </p>
          <p className={`text-brand-600 mb-12 max-w-lg transition-all duration-1000 delay-500 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Discover the Art of Timeless Elegance <br />
            Dimoss brings you exquisite gold and diamond jewellery, <br />
            thoughtfully crafted to celebrate your most cherished moments with unmatched sophistication and style.</p>
          <Link
            to="/collections"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="bg-brand-500 text-white px-8 py-4 rounded-full font-medium text-lg flex items-center justify-center relative overflow-hidden transition-all duration-500 hover:shadow-lg hover:transform hover:scale-105 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(90deg, #d14a61, #e91e63, #d14a61)',
              backgroundSize: '200% 100%',
              animation: 'btn-border-animation 8s ease infinite'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)',
              opacity: isButtonHovered ? 0.15 : 0,
              transform: 'rotate(60deg)',
              transition: 'opacity 1s ease'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              Explore Our Collections
              <ArrowRight className="ml-2" style={{
                animation: isButtonHovered ? 'arrow-bounce 1s ease infinite' : 'none'
              }} />
            </div>
          </Link>
        </main>
        <section className={`w-full max-w-5xl mx-auto mt-16 transition-all duration-1000 delay-1000 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-2xl font-serif font-medium text-brand-800 text-center mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Rings',
                imagePath: '/assets/categories/WomenRing.png',
                alt: 'Elegant rings collection',
                ornamentType: 'LR',
                description: 'Timeless elegance for every occasion'
              },
              {
                title: 'Bracelets',
                imagePath: '/assets/categories/Bracelets.png',
                alt: 'Luxury bracelets collection',
                ornamentType: 'BCLT',
                description: 'Sophisticated designs for your wrist'
              },
              {
                title: 'Kangan',
                imagePath: '/assets/categories/Kangan.png',
                alt: 'Traditional Kangan collection',
                ornamentType: 'KADE',
                description: 'Heritage pieces with modern touches'
              }
            ].map((category, index) => (
              <a
                key={category.title}
                href={`/catalog?category=${category.ornamentType}`}
                className={`relative rounded-xl overflow-hidden shadow-md group cursor-pointer transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 border border-brand-100 delay-${index * 200}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-800/70 to-transparent z-10"></div>
                <img
                  src={category.imagePath}
                  alt={category.alt}
                  className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white text-xl font-medium">{category.title}</h3>
                  <p className="text-brand-100 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                </div>
                <div className="absolute top-3 right-3 bg-white/80 text-brand-500 rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 transform rotate-45 group-hover:rotate-0">
                  <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </section>
        <section className={`w-full max-w-5xl mx-auto mt-16 bg-gradient-to-r from-brand-50 to-brand-100 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between transition-all duration-1000 delay-1200 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} shadow-sm border border-brand-200`}>
          <div className="mb-4 md:mb-0">
            <h3 className="text-brand-800 text-xl font-medium">New Collection Launch</h3>
            <p className="text-brand-600">Discover our latest designs inspired by nature</p>
          </div>
          <Link
            to="/new-arrival"
            className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center"
          >
            View Now
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </section>
        <footer className="w-full mt-16 py-8 text-center text-brand-600 text-sm border-t border-brand-100">
          <p>&copy; {new Date().getFullYear()} Dimoss Jewellery. All rights reserved.</p>
        </footer>
      </div>
      <WhatsappBubble />
    </div>
  );
};
export default DimossLandingPage;