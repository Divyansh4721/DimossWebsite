import React from 'react'
import { Facebook, Twitter, Instagram, MapPin, Mail, Phone, Copyright } from 'lucide-react';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer className="bg-gradient-to-b from-amber-50 to-amber-900 text-amber-900 py-12 mt-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <h2 className="text-2xl font-serif font-bold mb-4">Dimoss</h2>
                        <p className="text-amber-900 max-w-md">
                            Discover our exquisite collection of handcrafted jewelry pieces,
                            designed to celebrate life's most precious moments.
                        </p>
                        <div className="mt-6 flex space-x-4 text-amber-100">
                            <a href="https://www.facebook.com/profile.php?id=100095082944854" className="bg-amber-800 hover:bg-amber-700 p-2 rounded-full transition-colors duration-300">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-amber-800 hover:bg-amber-700 p-2 rounded-full transition-colors duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/dimoss.in/" className="bg-amber-800 hover:bg-amber-700 p-2 rounded-full transition-colors duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
                        <div>
                            <h3 className="text-lg font-medium mb-4 border-b border-amber-700 pb-2 ">Quick Links</h3>
                            <ul className="space-y-2">
                                <Link to="/">
                                    <li><a className="text-amber-900 hover:text-amber-300 transition-colors duration-300 flex items-center">
                                        <span className="mr-2">→</span> Home
                                    </a></li> </Link>
                                <li>
                                    <Link to="/us">
                                        <a className="text-amber-900 hover:text-amber-300 transition-colors duration-300 flex items-center">
                                            <span className="mr-2">→</span> About Us
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div >
                            <h3 className="text-lg font-medium mb-4 border-b border-amber-900 pb-2">Contact Us</h3>
                            <address className="text-amber-900 not-italic space-y-2">
                                <div className="space-y-2">
                                    <p className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <a href="https://maps.app.goo.gl/1J4bruFtyfUtYhLL6" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors duration-300">
                                            Sarafa Bazar, Karnal, Haryana
                                        </a>
                                    </p>
                                    <p className="flex items-center" >
                                        <Mail className="w-5 h-5 mr-2" />
                                        <a href="mailto:avdeshb@hotmail.com" className="hover:text-amber-300 transition-colors duration-300">
                                            avdeshb@hotmail.com
                                        </a>
                                    </p>
                                    <p className="flex items-center">
                                        <Phone className="w-5 h-5 mr-2" />
                                        <a href="tel:+917027701770" className="hover:text-amber-300 transition-colors duration-300">
                                            +91 702 770 1770
                                        </a>
                                    </p>
                                </div>
                            </address>
                        </div>
                    </div>
                </div>
                <div className="border-t border-amber-400 mt-10 pt-6 text-center text-amber-300">
                    <p className="flex items-center justify-center">
                        <Copyright className="w-4 h-4 mr-1" /> {new Date().getFullYear()} Dimoss Jewelry. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer