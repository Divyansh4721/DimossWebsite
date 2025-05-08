import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Menu, Calendar, Info, BookOpen, Target, Facebook, Twitter, Instagram, MapPin, Mail, Phone, Copyright, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DimossJewelryCatalog = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  let firstRender = useRef(true);
  const [filters, setFilters] = useState({
    ornamentType: '',
    purity: '',
    inStock: false
  });
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://stock.divyanshbansal.com/dimoss-website');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
        firstRender.current = false;
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }
    if (firstRender.current) {
      fetchData();
    }
  }, []);
  
  // Handle filters from navigation state
  useEffect(() => {
    if (location.state && location.state.ornamentType) {
      setFilters(prev => ({
        ...prev,
        ornamentType: location.state.ornamentType
      }));
      // Clear the location state after using it to prevent reapplying filters on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    let result = products;
    if (searchTerm) {
      result = result.filter(product =>
        (product.index !== null && product.index.toString().includes(searchTerm)) ||
        (product.tag !== null && product.tag.toString().includes(searchTerm)) ||
        (product.ornament && product.ornament.name && product.ornament.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.remark && product.remark.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (filters.ornamentType) {
      result = result.filter(product =>
        product.ornament && product.ornament.name === filters.ornamentType
      );
    }
    if (filters.purity) {
      result = result.filter(product =>
        product.purity && product.purity.name === filters.purity
      );
    }
    if (filters.inStock) {
      result = result.filter(product => product.isInStock);
    }
    
    // Apply sorting based on selected option
    if (sortOption) {
      if (sortOption === 'price-asc') {
        result = [...result].sort((a, b) => a.sellingPrice - b.sellingPrice);
      } else if (sortOption === 'price-desc') {
        result = [...result].sort((a, b) => b.sellingPrice - a.sellingPrice);
      }
    }
    
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, filters, products, sortOption]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Reset selected image index when opening a new product
  useEffect(() => {
    if (selectedProduct) {
      setSelectedImageIndex(0);
    }
  }, [selectedProduct]);

  const toggleFavorite = (productId, event) => {
    event.stopPropagation();
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
      showToast("Added to favorites!");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('animate-fadeOut');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 2000);
  };
  
  // Generate WhatsApp inquiry message for selected product
  const generateWhatsAppMessage = (product) => {
    if (!product) return '';
    
    const message = `Hi Dimoss, I'm interested in this jewelry product: Product ID: ${product.prefix.name}-${product.index}, Type: ${product.ornament.name}, Purity: ${product.purity.name}K, Price: ${product.sellingPrice}. Please provide more information.`;
    
    return encodeURIComponent(message);
  };

  const ornamentTypes = [...new Set(products.map(p => p.ornament && p.ornament.name).filter(Boolean))];
  const purityTypes = [...new Set(products.map(p => p.purity && p.purity.name).filter(Boolean))];

  return (
    <div className="min-h-screen bg-#fcf9f6-100">
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
      <main className="container mx-auto px-4 py-8" id="products-section">
        <div className="bg-amber-50 p-6 rounded-lg shadow-md mb-8 transform transition-transform hover:shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 group">
              <input
                type="text"
                placeholder="Search by ID, type or remark..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 group-hover:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 group-hover:text-amber-500 transition-colors duration-300" size={20} />
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer hover:border-amber-300 transition-colors duration-300"
                value={filters.ornamentType}
                onChange={(e) => setFilters({ ...filters, ornamentType: e.target.value })}
              >
                <option value="">All Types</option>
                {ornamentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer hover:border-amber-300 transition-colors duration-300"
                value={filters.purity}
                onChange={(e) => setFilters({ ...filters, purity: e.target.value })}
              >
                <option value="">All Purity</option>
                {purityTypes.map(purity => (
                  <option key={purity} value={purity}>{purity}K</option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer hover:border-amber-300 transition-colors duration-300"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  className="mr-2 h-4 w-4 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  checked={filters.inStock}
                  onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                />
                <label htmlFor="inStock" className="cursor-pointer">In Stock Only</label>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gradient-to-b from-amber-500 to-amber-10 rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
                      <img
                        src={`https://stock.divyanshbansal.com/uploads/${product.stockImage[0].fileName}`}
                        alt={`Jewelry item ${product.index}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-800 group-hover:scale-110"
                      />
                      {!product.isInStock && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-800/50 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-900">
                        <div className="flex justify-between">
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium group-hover:text-amber-800 transition-colors">{product.prefix.name}-{product.index}</h3>
                        <span className="text-sm bg-amber-600 text-amber-50 px-2 py-0.5 rounded">
                          {product.ornament.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span>Net Weight: {product.netWt}g | </span>
                        {product.stoneWt > 0 && (
                          <span>Stone: {product.stoneWt}g</span>
                        )}
                        <p>Gross Weight: {product.grossWt}g | Purity: {product.purity.name}K</p>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-amber-600 font-bold">{formatPrice(product.sellingPrice)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      return page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);
                    })
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-3 py-2">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-md transition-all duration-300 ${currentPage === page
                            ? 'bg-amber-500 text-white transform scale-110'
                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-amber-300'
                            }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <ChevronRight size={18} />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-sm">
          <div className="bg-amber-50 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl transform animate-scaleIn">
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
                      <MessageCircle className="w-4 h-4 mr-2" /> Inquire About This Item
                    </a>
                    <a
                      href="https://wa.me/917404413382?text=Hi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      Chat Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* WhatsApp Floating Chat Button */}
      <a 
        href="https://wa.me/917404413382?text=Hi"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-40 transition-all duration-300 hover:scale-110"
      >
        <MessageCircle size={28} />
      </a>

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
    </div>
  );
};

export default DimossJewelryCatalog;