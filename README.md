# Todo App (FastAPI Practice)

A simple todo app built for practicing FastAPI and basic frontend integration. Supports adding, completing, and deleting todos.

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **Frontend:** HTML, CSS, Vanilla JavaScript

## Run

### Backend

```bash
cd backend
python -m venv .env
.env\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

Open `http://127.0.0.1:8000` in your browser.
