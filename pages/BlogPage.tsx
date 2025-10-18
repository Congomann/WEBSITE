
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogPosts } from '../data';
import type { BlogPost } from '../types';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <article className="group flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <Link to={`/blog/${post.slug}`} className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
        </Link>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
                <p className="text-sm font-medium text-brand-gold">
                    <Link to={`/blog?category=${post.category}`} className="hover:underline">{post.category}</Link>
                </p>
                <Link to={`/blog/${post.slug}`} className="mt-2 block">
                    <h3 className="text-xl font-semibold text-brand-blue group-hover:text-brand-gold transition-colors">{post.title}</h3>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">{post.description}</p>
                </Link>
            </div>
            <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={post.authorImageUrl} alt={post.author} />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readTime} min read</span>
                    </div>
                </div>
            </div>
        </div>
    </article>
);

const BlogPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // FIX: Add explicit string[] type to prevent 'unknown' type errors during map operations.
    const categories: string[] = useMemo(() => [...new Set(blogPosts.map(p => p.category))], []);
    // FIX: Add explicit string[] type to prevent 'unknown' type errors during map operations.
    const tags: string[] = useMemo(() => [...new Set(blogPosts.flatMap(p => p.tags))], []);

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const categoryMatch = selectedCategory ? post.category === selectedCategory : true;
            const tagMatch = selectedTag ? post.tags.includes(selectedTag) : true;
            return categoryMatch && tagMatch;
        });
    }, [selectedCategory, selectedTag]);

    const handleClearFilters = () => {
        setSelectedCategory(null);
        setSelectedTag(null);
    };

    return (
        <div className="bg-brand-light">
            <SEO
                title="Insurance & Financial Blog | New Holland Financial Group, Des Moines, IA"
                description="Explore insightful articles on life insurance, retirement planning, and financial security from the experts at New Holland Financial Group in Des Moines, IA. Your trusted resource for financial guidance."
                keywords="insurance blog, financial planning tips, Des Moines financial advice, retirement strategies, life insurance guide, investment insights Iowa"
            />
            <header className="bg-brand-blue text-white py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold">Our Blog</h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Insights and advice from our team to help you navigate your financial journey.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="sticky top-28 p-6 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-brand-blue mb-4">Filter Posts</h2>
                            
                            <div>
                                <h3 className="font-semibold mb-2">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === category ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTag === tag ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {(selectedCategory || selectedTag) && (
                                <button onClick={handleClearFilters} className="mt-6 w-full text-center text-sm font-semibold text-red-600 hover:underline">
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Blog Posts */}
                    <div className="lg:w-3/4">
                        {filteredPosts.length > 0 ? (
                            <div className="grid gap-10 md:grid-cols-2">
                                {filteredPosts.map(post => (
                                    <BlogPostCard key={post.slug} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-brand-blue">No Posts Found</h3>
                                <p className="text-gray-600 mt-2">Try adjusting your filters or check back later for new content.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogPage;