Dev Mentor AI 🤖

An AI-powered Telegram programming mentor that helps developers practice coding, improve their skills, and build consistent learning habits.

Dev Mentor AI is a Telegram bot built with Python, Django, and aiogram. It provides personalized daily programming challenges, AI-assisted code reviews, learning advice, progress tracking, and GitHub repository explanations.

The goal is to make programming practice more consistent and meaningful by combining hands-on challenges with actionable feedback.

---

✨ Features

🎯 Personalized Daily Coding Challenges

- Generates daily programming challenges based on the user's profile.
- Adapts challenges to the user's preferred programming language, experience level, and learning goals.
- Provides a challenge title, description, and hint.
- Saves daily challenges to prevent regenerating a different challenge for the same user and date.

🧠 AI-Powered Code Review

Users can submit their code for review and receive structured feedback, including:

- Code strengths
- Weaknesses and potential improvements
- Actionable suggestions
- A quality score

The review is designed to help developers understand not only what could be improved, but also why.

📈 Learning Progress & Streak Tracking

- Records daily challenge attempts.
- Tracks completed challenges and consecutive-day streaks.
- Stores code review feedback and scores.
- Provides access to previous attempts and learning progress.

👨‍🏫 Personalized Programming Advice

The "/advice" command provides programming guidance tailored to the user's:

- Programming language
- Experience level
- Learning goals

Advice is intended to be concise, practical, and focused on helping developers improve.

🔍 GitHub Repository Explainer

Submit a public GitHub repository URL to receive an AI-generated explanation of the project.

The bot attempts to analyze repository information such as:

- Project purpose
- README documentation
- Repository structure
- Important files
- Technologies and concepts
- Potential areas for further exploration

This feature can help developers explore unfamiliar projects and understand open-source codebases more easily.

👤 User Profiles

Each user can maintain a learning profile containing:

- Preferred programming language
- Experience level
- Learning goals
- Telegram username
- Registration information

The profile helps personalize challenges and mentoring responses.

🔄 AI Provider Abstraction & Fallback

The AI integration is organized around a provider abstraction layer.

Currently implemented providers include:

- Google Gemini — AI-powered challenge generation, code review, mentoring, and repository explanations.
- Mock Provider — a fallback provider for development and situations where AI services are unavailable.

The provider manager supports configurable provider ordering, retry attempts, request timeouts, and fallback behavior.

---

🛠️ Tech Stack

Technology| Purpose
Python| Core programming language
Django| Application framework, ORM, database models, and management commands
aiogram| Asynchronous Telegram Bot API integration
SQLite| Local development database
Google Gemini API| AI-powered generation and analysis
asyncio| Asynchronous execution
asgiref| Integration between asynchronous bot logic and Django
python-dotenv| Environment variable management

---

🏗️ Architecture

The project follows a service-oriented structure that separates Telegram interaction, business logic, database operations, and AI integrations.

Telegram User
     │
     ▼
Telegram Bot (aiogram)
     │
     ▼
Handlers
     │
     ▼
Service Layer
     │
     ├── Challenge Service
     ├── Code Review Service
     ├── Advice Service
     └── GitHub Repository Analysis
     │
     ▼
AI Provider Layer
     │
     ├── Gemini Provider
     └── Mock Provider
     │
     ▼
Django ORM
     │
     ▼
SQLite Database

Main Components

- Handlers: Process Telegram commands, messages, and user interactions.
- Services: Implement challenge generation, code review, advice, repository analysis, and progress tracking.
- AI Layer: Provides an abstraction for AI integrations and fallback behavior.
- Models: Store user profiles, daily challenges, challenge attempts, and code review feedback.
- Django Management Commands: Provide project management and bot execution entry points.

---

💬 User Workflow

1. Getting Started

The user starts the bot using "/start" and completes the onboarding process.

The bot collects information such as programming language, experience level, and learning goals to personalize the experience.

2. Daily Practice

The user requests a daily challenge.

The bot generates or retrieves the challenge associated with the current date and user profile.

3. Code Submission

After solving the challenge, the user submits their code through Telegram.

4. AI Feedback

The submitted solution is analyzed and the user receives feedback, including strengths, weaknesses, suggestions, and a score.

5. Progress Tracking

Challenge completion and review results are saved, allowing users to revisit their previous attempts and monitor their consistency.

---

📱 Bot Commands

Command| Description
"/start"| Start the bot and register
"/menu"| Display available commands
"/daily_challenge"| Get today's programming challenge
"/challenge_done"| Complete a challenge and submit code
"/my_attempts"| View previous attempts and streaks
"/advice"| Get personalized programming advice
"/profile"| View or update your learning profile
"/explain_github"| Analyze and explain a GitHub repository

