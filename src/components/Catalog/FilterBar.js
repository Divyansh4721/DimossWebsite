import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, ArrowUpDown, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
const FilterBar = ({ products, onProductSelect, dataLoaded }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        ornamentType: '',
        purity: '',
        inStock: true
    });
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const isInitialMount = useRef(true);
    const paramsApplied = useRef(false);
    const itemsPerPage = 16;
    useEffect(() => {
        if (dataLoaded && !paramsApplied.current) {
            const searchParams = new URLSearchParams(location.search);
            const categoryFromUrl = searchParams.get('category');
            const purityFromUrl = searchParams.get('purity');
            const inStockFromUrl = searchParams.get('inStock');
            const sortFromUrl = searchParams.get('sort');
            const searchFromUrl = searchParams.get('search');
            const pageFromUrl = searchParams.get('page');
            setFilters({
                ornamentType: categoryFromUrl || '',
                purity: purityFromUrl || '',
                inStock: inStockFromUrl === 'false' ? false : true
            });
            if (sortFromUrl) setSortOption(sortFromUrl);
            if (searchFromUrl) setSearchTerm(searchFromUrl);
            if (pageFromUrl) setCurrentPage(parseInt(pageFromUrl, 10));
            paramsApplied.current = true;
            isInitialMount.current = false;
        }
    }, [location.search, dataLoaded]);
    useEffect(() => {
        if (dataLoaded && !isInitialMount.current) {
            const searchParams = new URLSearchParams();
            if (filters.ornamentType) searchParams.set('category', filters.ornamentType);
            if (filters.purity) searchParams.set('purity', filters.purity);
            if (!filters.inStock) searchParams.set('inStock', 'false');
            if (sortOption) searchParams.set('sort', sortOption);
            if (searchTerm) searchParams.set('search', searchTerm);
            if (currentPage > 1) searchParams.set('page', currentPage.toString());
            const currentParams = new URLSearchParams(location.search);
            const productId = currentParams.get('product');
            if (productId) {
                searchParams.set('product', productId);
            }
            navigate(`/catalog?${searchParams.toString()}`, { replace: true });
        }
    }, [filters, sortOption, searchTerm, currentPage, navigate, location.search, dataLoaded]);
    useEffect(() => {
        if (products.length > 0) {
            products = [...products].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
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
        } else {
            result = [...result].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        }
        setFilteredProducts(result);
        if (!isInitialMount.current) {
            setCurrentPage(1);
        }
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
    const clearFilters = () => {
        setFilters({
            ornamentType: '',
            purity: '',
            inStock: true
        });
        setSortOption('');
        setSearchTerm('');
    };
    const handleProductSelect = (product) => {
        onProductSelect(product);
    };
    const ornamentTypes = [...new Set(products.map(p => p.ornament && p.ornament.name).filter(Boolean))];
    const purityTypes = [...new Set(products.map(p => p.purity && p.purity.name).filter(Boolean))];
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
    const activeFiltersCount = (
        (filters.ornamentType ? 1 : 0) +
        (filters.purity ? 1 : 0) +
        (filters.inStock ? 0 : 1) +
        (sortOption ? 1 : 0)
    );
    return (
        <div className="container mx-auto px-4 py-8" id="products-section">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                <div className="lg:hidden flex items-center justify-between mb-4">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="flex items-center space-x-2 bg-white text-brand-800 border border-brand-200 px-4 py-2 rounded-lg shadow-sm hover:bg-brand-50 transition-colors"
                    >
                        <Filter size={18} />
                        <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                    </button>
                    <div className="relative w-full max-w-xs ml-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-brand-500" size={18} />
                    </div>
                </div>
                <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`absolute top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex items-center justify-between p-4 border-b border-brand-100">
                            <h2 className="text-lg font-medium text-brand-800">Filters</h2>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="p-1 rounded-full hover:bg-brand-50 text-brand-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 70px)' }}>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-9 pr-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-brand-500" size={18} />
                            </div>
                            <div className="space-y-6">
                                {renderFilterOptions()}
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-100 bg-white">
                            <div className="flex space-x-3">
                                <button
                                    onClick={clearFilters}
                                    className="flex-1 py-2 border border-brand-300 rounded-lg text-brand-700 hover:bg-brand-50 transition-colors"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="flex-1 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-brand-100 sticky top-24">
                        <div className="p-4 border-b border-brand-100">
                            <h2 className="text-lg font-medium text-brand-800">Filters</h2>
                            {activeFiltersCount > 0 && (
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-brand-600">{activeFiltersCount} active filters</span>
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs text-brand-700 hover:text-brand-500 font-medium"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-9 pr-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-brand-500" size={18} />
                            </div>
                            <div className="space-y-6">
                                {renderFilterOptions()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 mt-6 lg:mt-0">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-medium text-brand-800">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                            {filters.ornamentType && (
                                <span className="text-brand-500 ml-2">
                                    in {getCategoryDisplayName(filters.ornamentType)}
                                </span>
                            )}
                        </h2>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-brand-600 hidden sm:inline">Sort by:</span>
                            <select
                                className="border border-brand-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer bg-white"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="">Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
                        </div>
                    ) : (
                        <>
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-brand-100">
                                    <p className="text-brand-600 text-lg mb-2">No products found</p>
                                    <p className="text-brand-500 text-sm">Try adjusting your filters or search terms</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {currentItems.map((product) => (
                                        <div
                                            key={product._id}
                                            className="bg-white rounded-lg overflow-hidden shadow-sm border border-brand-100 transition-all duration-300 hover:shadow-md hover:border-brand-300 cursor-pointer"
                                            onClick={() => handleProductSelect(product)}
                                        >
                                            <div className="relative pt-[100%] bg-neutral-100 overflow-hidden">
                                                <img
                                                    src={`https://stock.divyanshbansal.com/uploads/${product.stockImage[0].fileName}`}
                                                    alt={`Jewellery item ${product.index}`}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                                {!product.isInStock && (
                                                    <div className="absolute top-3 right-3 bg-danger text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                                        Out of Stock
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-medium text-brand-800">
                                                        {product.prefix.name}-{product.index}
                                                    </h3>
                                                    <span className="text-xs bg-brand-100 text-brand-800 px-2 py-1 rounded-full">
                                                        {getCategoryDisplayName(product.ornament.name)}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-brand-600 space-y-1">
                                                    <div className="hidden sm:block">
                                                        <p>Net Wt: {product.netWt}g {product.stoneWt > 0 && `| Stone Wt: ${product.stoneWt}g`}</p>
                                                        <p>Gross Wt: {product.grossWt}g | {product.purity.name}K</p>
                                                    </div>
                                                    <div className="sm:hidden space-y-1">
                                                        <p>Net Wt: {product.netWt}g</p>
                                                        <p>Gross Wt: {product.grossWt}g</p>
                                                        {product.stoneWt > 0 && <p>Stone Wt: {product.stoneWt}g</p>}
                                                        <p>Purity: {product.purity.name}K</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="text-brand-800 font-bold">{formatPrice(product.sellingPrice)}</p>
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
                                            className="flex items-center justify-center px-3 py-2 rounded-md border border-brand-200 bg-white text-brand-600 disabled:opacity-50 hover:bg-brand-50 transition-colors"
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
                                                        <span className="px-3 py-2 text-brand-600">...</span>
                                                    )}
                                                    <button
                                                        onClick={() => handlePageChange(page)}
                                                        className={`px-3 py-2 rounded-md transition-all duration-300 ${currentPage === page
                                                            ? 'bg-brand-500 text-white transform scale-105 shadow-sm'
                                                            : 'border border-brand-200 bg-white text-brand-600 hover:bg-brand-50'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                </React.Fragment>
                                            ))}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center justify-center px-3 py-2 rounded-md border border-brand-200 bg-white text-brand-600 disabled:opacity-50 hover:bg-brand-50 transition-colors"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
    function renderFilterOptions() {
        return (
            <>
                <div>
                    <h3 className="text-sm font-medium text-brand-800 mb-3">Jewellery Type</h3>
                    <div className="space-y-2 pr-2">
                        <label className="flex items-center text-sm text-brand-700 hover:text-brand-500 cursor-pointer">
                            <input
                                type="radio"
                                name="ornamentType"
                                checked={filters.ornamentType === ''}
                                onChange={() => setFilters({ ...filters, ornamentType: '' })}
                                className="h-4 w-4 text-brand-500 focus:ring-brand-500 mr-2"
                            />
                            All Types
                        </label>
                        {ornamentTypes.map(type => (
                            <label key={type} className="flex items-center text-sm text-brand-700 hover:text-brand-500 cursor-pointer">
                                <input
                                    type="radio"
                                    name="ornamentType"
                                    checked={filters.ornamentType === type}
                                    onChange={() => setFilters({ ...filters, ornamentType: type })}
                                    className="h-4 w-4 text-brand-500 focus:ring-brand-500 mr-2"
                                />
                                {getCategoryDisplayName(type)}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-brand-800 mb-3">Gold Purity</h3>
                    <div className="space-y-2">
                        <label className="flex items-center text-sm text-brand-700 hover:text-brand-500 cursor-pointer">
                            <input
                                type="radio"
                                name="purity"
                                checked={filters.purity === ''}
                                onChange={() => setFilters({ ...filters, purity: '' })}
                                className="h-4 w-4 text-brand-500 focus:ring-brand-500 mr-2"
                            />
                            All Purity
                        </label>
                        {purityTypes.map(purity => (
                            <label key={purity} className="flex items-center text-sm text-brand-700 hover:text-brand-500 cursor-pointer">
                                <input
                                    type="radio"
                                    name="purity"
                                    checked={filters.purity === purity}
                                    onChange={() => setFilters({ ...filters, purity: purity })}
                                    className="h-4 w-4 text-brand-500 focus:ring-brand-500 mr-2"
                                />
                                {purity}K
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-brand-800 mb-3">Availability</h3>
                    <label className="flex items-center text-sm text-brand-700 hover:text-brand-500 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.inStock}
                            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                            className="h-4 w-4 text-brand-500 focus:ring-brand-500 rounded mr-2"
                        />
                        In Stock Only
                    </label>
                </div>
                <div className="lg:hidden">
                    <h3 className="text-sm font-medium text-brand-800 mb-3">Sort By</h3>
                    <div className="space-y-2">
                        <label className="flex items-center text-sm text-brand-700 hover:text-brand-500 cursor-pointer">
                            <input
                                type="radio"
                                name="sortOption"
                                checked={sortOption === ''}
                                onChange={() => setSortOption('')}
                                className="h-4 w-4 text-brand-500 focus:ring-brand-500 mr-2"
                            />
                            Featured
                        </label>
                        <label className="flex items-center text-sm text-brand-700 hover:text-brand-500 cursor-pointer">
                            <input
                                type="radio"
                                name="sortOption"
                                checked={sortOption === 'price-asc'}
                                onChange={() => setSortOption('price-asc')}
                                className="h-4 w-4 text-brand-500 focus:ring-brand-500 mr-2"
                            />
                            Price: Low to High
                        </label>
                        <label className="flex items-center text-sm text-brand-700 hover:text-brand-500 cursor-pointer">
                            <input
                                type="radio"
                                name="sortOption"
                                checked={sortOption === 'price-desc'}
                                onChange={() => setSortOption('price-desc')}
                                className="h-4 w-4 text-brand-500 focus:ring-brand-500 mr-2"
                            />
                            Price: High to Low
                        </label>
                    </div>
                </div>
            </>
        );
    }
};
export default FilterBar;