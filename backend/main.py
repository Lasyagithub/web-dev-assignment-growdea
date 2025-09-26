from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import time
import os

app = FastAPI()   # <--- THIS is what uvicorn is looking for


# Enable CORS so frontend (React) can call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # during dev; later you can restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
STATIC_DIR = "static"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(STATIC_DIR, exist_ok=True)

# 1. Upload two files
@app.post("/upload")
async def upload_files(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    file1_path = os.path.join(UPLOAD_DIR, file1.filename)
    file2_path = os.path.join(UPLOAD_DIR, file2.filename)

    # Save uploaded files locally
    with open(file1_path, "wb") as f:
        f.write(await file1.read())
    with open(file2_path, "wb") as f:
        f.write(await file2.read())

    return {"message": "Files uploaded successfully"}

# 2. Simulate processing with 5-second delay
@app.post("/process")
async def process_files():
    time.sleep(5)  # simulate processing
    return {"status": "ready"}

# 3. Download the fixed output file
@app.get("/download")
async def download_file():
    output_path = os.path.join(STATIC_DIR, "output.pdf")
    if not os.path.exists(output_path):
        return {"error": "Output file not found"}
    return FileResponse(
        output_path,
        media_type="application/pdf",
        filename="output.pdf"
    )
