const PersonaManager = {
    storageKey: 'amica_persona',
    
    default: {
        name: 'Amica',
        trait: 'empathetic',
        style: 'Soft spoken, uses gentle language, and asks follow-up questions about feelings.'
    },

    getSettings() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || this.default;
    },

    saveSettings(settings) {
        localStorage.setItem(this.storageKey, JSON.stringify(settings));
        this.updateUI();
    },

    updateUI() {
        const s = this.getSettings();
        document.getElementById('active-persona-name').textContent = s.name;
        document.getElementById('active-persona-desc').textContent = `Your ${s.trait} companion`;
    },

    // ISSUE-02: Persona Drift Prevention
    // This generates a prompt "anchor" for the simulated response
    generateResponse(userInput, context) {
        const s = this.getSettings();
        const contextStr = context.length > 0 ? ` [Memory: ${context.join('. ')}]` : '';
        
        const responses = {
            empathetic: ["I hear you. That sounds difficult, but I'm here.", "How does that make you feel?", "Thank you for sharing that with me."],
            intellectual: ["That's a fascinating perspective.", "I wonder what the implications of that are?", "Tell me more about the logic behind that."],
            playful: ["Haha, you always know how to brighten the mood!", "Is that a challenge? I'm ready!", "Ooh, tell me more!"]
        };

        const choices = responses[s.trait] || responses.empathetic;
        const base = choices[Math.floor(Math.random() * choices.length)];
        
        return `${base}${contextStr}`;
    }
};

// Init Persona UI
document.getElementById('save-persona')?.addEventListener('click', () => {
    const settings = {
        name: document.getElementById('p-name').value,
        trait: document.getElementById('p-trait').value,
        style: document.getElementById('p-style').value
    };
    PersonaManager.saveSettings(settings);
    alert('Persona updated successfully.');
});