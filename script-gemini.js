// ============================================
// GEMINI-POWERED AI AGENT (FREE ALTERNATIVE)
// ============================================
// This version uses Google's Gemini API which has a generous free tier
// To use this version, rename this file to script.js

// Configuration
let API_KEY = localStorage.getItem('gemini_api_key') || '';
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const MODEL = 'gemini-pro';

// State Management
let conversationHistory = [];
let isProcessing = false;

// DOM Elements
const chatHistoryEl = document.getElementById('chat-history');
const userInputEl = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const stepData = {
    1: document.getElementById('data-understanding'),
    2: document.getElementById('data-state'),
    3: document.getElementById('data-planner'),
    4: document.getElementById('data-generator')
};

// System Prompt for the AI
const SYSTEM_PROMPT = `You are Socratis, an intelligent AI learning assistant. Your role is to:
1. Help users learn any topic they're interested in
2. Create personalized learning plans based on their time, level, and goals
3. Answer questions clearly and helpfully
4. Provide structured, actionable advice
5. Be encouraging and supportive

When a user asks to learn something, gather information about:
- What topic they want to learn
- Their current skill level (beginner/intermediate/advanced)
- How much time they have available
- Their learning goals

Then create a detailed, day-by-day or phase-by-phase learning plan.

For general questions, provide clear, helpful answers with examples when appropriate.`;

// ============================================
// LAYER 1: INPUT UNDERSTANDING
// ============================================
function analyzeInput(input) {
    const analysis = {
        intent: detectIntent(input),
        entities: extractEntities(input),
        sentiment: 'neutral',
        timestamp: new Date().toISOString()
    };

    return analysis;
}

function detectIntent(input) {
    const lowerInput = input.toLowerCase();

    if (lowerInput.match(/\b(learn|study|master|understand)\b/)) {
        return 'learning_request';
    } else if (lowerInput.match(/\b(what|how|why|when|where|explain)\b/)) {
        return 'question';
    } else if (lowerInput.match(/\b(help|assist|guide)\b/)) {
        return 'help_request';
    } else {
        return 'general_conversation';
    }
}

