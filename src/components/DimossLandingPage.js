import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
const DimossLandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, []);
  const navigateToCategory = (ornamentType) => {
    navigate('/catalog', { state: { ornamentType } });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300 rounded-full opacity-20 animate-float animation-delay-1000"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-amber-100 rounded-full opacity-30 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-amber-400 rounded-full opacity-10 animate-float animation-delay-1500"></div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="w-24 h-24 relative">
            <div className="w-full h-full border-4 border-amber-200 rounded-full"></div>
            <div className="w-full h-full border-4 border-t-amber-500 rounded-full absolute top-0 left-0 animate-spin"></div>
          </div>
          <p className="mt-4 text-amber-800 font-serif">Loading Dimoss...</p>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <header className="w-full flex justify-between items-center mb-8">
          <div className="text-amber-800 text-sm md:text-base flex space-x-4">
            <a href="/us" className="hover:text-amber-600 transition-colors duration-300">About</a>
            <a href="https://wa.me/917404413382?text=Hi" className="hover:text-amber-600 transition-colors duration-300">Contact</a>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-8 md:my-16">
          <div className={`transition-all duration-1000 ${animationComplete ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}>
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-lg mb-8 overflow-hidden bg-white p-1">
              <img
                src="/assets/logo.png"
                alt="Dimoss Jewelry Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <h1 className={`text-5xl md:text-7xl font-serif font-bold text-amber-800 mb-6 transition-all duration-1000 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Dimoss
          </h1>
          <p className={`text-xl md:text-2xl text-amber-600 mb-12 transition-all duration-1000 delay-300 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            THE SILITAIRE
          </p>
          <p className={`text-gray-600 mb-12 max-w-lg transition-all duration-1000 delay-500 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Discover our handcrafted collection of fine rings, Bracelets and many more meticulously designed to celebrate life's most precious moments. Each piece tells a story of elegance, tradition, and timeless craftsmanship.
          </p>
          <Link
            to="/catalog"
            className={`bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-medium text-lg flex items-center transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} delay-700`}
          >
            Explore Our Catalog
            <ArrowRight className="ml-2" />
          </Link>
        </main>
        <section className={`w-full max-w-5xl mx-auto mt-16 transition-all duration-1000 delay-1000 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-2xl font-serif font-medium text-amber-800 text-center mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Rings',
                imagePath: '/assets/Ring.png',
                alt: 'LR',
                ornamentType: 'LR'
              },
              {
                title: 'Bracelets',
                imagePath: '/assets/Bracelets.png',
                alt: 'Diamond engagement ring',
                ornamentType: 'BCLT'
              },
              {
                title: 'Kangan',
                imagePath: '/assets/Kangan.png',
                alt: 'Premium luxury ring with gemstones',
                ornamentType: 'KADE'
              }
            ].map((category, index) => (
              <div
                key={category.title}
                className={`relative rounded-lg overflow-hidden shadow-md group cursor-pointer transition-all duration-500 delay-${index * 200}`}
                onClick={() => navigateToCategory(category.ornamentType)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent z-10"></div>
                <img
                  src={category.imagePath}
                  alt={category.alt}
                  className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white text-xl font-medium">{category.title}</h3>
                  <p className="text-amber-100 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore Collection</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={`w-full max-w-5xl mx-auto mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between transition-all duration-1000 delay-1200 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="mb-4 md:mb-0">
            <h3 className="text-amber-800 text-xl font-medium">New Collection Launch</h3>
            <p className="text-amber-600">Discover our latest designs inspired by nature</p>
          </div>
          <Link
            to="/catalog"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300"
          >
            View Now
          </Link>
        </section>
        <footer className="w-full mt-16 py-8 text-center text-amber-700 text-sm">
          <p>&copy; {new Date().getFullYear()} Dimoss Jewelry. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-amber-500 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-amber-500 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-amber-500 transition-colors duration-300">FAQ</a>
          </div>
        </footer>
      </div>
      <style jsx>{`
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
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};
export default DimossLandingPage;