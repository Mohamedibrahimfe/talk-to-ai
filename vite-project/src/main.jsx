import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import './index.css'
import { MyAis } from "./pages/MyAis";
import ImageGenerator from "./pages/ImageGenerator";
import Blog from "./pages/Blog";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/chat/:aiId" element={<Home />} />
            <Route path="my-ais" element={<MyAis />} />
            <Route path="contact" element={<Contact />} />
            <Route path="generator" element={<ImageGenerator />} />
            <Route path="blog" element={<Blog />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);