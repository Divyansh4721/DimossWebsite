import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Catalog/Header';
import Footer from './Catalog/Footer';
import WhatsappBubble from './Catalog/WhatsappBubble';
const DimossJewelleryCollections = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // Add your custom image paths here
    const [categories, setCategories] = useState([
        {
            id: 'womens-ring',
            name: "Women's Ring",
            code: 'LR',
            image: null,
            customImage: '/assets/categories/WomenRing.png' // Replace with your actual path
        },
        {
            id: 'kangan',
            name: 'Kangan',
            code: 'KADE',
            image: null,
            customImage: '/assets/categories/Kangan.png' // Replace with your actual path
        },
        {
            id: 'Earrings',
            name: 'Earrings',
            code: 'B.BALI',
            image: null,
            customImage: '/assets/categories/Earrings.png' // Replace with your actual path
        },
        {
            id: 'bracelet',
            name: 'Bracelet',
            code: 'BCLT',
            image: null,
            customImage: '/assets/categories/Bracelets.png' // Replace with your actual path
        },
        {
            id: 'nose-pin',
            name: 'Nose Pin',
            code: 'NP',
            image: null,
            customImage: '/assets/categories/Nose-pin.png' // Replace with your actual path
        },
        {
            id: 'pendant',
            name: 'Pendant',
            code: 'PDL',
            image: null,
            customImage: '/assets/categories/pendant.png' // Replace with your actual path
        },
        {
            id: 'tops',
            name: 'Tops',
            code: 'TOPS',
            image: null,
            customImage: '/assets/categories/tops.png' // Replace with your actual path
        },
        {
            id: 'mans-ring',
            name: "Man's Ring",
            code: 'GR',
            image: null,
            customImage: '/assets/categories/Mansring.png' // Replace with your actual path
        },
        {
            id: 'set',
            name: 'Set',
            code: 'SET',
            image: null,
            customImage: '/assets/categories/set.png' // Replace with your actual path
        },
        {
            id: 'chain',
            name: 'Chain',
            code: 'CH',
            image: null,
            customImage: '/assets/categories/chain.png' // Replace with your actual path
        }
    ]);
    const firstRender = useRef(true);
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch('https://stock.divyanshbansal.com/dimoss-website');
                const data = await response.json();
                setProducts(data);
                setIsLoading(false);
                firstRender.current = false;
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        }
        if (firstRender.current) {
            fetchData();
        }
    }, []);
    // Find a representative image for each category as a backup
    // This will only be used if your custom images fail to load
    useEffect(() => {
        if (products.length > 0) {
            const updatedCategories = [...categories];
            // For each category, find a good representative product
            updatedCategories.forEach((category, index) => {
                // Find all matching products
                const matchingProducts = products.filter(product =>
                    product.ornament &&
                    product.ornament.name === category.code &&
                    product.stockImage &&
                    product.stockImage.length > 0
                );
                if (matchingProducts.length > 0) {
                    // Sort by price descending to get premium items (often better photos)
                    const sortedProducts = [...matchingProducts].sort((a, b) =>
                        b.sellingPrice - a.sellingPrice
                    );
                    // Prefer in-stock items
                    const inStockProducts = sortedProducts.filter(p => p.isInStock);
                    const bestProduct = inStockProducts.length > 0 ? inStockProducts[0] : sortedProducts[0];
                    updatedCategories[index] = {
                        ...category,
                        // Keep the fallback from API as secondary option if custom image fails
                        backupImage: `https://stock.divyanshbansal.com/uploads/${bestProduct.stockImage[0].fileName}`
                    };
                }
            });
            setCategories(updatedCategories);
        }
    }, [products]);
    const handleCategoryClick = (categoryCode) => {
        // Navigate to catalog page with the category filter
        navigate(`/catalog?category=${categoryCode}`);
    };
    // Handle image loading errors
    const handleImageError = (categoryId) => {
        setCategories(prevCategories =>
            prevCategories.map(cat =>
                cat.id === categoryId ?
                    { ...cat, customImageError: true } :
                    cat
            )
        );
    };
    return (
        <div className="min-h-screen bg-background-page flex flex-col">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className="container mx-auto px-4 py-8 flex-grow">
                <div className="flex items-center mb-8">
                    <div className="w-1.5 h-12 bg-brand-500 rounded-full mr-4"></div>
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-brand-800">Our Collections</h1>
                        <p className="text-brand-600">Explore our exquisite jewellery categories</p>
                    </div>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category.code)}
                                className="group cursor-pointer"
                            >
                                <div className="overflow-hidden rounded-lg bg-white shadow-md border border-brand-100 hover:shadow-lg transition-all duration-300 h-full">
                                    <div className="aspect-square relative overflow-hidden">
                                        {/* Image selection logic:
                                            1. Try custom image first
                                            2. If custom image fails, try API-sourced backup image
                                            3. If no images available, show fallback icon */}
                                        {category.customImage ? (
                                            <img
                                                src={category.customImageError ? (category.backupImage || '') : category.customImage}
                                                alt={category.name}
                                                onError={() => handleImageError(category.id)}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : category.backupImage ? (
                                            <img
                                                src={category.backupImage}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-brand-50">
                                                <div className="text-brand-300 text-4xl">
                                                    <i className="fas fa-gem"></i>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <div className="w-full p-4 text-white">
                                                <p className="text-sm font-medium">View Collection</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="font-serif text-xl font-medium text-brand-800">{category.name}</h3>
                                        <div className="w-12 h-0.5 bg-brand-500 mx-auto mt-2"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Promotional Banner */}
                <div className="mt-16 mb-8 rounded-lg overflow-hidden relative">
                    <div className="bg-gradient-to-r from-brand-700 to-brand-500 p-8 md:p-12">
                        <div className="max-w-3xl">
                            <h2 className="text-white text-2xl md:text-3xl font-serif font-semibold mb-4">Discover the Perfect Piece</h2>
                            <p className="text-white/90 mb-6">Explore our handcrafted collections, each piece telling its own unique story. Find the perfect jewellery to complement your style and occasion.</p>
                            <button
                                onClick={() => navigate('/catalog')}
                                className="bg-white text-brand-700 px-6 py-3 rounded-lg font-medium hover:bg-brand-50 transition-colors shadow-md"
                            >
                                Browse All Jewellery
                            </button>
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-brand-pattern opacity-10"></div>
                </div>
                {/* Collection Description */}
                <div className="my-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-serif font-semibold text-brand-800 mb-4">Crafted with Passion</h2>
                        <p className="text-brand-600 mb-4">
                            Each collection represents our commitment to exceptional craftsmanship and timeless designs.
                            From delicate everyday pieces to statement jewellery for special occasions,
                            our diverse collections cater to every style and preference.
                        </p>
                        <p className="text-brand-600">
                            Explore the collections above to discover pieces that resonate with your personal style,
                            or contact our jewellery experts for personalized recommendations.
                        </p>
                    </div>
                </div>
            </div>
            {/* Floating WhatsApp */}
            <WhatsappBubble />
            <Footer />
        </div>
    );
};
export default DimossJewelleryCollections;