# 🎬 Demo Instructions - Real AI Agent

## Quick Start Demo

### Option 1: Using OpenAI (Paid)

1. **Open the Application**
   - Double-click `index.html` to open in your browser
   - You should see the Socratis interface with a dark theme

2. **Configure API Key**
   - You'll see a clickable message: "Click here to configure API key"
   - Click it to open the API key modal
   - Enter your OpenAI API key (get it from https://platform.openai.com/api-keys)
   - Click "Save Key"

3. **Test with Questions**
   
   Try these examples:
   
   **Learning Plan Request:**
   ```
   I want to learn Python in 7 days, I'm a complete beginner
   ```
   
   **General Question:**
   ```
   What is the difference between machine learning and deep learning?
   ```
   
   **Coding Help:**
   ```
   How do I create a REST API in Node.js?
   ```
   
   **Follow-up Question:**
   ```
   Can you explain that in simpler terms?
   ```

4. **Watch the Agent Work**
   - Observe the "Agent Logic Inspector" panel on the right
   - See each layer activate in real-time:
     - Layer 1: Input Understanding (detects intent)
     - Layer 2: State Tracker (manages context)
     - Layer 3: Task Planner (decides strategy)
     - Layer 4: AI Generator (calls OpenAI API)

### Option 2: Using Google Gemini (FREE!)

If you don't want to pay for OpenAI, use Google's free Gemini API:

1. **Get Free Gemini API Key**
   - Go to https://makersuite.google.com/app/apikey
   - Sign in with Google account
   - Click "Create API Key"
   - Copy the key

2. **Update the Code**
   - Open `script.js`
   - Find lines 6-8 and replace with:
   ```javascript
   let API_KEY = localStorage.getItem('gemini_api_key') || '';
   const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
   const MODEL = 'gemini-pro';
   ```

3. **Update the API Call Function**
   - Find the `generateAIResponse` function (around line 140)
   - Replace the fetch call with Gemini format (see GEMINI_INTEGRATION.md)

## What You'll See

### Initial State
- Clean, modern dark UI
- Socratis logo with gradient effect
- Welcome message from the AI
- Two-panel layout:
  - Left: Chat history
  - Right: Agent Logic Inspector
- Input field at the bottom

### During Processing
- Your message appears instantly
- Agent Logic Inspector lights up step by step
- Typing indicator (three animated dots) appears
- Each layer shows its processing data in real-time

### After Response
- AI response appears with smooth animation
- Token usage shown in Layer 4
- Conversation continues naturally
- AI remembers previous context

## Key Features to Demonstrate

### 1. Real-Time Agent Visualization
Watch how the agent processes your input through 4 distinct layers:
- **Understanding**: Extracts intent and entities
- **State**: Tracks conversation context
- **Planning**: Decides response strategy
- **Generation**: Calls AI API

### 2. Conversation Memory
Try this sequence:
```
User: "Tell me about React"
AI: [explains React]
User: "What are its main advantages?"
AI: [continues discussing React specifically]
```

### 3. Versatile Capabilities
The agent can:
- Create learning plans
- Answer technical questions
- Explain concepts
- Help with coding
- Discuss any topic
- Remember context

### 4. Error Handling
- If API key is missing: Shows friendly setup prompt
- If API fails: Shows clear error message
- If network issues: Graceful degradation

## Testing Checklist

- [ ] Page loads without errors
- [ ] UI is responsive and looks modern
- [ ] API key modal appears on first load
- [ ] Can save API key successfully
- [ ] Input field accepts text
- [ ] Send button works
- [ ] Enter key submits message
- [ ] Agent Logic Inspector updates in real-time
- [ ] Typing indicator appears during processing
- [ ] AI responses are relevant and helpful
- [ ] Follow-up questions work with context
- [ ] Error messages are clear
- [ ] Mobile responsive (test on phone)

## Common Issues & Solutions

### Issue: "API key not configured"
**Solution**: Click the setup message and enter your API key

### Issue: "API request failed"
**Solution**: 
- Check internet connection
- Verify API key is correct
- Check OpenAI account has credits
- Try using Gemini instead (free)

### Issue: Slow responses
**Solution**: This is normal - AI takes 2-5 seconds to respond

### Issue: Input field not clickable
**Solution**: Refresh the page, this was fixed in previous version

### Issue: Agent Inspector not updating
**Solution**: Check browser console for errors

## Performance Notes

- First response may be slower (cold start)
- Subsequent responses are faster
- Conversation history limited to last 10 messages
- Each request uses ~500-1000 tokens
- Gemini API is free but has rate limits

## Browser Compatibility

✅ Chrome/Edge (Recommended)
✅ Firefox
✅ Safari
⚠️ Internet Explorer (Not supported)

## Next Steps After Demo

1. Customize the system prompt in `script.js` (line 20)
2. Adjust the UI colors in `style.css`
3. Add more agent layers for complex workflows
4. Integrate with other APIs
5. Add voice input/output
6. Save conversation history to localStorage
7. Export conversations as PDF

Enjoy your real AI-powered agent! 🚀
