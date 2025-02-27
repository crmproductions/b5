class Sidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.openButton = document.getElementById('open-sidebar');
        this.closeButton = document.getElementById('sidebar-toggle');
        this.isOpen = false;
        this.overlay = this.createOverlay();
        
        this.initialize();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        return overlay;
    }

    initialize() {
        // Event listeners
        this.openButton.addEventListener('click', () => this.openSidebar());
        this.closeButton.addEventListener('click', () => this.closeSidebar());
        this.overlay.addEventListener('click', () => this.closeSidebar());

        // Fecha o menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSidebar();
            }
        });

        // Fecha o menu ao clicar em um link (em dispositivos móveis)
        document.querySelectorAll('#sidebar a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    this.closeSidebar();
                }
            });
        });

        // Previne scroll do body quando o menu está aberto em dispositivos móveis
        this.sidebar.addEventListener('touchmove', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    openSidebar() {
        this.sidebar.classList.add('sidebar-open');
        this.overlay.classList.add('active');
        this.openButton.classList.add('hidden');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }

    closeSidebar() {
        this.sidebar.classList.remove('sidebar-open');
        this.overlay.classList.remove('active');
        this.openButton.classList.remove('hidden');
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// Inicializa o sidebar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new Sidebar();
}); 