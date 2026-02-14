# Career Path Generator

An AI-powered career planning platform that helps students identify skill gaps and create personalized learning roadmaps to achieve their dream jobs.

## Features

- **Resume Analysis**: Upload your resume and get instant skill extraction
- **Dream Job Targeting**: Specify your target role and get a custom learning path
- **5-Week Roadmap**: Week-by-week breakdown of topics, tasks, and outcomes
- **Curated Resources**: Free learning resources from top platforms (GeeksforGeeks, W3Schools, Kaggle, etc.)
- **Admin Dashboard**: Track student progress and plan skill-building workshops

## Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **SQLAlchemy**: Database ORM
- **SQLite**: Lightweight database
- **Google Gemini AI**: Resume parsing and roadmap generation
- **JWT**: Secure authentication

### Frontend
- **React + Vite**: Modern frontend framework
- **Tailwind CSS**: Utility-first styling
- **Axios**: HTTP client
- **Lucide React**: Beautiful icons

## Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API Key

### Backend Setup

1. Navigate to the project root
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Create `.env` file in the `backend` folder:
   ```env
   DATABASE_URL=sqlite:///./resume_analyzer.db
   SECRET_KEY=your-secret-key-change-in-production
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

4. Run the backend:
   ```bash
   python run.py
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173

## Usage

### Student Flow
1. **Login** with demo account: `student_demo@test.com` / `password123`
2. **Upload Resume** (PDF/DOCX)
3. **Enter Dream Job** (e.g., "Generative AI Engineer")
4. **View Results**:
   - Resume Fit Score
   - Skills You Have
   - Missing Skills
   - 5-Week Learning Roadmap
   - Curated Resources

### Admin Flow
1. **Login** with admin account: `admin@test.com` / `password123`
2. View student leaderboard
3. Analyze skill trends
4. Plan targeted workshops

## Project Structure

```
.
├── backend/
│   ├── agents/           # AI agents (parser, roadmap planner, etc.)
│   ├── models/          # Database models
│   ├── routers/         # API endpoints
│   ├── database.py      # Database configuration
│   └── main.py          # FastAPI app
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Dashboard pages
│   │   ├── api/         # Axios configuration
│   │   └── contexts/    # React contexts (Auth)
│   └── index.css        # Global styles
└── run.py               # Backend runner
```

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first.
