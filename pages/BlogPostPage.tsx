import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogPosts } from '../data';
import { useData } from '../contexts/DataContext';
import { Rss, Linkedin, Twitter, Facebook } from 'lucide-react';

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);
    const { advisors } = useData();
    
    if (!post) {
        return <Navigate to="/404" replace />;
    }
    
    const author = advisors.find(a => a.name === post.author);

    // Structured data for rich snippets in search results
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": post.imageUrl,
        "author": {
            "@type": "Person",
            "name": post.author,
            "url": author ? `https://www.newhollandfinancial.com/advisors/${author.id}` : "https://www.newhollandfinancial.com/advisors"
        },
        "publisher": {
            "@type": "Organization",
            "name": "New Holland Financial Group",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.newhollandfinancial.com/logo.png" // Replace with actual logo URL
            }
        },
        "datePublished": post.date,
        "dateModified": post.date
    };
    
    const shareUrl = `https://www.newhollandfinancial.com/#/blog/${post.slug}`;
    const shareTitle = encodeURIComponent(post.title);
    
    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}&summary=${encodeURIComponent(post.description)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    };


    return (
        <div className="bg-white">
            <SEO
                title={post.title}
                description={post.description}
                keywords={post.tags.join(', ')}
                structuredData={structuredData}
            />

            <main className="py-16 lg:py-24 bg-white antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                             <Link to="/blog" className="inline-flex items-center mb-6 text-sm font-semibold text-brand-blue hover:text-brand-gold">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                Back to Blog
                            </Link>
                            <address className="flex items-center mb-6 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                                    <img className="mr-4 w-16 h-16 rounded-full" src={post.authorImageUrl} alt={post.author} />
                                    <div>
                                        <Link to={author ? `/advisors/${author.id}` : '#'} rel="author" className="text-xl font-bold text-gray-900">{post.author}</Link>
                                        <p className="text-base text-gray-500">{post.authorTitle}</p>
                                        <p className="text-base text-gray-500">
                                            <time dateTime={post.date} title={new Date(post.date).toLocaleDateString()}>
                                                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </time>
                                            <span className="mx-2">&middot;</span>
                                            <span>{post.readTime} min read</span>
                                        </p>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-brand-blue lg:mb-6 lg:text-4xl">{post.title}</h1>
                        </header>
                        
                        <figure className="mb-8">
                            <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg shadow-lg" />
                        </figure>

                        <div className="prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                        <footer className="mt-12 pt-8 border-t">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                <div className="flex flex-wrap gap-2">
                                    <span className="font-semibold">Tags:</span>
                                    {post.tags.map(tag => (
                                        <Link key={tag} to={`/blog?tag=${tag}`} className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200">
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold">Share:</span>
                                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1DA1F2]"><Twitter size={20} /></a>
                                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0A66C2]"><Linkedin size={20} /></a>
                                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1877F2]"><Facebook size={20} /></a>
                                </div>
                            </div>
                        </footer>
                    </article>
                </div>
            </main>
        </div>
    );
};

export default BlogPostPage;
