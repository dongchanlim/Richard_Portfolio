// 히어로 서브 타이틀 타이프라이터 효괴
document.addEventListener('DOMContentLoaded', function() {
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (subtitleElement) {
        const text = subtitleElement.textContent;
        subtitleElement.textContent = '';

        let charIndex = 0;
        const typingSpeed = 50; // milliseconds per character

        function typeWriter() {
            if (charIndex < text.length) {
                subtitleElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        // Start typing effect
        typeWriter();
    }
});

// 헤더 스크롤 효과
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 섹션 스크롤 기반 섹션 헤더 색상 변경 효과
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const header = document.getElementById('header');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all sections
                sections.forEach(section => {
                    section.classList.remove('section-active');
                });
                // Add active class to the current section
                entry.target.classList.add('section-active');

                // Update header color based on active section
                header.classList.remove('header-stage1', 'header-stage2', 'header-stage3', 'header-stage4');

                if (entry.target.classList.contains('stage1')) {
                    header.classList.add('header-stage1');
                } else if (entry.target.classList.contains('stage2')) {
                    header.classList.add('header-stage2');
                } else if (entry.target.classList.contains('stage3')) {
                    header.classList.add('header-stage3');
                } else if (entry.target.classList.contains('stage4')) {
                    header.classList.add('header-stage4');
                }

                // Update nav links
                const sectionId = entry.target.getAttribute('id');
                if (sectionId) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    
        // 메뉴 항목 클릭 시 메뉴 닫기
        navLinksItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    
        // 메뉴 외부 클릭 시 메뉴 닫기
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
                navLinks.classList.remove('active');
            }
        });
    }
});

// 슬라이더 컨트롤
document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.card-slider');
    const prevBtn = container.querySelector('.slider-prev');
    const nextBtn = container.querySelector('.slider-next');

    // 수동 컨트롤
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -800, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 800, behavior: 'smooth' });
    });

    // 자동 슬라이드 설정 (5초마다 오른쪽으로 이동)
    let autoSlideInterval = setInterval(() => {
        // 현재 스크롤 위치 확인
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        if (slider.scrollLeft >= maxScroll - 10) {
            // 끝에 도달하면 처음으로 돌아감
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // 오른쪽으로 이동
            slider.scrollBy({ left: 800, behavior: 'smooth' });
        }
    }, 5000);

    // 마우스 오버 시 자동 슬라이드 멈춤
    container.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // 마우스 아웃 시 자동 슬라이드 재개
    container.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;

            if (slider.scrollLeft >= maxScroll - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: 800, behavior: 'smooth' });
            }
        }, 5000);
    });

    // 터치 시작 시 자동 슬라이드 멈춤
    container.addEventListener('touchstart', () => {
        clearInterval(autoSlideInterval);
    }, {passive: true});

    // 터치 종료 시 자동 슬라이드 재개
    container.addEventListener('touchend', () => {
        autoSlideInterval = setInterval(() => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;

            if (slider.scrollLeft >= maxScroll - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: 800, behavior: 'smooth' });
            }
        }, 5000);
    }, {passive: true});
});

