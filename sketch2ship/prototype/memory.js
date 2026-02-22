const MemoryManager = {
    storageKey: 'amica_memories',
    
    getMemories() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    },

    saveMemories(mems) {
        localStorage.setItem(this.storageKey, JSON.stringify(mems));
    },

    // REQ-102: Simulated fact extraction (simplified RAG logic)
    extractFact(text) {
        const keywords = ['my name is', 'i love', 'i feel', 'i am a', 'favorite'];
        let learned = false;
        
        keywords.forEach(kw => {
            if (text.toLowerCase().includes(kw)) {
                const memories = this.getMemories();
                if (!memories.includes(text)) {
                    memories.push(text);
                    this.saveMemories(memories);
                    learned = true;
                }
            }
        });
        return learned;
    },

    getRelevantMemories(query) {
        const memories = this.getMemories();
        // Simple keyword match simulation for vector search
        return memories.filter(m => 
            query.split(' ').some(word => word.length > 3 && m.toLowerCase().includes(word.toLowerCase()))
        ).slice(0, 3);
    },

    clear() {
        localStorage.removeItem(this.storageKey);
        renderMemories();
    }
};

function renderMemories() {
    const list = document.getElementById('memory-list');
    if (!list) return;
    const memories = MemoryManager.getMemories();
    list.innerHTML = memories.map(m => `<li>"${m}"</li>`).join('') || '<li>No memories yet. Talk to me!</li>';
}

document.getElementById('clear-memory')?.addEventListener('click', () => MemoryManager.clear());