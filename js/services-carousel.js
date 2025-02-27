class ServicesCarousel {
    constructor() {
        this.currentSlide = 0;
        this.track = document.querySelector('.services-track');
        this.slides = document.querySelectorAll('.service-slide');
        this.prevButton = document.getElementById('prev-service');
        this.nextButton = document.getElementById('next-service');
        this.modal = document.getElementById('service-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalSubtitle = document.getElementById('modal-subtitle');
        this.modalDescription = document.getElementById('modal-description');
        this.closeModal = document.getElementById('close-modal');

        this.services = {
            service1: {
                title: "Gestão Digital",
                subtitle: "Transforme sua administração",
                description: "Nossa solução de gestão digital oferece ferramentas completas para modernizar sua administração municipal. Inclui módulos de gestão financeira, recursos humanos, processos digitais e muito mais."
            },
            service2: {
                title: "Atendimento Online",
                subtitle: "Conecte-se com os cidadãos",
                description: "Plataforma integrada de atendimento que permite aos cidadãos acessarem serviços municipais, fazerem solicitações e acompanharem processos, tudo de forma online e simplificada."
            },
            service3: {
                title: "Documentação Digital",
                subtitle: "Gestão eletrônica de documentos",
                description: "Sistema completo para digitalização, organização e gestão de documentos municipais. Inclui assinatura digital, workflow de aprovações e arquivo digital seguro."
            },
            service4: {
                title: "Gestão Financeira",
                subtitle: "Controle orçamentário eficiente",
                description: "Ferramentas avançadas para gestão financeira municipal, incluindo controle orçamentário, gestão de despesas, receitas e integração com sistemas governamentais."
            },
            service5: {
                title: "Gestão de Projetos",
                subtitle: "Acompanhamento e controle de projetos",
                description: "Plataforma para gerenciamento de projetos municipais, com acompanhamento de cronogramas, recursos, metas e resultados em tempo real."
            },
            service6: {
                title: "Recursos Humanos",
                subtitle: "Gestão completa de pessoal",
                description: "Sistema integrado para gestão de recursos humanos, incluindo folha de pagamento, ponto eletrônico, férias, benefícios e avaliações de desempenho."
            },
            service7: {
                title: "Infraestrutura Digital",
                subtitle: "Soluções em tecnologia",
                description: "Soluções completas em infraestrutura digital, incluindo servidores, redes, segurança da informação e suporte técnico especializado."
            }
        };

        this.initialize();
    }

    initialize() {
        this.prevButton.addEventListener('click', () => this.previousSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        this.closeModal.addEventListener('click', () => this.hideModal());

        document.querySelectorAll('.service-details-btn').forEach(button => {
            button.addEventListener('click', (e) => this.showServiceDetails(e.target.dataset.service));
        });

        // Fecha o modal ao clicar fora dele
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hideModal();
        });

        this.updateSlidePosition();
    }

    updateSlidePosition() {
        const slideWidth = this.slides[0].offsetWidth;
        this.track.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
        this.updateButtons();
    }

    updateButtons() {
        this.prevButton.style.display = this.currentSlide === 0 ? 'none' : 'block';
        this.nextButton.style.display = this.currentSlide === this.slides.length - 1 ? 'none' : 'block';
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
            this.updateSlidePosition();
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlidePosition();
        }
    }

    showServiceDetails(serviceId) {
        const service = this.services[serviceId];
        if (service) {
            this.modalTitle.textContent = service.title;
            this.modalSubtitle.textContent = service.subtitle;
            this.modalDescription.textContent = service.description;
            this.modal.classList.remove('hidden');
            this.modal.classList.add('active');
        }
    }

    hideModal() {
        this.modal.classList.remove('active');
        this.modal.classList.add('hidden');
    }
}

// Inicializa o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ServicesCarousel();
}); 