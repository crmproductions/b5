class ProfileManager {
    constructor() {
        this.modal = document.getElementById('profile-modal');
        this.form = document.getElementById('profile-form');
        this.profileImage = document.getElementById('profile-image');
        this.profilePreview = document.getElementById('profile-preview');
        this.sidebarImage = document.getElementById('sidebar-profile-image');
        this.nameInput = document.getElementById('profile-name');
        this.nameDisplay = document.getElementById('profile-name-display');
        
        if (!this.modal || !this.form || !this.profileImage || !this.profilePreview || 
            !this.sidebarImage || !this.nameInput || !this.nameDisplay) {
            console.error('Elementos necessários não encontrados');
            return;
        }
        
        this.initialize();
    }

    initialize() {
        // Abrir modal ao clicar na foto
        const editProfilePhoto = document.getElementById('edit-profile-photo');
        if (editProfilePhoto) {
            editProfilePhoto.addEventListener('click', () => this.openModal());
        }

        // Fechar modal
        document.getElementById('close-profile-modal').addEventListener('click', () => {
            this.closeModal();
        });
        document.getElementById('cancel-profile-edit').addEventListener('click', () => {
            this.closeModal();
        });

        // Clicar na foto no modal para upload
        this.profilePreview.parentElement.addEventListener('click', () => {
            this.profileImage.click();
        });

        // Preview da nova foto
        this.profileImage.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.profilePreview.src = e.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        // Salvar alterações
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveChanges();
        });

        // Fechar modal ao clicar fora
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.classList.remove('hidden');
        // Reset form
        this.profilePreview.src = this.sidebarImage.src;
        this.nameInput.value = this.nameDisplay.textContent;
    }

    closeModal() {
        this.modal.classList.add('hidden');
    }

    saveChanges() {
        try {
            // Atualizar foto
            if (this.profilePreview.src !== this.sidebarImage.src) {
                this.sidebarImage.src = this.profilePreview.src;
            }

            // Atualizar nome
            const newName = this.nameInput.value.trim();
            if (newName && newName !== this.nameDisplay.textContent) {
                this.nameDisplay.textContent = newName;
            }

            // Fechar modal
            this.closeModal();

            // Feedback visual
            this.showToast('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            this.showToast('Erro ao atualizar perfil', 'error');
        }
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        toast.className = `fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 translate-y-full`;
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.transform = 'translateY(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
}); 