import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Info, BookOpen, Target } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Header from './Catalog/Header';
import FilterBar from './Catalog/FilterBar';
import Footer from './Catalog/Footer';
import WhatsappBubble from './Catalog/WhatsappBubble';
const DimossJewelleryNewArrivals = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    let firstRender = useRef(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const getCategoryDisplayName = (code) => {
        switch (code) {
            case 'BCLT': return 'Bracelet';
            case 'B.BALI': return "Earrings";
            case 'GR': return "Men's Ring";
            case 'KADE': return "Kangan";
            case 'LR': return "Women's Ring";
            case 'NP': return 'Nose Pin';
            case 'PDL': return 'Pendant';
            case 'TOPS': return 'Tops';
            case 'SET': return 'Set';
            case 'CH': return 'Chain';
            case 'TIKA': return 'Tika';
            default: return code;
        }
    };
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch('https://stock.divyanshbansal.com/dimoss-website');
                const data = await response.json();
                const inStockProducts = data.filter(product => product.isInStock);
                const sortedProducts = [...inStockProducts].sort((a, b) => {
                    const dateA = new Date(a.createdDate || 0);
                    const dateB = new Date(b.createdDate || 0);
                    return dateB - dateA;
                });
                const newest = sortedProducts.slice(0, 20);
                setProducts(data);
                setNewArrivals(newest);
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
    useEffect(() => {
        if (selectedProduct) {
            setSelectedImageIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedProduct]);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };
    const generateWhatsAppMessage = (product) => {
        if (!product) return '';
        const message = `Hi, I'm interested in this Jewellery product:
Product ID: ${product.prefix.name}-${product.index}
Type: ${product.ornament.name}
Purity: ${product.purity.name}K
Price: ${product.sellingPrice}
Please provide more information.
https://dimoss.in/products/${product.index}`;
        return encodeURIComponent(message);
    };
    return (
        <div className="min-h-screen bg-background-page flex flex-col">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <div className="w-1.5 h-12 bg-brand-500 rounded-full mr-4"></div>
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-brand-800">New Arrivals</h1>
                        <p className="text-brand-600">Discover our latest jewellery</p>
                    </div>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
                    </div>
                ) : newArrivals.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-xl text-brand-700 mb-2">No new arrivals found</h3>
                        <p className="text-brand-600">Please check back soon for our latest products</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {newArrivals.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg overflow-hidden shadow-sm border border-brand-100 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setSelectedProduct(product)}
                            >
                                <div className="relative aspect-square overflow-hidden bg-white">
                                    <img
                                        src={`https://stock.divyanshbansal.com/uploads/${product.stockImage[0]?.fileName}`}
                                        alt={`Jewellery item ${product.index}`}
                                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-serif font-medium text-brand-800">
                                            <span className="text-brand-500">{product.prefix.name}</span>-{product.index}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-brand-600 mb-1">{getCategoryDisplayName(product.ornament.name)} • {product.purity.name}K</p>
                                    <p className="text-lg font-bold text-brand-700 mb-1">{formatPrice(product.sellingPrice)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-sm">
                    <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto shadow-xl transform animate-scaleIn">
                        <div className="bg-white sticky top-0 z-10 border-b border-brand-200 px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="w-1 h-8 bg-brand-500 rounded-full mr-3"></div>
                                <div>
                                    <h2 className="text-xl font-serif font-medium text-brand-800">{getCategoryDisplayName(selectedProduct.ornament.name)}</h2>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="p-2 rounded-full hover:bg-brand-50 text-brand-700 transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col md:flex-row">
                            <div className="md:w-1/2 pr-0 md:pr-8 mb-6 md:mb-0">
                                <div className="relative bg-white rounded-lg overflow-hidden border border-brand-100 shadow-sm">
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={`https://stock.divyanshbansal.com/uploads/${selectedProduct.stockImage[selectedImageIndex]?.fileName}`}
                                            alt={`Jewellery item ${selectedProduct.index}`}
                                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-2">
                                    {selectedProduct.stockImage.map((item, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 
                                                ${idx === selectedImageIndex ? 'border-brand-500 shadow-sm' : 'border-transparent hover:border-brand-300'}`}
                                        >
                                            <img
                                                src={`https://stock.divyanshbansal.com/uploads/${item.fileName}`}
                                                alt={`Jewellery item ${selectedProduct.index} view ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="border-b border-brand-100 pb-4 mb-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-serif font-semibold text-brand-800">
                                            <span className="text-brand-500">{selectedProduct.prefix.name}</span>-{selectedProduct.index}
                                        </h3>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="flex items-baseline">
                                        <p className="text-3xl font-bold text-brand-700">{formatPrice(selectedProduct.sellingPrice)}</p>
                                    </div>
                                    <p className="text-sm text-brand-600 mt-1">Including taxes & free shipping</p>
                                    <div className="flex items-center mt-3 text-sm">
                                        <Calendar className="h-5 w-5 text-brand-500 mr-2" />
                                        <span className="text-brand-600">
                                            Estimated Delivery: <span className="text-brand-800 font-medium">3-4 Business Days</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-background-page rounded-lg p-4 mb-6 border border-brand-100">
                                    <h4 className="font-medium text-brand-800 border-b border-brand-100 pb-2 mb-3 flex items-center">
                                        <Info className="h-5 w-5 mr-1 text-brand-500" />
                                        Product Specifications
                                    </h4>
                                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-brand-300 mr-2"></div>
                                            <p className="text-brand-600">Gross Weight:</p>
                                        </div>
                                        <p className="font-medium text-brand-800">{selectedProduct.grossWt}g</p>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-brand-400 mr-2"></div>
                                            <p className="text-brand-600">Net Weight:</p>
                                        </div>
                                        <p className="font-medium text-brand-800">{selectedProduct.netWt}g</p>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-brand-500 mr-2"></div>
                                            <p className="text-brand-600">Stone Weight:</p>
                                        </div>
                                        <p className="font-medium text-brand-800">{selectedProduct.stoneWt}g</p>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-brand-600 mr-2"></div>
                                            <p className="text-brand-600">Purity:</p>
                                        </div>
                                        <p className="font-medium text-brand-800">{selectedProduct.purity.name}K</p>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-brand-700 mr-2"></div>
                                            <p className="text-brand-600">Type:</p>
                                        </div>
                                        <p className="font-medium text-brand-800">{selectedProduct.stockType.name}</p>
                                    </div>
                                </div>
                                {selectedProduct.stoneTable && selectedProduct.stoneTable.length > 0 && (
                                    <div className="bg-background-page rounded-lg p-4 mb-6 border border-brand-100">
                                        <h4 className="font-medium text-brand-800 border-b border-brand-100 pb-2 mb-3 flex items-center">
                                            <BookOpen className="h-5 w-5 mr-1 text-brand-500" />
                                            Stone Details
                                        </h4>
                                        <div className="overflow-hidden rounded-lg border border-brand-100">
                                            <table className="w-full text-sm">
                                                <thead className="bg-brand-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-brand-700 font-medium">Type</th>
                                                        <th className="px-4 py-2 text-left text-brand-700 font-medium">Weight (ct)</th>
                                                        <th className="px-4 py-2 text-left text-brand-700 font-medium">Rate</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                    {selectedProduct.stoneTable.map((stone, idx) => (
                                                        <tr key={idx} className="border-b border-brand-50 hover:bg-brand-50 transition-colors">
                                                            <td className="px-4 py-3 font-medium text-brand-800">{stone.type.name}</td>
                                                            <td className="px-4 py-3 text-brand-700">{stone.ctWeight}</td>
                                                            <td className="px-4 py-3 text-brand-700">{formatPrice(stone.sellRate)}/ct</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-6 bg-white rounded-lg p-4 border border-brand-200 flex flex-col sm:flex-row items-center gap-3">
                                    <div className="bg-brand-50 rounded-full p-3 mr-3">
                                        <Target className="h-6 w-6 text-brand-500" />
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-brand-800">Ready to Purchase?</h5>
                                        <p className="text-sm text-brand-600">This item is in stock and ready to ship</p>
                                    </div>
                                    <div className="flex gap-3 mt-3 sm:mt-0 sm:ml-auto">
                                        <a
                                            href={`https://wa.me/917027701770?text=${generateWhatsAppMessage(selectedProduct)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-success hover:bg-success-dark text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                                        >
                                            <i className="fa-brands fa-whatsapp text-xl mr-2" /> Inquire Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <WhatsappBubble />
            <Footer />
        </div>
    );
};
export default DimossJewelleryNewArrivals;