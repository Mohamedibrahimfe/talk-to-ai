import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import fetchDataFromAi from "../components/fetchDataFromAi";
import SEO from "../components/SEO";
export const MyAis = () => {
    const navigate = useNavigate();
    const [customChats, setCustomChats] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newChat, setNewChat] = useState({ title: '', description: '', expertise: '' });

    const aiProfiles = [
        {
            id: 1,
            title: "Senior Web Developer",
            description: "Expert in full-stack development, architecture, and best practices",
            expertise: ["React", "Node.js", "System Design", "Performance Optimization"],
            icon: "👨‍💻",
            prompt: "You are a senior web developer with expertise in React, Node.js, and system design. Please help with the following: "
        },
        {
            id: 2,
            title: "Software Architect",
            description: "Specialized in system design, scalability, and enterprise architecture",
            expertise: ["Architecture Patterns", "Microservices", "Cloud Solutions", "Security"],
            icon: "🏗️",
        },
        {
            id: 3,
            title: "DevOps Engineer",
            description: "Expert in CI/CD, cloud infrastructure, and deployment strategies",
            expertise: ["Docker", "Kubernetes", "AWS", "Pipeline Automation"],
            icon: "🔄",
        },
        {
            id: 4,
            title: "UI/UX Designer",
            description: "Focused on user experience, interface design, and accessibility",
            expertise: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
            icon: "🎨",
        }
    ];

    const handleChat = async (profile) => {
        try {
            const aiData = {
                id: profile.id,
                title: profile.title,
                description: profile.description,
                expertise: profile.expertise,
                icon: profile.icon,
                prompt: `You are an AI specialized as a ${profile.title}. 
                        Your expertise includes: ${profile.expertise.join(', ')}. 
                        ${profile.description}
                        Please provide detailed, expert-level responses in this context.
                        Remember to maintain the perspective of a ${profile.title} throughout the conversation.
                        Question: `
            };
            
            localStorage.setItem('selectedAI', JSON.stringify(aiData));
            navigate(`/chat/${profile.id}`);
            
        } catch (error) {
            console.error('Chat error:', error);
        }
    };

    const handleAddCustomChat = (e) => {
        e.preventDefault();
        const newCustomChat = {
            id: Date.now(),
            ...newChat,
            expertise: newChat.expertise.split(',').map(item => item.trim()),
            icon: "🤖"
        };
        setCustomChats([...customChats, newCustomChat]);
        setNewChat({ title: '', description: '', expertise: '' });
        setShowAddForm(false);
    };

        const metaData = {
        title: "My AIs | CustomIzeD AIs",
        description: "Explore and interact with specialized AI assistants tailored for various domains.",
        keywords: "AI assistants, custom AI, specialized AI, web development, software architecture",
        image: "https://example.com/image.jpg",
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "My AIs",
            "description": "Explore and interact with specialized AI assistants tailored for various domains.",
            "url": window.location.href,
            "image": "https://example.com/image.jpg",
            "mainEntity": {
                "@type": "WebSite",
                "name": "CustomIzeD AIs",
                "url": window.location.origin,
                "description": "Explore and interact with specialized AI assistants tailored for various domains."
            }}
        }
    return (
        <div className="container mx-auto px-4 py-8">
            <SEO title={metaData.title} description={metaData.description} keywords={metaData.keywords} image={metaData.image} schema={metaData.schema}/>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Specialized AI Assistants</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    Add Custom AI
                </button>
            </div>

            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <form onSubmit={handleAddCustomChat} className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Add Custom AI Assistant</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newChat.title}
                                    onChange={(e) => setNewChat({ ...newChat, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={newChat.description}
                                    onChange={(e) => setNewChat({ ...newChat, description: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Expertise (comma-separated)</label>
                                <input
                                    type="text"
                                    value={newChat.expertise}
                                    onChange={(e) => setNewChat({ ...newChat, expertise: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...aiProfiles, ...customChats].map((profile) => (
                    <div
                        key={profile.id}
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                        <div className="flex-grow">
                            <div className="text-4xl mb-4 text-center">{profile.icon}</div>
                            <h2 className="text-xl font-bold mb-3 text-center">{profile.title}</h2>
                            <p className="text-gray-600 mb-4">{profile.description}</p>
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Expertise:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.expertise.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleChat(profile)}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                                     transition-colors duration-200 flex items-center justify-center gap-2 mt-4"
                        >
                            <span>Chat with {profile.title}</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};