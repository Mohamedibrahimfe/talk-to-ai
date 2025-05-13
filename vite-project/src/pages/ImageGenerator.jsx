import React, { useState } from "react";
import callImageGenerator from "../components/callImageGenerator";
import ErrorBoundary from "../components/ErrorBoundary";
import SEO from "../components/SEO";

const ImageGeneratorContent = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a description");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await callImageGenerator(prompt);

      if (response && response.url) {
        setGeneratedImage(response);
      } else {
        throw new Error("Failed to generate image");
      }
    } catch (err) {
      setError(err.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (downloadData) => {
    const link = document.createElement("a");
    link.href = downloadData.url;
    link.download = downloadData.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const metaData = {
    title: "CustomizedAIs | AI Image Generator",
    description: "Generate stunning images using AI technology. Enter a description and let our AI create unique images for you.",
    keywords: "AI image generator, image generation, AI art, custom images",
    image: generatedImage ? generatedImage.url : "",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "AI Image Generator",
      description: "Generate stunning images using AI technology. Enter a description and let our AI create unique images for you.",
      url: window.location.href,
      image: generatedImage ? generatedImage.url : "",
      mainEntity: {
        "@type": "ImageObject",
        contentUrl: generatedImage ? generatedImage.url : "",
        description: prompt,
        name: "Generated Image",
      }
    }
  }
  return (
    <div className="container mx-auto p-4 max-w-3xl" >
      <SEO title={metaData.title} description={metaData.description} image={metaData.image} keywords={metaData.keywords} schema={metaData.schema} />
      <div className="fixed top-0 left-0 mt-20 w-[400px] h-screen bg-white shadow-md p-4 rounded-md mb-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Image Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <textarea
              id="prompt"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your image description..."
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:ring-offset-2 transition-colors disabled:bg-gray-400 
                 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Image"
            )}
          </button>
          <button
            disabled
            onClick={() => handleDownload(generatedImage.download)}
            className="w-full text-center bg-green-500 text-white px-5 py-2 rounded-md 
                     hover:bg-green-600 transition-colors flex items-center 
                     justify-center gap-2"
            style={{ backgroundColor: generatedImage ? "" : "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download Image
          </button>
        </form>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )
      }

      {
        generatedImage && (
          <div className="mt-6 space-y-4">
            <img
              src={generatedImage.url}
              alt="Generated"
              className="max-w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        )
      }
    </div >
  );
};

const ImageGenerator = () => {
  return (
    <ErrorBoundary>
      <ImageGeneratorContent />
    </ErrorBoundary>
  );
};

export default ImageGenerator;
