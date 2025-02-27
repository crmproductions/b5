class ThemeToggle {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.lightIcon = document.getElementById('theme-toggle-light-icon');
        this.darkIcon = document.getElementById('theme-toggle-dark-icon');
        
        this.initialize();
    }

    initialize() {
        // Verifica tema inicial
        if (localStorage.getItem('color-theme') === 'dark' || 
            (!('color-theme' in localStorage) && 
             window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            this.darkIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            this.lightIcon.classList.remove('hidden');
        }

        // Adiciona evento de clique
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        // Toggle ícones
        this.darkIcon.classList.toggle('hidden');
        this.lightIcon.classList.toggle('hidden');

        // Toggle tema
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    }
}

// Inicializa o toggle de tema quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
}); 