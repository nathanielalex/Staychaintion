from transformers import AutoModelForCausalLM, AutoTokenizer, Trainer, TrainingArguments, pipeline
from datasets import load_dataset
import joblib

# Load dataset (Use Airbnb-related dataset or fine-tune with your data)
dataset = load_dataset("OpenAssistant/oasst1", split="train[:5%]")  # Load 5% of the dataset

# Load pre-trained model & tokenizer
model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# **Fix: Add a padding token**
tokenizer.pad_token = tokenizer.eos_token  # Use end-of-sequence token as pad token

# Tokenize dataset
def tokenize_function(examples):
    return tokenizer(examples["text"], truncation=True, padding="max_length", max_length=128)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Training Arguments
training_args = TrainingArguments(
    output_dir="./chatbot_model",
    evaluation_strategy="epoch",
    learning_rate=5e-5,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    num_train_epochs=3,
    weight_decay=0.01,
    save_total_limit=1,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets,
)

# Train the chatbot model
trainer.train()

# Save the trained model
model.save_pretrained("stayai_model")
tokenizer.save_pretrained("stayai_model")
joblib.dump(model, "stayai_model.pkl")

print("✅ Chatbot Model Training Completed!")
