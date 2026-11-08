# 🤖 Dev Mentor Bot

> **An Intelligent Telegram Bot for Daily Programming Challenges & AI-Powered Code Mentoring**

---

## ✨ Overview

**Dev Mentor Bot** is a comprehensive Telegram bot application built with Django and aiogram that provides intelligent, personalized programming mentoring and daily coding challenges. It combines AI-powered code reviews, adaptive challenge generation, and real-time feedback to help developers improve their coding skills.

This bot is designed to:
- 🎯 Generate personalized daily coding challenges
- 💻 Review and provide AI-powered feedback on submitted code
- 📚 Track learning progress and maintain coding streaks
- 🧠 Offer intelligent mentoring advice based on user profiles
- 🔗 Explain and analyze GitHub repositories
- 📈 Build a gamified learning experience with streaks and scoring

---

## 🚀 Key Features

### 1. **Daily Programming Challenges** 🔥
   - Generates unique, personalized challenges every day
   - Challenges are tailored to the user's:
     - Programming language preference
     - Experience level (Junior/Mid/Senior)
     - Learning goals
   - Challenges include titles, descriptions, and helpful hints
   - Each user gets a unique challenge per day (seed-based generation)

### 2. **AI-Powered Code Review** 🎓
   - Submit code as text or as a file (document)
   - Receive AI-generated feedback analyzing:
     - **Strengths** of your code
     - **Weaknesses** to improve
     - **Suggestions** for better practices
     - **Scores** for overall quality (0-1 scale)
   - Supports multiple programming languages
   - Fallback local code review when AI unavailable
   - Preserves feedback history in database

### 3. **Streak Tracking & Progress** 📊
   - Maintains daily challenge attempt records
   - Calculates consecutive completion streaks
   - Stores scoring and AI feedback for each attempt
   - User profile displays registration date and stats

### 4. **Personalized Mentoring** 🧑‍🏫
   - `/advice` command delivers actionable, practical tips
   - Advice is personalized based on:
     - Experience level
     - Primary programming language
     - Learning goals
   - Rate-limited to 30 requests per minute per user
   - Concise, actionable guidance (max 4 lines)

### 5. **GitHub Repository Analysis** 🔗
   - Explain and analyze GitHub repositories
   - AI-powered repository summarization
   - Extract key concepts and technologies
   - Understand project structure and purpose

### 6. **User Profiles** 👤
   - Track user information:
     - Telegram ID and username
     - Primary programming language
     - Experience level (Junior/Mid/Senior)
     - Learning goals
     - Account creation date
   - Editable profile settings
   - Debug mode for developers

### 7. **Interactive Menu System** 📌
   - Easy-to-use command menu
   - Quick access to all features
   - Helpful commands guide
   - Progress and stats display

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Django 6.0+
- **Bot Framework**: aiogram (async Telegram bot API)
- **Database**: SQLite (db.sqlite3)
- **Async**: asyncio + asgiref (Django-async bridge)
- **AI Integration**: Google Gemini API

### Key Components
```
├── bot/
│   ├── handlers/        # Telegram command handlers
│   ├── services/        # Business logic & AI interactions
│   ├── ai/             # AI provider integration
│   ├── models.py       # Database schemas
│   ├── states.py       # FSM states for conversations
│   └── bot.py          # Bot initialization & routing
│
├── config/             # Django configuration
└── manage.py           # Django management
```

### Dependencies
- **Python 3.9+**
- **aiogram** - Async Telegram bot framework
- **Django** - Web framework for models & DB
- **google-generativeai** - Google Gemini API SDK
- **python-dotenv** - Environment configuration
- **asgiref** - Async-to-sync bridge

---

## 📦 Architecture & Components

### 1. **Models** (bot/models.py)
```python
BotUser              # User profiles with preferences
├── telegram_id      # Unique identifier
├── username         # Telegram username
├── primary_language # Programming language
├── experience_level # Skill level
├── goal             # Learning objective
└── debug_mode       # Dev debugging flag

ChallengeAttempt     # Daily challenge tracking
├── user             # FK to BotUser
├── score            # AI score (0-1)
├── ai_feedback      # JSON feedback
├── date             # Challenge date
└── streak_count()   # Calculate streak

DailyChallenge       # Generated challenges
├── user             # FK to BotUser
├── challenge_key    # Unique identifier
├── title            # Challenge title
├── description      # Challenge details
├── hint             # Helpful hint
└── date             # Challenge date

CodeFeedback         # Code review results
├── user             # FK to BotUser
├── challenge        # FK to DailyChallenge
├── score            # Quality score
├── strengths        # Positive aspects
├── weaknesses       # Areas to improve
└── suggestions      # Actionable advice
```

