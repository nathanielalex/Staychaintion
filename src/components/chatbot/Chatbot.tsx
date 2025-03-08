import { Chatbot_backend } from "@/declarations/Chatbot_backend";
import { ProductRecommendation, PropertyRecommendation, ChatbotMessage, ChatbotResponse } from "@/declarations/Chatbot_backend/Chatbot_backend.did";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from "@/utility/use-auth-client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import clsx from "clsx";
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";
import { Property_backend } from "@/declarations/Property_backend";
import { Product_backend } from "@/declarations/Product_backend";

const ProductRecommendationCard = ({recommendation}: {recommendation: ProductRecommendation}) => {

  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row space-y-2"
      onClick={() => {
        navigate('');
      }}
    >
      <img src={recommendation.coverPicture} />
      <div>
        <strong>{recommendation.name}</strong>
        <div>Rp. {Number(recommendation.price ?? 0).toLocaleString()}</div>
      </div>
    </div>
  );
}

const PropertyRecommendationCard = ({recommendation}: {recommendation: PropertyRecommendation}) => {

  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row space-y-2"
      onClick={() => {
        navigate('');
      }}
    >
      <img src={recommendation.coverPicture} />
      <div>
        <strong>{recommendation.name}</strong>
        <div>Rp. {Number(recommendation.price_per_night ?? 0).toLocaleString()}</div>
      </div>
    </div>
  );
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [avalilabeData, setAvalilabeData] = useState<{ products: string; properties: string; }>({products: '', properties: ''});
  const [prompt, setPrompt] = useState<string>("");
  const [modelProvider, setModelProvider] = useState<GoogleGenerativeAI>();
  const [model, setModel] = useState<GenerativeModel>();
  const [chosenModel, setChosenModel] = useState<string>("gemini-1.5-flash");
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { identity } = useAuth();
  const principal = identity?.getPrincipal();

  const init = async() => {
    try {
      setIsLoading(true);
      await Promise.all([
        fetchAvailableData,
        getMessages,
      ]);

      setModelProvider(new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? ''));  
      setModel(modelProvider?.getGenerativeModel({ model: chosenModel }));
    } catch (err) {
      toast.error("Error initiating chatbot.", {
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setModel(modelProvider?.getGenerativeModel({ model: chosenModel }));
  }, [chosenModel]);
  
  const getMessages = async() => {
    setIsLoading(true);
    try {
      const _messages = await Chatbot_backend.fetchMessages(principal!);
      setMessages(_messages);
    } catch (err) {
      toast.error("Error getting past messages.", {
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const fetchAvailableData = async() => {
    setIsLoading(true);
    try {
      const properties = await Promise.all(
        (await Property_backend.getAllProperties()).map(async (prop) => {
          const reviews = await Property_backend.getAllPropertyReviews(prop.id);
          return {
            ...prop,
            reviews,
          };
        })
      );

      const products = await Product_backend.getAllProducts();

      setAvalilabeData({properties: JSON.stringify(properties), products: JSON.stringify(products)});
    } catch (err) {
      toast.error("Error fetching available data.", {
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSend = async() => {
    
    setIsMessageLoading(true);
    try {
      if (!isError) {
        setMessages(msg => ([...msg, {user: principal!, prompt, response: []}]));
      } else {
        setIsError(false);
      }
      
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
      `;
      const resp = await model?.generateContent(message);

      const newResp: ChatbotResponse = JSON.parse(resp?.response.text()!);
      const msg: ChatbotMessage = {
        user: principal!,
        prompt: prompt,
        response: [newResp],
      }

      setMessages(msgs => 
        msgs.map((m, i) => 
          i === msgs.length - 1 ? msg : m
        )
      );
      Chatbot_backend.storeMessage(msg);
    } catch (err) {
      setIsError(true);
      setMessages(msgs => 
        msgs.map((m, i) => 
          i === msgs.length - 1 ? { ...m, response: {...m.response, message: 'Error getting a response.'} } : m
        )
      );
      toast.error(`Failed to access Chatbot: ${err}.`, {
        position: 'top-center',
      });
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
            <div key={index} className={clsx(
              "p-2 my-1 text-gray-700",
              {
                "!text-white bg-red-600": isError && index === messages.length - 1,
              }
            )}>
              <span className="px-3 py-1 rounded-lg bg-gray-200">
                {index === messages.length - 1 && isMessageLoading ? (<ReactLoading />) :
                  index === messages.length - 1 && isError ? (<div>{msg.response?.[0]?.message}</div>) :
                    (
                      <div>
                        <div>{msg.response?.[0]?.message}</div>
                        <strong>Considerations:</strong>
                        <ol>
                          {msg.response?.[0]?.considerations.map((consideration: string, index: number) => (
                            <li key={index}>{consideration}</li>
                          ))}
                        </ol>
                        <strong>Pros:</strong>
                        <ol>
                          {msg.response?.[0]?.pros.map((pro: string, index: number) => (
                            <li key={index}>{pro}</li>
                          ))}
                        </ol>
                        <strong>Cons:</strong>
                        <ol>
                          {msg.response?.[0]?.cons.map((cons: string, index: number) => (
                            <li key={index}>{cons}</li>
                          ))}
                        </ol>
                        <strong>Recommended Properties:</strong>
                        <div className="max-w-full min-w-full overflow-x-scroll">
                          {msg.response?.[0]?.recommended_properties.map((rec: PropertyRecommendation, idx: number) => (
                            <PropertyRecommendationCard recommendation={rec} key={idx} />
                          ))}
                        </div>
                        <strong>Recommended Products:</strong>
                        <div className="max-w-full min-w-full overflow-x-scroll">
                          {msg.response?.[0]?.recommended_products.map((rec: ProductRecommendation, idx: number) => (
                            <ProductRecommendationCard recommendation={rec} key={idx} />
                          ))}
                        </div>
                      </div>
                    )}
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

export default ChatbotPage;
