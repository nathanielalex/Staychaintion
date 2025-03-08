import { ChatbotMessage, _SERVICE } from "@/declarations/Chatbot/Chatbot.did";
import { Chatbot_backend } from "@/declarations/Chatbot";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from "@ic-reactor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [avalilabeData, setAvalilabeData] = useState<{ products: string; properties: string; }>({products: '', properties: ''});
  const [prompt, setPrompt] = useState<string>("");
  const [modelProvider, setModelProvider] = useState<GoogleGenerativeAI>();
  const [model, setModel] = useState<GenerativeModel>();
  const [chosenModel, setChosenModel] = useState<string>("gemini-1.5-flash");
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { identity } = useAuth();
  
  const getMessages = async() => {
    setIsLoading(true);
    try {
      const principal = identity?.getPrincipal();
      const _messages = await Chatbot.
      setMessages(_messages);
    } catch (err) {
      
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMessages();
    setModelProvider(new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? ''));  
  }, []);

  useEffect(() => {
    setModel(modelProvider?.getGenerativeModel({ model: chosenModel }));
  }, [chosenModel]);

  const fetchAvailableData = async() => {

  };

  const onSend = async() => {
    setIsMessageLoading(true);
    try {
      const message = `
        ${prompt}

        Based on the user's request, recommend the best properties for rent and suitable products to buy for their trip.

        ### **Available Data**
        - **Properties**: A list of properties available for rent.
          ${JSON.stringify(avalilabeData.properties)}
        - **Products**: Products to purchase that may be useful for the trip.
          ${JSON.stringify(avalilabeData.products)}

        ### **Response Format (JSON)**
        Respond in JSON format with the following structure:
        \`\`\`json
        {
          "message": "string", // Intuitive and friendly response explaining the recommended properties.
          "considerations": ["string"], // Key considerations for choosing these properties.
          "pros": ["string"], // Positive aspects of the recommended properties.
          "cons": ["string"], // Negative aspects of the recommended properties.
          "recommended_properties": [
            {
              "id": "string",
              "name": "string",
              "coverPicture": "string",
              "price_per_night": number
            }
          ], // Recommended properties based on the provided prompt and information.
          "recommended_products": [
            {
              "id": "string",
              "name": "string",
              "coverPicture": "string",
              "price": number
            }
          ] // Recommended products based on the trip requirements and what user has.
        }
        \`\`\`

        Ensure your response is **structured, concise, and highly relevant to the user's request**.\n
        Ensure the response is a valid JSON object and nothing else. Do not include any explanations, markdown, or extra text outside of the JSON object.\n
        Only respond with available data. If no data is available, respond with a suggestion to the user in the message field, and leave the rest emtpy.
      `
      const resp = await model?.generateContent(message);

      const newResp = JSON.parse(resp?.response.text()!);

      setMessages(msgs => [...msgs, newResp])
    } catch (err) {
      
    } finally {
      setIsMessageLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <h2 className="text-lg font-bold mb-2">Staychaintion AI Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 rounded-md">
        {messages.map((msg, index) => (
          <div>
            <div key={index} className="text-right text-blue-600">
              <span className="px-3 py-1 rounded-lg bg-blue-100">
                {msg.prompt}
              </span>
            </div>
            <div key={index} className="p-2 my-1 text-gray-700">
              <span className="px-3 py-1 rounded-lg bg-gray-200">
                {msg.response.message}
                <strong>Considerations:</strong>
                <ol>
                  {msg.response.considerations.map((consideration, index) => (
                    <li key={index}>{consideration}</li>
                  ))}
                </ol>
                <strong>Pros:</strong>
                <ol>
                  {msg.response.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ol>
                <strong>Cons:</strong>
                <ol>
                  {msg.response.cons.map((cons, index) => (
                    <li key={index}>{cons}</li>
                  ))}
                </ol>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded-md"
          // value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button onClick={onSend} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
