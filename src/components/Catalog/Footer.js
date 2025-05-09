import React from 'react';
import { Facebook, Instagram, MapPin, Mail, Phone, Copyright, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer className="bg-white border-t border-brand-100 mt-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between border-t border-brand-100 pt-10">
                    {/* Brand column */}
                    <div className="mb-8 md:mb-0 md:w-1/3 pr-8">
                        <div className="flex items-center mb-4">
                            <img
                                src="/assets/logo.png"
                                alt="Dimoss Jewellery Logo"
                                className="h-10 w-10 rounded-full mr-3 shadow-sm"
                            />
                            <div>
                                <h2 className="text-xl font-serif font-bold text-brand-800">Dimoss</h2>
                                <p className="text-xs tracking-wider text-brand-500">THE SOLITAIRE</p>
                            </div>
                        </div>
                        <p className="text-brand-600 mb-6">
                            Discover our exquisite collection of handcrafted jewellery pieces,
                            designed to celebrate life's most precious moments with elegance and timeless beauty.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="https://www.facebook.com/profile.php?id=100095082944854"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-50 hover:bg-brand-100 text-brand-700 hover:text-brand-500 p-2 rounded-full transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/dimoss.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-50 hover:bg-brand-100 text-brand-700 hover:text-brand-500 p-2 rounded-full transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    {/* Links and Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 md:w-2/3">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-brand-800 font-medium mb-4 pb-1 border-b border-brand-100">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-brand-600 hover:text-brand-500 transition-colors duration-300 flex items-center">
                                        <span className="mr-2 text-brand-400">→</span> Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/collections" className="text-brand-600 hover:text-brand-500 transition-colors duration-300 flex items-center">
                                        <span className="mr-2 text-brand-400">→</span> Collections
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/catalog" className="text-brand-600 hover:text-brand-500 transition-colors duration-300 flex items-center">
                                        <span className="mr-2 text-brand-400">→</span> Catalog
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/na" className="text-brand-600 hover:text-brand-500 transition-colors duration-300 flex items-center">
                                        <span className="mr-2 text-brand-400">→</span> New Arrivals
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/us" className="text-brand-600 hover:text-brand-500 transition-colors duration-300 flex items-center">
                                        <span className="mr-2 text-brand-400">→</span> About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Contact */}
                        <div>
                            <h3 className="text-brand-800 font-medium mb-4 pb-1 border-b border-brand-100">Contact Us</h3>
                            <address className="not-italic space-y-3">
                                <p className="flex items-start text-brand-600">
                                    <MapPin className="w-5 h-5 mr-2 text-brand-500 flex-shrink-0 mt-0.5" />
                                    <a
                                        href="https://maps.app.goo.gl/1J4bruFtyfUtYhLL6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-brand-500 transition-colors duration-300"
                                    >
                                        Sarafa Bazar, Karnal, Haryana
                                    </a>
                                </p>
                                <p className="flex items-center text-brand-600">
                                    <Mail className="w-5 h-5 mr-2 text-brand-500" />
                                    <a
                                        href="mailto:avdeshb@hotmail.com"
                                        className="hover:text-brand-500 transition-colors duration-300"
                                    >
                                        avdeshb@hotmail.com
                                    </a>
                                </p>
                                <p className="flex items-center text-brand-600">
                                    <Phone className="w-5 h-5 mr-2 text-brand-500" />
                                    <a
                                        href="tel:+917027701770"
                                        className="hover:text-brand-500 transition-colors duration-300"
                                    >
                                        +91 702 770 1770
                                    </a>
                                </p>
                            </address>
                        </div>
                    </div>
                </div>
                {/* Copyright bar */}
                <div className="border-t border-brand-100 mt-10 py-6 flex flex-col sm:flex-row justify-between items-center text-brand-600 text-sm">
                    <p className="flex items-center mb-2 sm:mb-0">
                        <Copyright className="w-4 h-4 mr-1" /> {new Date().getFullYear()} Dimoss Jewellery. All rights reserved.
                    </p>
                    <p className="flex items-center">
                        Made with <Heart className="w-4 h-4 mx-1 text-brand-500" /> in Karnal, India
                    </p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;