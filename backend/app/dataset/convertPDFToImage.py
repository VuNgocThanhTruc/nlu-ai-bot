from fastapi import UploadFile
import pytesseract
from pdf2image import convert_from_path
import os
from pathlib import Path

UPLOAD_DIR = Path("storage/pdf")
OUTPUT_DIR = Path("storage/txt")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def process_upload_file(file: UploadFile):
    file_location = UPLOAD_DIR / file.filename

    # Ghi tệp PDF vào hệ thống tệp
    with open(file_location, "wb") as file_object:
        file_object.write(await file.read())

    # Trích xuất văn bản từ tệp PDF
    text = extract_text_from_pdf(file_location)
    output_file_path = OUTPUT_DIR / f"{file_location.stem}.txt"
    
    # Ghi văn bản trích xuất vào tệp văn bản
    with open(output_file_path, "w") as output_file:
        output_file.write(text)
    
    # Đọc lại văn bản trích xuất từ tệp văn bản
    with open(output_file_path, "r") as output_file:
        extracted_text = output_file.read()

    return {"text": extracted_text}

def extract_text_from_pdf(pdf_path):
    images = convert_from_path(pdf_path, poppler_path='Release-24.02.0-0/poppler-24.02.0/Library/bin') # if using server remove this line 
    extracted_text = ""

    for image in images:
        pytesseract.pytesseract.tesseract_cmd = 'Tesseract-OCR/tesseract.exe'
        text = pytesseract.image_to_string(image, lang='vie')
        extracted_text += text + "\n\n"

    return extracted_text