// 피처 슬라이더 컨트롤
document.addEventListener('DOMContentLoaded', function() {
    const featuresContainer = document.querySelector('.features-slider-container');

    if (featuresContainer) {
        const featuresSlider = featuresContainer.querySelector('.features-grid');
        const prevBtn = featuresContainer.querySelector('.features-slider-prev');
        const nextBtn = featuresContainer.querySelector('.features-slider-next');

        if (featuresSlider && prevBtn && nextBtn) {
            // 수동 컨트롤
            prevBtn.addEventListener('click', () => {
                featuresSlider.scrollBy({ left: -400, behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                featuresSlider.scrollBy({ left: 400, behavior: 'smooth' });
            });

            // 자동 슬라이드 설정 (5초마다 오른쪽으로 이동)
            let autoSlideInterval = setInterval(() => {
                const maxScroll = featuresSlider.scrollWidth - featuresSlider.clientWidth;

                if (featuresSlider.scrollLeft >= maxScroll - 10) {
                    featuresSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    featuresSlider.scrollBy({ left: 400, behavior: 'smooth' });
                }
            }, 5000);

            // 마우스 오버 시 자동 슬라이드 멈춤
            featuresContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            // 마우스 아웃 시 자동 슬라이드 재개
            featuresContainer.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    const maxScroll = featuresSlider.scrollWidth - featuresSlider.clientWidth;

                    if (featuresSlider.scrollLeft >= maxScroll - 10) {
                        featuresSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        featuresSlider.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                }, 5000);
            });

            // 터치 시작 시 자동 슬라이드 멈춤
            featuresContainer.addEventListener('touchstart', () => {
                clearInterval(autoSlideInterval);
            }, {passive: true});

            // 터치 종료 시 자동 슬라이드 재개
            featuresContainer.addEventListener('touchend', () => {
                autoSlideInterval = setInterval(() => {
                    const maxScroll = featuresSlider.scrollWidth - featuresSlider.clientWidth;

                    if (featuresSlider.scrollLeft >= maxScroll - 10) {
                        featuresSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        featuresSlider.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                }, 5000);
            }, {passive: true});
        }
    }
});

// 비디오 슬라이더 기능
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.video-slide');
    let currentIndex = 0;

    // 초기 슬라이드 설정
    updateMainSlider();

    // 슬라이더 업데이트 함수 (main page slider only)
    function updateMainSlider() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    // 자동 슬라이드 설정 (5초마다)
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateMainSlider();
    }, 5000);

    // 마우스 오버 또는 터치 시 자동 슬라이드 멈춤
    const sliderContainer = document.querySelector('.video-slider-container');

    if (sliderContainer) {
        // 마우스 이벤트
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateMainSlider();
            }, 5000);
        });

        // 터치 이벤트
        sliderContainer.addEventListener('touchstart', () => {
            clearInterval(slideInterval);
        }, {passive: true});

        sliderContainer.addEventListener('touchend', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateMainSlider();
            }, 5000);
        }, {passive: true});

        // 스와이프 기능 추가
        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        function handleSwipe() {
            // 75px 이상 차이가 나면 스와이프로 인식
            if (touchEndX < touchStartX - 75) {
                // 왼쪽으로 스와이프
                currentIndex = (currentIndex + 1) % slides.length;
                updateMainSlider();
            } else if (touchEndX > touchStartX + 75) {
                // 오른쪽으로 스와이프
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateMainSlider();
            }
        }
    }

    // Video slide modal functionality with slider controls
    const videoSlides = document.querySelectorAll('.video-slide');
    const videoModal = document.getElementById('video-slide-modal');
    const videoModalImage = document.getElementById('video-modal-image');
    const videoModalTitle = document.getElementById('video-modal-title');
    const modalDots = videoModal ? videoModal.querySelectorAll('.video-slider-dots .dot') : [];
    const modalPrevBtn = videoModal ? videoModal.querySelector('.video-slider-btn.prev') : null;
    const modalNextBtn = videoModal ? videoModal.querySelector('.video-slider-btn.next') : null;

    let modalCurrentIndex = 0;

    // Update modal content based on current index
    function updateModalContent() {
        const currentSlide = slides[modalCurrentIndex];
        if (currentSlide) {
            const thumbnail = currentSlide.querySelector('.video-thumbnail');
            const title = currentSlide.querySelector('.video-title');

            if (thumbnail && videoModalImage) {
                videoModalImage.src = thumbnail.src;
            }
            if (title && videoModalTitle) {
                videoModalTitle.textContent = title.textContent;
            }
        }

        // Update dots
        modalDots.forEach((dot, index) => {
            if (index === modalCurrentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Modal prev button
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => {
            modalCurrentIndex = (modalCurrentIndex - 1 + slides.length) % slides.length;
            updateModalContent();
        });
    }

    // Modal next button
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            modalCurrentIndex = (modalCurrentIndex + 1) % slides.length;
            updateModalContent();
        });
    }

    // Modal dot click events
    modalDots.forEach(dot => {
        dot.addEventListener('click', () => {
            modalCurrentIndex = parseInt(dot.getAttribute('data-index'));
            updateModalContent();
        });
    });

    // Open modal when video slide is clicked
    videoSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            modalCurrentIndex = index;
            updateModalContent();

            if (videoModal) {
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
});

