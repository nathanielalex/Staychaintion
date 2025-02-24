// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "../../declarations/chatbot"; // Import dari deklarasi ICP
// import { canisterId } from "../../declarations/chatbot";

// const agent = new HttpAgent({ host: "http://127.0.0.1:4944" }); // Gunakan localhost untuk testing

// export const chatbotActor = Actor.createActor(idlFactory, {
//   agent,
//   canisterId,
// });

// export const sendChatMessage = async (message: string): Promise<string> => {
//   try {
//     const response = await chatbotActor.chat(message);
//     return response;
//   } catch (error) {
//     console.error("Error communicating with chatbot:", error);
//     return "Error: AI service unavailable.";
//   }
// };
