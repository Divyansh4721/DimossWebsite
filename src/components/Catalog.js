import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Info, BookOpen, Target } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Header from './Catalog/Header';
import FilterBar from './Catalog/FilterBar';
import Footer from './Catalog/Footer';
const DimossJewelryCatalog = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    let firstRender = useRef(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://stock.divyanshbansal.com/dimoss-website');
                const data = await response.json();
                setProducts(data);
                firstRender.current = false;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        if (firstRender.current) {
            fetchData();
        }
    }, []);
    useEffect(() => {
        if (selectedProduct) {
            setSelectedImageIndex(0);
        }
    }, [selectedProduct]);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };
    const generateWhatsAppMessage = (product) => {
        if (!product) return '';
        const message = `Hi , I'm interested in this Jewelry product: Product ID: ${product.prefix.name}-${product.index}, Type: ${product.ornament.name}, Purity: ${product.purity.name}K, Price: ${product.sellingPrice}. Please provide more information.`;
        return encodeURIComponent(message);
    };
    return (
        <div className="min-h-screen bg-#fcf9f6-100">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <FilterBar
                location={location}
                products={products}
                onProductSelect={setSelectedProduct}
            />
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-sm">
                    <div className="bg-amber-50 rounded-lg max-w-5xl w-full h-full overflow-auto shadow-2xl transform animate-scaleIn">
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="h-10 w-1 bg-white rounded-full mr-3"></div>
                                <div>
                                    <h2 className="text-xl font-serif font-medium">{selectedProduct.ornament.name}</h2>
                                    <p className="text-amber-100 text-sm">Exclusive Collection</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col md:flex-row">
                            <div className="md:w-1/2 pr-0 md:pr-8 mb-6 md:mb-0">
                                <div className="relative bg-gradient-to-b from-amber-50 to-white rounded-xl overflow-hidden shadow-md group">
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={`https://stock.divyanshbansal.com/uploads/${selectedProduct.stockImage[selectedImageIndex].fileName}`}
                                            alt={`Jewelry item ${selectedProduct.index}`}
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {!selectedProduct.isInStock ? (
                                            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                Out of Stock
                                            </div>
                                        ) : (
                                            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                In Stock
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-2">
                                    {selectedProduct.stockImage.map((item, idx) => (
                                        <div
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImageIndex(idx);
                                            }}
                                            className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-300 
                                                ${idx === selectedImageIndex ? 'border-amber-500 shadow-md' : 'border-transparent hover:border-amber-300'}`}
                                        >
                                            <img
                                                src={`https://stock.divyanshbansal.com/uploads/${item.fileName}`}
                                                alt={`Jewelry item ${selectedProduct.index} view ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="border-b border-gray-200 pb-4 mb-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-3xl font-serif font-semibold text-gray-800">
                                            <span className="text-amber-600">{selectedProduct.prefix.name}</span>-{selectedProduct.index}
                                        </h3>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="flex items-baseline">
                                        <p className="text-3xl font-bold text-amber-600">{formatPrice(selectedProduct.sellingPrice)}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Including taxes & free shipping</p>
                                    <div className="flex items-center mt-3 text-sm">
                                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="text-gray-600">Estimated Delivery: <span className="text-gray-900 font-medium">3-4 Business Days</span></span>
                                    </div>
                                </div>
                                <div className="bg-amber-50 rounded-lg p-4 mb-6">
                                    <h4 className="font-medium text-amber-800 border-b border-amber-200 pb-2 mb-3 flex items-center">
                                        <Info className="h-5 w-5 mr-1" />
                                        Product Specifications
                                    </h4>
                                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-amber-300 mr-2"></div>
                                            <p className="text-gray-600">Gross Weight:</p>
                                        </div>
                                        <p className="font-medium">{selectedProduct.grossWt}g</p>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                                            <p className="text-gray-600">Net Weight:</p>
                                        </div>
                                        <p className="font-medium">{selectedProduct.netWt}g</p>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                                            <p className="text-gray-600">Stone Weight:</p>
                                        </div>
                                        <p className="font-medium">{selectedProduct.stoneWt}g</p>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-amber-600 mr-2"></div>
                                            <p className="text-gray-600">Purity:</p>
                                        </div>
                                        <p className="font-medium">{selectedProduct.purity.name}K</p>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-amber-700 mr-2"></div>
                                            <p className="text-gray-600">Type:</p>
                                        </div>
                                        <p className="font-medium">{selectedProduct.stockType.name}</p>
                                    </div>
                                </div>
                                {selectedProduct.stoneTable && selectedProduct.stoneTable.length > 0 && (
                                    <div className="bg-amber-10 rounded-lg p-4 mb-6">
                                        <h4 className="font-medium text-gray-800 border-b border-gray-200 pb-2 mb-3 flex items-center">
                                            <BookOpen className="h-5 w-5 mr-1 text-amber-600" />
                                            Stone Details
                                        </h4>
                                        <div className="overflow-hidden rounded-lg border border-gray-200">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gradient-to-r from-amber-100 to-amber-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-amber-800 font-medium">Type</th>
                                                        <th className="px-4 py-2 text-left text-amber-800 font-medium">Weight (ct)</th>
                                                        <th className="px-4 py-2 text-left text-amber-800 font-medium">Rate</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedProduct.stoneTable.map((stone, idx) => (
                                                        <tr key={idx} className="border-b hover:bg-amber-50 transition-colors">
                                                            <td className="px-4 py-3 font-medium">{stone.type.name}</td>
                                                            <td className="px-4 py-3">{stone.ctWeight}</td>
                                                            <td className="px-4 py-3 text-amber-700">{formatPrice(stone.sellRate)}/ct</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-6 bg-amber-50 rounded-lg p-4 border border-gray-300  flex flex-col sm:flex-row items-center gap-3">
                                    <div className="bg-amber-100 rounded-full p-3 mr-3">
                                        <Target className="h-6 w-6 text-amber-700" />
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-gray-800">Need Assistance?</h5>
                                        <p className="text-sm text-gray-600">Our jewelry experts are available to help</p>
                                    </div>
                                    <div className="flex gap-3 mt-3 sm:mt-0 sm:ml-auto">
                                        <a
                                            href={`https://wa.me/917404413382?text=${generateWhatsAppMessage(selectedProduct)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                                        >
                                            <i className="fa-brands fa-whatsapp text-3xl mr-2" /> Inquire
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <a
                href="https://wa.me/917404413382?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-[1000] transition-all duration-300 hover:scale-110"
            >
                <i className='fa-brands fa-whatsapp text-3xl' />
            </a>
            <Footer />
        </div>
    );
};
export default DimossJewelryCatalog;