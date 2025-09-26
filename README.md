# Web Developer Intern Assignment – Growdea

Submission for the Growdea Web Developer Intern task.

---

## 🔗 Links
- **GitHub Repository:** https://github.com/Lasyagithub/web-dev-assignment-growdea  
- **Live Demo (Frontend on Vercel):** https://web-dev-assignment-growdea.vercel.app/  

⚠️ Note: Backend (FastAPI) is implemented but not deployed online.  
To test upload → process → download flow, please run backend locally (instructions below).

---

## ✨ Features
- Responsive **React + Tailwind CSS** frontend
- **Dark Mode toggle**
- **File upload** (2 input files)
- **5-second simulated processing** via FastAPI
- **Download button** generates PDF with text: *“Welcome to Growdea”*

---

## 🚀 Run Locally

### Frontend (React)
```bash
cd frontend
npm install
npm start
Open http://localhost:3000 in browser.

Backend (FastAPI)
bash
Copy code
cd backend
python -m venv .venv
.venv\Scripts\activate   # On Windows
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
API will run at: http://127.0.0.1:8000
Test PDF download directly: http://127.0.0.1:8000/download

🧪 How to Test
On Vercel Demo:

See responsive UI

Try dark mode toggle

Upload form is visible (but backend calls fail since it’s local)

Full Functionality (Locally):

Run backend as above

Run frontend with npm start

Upload 2 files → wait 5s → click Download File → get PDF
