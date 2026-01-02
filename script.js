// State Management
let agentState = {
    topic: null,
    duration: null,
    level: 'beginner',
    isComplete: false,
    history: []
};

const chatHistoryEl = document.getElementById('chat-history');
const userInputEl = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const stepData = {
    1: document.getElementById('data-understanding'),
    2: document.getElementById('data-state'),
    3: document.getElementById('data-planner'),
    4: document.getElementById('data-generator')
};

// --- Layer 1: Input Understanding ---
function inputUnderstanding(input) {
    // Simulated Prompt: "Extract topic, duration, and level from: {input}"
    const topicMatch = input.match(/(?:learn|study|about|master)\s+([\w\s.#]+)/i);
    const durationMatch = input.match(/(\d+)\s*(days|weeks|months|hours)/i);
    const levelMatch = input.match(/(beginner|intermediate|advanced|expert)/i);

    return {
        extractedTopic: topicMatch ? topicMatch[1].trim() : null,
        extractedDuration: durationMatch ? `${durationMatch[1]} ${durationMatch[2]}` : null,
        extractedLevel: levelMatch ? levelMatch[0].toLowerCase() : null
    };
}

// --- Layer 2: State Tracker ---
function stateTracker(extractedInfo) {
    if (extractedInfo.extractedTopic) agentState.topic = extractedInfo.extractedTopic;
    if (extractedInfo.extractedDuration) agentState.duration = extractedInfo.extractedDuration;
    if (extractedInfo.extractedLevel) agentState.level = extractedInfo.extractedLevel;

    const missing = [];
    if (!agentState.topic) missing.push('topic');
    if (!agentState.duration) missing.push('duration');

    agentState.isComplete = missing.length === 0;

    return {
        currentState: { ...agentState },
        missingFields: missing
    };
}

// --- Layer 3: Task Planner ---
function taskPlanner(stateInfo) {
    if (!stateInfo.currentState.topic) {
        return "ASK_FOR_TOPIC";
    }
    if (!stateInfo.currentState.duration) {
        return "ASK_FOR_DURATION";
    }
    return "GENERATE_PLAN";
}

// --- Layer 4: Output Generator ---
function outputGenerator(plan, stateInfo) {
    const { topic, duration, level } = stateInfo.currentState;

    if (plan === "ASK_FOR_TOPIC") {
        return "That sounds exciting! What exactly would you like to learn today?";
    }
    if (plan === "ASK_FOR_DURATION") {
        return `I've noted you want to learn ${topic}. How much time (e.g., 5 days, 2 weeks) do you want to dedicate to this?`;
    }

    // Default: GENERATE_PLAN
    const curriculums = {
        'Python': [
            "Day 1: Basics, Variables & Types",
            "Day 2: Control Flow (If/Else, Loops)",
            "Day 3: Functions & Modules",
            "Day 4: Data Structures (Lists, Dicts)",
            "Day 5: Capstone Project (Simple CLI App)"
        ],
        'React': [
            "Day 1: JSX & Components",
            "Day 2: Props & State management",
            "Day 3: Hooks (useEffect, useState)",
            "Day 4: API Integration & Routing",
            "Day 5: Build a Todo App"
        ],
        'default': [
            "Phase 1: Fundamental concepts and setup",
            "Phase 2: Intermediate techniques and patterns",
            "Phase 3: Real-world application and building",
            "Phase 4: Optimization and deep dive",
            "Phase 5: Final project and review"
        ]
    };

    const days = parseInt(duration) || 5;
    const items = curriculums[topic] || curriculums['default'];

    let resp = `Perfect! Here is your ${duration} ${level} plan for **${topic}**:\n\n`;
    for(let i=1; i<=days; i++) {
        const item = items[i-1] || `Day ${i}: Advanced ${topic} implementation and practice`;
        resp += `- ${item}\n`;
    }
    resp += `\nReady to get started?`;
    return resp;
}

// --- Orchestration Flow ---
async function processInput(input) {
    addMessage(input, 'user');
    userInputEl.value = '';

    // Step 1: Understanding
    updateUIStep(1, "Analyzing...");
    const understanding = inputUnderstanding(input);
    await delay(600);
    updateUIStep(1, JSON.stringify(understanding, null, 2));

    // Step 2: State
    updateUIStep(2, "Updating...");
    const stateInfo = stateTracker(understanding);
    await delay(600);
    updateUIStep(2, JSON.stringify(stateInfo, null, 2));

    // Step 3: Planner
    updateUIStep(3, "Planning...");
    const plan = taskPlanner(stateInfo);
    await delay(600);
    updateUIStep(3, `Next Action: ${plan}`);

    // Step 4: Generator
    updateUIStep(4, "Generating...");
    const output = outputGenerator(plan, stateInfo);
    await delay(600);
    updateUIStep(4, "Response Ready.");

    addMessage(output, 'system');
}

// UI Helpers
function updateUIStep(step, text) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    stepData[step].innerText = text;
}

function addMessage(text, side) {
    const msg = document.createElement('div');
    msg.className = `message ${side}`;
    msg.innerHTML = `
        <div class="avatar">${side === 'user' ? '👤' : '🤖'}</div>
        <div class="content">${text.replace(/\n/g, '<br>')}</div>
    `;
    chatHistoryEl.appendChild(msg);
    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
}

function delay(ms) { return new Promise(res => setTimeout(res, ms)); }

sendBtn.addEventListener('click', () => {
    const val = userInputEl.value.trim();
    if (val) processInput(val);
});

userInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const val = userInputEl.value.trim();
        if (val) processInput(val);
    }
});