---

🚀 Getting Started

Prerequisites

- Python
- A Telegram bot token from "@BotFather" (https://t.me/BotFather)
- A Google Gemini API key if you want to use AI-powered features

1. Clone the Repository

git clone https://github.com/AmirRezaiyan/code-mentor-ai.git
cd code-mentor-ai

2. Create a Virtual Environment

Windows:

python -m venv .venv
.venv\Scripts\activate

Linux / macOS:

python3 -m venv .venv
source .venv/bin/activate

3. Install Dependencies

Install the required packages:

pip install Django aiogram google-genai python-dotenv

«A pinned dependency file should be added to the repository to make installation reproducible.»

4. Configure Environment Variables

Create a ".env" file in the project root:

BOT_TOKEN=your_telegram_bot_token
SECRET_KEY=your_django_secret_key
DEBUG=True

GEMINI_API_KEY=your_gemini_api_key

AI_PROVIDER_ORDER=gemini
AI_RATE_LIMIT_PER_MINUTE=30
AI_REQUEST_TIMEOUT=12
AI_RETRY_MAX=2

Replace the placeholder values with your own credentials.

Never commit your ".env" file or expose API keys and bot tokens publicly.

5. Apply Database Migrations

python manage.py migrate

6. Run the Telegram Bot

python manage.py runbot

Once the bot is running, open it in Telegram and send "/start".

---

🗄️ Data Models

The application currently uses Django models to manage the following data:

"BotUser"

Stores user information and learning preferences.

- Telegram ID
- Username
- Preferred programming language
- Experience level
- Learning goal
- Account timestamps

"DailyChallenge"

Stores daily challenges generated for users.

- Challenge title
- Description
- Hint
- Challenge key
- Challenge date
- Associated user

"ChallengeAttempt"

Tracks daily challenge completion.

- User
- Challenge date
- Challenge key
- Score
- AI feedback
- Attempt timestamp

"CodeFeedback"

Stores code review results.

- User
- Associated challenge
- Review score
- Strengths
- Weaknesses
- Suggestions
- Creation timestamp

---

📂 Project Structure

code-mentor-ai/
│
├── bot/
│   ├── ai/
│   │   ├── base.py
│   │   ├── providers.py
│   │   └── gemini.py
│   │
│   ├── handlers/
│   │   ├── start.py
│   │   ├── onboarding.py
│   │   ├── daily_challenge.py
│   │   ├── challenge_done.py
│   │   ├── submission.py
│   │   ├── my_attempts.py
│   │   ├── profile.py
│   │   ├── advice.py
│   │   ├── github_explain.py
│   │   ├── menu.py
│   │   └── debug.py
│   │
│   ├── services/
│   │   ├── challenge_service.py
│   │   ├── code_review_service.py
│   │   ├── advice_service.py
│   │   ├── github_explain_service.py
│   │   ├── gemini_client.py
│   │   └── ai_code_review_prompt.py
│   │
│   ├── management/
│   ├── migrations/
│   ├── utils/
│   ├── models.py
│   ├── states.py
│   ├── bot.py
│   └── admin.py
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── manage.py
├── .gitignore
└── README.md

---

🔐 Reliability & Error Handling

The application includes mechanisms intended to improve reliability:

- Retry attempts for AI requests.
- Configurable request timeouts.
- Fallback AI provider behavior.
- Local code review fallback when structured AI feedback cannot be processed.
- Database uniqueness constraints for daily user records.
- Transaction handling for race-sensitive challenge creation.
- Input handling for code submissions and repository URLs.

AI-generated feedback should be treated as guidance rather than a guarantee of correctness.

---

🎯 Project Goals

Dev Mentor AI aims to help developers:

- Build a consistent coding practice habit.
- Improve problem-solving skills through daily challenges.
- Understand their coding mistakes and improve code quality.
- Receive guidance tailored to their learning level.
- Explore real-world GitHub repositories.
- Track learning progress over time.

---

🗺️ Future Improvements

Potential future directions include:

- More AI provider integrations.
- Expanded challenge categories and difficulty levels.
- A richer learning analytics system.
- Achievement and leaderboard systems.
- Scheduled challenge delivery and reminders.
- Improved automated testing.
- Web-based learning dashboard.
- More advanced repository analysis.
- Deployment configuration and production-ready infrastructure. 

Built to make learning programming more consistent, interactive, and practical.