function extractEntities(input) {
    const entities = {};

    const topicMatch = input.match(/(?:learn|study|about|master)\s+([\w\s.#+-]+?)(?:\s+in|\s+for|,|$)/i);
    if (topicMatch) entities.topic = topicMatch[1].trim();

    const durationMatch = input.match(/(\d+)\s*(days?|weeks?|months?|hours?)/i);
    if (durationMatch) entities.duration = `${durationMatch[1]} ${durationMatch[2]}`;

    const levelMatch = input.match(/(beginner|intermediate|advanced|expert)/i);
    if (levelMatch) entities.level = levelMatch[0].toLowerCase();

    return entities;
}

// ============================================
// LAYER 2: STATE TRACKER
// ============================================
function updateConversationState(userInput, analysis) {
    const state = {
        messageCount: conversationHistory.length,
        lastIntent: analysis.intent,
        extractedInfo: analysis.entities,
        conversationContext: getConversationContext()
    };

    return state;
}

function getConversationContext() {
    const recentMessages = conversationHistory.slice(-6);
    const topics = new Set();

    recentMessages.forEach(msg => {
        if (msg.role === 'user') {
            const entities = extractEntities(msg.parts[0].text);
            if (entities.topic) topics.add(entities.topic);
        }
    });

    return {
        topics: Array.from(topics),
        messageCount: conversationHistory.length
    };
}

// ============================================
// LAYER 3: TASK PLANNER
// ============================================
function planResponse(state, analysis) {
    let strategy = {
        action: 'ai_response',
        requiresContext: true,
        temperature: 0.7
    };

    if (analysis.intent === 'learning_request') {
        strategy.action = 'create_learning_plan';
        strategy.temperature = 0.8;
    } else if (analysis.intent === 'question') {
        strategy.action = 'answer_question';
        strategy.temperature = 0.6;
    }

    return strategy;
}

// ============================================
// LAYER 4: AI RESPONSE GENERATOR (GEMINI)
// ============================================
async function generateAIResponse(userInput) {
    if (!API_KEY) {
        return {
            success: false,
            error: 'API key not configured. Please set your Gemini API key.',
            showConfig: true
        };
    }

    // Add user message to history
    conversationHistory.push({
        role: 'user',
        parts: [{ text: userInput }]
    });

    try {
        // Build conversation context for Gemini
        let fullPrompt = SYSTEM_PROMPT + "\n\nConversation:\n";

        // Add recent conversation history
        conversationHistory.slice(-10).forEach(msg => {
            const role = msg.role === 'user' ? 'User' : 'Assistant';
            fullPrompt += `${role}: ${msg.parts[0].text}\n`;
        });

        // Call Gemini API
        const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: fullPrompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const aiMessage = data.candidates[0].content.parts[0].text;

        // Add AI response to history
        conversationHistory.push({
            role: 'model',
            parts: [{ text: aiMessage }]
        });

        return {
            success: true,
            message: aiMessage,
            usage: { total_tokens: 'N/A (Gemini)' }
        };

    } catch (error) {
        console.error('AI Error:', error);
        return {
            success: false,
            error: error.message || 'Failed to get AI response'
        };
    }
}

// ============================================
// ORCHESTRATION FLOW
// ============================================
async function processInput(input) {
    if (isProcessing) return;

    isProcessing = true;
    const userMessage = input.trim();

    addMessage(userMessage, 'user');
    userInputEl.value = '';

    userInputEl.disabled = true;
    sendBtn.disabled = true;

    try {
        // STEP 1: Analyze Input
        updateUIStep(1, "Analyzing input...");
        await delay(300);
        const analysis = analyzeInput(userMessage);
        updateUIStep(1, JSON.stringify({
            intent: analysis.intent,
            entities: analysis.entities
        }, null, 2));

        // STEP 2: Update State
        updateUIStep(2, "Updating conversation state...");
        await delay(300);
        const state = updateConversationState(userMessage, analysis);
        updateUIStep(2, JSON.stringify({
            messages: state.messageCount,
            context: state.conversationContext
        }, null, 2));

        // STEP 3: Plan Response
        updateUIStep(3, "Planning response strategy...");
        await delay(300);
        const plan = planResponse(state, analysis);
        updateUIStep(3, JSON.stringify(plan, null, 2));

        // STEP 4: Generate AI Response
        updateUIStep(4, "Calling Gemini API...");

        const typingId = addTypingIndicator();
        const result = await generateAIResponse(userMessage);
        removeTypingIndicator(typingId);

        if (result.success) {
            updateUIStep(4, `✓ Response generated\nTokens: ${result.usage?.total_tokens || 'N/A'}`);
            addMessage(result.message, 'system');
        } else {
            updateUIStep(4, `✗ Error: ${result.error}`);

            if (result.showConfig) {
                showAPIKeyPrompt();
            } else {
                addMessage(`Sorry, I encountered an error: ${result.error}`, 'system', true);
            }
        }

    } catch (error) {
        console.error('Processing error:', error);
        updateUIStep(4, `✗ Error: ${error.message}`);
        addMessage('Sorry, something went wrong. Please try again.', 'system', true);
    } finally {
        isProcessing = false;
        userInputEl.disabled = false;
        sendBtn.disabled = false;
        userInputEl.focus();
    }
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================
function updateUIStep(step, text) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    stepData[step].innerText = text;
}

function addMessage(text, side, isError = false) {
    const msg = document.createElement('div');
    msg.className = `message ${side}${isError ? ' error' : ''}`;

    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    msg.innerHTML = `
        <div class="avatar">${side === 'user' ? '👤' : '🤖'}</div>
        <div class="content">${formattedText}</div>
    `;
    chatHistoryEl.appendChild(msg);
    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;

    return msg;
}

function addTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message system typing';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatHistoryEl.appendChild(indicator);
    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
    return 'typing-indicator';
}

function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) indicator.remove();
}

function showAPIKeyPrompt() {
    const modal = document.createElement('div');
    modal.className = 'api-key-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>🔑 Gemini API Key Required</h2>
            <p>To use real AI capabilities with Google Gemini (FREE!), you need an API key.</p>
            <p class="small">Get your free key from <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a></p>
            <input type="password" id="api-key-input" placeholder="Your Gemini API key..." />
            <div class="modal-buttons">
                <button id="save-key-btn" class="primary">Save Key</button>
                <button id="cancel-key-btn" class="secondary">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('save-key-btn').addEventListener('click', () => {
        const key = document.getElementById('api-key-input').value.trim();
        if (key) {
            API_KEY = key;
            localStorage.setItem('gemini_api_key', key);
            modal.remove();
            addMessage('Gemini API key saved! You can now chat with me for FREE!', 'system');
        }
    });

    document.getElementById('cancel-key-btn').addEventListener('click', () => {
        modal.remove();
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// EVENT LISTENERS
// ============================================
sendBtn.addEventListener('click', () => {
    const val = userInputEl.value.trim();
    if (val && !isProcessing) processInput(val);
});

userInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isProcessing) {
        const val = userInputEl.value.trim();
        if (val) processInput(val);
    }
});

// ============================================
// INITIALIZATION
// ============================================
window.addEventListener('load', () => {
    if (!API_KEY) {
        setTimeout(() => {
            addMessage('👋 Welcome! To enable FREE AI conversations with Google Gemini, please configure your API key. Click the message below to set it up.', 'system');

            const setupMsg = document.createElement('div');
            setupMsg.className = 'message system clickable';
            setupMsg.innerHTML = `
                <div class="avatar">⚙️</div>
                <div class="content">Click here to configure FREE Gemini API key</div>
            `;
            setupMsg.addEventListener('click', showAPIKeyPrompt);
            chatHistoryEl.appendChild(setupMsg);
        }, 500);
    }

    userInputEl.focus();
});
