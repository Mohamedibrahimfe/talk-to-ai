import React, { useState, useEffect } from "react";
import fetchDataFromAi from "../components/fetchDataFromAi";
import TypeWriter from "typewriter-effect";
import { useParams } from 'react-router-dom';

const Home = () => {
  const { aiId } = useParams();  // Add this line to get the aiId from URL params
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [selectedAI, setSelectedAI] = useState(null);

  useEffect(() => {
    const savedAI = localStorage.getItem('selectedAI');
    if (savedAI && aiId) {
      setSelectedAI(JSON.parse(savedAI));
    }
  }, [aiId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Combine the AI's specialized prompt with user input
      const fullPrompt = selectedAI
        ? `${selectedAI.prompt}${input}\nRemember to answer as a ${selectedAI.title} with expertise in ${selectedAI.expertise.join(', ')}.`
        : input;

      const response = await fetchDataFromAi(fullPrompt);

      setMessageHistory(prev => [...prev, {
        userInput: input,
        aiResponse: response,
        aiRole: selectedAI?.title
      }]);

      setInput("");
    } catch (err) {
      setError(err.message || "Failed to get response from AI");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {selectedAI && (
          <div className="flex flex-col gap-2 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedAI.icon}</span>
              <div>
                <h2 className="font-bold text-lg text-gray-800">{selectedAI.title}</h2>
                <p className="text-sm text-gray-600">{selectedAI.description}</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('selectedAI');
                  setSelectedAI(null);
                  setMessageHistory([]);
                }}
                className="ml-auto px-3 py-1 text-sm text-gray-500 hover:text-gray-700 
                           hover:bg-gray-200 rounded-md transition-colors"
              >
                Change AI
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedAI.expertise?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {selectedAI ? `Ask ${selectedAI.title}` : 'How can I help you?'}
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-blue-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Type your message here..."
            required
            autoFocus
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Update Message History Section */}
        <div className="mb-8 space-y-4">
          {messageHistory.map((message, index) => (
            <div key={index}>
              <div className="rounded-lg py-2">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-700">You:</span>
                  {" "}{message.userInput}
                </p>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-lg">
                {message.aiRole && (
                  <div className="flex items-center gap-2 text-gray-300  ">
                    <span className="text-sm font-medium">Expert: {message.aiRole}</span>
                    <div className="flex flex-wrap gap-1">
                      {message.expertise?.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <TypeWriter
                  onInit={(typewriter) => {
                    typewriter.typeString(message.aiResponse).start();
                  }}
                  options={{
                    delay: 20,
                    cursor: "",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <p className="flex items-center justify-center text-gray-800">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
