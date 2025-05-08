import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, ArrowRight } from 'lucide-react';

const DimossAboutUs = () => {
    return (
        <div className="min-h-screen bg-amber-50">
            {/* Header - Reuse your existing header component */}

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Section Title */}
                    <h2 className="text-3xl font-serif font-bold text-center text-amber-800 mb-8">About Our Shop</h2>

                    {/* Store Image */}
                    <div className="rounded-lg overflow-hidden shadow-xl mb-10">
                        <img
                            src="/assets/Dimoss.png"
                            alt="Dimoss Jewelry Store"
                            className="w-full h-100"
                        />
                    </div>

                    {/* Store Info Card */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4">
                            <h3 className="text-xl font-medium">Dimoss Ring Collection</h3>
                            <p className="text-amber-100 text-sm">Exquisite handcrafted rings for every occasion</p>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Location */}
                                <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                        <MapPin size={24} className="text-amber-700" />
                                    </div>
                                    <h4 className="font-medium text-amber-800 mb-2">Our Location</h4>
                                    <address className="not-italic text-gray-600">
                                        <p>Shop Number 845,</p>
                                        <p> Sarafa Bazar</p>
                                        <p>Karnal, Haryana, 132001</p>
                                        <p>India</p>
                                    </address>
                                </div>

                                {/* Opening Hours */}
                                <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                        <Clock size={24} className="text-amber-700" />
                                    </div>
                                    <h4 className="font-medium text-amber-800 mb-2">Opening Hours</h4>
                                    <div className="text-gray-600">
                                        <p>Monday - Saturday</p>
                                        <p>10:00 AM - 8:00 PM</p>
                                        <p>Sunday: 11:00 AM - 6:00 PM</p>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                        <Phone size={24} className="text-amber-700" />
                                    </div>
                                    <h4 className="font-medium text-amber-800 mb-2">Contact Us</h4>
                                    <div className="text-gray-600">
                                        <p className="flex items-center justify-center mb-1">
                                            <Mail size={14} className="mr-1" />
                                            <a
                                                href="mailto:avdeshb@hotmail.com"
                                                className="hover:text-amber-700 hover:underline transition-colors duration-300"
                                            >
                                                avdeshb@hotmail.com
                                            </a>
                                        </p>
                                        <p className="flex items-center justify-center">
                                            <Phone size={14} className="mr-1" />
                                            <a
                                                href="tel:+917027701770"
                                                className="hover:text-amber-700 hover:underline transition-colors duration-300"
                                            >
                                                +91 702 770 1770
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder - Replace with actual map component if available */}
                            <div className="mt-8 bg-gray-200 rounded-lg h-64 overflow-hidden">
                                <img
                                    src="/assets/Dimoss-Google-Maps.png"
                                    alt="Map to Dimoss Jewelry Store"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Call to Action Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://maps.app.goo.gl/1J4bruFtyfUtYhLL6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-300"
                                >
                                    <MapPin size={18} className="mr-2" />
                                    Get Directions
                                </a>
                                <Link
                                    to="/catalog"
                                    className="flex items-center justify-center border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg transition-colors duration-300"
                                >
                                    View Our Collection
                                    <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Brief Store Description */}
                    <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-medium text-amber-800 mb-4">Welcome to Dimoss</h3>
                        <p className="text-gray-700 mb-4">
                            Find your piece of delight Treat yourself with the finest gold and diamond jewellery at Dimoss! Crafted from precious metals and embellished with elegant stones, the jewel of your dreams awaits you. From festive and wedding pieces to men's jewellery and everyday designs, find countless pieces you can spoil yourself with.We specialise in the finest quality jewellery repairs, remodelling and custom designs, and offer a one-on-one, personalised design service with quality workmanship and attention to detail. Come visit the Karnal store.
                        </p>

                    </div>
                </div>
            </main>

            {/* Footer - Reuse your existing footer component */}
        </div>
    );
};

export default DimossAboutUs;