// 모달 기능
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.modal-close');

// Card info modal elements
const cardInfoModal = document.getElementById('card-info-modal');
const cardModalImage = document.getElementById('card-modal-image');
const cardModalTitle = document.getElementById('card-modal-title');
const cardModalSubtitle = document.getElementById('card-modal-subtitle');
const cardModalTags = document.getElementById('card-modal-tags');
const cardModalDescription = document.getElementById('card-modal-description');
const modalPrevBtn = document.getElementById('modal-prev-btn');
const modalNextBtn = document.getElementById('modal-next-btn');
const modalSliderDots = document.getElementById('modal-slider-dots');

// Track current section cards and index
let currentSectionCards = [];
let currentCardIndex = 0;

// Function to populate modal with card content
function populateModal(card) {
    const cardImage = card.querySelector('.card-image');
    const cardOverlay = card.querySelector('.card-overlay');
    const cardInfo = card.querySelector('.card-info');

    // Get overlay info
    const overlayTitle = cardOverlay ? cardOverlay.querySelector('.card-title') : null;
    const overlaySubtitle = cardOverlay ? cardOverlay.querySelector('.card-subtitle') : null;
    const stageIndicator = cardOverlay ? cardOverlay.querySelector('.stage-indicator') : null;

    // Get card-info content
    const infoTitle = cardInfo ? cardInfo.querySelector('.card-title') : null;
    const infoTags = cardInfo ? cardInfo.querySelector('.card-tags') : null;
    const infoDescription = cardInfo ? cardInfo.querySelector('.card-description') : null;

    // Populate modal with card content
    if (cardImage) {
        cardModalImage.src = cardImage.src;
    }

    // Use card-info title if available, otherwise use overlay title
    if (infoTitle) {
        cardModalTitle.textContent = infoTitle.textContent;
    } else if (overlayTitle) {
        cardModalTitle.textContent = overlayTitle.textContent;
    }

    // Set subtitle from overlay
    if (overlaySubtitle) {
        cardModalSubtitle.textContent = overlaySubtitle.textContent;
    } else if (stageIndicator) {
        cardModalSubtitle.textContent = stageIndicator.textContent;
    } else {
        cardModalSubtitle.textContent = '';
    }

    // Set tags
    if (infoTags) {
        cardModalTags.innerHTML = infoTags.innerHTML;
    } else {
        cardModalTags.innerHTML = '';
    }

    // Set description
    if (infoDescription) {
        cardModalDescription.textContent = infoDescription.textContent;
    } else {
        cardModalDescription.textContent = '';
    }

    // Update dots
    updateModalDots();
}

// Function to generate and update dots
function generateModalDots() {
    modalSliderDots.innerHTML = '';
    currentSectionCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentCardIndex) {
            dot.classList.add('active');
        }
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => {
            currentCardIndex = index;
            populateModal(currentSectionCards[currentCardIndex]);
        });
        modalSliderDots.appendChild(dot);
    });
}

// Function to update active dot
function updateModalDots() {
    const dots = modalSliderDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentCardIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Navigate to previous card
modalPrevBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + currentSectionCards.length) % currentSectionCards.length;
    populateModal(currentSectionCards[currentCardIndex]);
});

// Navigate to next card
modalNextBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % currentSectionCards.length;
    populateModal(currentSectionCards[currentCardIndex]);
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Find the card-slider section this card belongs to
        const cardSlider = card.closest('.card-slider');
        if (cardSlider) {
            currentSectionCards = Array.from(cardSlider.querySelectorAll('.card'));
            currentCardIndex = currentSectionCards.indexOf(card);
        } else {
            currentSectionCards = [card];
            currentCardIndex = 0;
        }

        // Generate dots for this section
        generateModalDots();

        // Populate modal with clicked card content
        populateModal(card);

        // Show the card info modal
        cardInfoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// 모달 외부 클릭 시 닫기
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
