from fastapi import APIRouter, UploadFile, File
from app.dataset.convertPDFToImage import process_upload_file

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    return await process_upload_file(file)