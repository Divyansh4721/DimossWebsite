import React, { useEffect, useState, useRef } from 'react';

const EnhancedPreloader = () => {
    const [fadeOut, setFadeOut] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showSparkles, setShowSparkles] = useState(false);
    const containerRef = useRef(null);
    
    // Inject custom animations
    useEffect(() => {
        if (typeof document !== 'undefined' && !document.getElementById('preloader-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'preloader-animations';
            styleSheet.innerHTML = `
                @keyframes diamond-rotate {
                    0% { transform: rotate(0deg) scale(0.8); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: rotate(360deg) scale(1); opacity: 1; }
                }
                
                @keyframes logo-reveal {
                    0% { transform: scale(0.5); opacity: 0; filter: blur(10px); }
                    50% { transform: scale(1.1); opacity: 0.8; filter: blur(2px); }
                    100% { transform: scale(1); opacity: 1; filter: blur(0); }
                }
                
                @keyframes text-reveal {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes circle-pulse {
                    0%, 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(209, 74, 97, 0.7); }
                    50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(209, 74, 97, 0); }
                }
                
                @keyframes ring-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes sparkle {
                    0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
                    50% { transform: scale(1) rotate(180deg); opacity: 1; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes progress-fill {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                
                .ring-rotate {
                    animation: ring-rotate 10s linear infinite;
                }
                
                .diamond {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: linear-gradient(135deg, #ffffff 0%, #ffc0cb 40%, #d14a61 60%, #ffffff 100%);
                    transform-origin: center;
                    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                }
                
                .sparkle {
                    position: absolute;
                    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(209,74,97,0.3) 60%, rgba(255,255,255,0) 70%);
                    border-radius: 50%;
                    z-index: 5;
                    pointer-events: none;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }, []);

    // Animate the loading sequence
    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const newProgress = prev + Math.random() * 15;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, 300);
        
        // Show elements in sequence
        setTimeout(() => setShowLogo(true), 300);
        setTimeout(() => setShowText(true), 700);
        setTimeout(() => setShowSparkles(true), 1200);
        
        // Start fade out after loading completes or timeout
        const timer = setTimeout(() => {
            clearInterval(interval);
            setLoadingProgress(100);
            setTimeout(() => setFadeOut(true), 500);
        }, 2500);
        
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);
    
    // Create random sparkles
    useEffect(() => {
        if (!showSparkles || !containerRef.current) return;
        
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        
        // Create sparkles
        const createSparkles = () => {
            // Maximum 6 sparkles at a time
            if (container.querySelectorAll('.sparkle').length > 6) return;
            
            const size = Math.random() * 10 + 5;
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.left = `${Math.random() * containerRect.width}px`;
            sparkle.style.top = `${Math.random() * containerRect.height}px`;
            sparkle.style.animation = `sparkle ${Math.random() * 1 + 1}s ease-in-out infinite`;
            sparkle.style.animationDelay = `${Math.random() * 1}s`;
            
            container.appendChild(sparkle);
            
            // Remove after some time to prevent too many elements
            setTimeout(() => {
                if (sparkle && sparkle.parentNode === container) {
                    sparkle.remove();
                }
            }, 3000);
        };
        
        // Create initial sparkles
        for (let i = 0; i < 5; i++) {
            createSparkles();
        }
        
        // Continue creating sparkles
        const sparkleInterval = setInterval(createSparkles, 300);
        
        return () => clearInterval(sparkleInterval);
    }, [showSparkles]);

    // Create rotating diamonds
    const renderDiamonds = () => {
        const diamonds = [];
        const total = 3;
        
        for (let i = 0; i < total; i++) {
            const delay = i * 0.3;
            const size = 10 + (i * 5);
            
            diamonds.push(
                <div 
                    key={i}
                    className="diamond"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        animation: `diamond-rotate 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
                        animationDelay: `${delay}s`,
                        opacity: 0
                    }}
                />
            );
        }
        
        return diamonds;
    };

    return (
        <div 
            className={`fixed inset-0 z-50 transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{ 
                background: 'radial-gradient(circle, rgba(255,247,247,1) 0%, rgba(255,255,255,1) 100%)' 
            }}
        >
            <div className="absolute inset-0 overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-1/4 left-1/4 opacity-10 w-64 h-64 rounded-full border border-brand-300 ring-rotate"></div>
                <div className="absolute bottom-1/4 right-1/3 opacity-10 w-48 h-48 rounded-full border border-brand-300 ring-rotate" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
            </div>
            
            <div 
                ref={containerRef}
                className="flex flex-col items-center justify-center h-full relative"
            >
                {/* Main content */}
                <div className="relative">
                    {/* Rotating diamond ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-brand-200 ring-rotate opacity-50"></div>
                    </div>
                    
                    {/* Small decorative diamonds */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {renderDiamonds()}
                    </div>
                    
                    {/* Logo container with glow */}
                    <div 
                        className={`relative w-24 h-24 rounded-full overflow-hidden border-4 border-brand-500 p-1 bg-white transition-all duration-1000 ${showSparkles ? 'shadow-lg shadow-brand-300/40' : ''}`}
                        style={{ 
                            animation: showSparkles ? 'circle-pulse 2s infinite ease-in-out' : 'none'
                        }}
                    >
                        {/* Logo image with reveal animation */}
                        <img 
                            src="/assets/logo.png" 
                            alt="Dimoss Jewelry Logo" 
                            className="w-full h-full object-cover rounded-full"
                            style={{ 
                                animation: showLogo ? 'logo-reveal 1s forwards cubic-bezier(0.26, 0.53, 0.74, 1.48)' : 'none',
                                opacity: 0
                            }}
                        />
                        
                        {/* Overlay light effect */}
                        <div 
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/30 rounded-full opacity-0 transition-opacity duration-700"
                            style={{ opacity: showLogo ? 0.6 : 0 }}
                        ></div>
                    </div>
                </div>
                
                {/* Text with reveal animation */}
                <div 
                    className="mt-6 flex flex-col items-center overflow-hidden"
                    style={{ opacity: showText ? 1 : 0 }}
                >
                    <h2 
                        className="text-xl font-serif font-bold text-brand-800"
                        style={{ 
                            animation: showText ? 'text-reveal 0.8s forwards ease-out' : 'none',
                            opacity: 0
                        }}
                    >
                        DIMOSS JEWELRY
                    </h2>
                    <p 
                        className="mt-2 text-brand-600 font-medium"
                        style={{ 
                            animation: showText ? 'text-reveal 0.8s forwards ease-out 0.2s' : 'none',
                            opacity: 0
                        }}
                    >
                        Loading Exquisite Collection...
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mt-4 w-48 h-1 bg-brand-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-brand-300 to-brand-500 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedPreloader;