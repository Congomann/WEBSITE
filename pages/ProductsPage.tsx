import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

const ProductsPage: React.FC = () => {
    const { products } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter products based on search term (name or description)
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-brand-light">
            <SEO
                title="Shop"
                description="Shop for exclusive New Holland Financial Group merchandise and resources."
                keywords="financial planning merchandise, insurance resources, financial books"
            />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Our Shop</h1>
                    <p className="text-lg text-gray-300 mt-2">
                        Invest in your financial literacy with our curated products and resources.
                    </p>
                </div>
            </section>
            <section className="py-20">
                <div className="container mx-auto px-6">
                    {/* Search Bar */}
                    <div className="mb-12 max-w-2xl mx-auto">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            <input
                                type="search"
                                placeholder="Search products by name or description..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                aria-label="Search products"
                            />
                        </div>
                    </div>
                    
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-16">
                            <p className="text-xl text-gray-600 mb-6">
                                {products.length > 0 
                                    ? `No products found for "${searchTerm}".`
                                    : "There are currently no products available in the shop."
                                }
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;