import React, { useState, useEffect, useCallback } from "react";
import fetchDataFromAi from "./fetchDataFromAi";
import TypeWriter from "typewriter-effect";

const UiComponent = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessageHistory(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever messageHistory changes
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messageHistory));
  }, [messageHistory]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!input.trim() || loading) return; // Prevent empty submissions or multiple submissions

      setLoading(true);
      setError("");

      try {
        const response = await fetchDataFromAi(input);
        const newMessage = {
          userInput: input,
          aiResponse: response,
          timestamp: new Date().toISOString(),
        };

        setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
        setInput("");
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching the response."
        );
      } finally {
        setLoading(false);
      }
    },
    [input, loading]
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          How can I help you?
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            placeholder="Type your message here..."
            required
            autoFocus
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
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

        {/* Message History Section */}
        <div className="mb-8 space-y-4">
          {messageHistory.map((message, index) => (
            <div key={index} className="border-b pb-4">
              <div className="bg-gray-50 py-4 rounded-lg mb-2">
                <p className="text-gray-600">
                  <p className="font-semibold text-gray-700 inline-block">You:</p>
                  {" "}{message.userInput}
                </p>
              </div>
              <div className="bg-gray-600 text-white p-4 rounded-lg">
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

export default UiComponent;
