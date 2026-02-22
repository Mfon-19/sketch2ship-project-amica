document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    // State Management
    let chatHistory = [];

    // View Switching
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const target = btn.getAttribute('data-view');
            views.forEach(v => v.classList.add('hidden'));
            document.getElementById(`${target}-view`).classList.remove('hidden');

            if (target === 'memory') renderMemories();
        });
    });

    // Chat Functionality
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        chatHistory.push({ role: sender, content: text });
        // REQ-201: Simple Context Window Management
        if (chatHistory.length > 20) chatHistory.shift();
    }

    async function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        userInput.value = '';
        addMessage(text, 'user');

        // REQ-102: Extract and store facts before responding
        MemoryManager.extractFact(text);

        // Simulate AI Thinking
        setTimeout(() => {
            const context = MemoryManager.getRelevantMemories(text);
            const persona = PersonaManager.getSettings();
            const response = PersonaManager.generateResponse(text, context);
            addMessage(response, 'ai');
        }, 800);
    }

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Initial Greeting
    setTimeout(() => {
        const persona = PersonaManager.getSettings();
        addMessage(`Hello. I am ${persona.name}. How are you feeling today?`, 'ai');
    }, 500);
});