### 2. **Handlers** (bot/handlers/)
| Handler | Command | Purpose |
|---------|---------|---------|
| start.py | `/start` | User registration & onboarding |
| onboarding.py | FSM flow | Profile setup (language, level, goal) |
| daily_challenge.py | `/daily_challenge` | Generate & send daily challenge |
| challenge_done.py | `/challenge_done` | Mark challenge as completed |
| submission.py | `FSM flow` | Receive & review code submissions |
| my_attempts.py | `/my_attempts` | Display user stats & streaks |
| profile.py | `/profile` | Show user profile information |
| advice.py | `/advice` | Deliver personalized mentoring |
| github_explain.py | `/explain_github` | Analyze GitHub repositories |
| menu.py | `/menu` | Display command guide |
| debug.py | Dev mode | Debug utilities |

### 3. **Services** (bot/services/)
| Service | Function |
|---------|----------|
| challenge_service.py | Generate challenges, verify submissions, compute streaks |
| code_review_service.py | Local & AI-powered code review |
| advice_service.py | Generate personalized advice |
| github_explain_service.py | Fetch & explain GitHub repos |
| gemini_client.py | Google Gemini API wrapper |
| ai_code_review_prompt.py | Prompt engineering for reviews |

### 4. **AI Integration** (bot/ai/)
- **providers.py** - Provider abstraction layer (supports multiple AI backends)
- **gemini.py** - Google Gemini API implementation
- **base.py** - Base AIProvider interface

---

## 💬 User Workflow

### Getting Started
```
1. User sends /start
   ↓
2. Bot creates user profile (if new)
   ↓
3. Onboarding FSM:
   - Primary language? (Python, JavaScript, etc.)
   - Experience level? (Junior/Mid/Senior)
   - Learning goal? (Web dev, DSA, etc.)
   ↓
4. Profile saved to database
```

### Daily Challenge Flow
```
1. User sends /daily_challenge
   ↓
2. Bot generates personalized challenge:
   - Uses user's language, level, goal
   - AI creates unique challenge for that date
   - Stores in DailyChallenge table
   ↓
3. User solves challenge
   ↓
4. User sends /challenge_done
   ↓
5. Bot prompts for submission (text/file)
   ↓
6. Code Review:
   - Extract submitted code
   - AI analyzes code quality
   - Generates feedback (strengths/weaknesses)
   - Stores CodeFeedback record
   ↓
7. User receives detailed feedback + score
```

### Mentoring Flow
```
1. User sends /advice
   ↓
2. Rate limiting check (30/min per user)
   ↓
3. AI generates advice based on profile:
   - Language-specific tips
   - Experience-level guidance
   - Goal-aligned recommendations
   ↓
4. User receives concise, actionable advice
```

---

## ⚙️ Configuration

### Environment Variables (.env)
```env
# Django & Security
SECRET_KEY=your-django-secret-key
DEBUG=True
BOT_TOKEN=your-telegram-bot-token

# AI Provider
GEMINI_API_KEY=your-google-gemini-api-key
AI_PROVIDER_ORDER=gemini
AI_RATE_LIMIT_PER_MINUTE=30
AI_REQUEST_TIMEOUT=12
AI_RETRY_MAX=2
```

### Database Setup
```bash
python manage.py migrate
```

### Running the Bot
```bash
python manage.py runbot
```

---

## 📊 Database Schema

### Users Table (BotUser)
- **Primary Key**: telegram_id (BigIntegerField, unique)
- **Fields**: username, primary_language, experience_level, goal, debug_mode
- **Timestamps**: created_at, updated_at

### Challenges Table (DailyChallenge)
- **Composite Key**: (user_id, date)
- **Indexed**: user, date
- **Fields**: challenge_key, title, description, hint

### Attempts Table (ChallengeAttempt)
- **Composite Key**: (user_id, date)
- **Fields**: score, ai_feedback (JSON), challenge_key

### Feedback Table (CodeFeedback)
- **Fields**: score, strengths, weaknesses, suggestions
- **Timestamps**: created_at

---

## 🔐 Security Features

- **Rate Limiting**: 30 AI requests per user per minute
- **Transaction Safety**: Atomic DB operations for race condition prevention
- **Input Validation**: File upload validation and sanitization
- **Error Handling**: Graceful fallbacks for API failures
- **Debug Mode**: Restricted debug features for authorized users only
- **State Management**: FSM for secure conversation flow

---

## 🎯 Use Cases

### For Beginners 👶
- Daily challenges to build fundamentals
- Encouragement through streaks
- Simple, actionable feedback
- Mentoring advice tailored to junior level

### For Intermediate Developers 🚀
- Complex problem-solving challenges
- Detailed code quality feedback
- Best practices mentoring
- GitHub project exploration

### For Advanced Developers 🏆
- Architectural patterns & design challenges
- Performance optimization feedback
- Expert-level mentoring
- Repository deep-dives

---

## 📈 Gamification Elements

