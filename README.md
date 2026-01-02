# 🤖 Socratis - AI Learning Path Designer

<div align="center">

![Socratis Banner](https://img.shields.io/badge/AI-Agent-6366f1?style=for-the-badge&logo=openai&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**An intelligent AI agent that creates personalized learning roadmaps for students**

[Live Demo](#-live-demo) • [Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation)

</div>

---

## 📖 Overview

**Socratis** is an AI-powered learning assistant that helps students overcome the overwhelm of starting new topics. It generates customized day-by-day learning plans based on:
- 📚 **Topic** - What you want to learn
- ⏰ **Duration** - How much time you have
- 📊 **Skill Level** - Your current expertise (beginner/intermediate/advanced)

Built using the **4-layer AI Agent architecture**, Socratis demonstrates transparent AI decision-making with a real-time "Agent Logic Inspector" that shows how the AI processes your request.

---

## ✨ Features

### 🎯 Core Functionality
- **Personalized Learning Plans** - Custom curricula tailored to your constraints
- **Conversational Interface** - Natural language interaction
- **Smart State Management** - Remembers context across conversation turns
- **Topic-Specific Templates** - Specialized plans for Python, React, and more

### 🔍 Unique: Agent Logic Inspector
A visual panel that shows the AI's "brain" at work:
1. **Input Understanding** - Entity extraction (topic, duration, level)
2. **State Tracker** - Session memory and missing field detection
3. **Task Planner** - Decision logic (ask vs. generate)
4. **Output Generator** - Response formulation

### 🎨 Premium UI/UX
- Glassmorphism dark theme
- Smooth micro-animations
- Fully responsive (mobile-friendly)
- Custom scrollbars
- Modern typography (Outfit, Plus Jakarta Sans)

---

## 🏗️ Architecture

Socratis implements the **4-Layer AI Agent Model**:

```
┌─────────────────────────────────────────┐
│   1. INPUT UNDERSTANDING                │
│   Extract: topic, duration, level       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   2. STATE TRACKER                      │
│   Maintain: session context & memory    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   3. TASK PLANNER                       │
│   Decide: ASK_FOR_INFO | GENERATE_PLAN  │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   4. OUTPUT GENERATOR                   │
│   Create: friendly, structured response │
└─────────────────────────────────────────┘
```

---

## 🚀 Installation

### Option 1: Direct Open (Simplest)
```bash
# Clone the repository
git clone https://github.com/yourusername/socratis-ai-agent.git

# Navigate to directory
cd socratis-ai-agent

# Open index.html in your browser
start index.html  # Windows
open index.html   # macOS
```

### Option 2: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Then visit: http://localhost:8000
```

---

## 💻 Usage

1. **Open the application** in your browser
2. **Type your learning goal** in the input field:
   ```
   "I want to learn React in 7 days, I'm an intermediate dev"
   ```
3. **Watch the Agent Logic Inspector** process your request through all 4 layers
4. **Receive your personalized curriculum** with day-by-day breakdown

### Example Inputs

```
✅ "Learn Python in 5 days as a beginner"
✅ "I want to master JavaScript, I have 2 weeks"
✅ "React crash course for 3 days"
✅ "Help me learn machine learning"
```

---

## 📁 Project Structure

```
socratis-ai-agent/
├── index.html          # Main application structure
├── style.css           # Premium responsive styling
├── script.js           # 4-layer agent logic
├── SUBMISSION.md       # Complete assignment documentation
└── README.md           # This file
```

---

## 🧪 Testing

The agent has been tested with various input scenarios:

| Test Case | Input | Expected Behavior |
|-----------|-------|-------------------|
| **Normal** | "Learn React in 7 days, intermediate" | Generates 7-day React plan |
| **Vague** | "Help me learn programming" | Asks for specific topic |
| **Partial** | "Python for 5 days" | Generates plan with default level |
| **Empty** | "" | Shows welcome message |

---

## 🎓 Assignment Context

This project was built as part of an AI Agent assignment to demonstrate:
- Understanding of the 4-layer agent architecture
- Prompt engineering and iteration
- Problem-solving with AI tools
- Curiosity and learning agility

**Full documentation available in:** [`SUBMISSION.md`](./SUBMISSION.md)

---

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Glassmorphism, animations, responsive design
- **Vanilla JavaScript** - No frameworks, pure logic
- **Google Fonts** - Outfit, Plus Jakarta Sans

---

## 🌟 Highlights

### What Makes This Special?

1. **Transparency** - The Logic Inspector shows exactly how the AI thinks
2. **Educational** - Learn about AI agent architecture while using it
3. **Production-Ready** - Premium UI, not a prototype
4. **No Dependencies** - Pure HTML/CSS/JS, works anywhere
5. **Responsive** - Works on desktop, tablet, and mobile

---

## 📸 Screenshots

### Main Interface
![Main Interface](https://via.placeholder.com/800x450/1e293b/6366f1?text=Socratis+Main+Interface)

### Agent Logic Inspector
![Logic Inspector](https://via.placeholder.com/800x450/1e293b/10b981?text=Agent+Logic+Inspector)

---

## 🔮 Future Enhancements

- [ ] Multi-turn plan refinement ("make day 3 easier")
- [ ] Resource recommendations (articles, videos, docs)
- [ ] Progress tracking with localStorage
- [ ] Export to PDF/Calendar
- [ ] Multiple learning styles (visual/auditory/kinesthetic)
- [ ] Integration with real LLM APIs (OpenAI, Gemini)

---

## 👨‍💻 Author

**Harsh Singh**

- GitHub: [@yourusername](https://github.com/yourusername)
- Project: Socratis AI Learning Path Designer
- Date: January 2, 2026

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built as part of an AI Agent learning assignment
- Inspired by modern AI assistant architectures
- UI design influenced by Vercel, Linear, and modern SaaS products

---

<div align="center">

**⭐ If you found this helpful, please star the repository!**

Made with ❤️ and AI

</div>
