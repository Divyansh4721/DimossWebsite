import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';


const DimossJewelryCatalog = () => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchData() {
        const response = await fetch('https://stock.divyanshbansal.com/dimoss-website');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
        firstRender.current = false;
    }
    if (firstRender.current) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    let result = products;

    // Apply search
    if (searchTerm) {
      result = result.filter(product =>
        product.index.toString().includes(searchTerm) ||
        product.tag.toString().includes(searchTerm) ||
        product.ornament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.remark && product.remark.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.ornamentType) {
      result = result.filter(product =>
        product.ornament.name === filters.ornamentType
      );
    }

    if (filters.purity) {
      result = result.filter(product =>
        product.purity.name === filters.purity
      );
    }

    if (filters.inStock) {
      result = result.filter(product => product.isInStock);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, filters, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    setSelectedProduct(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const ornamentTypes = [...new Set(products.map(p => p.ornament.name))];
  const purityTypes = [...new Set(products.map(p => p.purity.name))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif font-bold">Dimoss</h1>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          <p className="mt-2 text-amber-100 italic">Exquisite Jewelry Collection</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by ID, type or remark..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.ornamentType}
                onChange={(e) => setFilters({ ...filters, ornamentType: e.target.value })}
              >
                <option value="">All Types</option>
                {ornamentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.purity}
                onChange={(e) => setFilters({ ...filters, purity: e.target.value })}
              >
                <option value="">All Purity</option>
                {purityTypes.map(purity => (
                  <option key={purity} value={purity}>{purity}K</option>
                ))}
              </select>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  className="mr-2 h-4 w-4 text-amber-600 focus:ring-amber-500"
                  checked={filters.inStock}
                  onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                />
                <label htmlFor="inStock">In Stock Only</label>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
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
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative pt-[100%] bg-gray-100">
                      <img
                        src={`https://stock.divyanshbansal.com/uploads/${product.stockImage[0].fileName}`}
                        alt={`Jewelry item ${product.index}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {!product.isInStock && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{product.prefix.name}-{product.index}</h3>
                        <span className="text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          {product.ornament.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <p>Weight: {product.netWt}g | Purity: {product.purity.name}K</p>
                        {product.stoneWt > 0 && (
                          <p>Stone: {product.stoneWt}g</p>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-amber-600 font-bold">{formatPrice(product.sellingPrice)}</p>
                        {product.remark && (
                          <p className="text-xs text-gray-500">{product.remark}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first page, last page, current page, and pages adjacent to current page
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
                          className={`px-3 py-2 rounded-md ${currentPage === page
                            ? 'bg-amber-500 text-white'
                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-medium">Product Details</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={`https://stock.divyanshbansal.com/uploads/${selectedProduct.stockImage[0].fileName}`}
                  alt={`Jewelry item ${selectedProduct.index}`}
                  className="w-full h-auto object-contain aspect-square"
                />
              </div>

              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-semibold">{selectedProduct.prefix.name}-{selectedProduct.index}</h3>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                      {selectedProduct.ornament.name}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">{selectedProduct.remark}</p>
                </div>

                <div className="mb-6">
                  <p className="text-3xl font-bold text-amber-600">{formatPrice(selectedProduct.sellingPrice)}</p>
                  <p className="text-sm text-gray-500 mt-1">Including taxes</p>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-medium">Specifications:</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <p className="text-gray-600">Gross Weight:</p>
                    <p>{selectedProduct.grossWt}g</p>

                    <p className="text-gray-600">Net Weight:</p>
                    <p>{selectedProduct.netWt}g</p>

                    <p className="text-gray-600">Stone Weight:</p>
                    <p>{selectedProduct.stoneWt}g</p>

                    <p className="text-gray-600">Purity:</p>
                    <p>{selectedProduct.purity.name}K</p>

                    <p className="text-gray-600">Type:</p>
                    <p>{selectedProduct.stockType.name}</p>

                    <p className="text-gray-600">Status:</p>
                    <p className={selectedProduct.isInStock ? "text-green-600" : "text-red-600"}>
                      {selectedProduct.isInStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>

                {selectedProduct.stoneTable && selectedProduct.stoneTable.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Stone Details:</h4>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Weight (ct)</th>
                          <th className="px-4 py-2 text-left">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProduct.stoneTable.map((stone, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="px-4 py-2">{stone.type.name}</td>
                            <td className="px-4 py-2">{stone.ctWeight}</td>
                            <td className="px-4 py-2">{formatPrice(stone.sellRate)}/ct</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-8">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedProduct.isInStock}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${selectedProduct.isInStock
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-gray-400 cursor-not-allowed'
                      }`}
                  >
                    <ShoppingBag size={20} className="mr-2" />
                    {selectedProduct.isInStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-serif font-bold mb-4">Dimoss</h2>
              <p className="text-gray-400 max-w-md">
                Discover our exquisite collection of handcrafted jewelry pieces,
                designed to celebrate life's most precious moments.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Catalog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Contact Us</h3>
                <address className="text-gray-400 not-italic">
                  <p>123 Jewelry Lane</p>
                  <p>Karnal, Haryana</p>
                  <p className="mt-2">info@dimoss.com</p>
                  <p>+91 98765 43210</p>
                </address>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Dimoss Jewelry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DimossJewelryCatalog;