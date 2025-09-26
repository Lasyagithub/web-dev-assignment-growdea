# Web Developer Intern Assignment

This is my submission for the Growdea Web Developer Intern task.

## Features
- Responsive React frontend with Tailwind CSS
- Dark mode toggle
- File upload (2 files)
- 5-second simulated backend processing (FastAPI)
- Download button for PDF output

## Run Instructions
###Frontend 

cd frontend
npm install
npm start

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000

