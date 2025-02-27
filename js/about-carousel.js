class AboutCarousel {
    constructor() {
        this.carousel = document.getElementById('about-carousel');
        this.slides = this.carousel.querySelector('.flex');
        this.prevButton = document.getElementById('prev-about');
        this.nextButton = document.getElementById('next-about');
        this.indicators = this.carousel.querySelectorAll('[data-index]');
        this.currentIndex = 0;
        this.slideCount = 3;
        this.autoPlayInterval = null;

        this.initialize();
    }

    initialize() {
        // Botões de navegação
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());

        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto play
        this.startAutoPlay();

        // Pausa o autoplay quando o mouse está sobre o carrossel
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Atualiza indicador inicial
        this.updateIndicators();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateSlide();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlide();
    }

    updateSlide() {
        const offset = -this.currentIndex * 100;
        this.slides.style.transform = `translateX(${offset}%)`;
        this.updateIndicators();
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('bg-white');
                indicator.classList.remove('bg-white/60');
            } else {
                indicator.classList.remove('bg-white');
                indicator.classList.add('bg-white/60');
            }
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new AboutCarousel();
}); 