import React from 'react'
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
function Header(isMenuOpen, setIsMenuOpen) {
    return (
        <header className="sticky top-0 z-40">
            <div className="bg-gradient-to-t from-amber-200 to-amber-800 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                className="md:hidden mr-4 text-white"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu size={24} />
                            </button>
                            <div className="flex items-center">
                                <img
                                    src="/assets/logo.png"
                                    alt="Dimoss Jewelry Logo"
                                    className="h-12 w-12 rounded-full mr-3 shadow-md"
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-serif font-bold tracking-wider">
                                        <span className="inline-block transform hover:scale-105 transition-transform duration-300">D</span>
                                        <span className="inline-block transform hover:scale-105 transition-transform duration-300">i</span>
                                        <span className="inline-block transform hover:scale-105 transition-transform duration-300">m</span>
                                        <span className="inline-block transform hover:scale-105 transition-transform duration-300">o</span>
                                        <span className="inline-block transform hover:scale-105 transition-transform duration-300">s</span>
                                        <span className="inline-block transform hover:scale-105 transition-transform duration-300">s</span>
                                    </h1>
                                    <p className="mt-1 text-amber-50 ">THE SILITAIRE</p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-8 text-white font-medium">
                            <Link to="/"
                                className="relative group py-2">
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <a href="#" className="relative group py-2">
                                New Arrivals
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <Link to="/us"
                                className="relative group py-2">
                                About Us
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`md:hidden bg-amber-800 text-white overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
                <div className="container mx-auto px-4 py-2">
                    <nav className="flex flex-col">
                        <Link to="/"
                            className="py-2 border-b border-amber-700 hover:bg-amber-700 transition-colors">Home</Link>
                        <a href="#" className="py-2 border-b border-amber-700 hover:bg-amber-700 transition-colors">Collections</a>
                        <a href="#" className="py-2 border-b border-amber-700 hover:bg-amber-700 transition-colors">New Arrivals</a>
                        <Link to="/us" className="py-2 hover:bg-amber-700 transition-colors">About Us</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default Header