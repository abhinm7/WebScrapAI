const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
const generateAnswer = async (content, question) => {
    try {
        const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

        const prompt = `You are a helpful assistant. Below is the text content scraped from a website.Please answer the user's question using ONLY the provided information.
        WEB CONTENT:${content}
        USER QUESTION:${question}`

        //generate answer using the scrapped content and question
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        //return the generated answer
        return text;

    } catch (err) {
        console.error("Gemini API error:", err.message);
        return "Too many requests, please try again later"
    }
}

module.exports = generateAnswer;