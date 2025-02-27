class ChatBot {
    constructor() {
        this.chatButton = document.getElementById('chat-button');
        this.chatWindow = document.getElementById('chat-window');
        this.closeChat = document.getElementById('close-chat');
        this.chatMessages = document.getElementById('chat-messages');
        
        this.initialize();
    }

    initialize() {
        // Inicializa os event listeners
        this.chatButton.addEventListener('click', () => this.toggleChat());
        this.closeChat.addEventListener('click', () => this.closeWindow());
    }

    toggleChat() {
        this.chatWindow.classList.remove('hidden');
        this.chatButton.classList.add('hidden');
        
        // Limpa mensagens anteriores
        this.chatMessages.innerHTML = '';
        
        // Inicia a sequência de mensagens
        this.startMessageSequence();
    }

    closeWindow() {
        this.chatWindow.classList.add('hidden');
        this.chatButton.classList.remove('hidden');
    }

    showTypingAnimation() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-animation';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.chatMessages.appendChild(typingDiv);
        return typingDiv;
    }

    showBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.textContent = message;
        return messageDiv;
    }

    startMessageSequence() {
        const typingAnimation = this.showTypingAnimation();
        
        setTimeout(() => {
            typingAnimation.remove();
            this.chatMessages.appendChild(
                this.showBotMessage('Olá, em que podemos ajudá-lo?')
            );
        }, 2000);
    }
}

// Inicializa o chat quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
}); 