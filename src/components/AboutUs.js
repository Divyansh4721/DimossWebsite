import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, ArrowRight, Heart } from 'lucide-react';
import Header from './Catalog/Header';
import Footer from './Catalog/Footer';
import WhatsappBubble from './Catalog/WhatsappBubble';
const DimossAboutUs = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    // Add animations to head
    useEffect(() => {
        if (typeof document !== 'undefined' && !document.getElementById('about-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'about-animations';
            styleSheet.innerHTML = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -100% 0; }
                    100% { background-position: 200% 0; }
                }
                
                @keyframes pulse-subtle {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                }
                
                .fade-in {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeIn 0.8s forwards;
                }
                
                .shimmer-effect {
                    position: relative;
                    overflow: hidden;
                }
                
                .shimmer-effect::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg, 
                        rgba(255,255,255,0) 0%, 
                        rgba(255,255,255,0.6) 50%, 
                        rgba(255,255,255,0) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 3s infinite;
                }
                
                .pulse-subtle {
                    animation: pulse-subtle 3s infinite ease-in-out;
                }
            `;
            document.head.appendChild(styleSheet);
        }
        // Trigger visibility after mount for animations
        setTimeout(() => {
            setIsVisible(true);
        }, 300);
    }, []);
    return (
        <div className="min-h-screen bg-background-page flex flex-col">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div
                        className={`text-center mb-10 transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        style={{ animationDelay: '0.1s' }}
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-800 mb-4">About Dimoss</h1>
                        <p className="text-brand-600 text-lg max-w-2xl mx-auto">
                            Crafting exquisite jewellery for life's most precious moments since 1197
                        </p>
                    </div>
                    {/* Store Info Card */}
                    <div
                        className={`bg-white rounded-xl shadow-md overflow-hidden mb-12 ${isVisible ? 'fade-in' : ''}`}
                        style={{ animationDelay: '0.5s' }}
                    >
                        <div className="bg-brand-500 text-white p-5">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className="text-xl font-medium">Dimoss Ring Collection</h3>
                                    <p className="text-brand-100 text-sm">Exquisite handcrafted rings for every occasion</p>
                                </div>
                                <div className="mt-3 md:mt-0">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs">
                                        <Heart size={14} className="mr-1" /> Made with love in Karnal
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center text-center p-5 bg-brand-50 rounded-lg border border-brand-100 transition-all duration-300 hover:shadow-md hover:border-brand-200 pulse-subtle">
                                    <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                        <MapPin size={24} className="text-brand-600" />
                                    </div>
                                    <h4 className="font-medium text-brand-800 mb-2">Our Location</h4>
                                    <address className="not-italic text-brand-600">
                                        <p>Shop Number 845,</p>
                                        <p>Sarafa Bazar</p>
                                        <p>Karnal, Haryana, 132001</p>
                                        <p>India</p>
                                    </address>
                                </div>
                                <div className="flex flex-col items-center text-center p-5 bg-brand-50 rounded-lg border border-brand-100 transition-all duration-300 hover:shadow-md hover:border-brand-200 pulse-subtle">
                                    <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                        <Clock size={24} className="text-brand-600" />
                                    </div>
                                    <h4 className="font-medium text-brand-800 mb-2">Opening Hours</h4>
                                    <div className="text-brand-600">
                                        <p>Monday - Saturday</p>
                                        <p>10:00 AM - 8:00 PM</p>
                                        <p>Sunday: 11:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-center p-5 bg-brand-50 rounded-lg border border-brand-100 transition-all duration-300 hover:shadow-md hover:border-brand-200 pulse-subtle">
                                    <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                        <Phone size={24} className="text-brand-600" />
                                    </div>
                                    <h4 className="font-medium text-brand-800 mb-2">Contact Us</h4>
                                    <div className="text-brand-600">
                                        <p className="flex items-center justify-center mb-2">
                                            <Mail size={14} className="mr-2" />
                                            <a
                                                href="mailto:avdeshb@hotmail.com"
                                                className="hover:text-brand-500 transition-colors duration-300"
                                            >
                                                avdeshb@hotmail.com
                                            </a>
                                        </p>
                                        <p className="flex items-center justify-center">
                                            <Phone size={14} className="mr-2" />
                                            <a
                                                href="tel:+917027701770"
                                                className="hover:text-brand-500 transition-colors duration-300"
                                            >
                                                +91 702 770 1770
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Map Section */}
                            <div
                                className={`mt-8 rounded-lg overflow-hidden shadow-md border border-brand-100 shimmer-effect ${isVisible ? 'fade-in' : ''}`}
                                style={{ animationDelay: '0.7s' }}
                            >
                                <img
                                    src="/assets/Dimoss-Google-Maps.png"
                                    alt="Map to Dimoss Jewellery Store"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://maps.app.goo.gl/1J4bruFtyfUtYhLL6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg shadow-sm transition-colors duration-300"
                                >
                                    <MapPin size={18} className="mr-2" />
                                    Get Directions
                                </a>
                                <Link
                                    to="/"
                                    className="flex items-center justify-center border-2 border-brand-500 text-brand-600 hover:bg-brand-50 hover:border-brand-600 px-6 py-3 rounded-lg transition-colors duration-300"
                                >
                                    View Our Collection
                                    <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* About Us Text */}
                    <div
                        className={`p-8 bg-white rounded-xl shadow-md border border-brand-100 ${isVisible ? 'fade-in' : ''}`}
                        style={{ animationDelay: '0.9s' }}
                    >
                        <h3 className="text-2xl font-serif font-bold text-brand-800 mb-6">Welcome to Dimoss</h3>
                        <div className="space-y-4 text-brand-700">
                            <p>
                                Find your piece of delight at Dimoss! We offer the finest gold and diamond jewellery, crafted from precious metals and embellished with elegant stones. The jewel of your dreams awaits you.
                            </p>
                            <p>
                                From festive and wedding pieces to men's jewellery and everyday designs, discover countless treasures to spoil yourself with. We specialize in the finest quality jewellery repairs, remodeling and custom designs.
                            </p>
                            <p>
                                Our one-on-one, personalized design service ensures quality workmanship and attention to detail in every piece. We invite you to visit our Karnal store and experience luxury craftsmanship firsthand.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center justify-center">
                            <div className="w-full max-w-md">
                                <div className="h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
                                <div className="flex justify-center -mt-3">
                                    <span className="bg-white px-4 text-brand-500 italic font-serif">
                                        Crafting memories since 1197
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="mt-12"></div>
            <Footer />
            {/* Animated WhatsApp Button */}
            <WhatsappBubble />
        </div>
    );
};
export default DimossAboutUs;