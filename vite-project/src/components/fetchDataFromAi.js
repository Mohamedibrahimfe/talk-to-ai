import { GoogleGenerativeAI } from "@google/generative-ai";
import React from "react";
const fetchDataFromAi = async (input) => {
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_API_URL
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = input;
  const result = await model.generateContent(prompt);
  return result.response.text();
};
export default fetchDataFromAi;
