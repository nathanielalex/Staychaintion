from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

# Load trained model
model_name = "stayai_model"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Create chatbot pipeline
chatbot = pipeline("text-generation", model=model, tokenizer=tokenizer)

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_ai(request: ChatRequest):
    response = chatbot(request.message, max_length=100, num_return_sequences=1)
    return {"response": response[0]["generated_text"]}
