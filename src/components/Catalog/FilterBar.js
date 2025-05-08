import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
const FilterBar = ({ location, products, onProductSelect }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        ornamentType: '',
        purity: '',
        inStock: false
    });
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 20;
    useEffect(() => {
        if (location.state && location.state.ornamentType) {
            setFilters(prev => ({
                ...prev,
                ornamentType: location.state.ornamentType
            }));
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);
    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
            setFilteredProducts(products);
        }
    }, [products]);
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
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };
    const ornamentTypes = [...new Set(products.map(p => p.ornament && p.ornament.name).filter(Boolean))];
    const purityTypes = [...new Set(products.map(p => p.purity && p.purity.name).filter(Boolean))];
    return (
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
                                    onClick={() => onProductSelect(product)}
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
    );
};
export default FilterBar;