# 🚀 Socratis AI Agent - Setup Guide

## Overview

Socratis is now powered by **real AI** (OpenAI's GPT) and can answer **any question** you ask, just like ChatGPT! It's no longer limited to hardcoded responses.

## ✨ New Features

- **Real AI Integration**: Uses OpenAI's GPT-3.5-turbo for intelligent responses
- **Conversation Memory**: Remembers your conversation context
- **Any Topic Support**: Ask anything - not just learning plans
- **Live Agent Visualization**: See the 4-layer agent architecture in action
- **Typing Indicators**: Visual feedback while AI is thinking
- **Error Handling**: Graceful error messages and recovery

## 🔧 Setup Instructions

### Step 1: Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-...`)
5. **Important**: Keep this key private!

### Step 2: Configure the Application

1. Open `index.html` in your web browser
2. You'll see a welcome message asking you to configure your API key
3. Click on the "Click here to configure API key" message
4. Paste your API key in the modal dialog
5. Click "Save Key"

Your API key is stored securely in your browser's localStorage and never leaves your computer except to make API calls to OpenAI.

### Step 3: Start Chatting!

Now you can ask Socratis anything:

**Learning Plans:**
- "I want to learn Python in 7 days, I'm a beginner"
- "Create a 2-week plan to master React hooks"

**General Questions:**
- "What is machine learning?"
- "How does async/await work in JavaScript?"
- "Explain quantum computing in simple terms"

**Coding Help:**
- "How do I center a div in CSS?"
- "What's the difference between let and const?"

**Any Topic:**
- "Tell me about the history of the internet"
- "How does photosynthesis work?"

## 🏗️ Agent Architecture

The application uses a 4-layer agentic architecture:

1. **Input Understanding**: Analyzes your question to detect intent and extract entities
2. **State Tracker**: Maintains conversation context and history
3. **Task Planner**: Determines the best strategy to respond
4. **AI Response Generator**: Calls OpenAI API and generates the response

You can watch this process in real-time in the "Agent Logic Inspector" panel!

## 🔐 Privacy & Security

- Your API key is stored locally in your browser
- Conversations are not saved to any server
- Only you and OpenAI can see your messages
- You can clear your API key anytime by clearing browser localStorage

## 💡 Tips

- Be specific in your questions for better responses
- The AI remembers the last 10 messages for context
- You can ask follow-up questions naturally
- If you get an error, check your API key and internet connection

## 🛠️ Troubleshooting

**"API key not configured" error:**
- Click the setup message and enter your OpenAI API key

**"API request failed" error:**
- Check your internet connection
- Verify your API key is correct
- Make sure you have credits in your OpenAI account

**Slow responses:**
- This is normal - AI takes a few seconds to think
- Watch the typing indicator for progress

## 🔄 Alternative: Use Google Gemini (Free!)

If you don't want to pay for OpenAI, you can modify the code to use Google's Gemini API which has a free tier:

1. Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Modify `script.js` to use Gemini endpoint instead of OpenAI
3. Update the API call format to match Gemini's requirements

## 📝 Code Structure

```
AI Agent/
├── index.html          # Main HTML structure
├── style.css           # Styling with dark theme
├── script.js           # AI-powered agent logic
├── README.md           # Project documentation
└── SETUP_GUIDE.md      # This file
```

## 🎯 Next Steps

- Try asking complex questions
- Test the conversation memory by asking follow-ups
- Watch the agent logic inspector to understand how it works
- Customize the system prompt in `script.js` to change AI behavior

Enjoy your AI-powered learning assistant! 🎉
