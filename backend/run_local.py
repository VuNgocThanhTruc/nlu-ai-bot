from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import torch

# Initialize the FastAPI app
app = FastAPI()

# Define the input schema
class PromptRequest(BaseModel):
    prompt: str

# Load the model and tokenizer
base_model = "nluai/phogpt-ft-qna-qchv-2021-v2"
tokenizer = AutoTokenizer.from_pretrained(base_model, use_fast=True)
tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = "right"

quant_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=False
)

model = AutoModelForCausalLM.from_pretrained(
    base_model,
    quantization_config=quant_config,
    device_map={"": 0}
)

# Endpoint to generate responses from the model
@app.post("/generate")
def generate_text(request: PromptRequest):
    prompt = request.prompt
    input_ids = tokenizer(prompt, return_tensors="pt", truncation=True).input_ids.cuda()

    try:
        outputs = model.generate(
            input_ids=input_ids,
            max_new_tokens=100,
            num_return_sequences=1,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
        )
        result = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return {"response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to check the health of the application
@app.get("/health")
def health_check():
    return {"status": "ok"}
