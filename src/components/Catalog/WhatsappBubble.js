import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const AnimatedWhatsAppButton = () => {
    // State to control the pulse animation
    const [isPulsing, setIsPulsing] = useState(true);
    // State to control the expand animation on hover
    const [isExpanded, setIsExpanded] = useState(false);
    // State to control the message bubble visibility
    const [showBubble, setShowBubble] = useState(false);

    // Toggle pulsing animation every few seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsPulsing(prev => !prev);

            // Show message bubble occasionally
            if (Math.random() > 0.7 && !showBubble) {
                setShowBubble(true);
                setTimeout(() => setShowBubble(false), 4000);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* CSS for custom animations - inline instead of using Tailwind config */}
            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes particle1 {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
                    25% { transform: translate(-10px, -15px) scale(1.2); opacity: 0.8; }
                    50% { transform: translate(5px, -25px) scale(0.8); opacity: 0.6; }
                    75% { transform: translate(15px, -10px) scale(1.1); opacity: 0.4; }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
                }
                
                @keyframes particle2 {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                    25% { transform: translate(10px, 10px) scale(1.2); opacity: 0.7; }
                    50% { transform: translate(15px, 5px) scale(0.9); opacity: 0.9; }
                    75% { transform: translate(5px, 15px) scale(1.1); opacity: 0.5; }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                }
                
                @keyframes particle3 {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
                    33% { transform: translate(-15px, 5px) scale(1.3); opacity: 0.7; }
                    66% { transform: translate(-5px, 15px) scale(0.7); opacity: 0.9; }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
                }
                
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-particle1 {
                    animation: particle1 8s ease-in-out infinite;
                }
                
                .animate-particle2 {
                    animation: particle2 10s ease-in-out infinite;
                }
                
                .animate-particle3 {
                    animation: particle3 7s ease-in-out infinite;
                }
            `}</style>

            {/* Main button with spotlight effect */}
            <div
                className="fixed bottom-6 right-6 z-[1000]"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Spotlight/glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-success to-green-400 rounded-full blur-xl opacity-30 scale-150 transition-transform duration-700 ${isPulsing ? 'scale-[1.8]' : 'scale-[1.2]'}`}></div>

                {/* Message bubble */}
                <div className={`absolute bottom-full right-0 mb-3 bg-white text-brand-800 py-2 px-4 rounded-2xl rounded-br-none shadow-lg transform transition-all duration-500 ${showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <p className="text-sm whitespace-nowrap">Need help? Message us!</p>
                    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
                </div>

                {/* Expand panel on hover */}
                <div className={`absolute inset-y-0 right-0 bg-success rounded-full shadow-lg flex items-center transition-all duration-500 overflow-hidden whitespace-nowrap ${isExpanded ? 'w-44 pr-14' : 'w-14'}`}>
                    <span className={`text-white font-medium pl-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        Chat with us
                    </span>
                </div>

                {/* Main button with film reel inspired design */}
                <a
                    href="https://wa.me/917027701770?text=Hi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-success hover:bg-success-dark text-white shadow-lg z-10 transition-all duration-500 ${isPulsing ? 'animate-pulse' : ''} ${isExpanded ? 'ring-4 ring-white/30' : ''}`}
                    aria-label="Contact us on WhatsApp"
                >
                    {/* Film-inspired decorative elements */}
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/30 animate-spin-slow"></div>
                    <div className="absolute h-full w-0.5 bg-white/10 left-1/2 -translate-x-1/2"></div>
                    <div className="absolute w-full h-0.5 bg-white/10 top-1/2 -translate-y-1/2"></div>

                    {/* Icon with animation */}
                    <div className={`relative z-10 transition-transform duration-500 ${isExpanded ? 'rotate-12' : ''}`}>
                        <i className="fa-brands fa-whatsapp text-2xl"></i>
                    </div>

                    {/* Animated particles around the button */}
                    <div className="absolute top-0 left-1 w-1 h-1 bg-white rounded-full animate-particle1"></div>
                    <div className="absolute bottom-2 right-3 w-1 h-1 bg-white rounded-full animate-particle2"></div>
                    <div className="absolute bottom-1 left-3 w-1 h-1 bg-white rounded-full animate-particle3"></div>
                </a>
            </div>

            {/* Floating message icon that occasionally appears */}
            <div className={`fixed bottom-24 right-10 z-[999] transition-all duration-500 ${isPulsing && Math.random() > 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="animate-float">
                    <MessageCircle className="text-success h-6 w-6" />
                </div>
            </div>
        </>
    );
};

export default AnimatedWhatsAppButton;