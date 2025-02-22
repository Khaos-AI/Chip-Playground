const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Replace with your actual API endpoint and key
const API_ENDPOINT = 'YOUR_LLM_API_ENDPOINT';
const API_KEY = 'YOUR_API_KEY';

function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                prompt: message,
                // Add other required parameters based on your LLM API
            })
        });

        const data = await response.json();
        addMessage(data.response, false);
    } catch (error) {
        addMessage("Please connect the AI API key to begin", false);
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Add initial welcome message when page loads
window.addEventListener('DOMContentLoaded', () => {
    addMessage("Hey there! I'm Chip, your AI guide through Project Khaos. Connect my API key and let's start chatting!", false);
});
