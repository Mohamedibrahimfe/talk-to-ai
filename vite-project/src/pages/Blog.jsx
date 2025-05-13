import React from 'react';
import SEO from '../components/SEO';

const blogPosts = [
    {
        id: 1,
        title: "Getting Started with AI Development",
        excerpt: "Learn the fundamentals of AI development and how to get started with building your own AI applications.",
        date: "2025-05-13",
        category: "Artificial Intelligence",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "The Future of Custom AI Solutions",
        excerpt: "Explore how customized AI solutions are shaping the future of various industries and businesses.",
        date: "2025-05-12",
        category: "Technology Trends",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "Best Practices for AI Image Generation",
        excerpt: "Discover the top techniques and best practices for generating high-quality AI images.",
        date: "2025-05-11",
        category: "Image Generation",
        readTime: "6 min read"
    }
];

const Blog = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "CustomIzeD AIs Blog",
        "description": "Explore the latest insights, tutorials, and trends in AI development, custom AI solutions, and image generation.",
        "publisher": {
            "@type": "Organization",
            "name": "CustomIzeD AIs",
            "url": window.location.origin
        },
        "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "articleSection": post.category,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${window.location.origin}/blog/${post.id}`
            }
        }))
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <SEO 
                title="AI Development Blog | CustomIzeD AIs"
                description="Explore the latest insights, tutorials, and trends in AI development, custom AI solutions, and image generation."
                keywords="AI development, custom AI, image generation, artificial intelligence, machine learning"
                schema={schema}
            />
            
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">AI Development Blog</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Stay updated with the latest insights, tutorials, and trends in AI development
                </p>
            </header>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map(post => (
                    <article 
                        key={post.id} 
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        itemScope 
                        itemType="https://schema.org/BlogPosting"
                    >
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                                <span className="text-gray-500 text-sm ml-4">{post.readTime}</span>
                            </div>
                            
                            <h2 
                                className="text-xl font-semibold mb-3 text-gray-800 hover:text-blue-600"
                                itemProp="headline"
                            >
                                {post.title}
                            </h2>
                            
                            <p className="text-gray-600 mb-4" itemProp="description">
                                {post.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <time 
                                    className="text-sm text-gray-500"
                                    itemProp="datePublished"
                                    dateTime={post.date}
                                >
                                    {post.date}
                                </time>
                                <button 
                                    className="text-blue-600 hover:text-blue-900 font-medium transition-colors duration-200"
                                    aria-label={`Read more about ${post.title}`}
                                >
                                    Read More →
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Blog;