- **Streaks**: Track consecutive daily challenges
- **Scoring**: AI-powered code quality scores (0-1 scale)
- **Progress Tracking**: View all attempts and history
- **Levels**: Experience levels (Junior/Mid/Senior)
- **Achievements**: Implicit through feedback and improvements

---

## 🤝 Key Integrations

### Google Gemini AI
- Daily challenge generation
- Code review analysis
- Personalized mentoring advice
- GitHub repository analysis
- Fallback to local analysis if API fails

### Telegram Bot API
- User authentication via Telegram ID
- File uploads for code submission
- Rich text formatting
- Inline keyboards and state management

---

## 🔄 Data Flow

```
User Command
    ↓
Handler (Command Router)
    ↓
Service Layer (Business Logic)
    ↓
AI Provider (Google Gemini)
    ↓
Django ORM (Database)
    ↓
Response to User
```

---

## 📝 File Upload Support

- **Formats**: Text files (.py, .js, .txt, etc.)
- **Encoding**: UTF-8 with fallback to Latin-1
- **Validation**: File name and content validation
- **Processing**: Temporary file handling with cleanup

---

## 🚀 Performance Optimization

- **Async/Await**: Non-blocking Telegram operations
- **Connection Pooling**: Database connection reuse
- **Rate Limiting**: Token bucket algorithm for API calls
- **Caching**: Provider manager caching
- **Indexing**: Database indexes on frequently queried fields

---

## 🐛 Debugging & Development

- **Debug Mode**: Toggle debug mode in user profile
- **Logging**: Comprehensive logging throughout codebase
- **Error Tracking**: Exception handling with detailed messages
- **Debug Handler**: Special debug utilities for developers

---

## 📚 Common Commands

| Command | Description |
|---------|-------------|
| `/start` | Begin and register |
| `/menu` | Show all commands |
| `/daily_challenge` | Get today's challenge |
| `/challenge_done` | Complete challenge & submit code |
| `/my_attempts` | View stats & streaks |
| `/advice` | Get mentoring advice |
| `/profile` | View your profile |
| `/explain_github` | Analyze GitHub repo |

---

## 🔮 Future Enhancements

- 🏅 Leaderboards (global/friend groups)
- 🎖️ Badge system for achievements
- 📚 Challenge libraries by topic
- 🌍 Multi-language support
- 🤖 Multiple AI providers (OpenAI, Claude, etc.)
- 📱 Web dashboard
- 🔔 Push notifications for streaks
- 👥 Peer code review system

---

## 📄 Project Structure Summary

```
dev-mentor-bot/
├── 📂 bot/                    # Main app
│   ├── 📂 handlers/          # Command handlers (11 handlers)
│   ├── 📂 services/          # Business logic (7 services)
│   ├── 📂 ai/               # AI providers (3 modules)
│   ├── 📂 migrations/        # DB migrations (11 versions)
│   ├── 📂 management/        # Custom commands
│   ├── 📂 utils/            # Utilities (formatters, telegram_commands)
│   ├── bot.py               # Bot initialization
│   ├── models.py            # 4 DB models
│   ├── states.py            # FSM states
│   └── admin.py             # Django admin
│
├── 📂 config/                # Django settings
│   ├── settings.py          # Main configuration
│   ├── urls.py              # URL routing
│   ├── wsgi.py              # WSGI entry
│   └── asgi.py              # ASGI entry
│
├── 📄 manage.py             # Django CLI
├── 📄 db.sqlite3            # Database
├── 📄 .env                  # Environment config
└── 📄 .gitignore            # Git ignore
```

---

## 🎓 Learning Outcomes

Users of Dev Mentor Bot will:

✅ **Build Programming Skills**
- Solve problems in their chosen language
- Learn best practices and patterns
- Improve code quality incrementally

✅ **Develop Consistency**
- Maintain daily coding streaks
- Build habits through gamification
- Track measurable progress

✅ **Receive Expert Guidance**
- AI-powered personalized feedback
- Mentoring tailored to their level
- Industry best practices

✅ **Explore & Understand**
- Learn from open-source projects
- Understand code patterns
- Build portfolio awareness

---

## 🤝 Support & Contribution

This is an intelligent mentoring bot designed to support developers at all levels. Every feature is built with learning and growth in mind.

---

## 📄 License

This project is part of the Dev Mentor initiative. All rights reserved.

---

## 🎉 Final Notes

**Dev Mentor Bot** transforms learning to code from a solo journey into an interactive, AI-powered mentorship experience. With daily challenges, intelligent feedback, and personalized advice, developers can:

- 🎯 **Stay Motivated** through streaks and tracking
- 🧠 **Learn Effectively** from AI-powered reviews
- 📈 **Grow Consistently** with daily practice
- 🚀 **Level Up** their coding skills systematically

> **Every day is a new challenge. Every submission is an opportunity to grow.** 🚀

---

<div align="center">

### Made with ❤️ for Developers, By AmirRezaiyan

**Let's Code Together. Let's Grow Together.** 🌟

</div>