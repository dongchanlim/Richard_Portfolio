// Typewriter effect for hero subtitle
document.addEventListener('DOMContentLoaded', function() {
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (subtitleElement) {
        const text = subtitleElement.textContent;
        subtitleElement.textContent = '';
        subtitleElement.style.borderRight = '2px solid #00C4FF';
        subtitleElement.style.paddingRight = '5px';

        let charIndex = 0;
        const typingSpeed = 50; // milliseconds per character

        function typeWriter() {
            if (charIndex < text.length) {
                subtitleElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    subtitleElement.style.borderRight = 'none';
                }, 500);
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

// 섹션 스크롤 기반 색상 변경 효과
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

// 비디오 슬라이더 기능
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.video-slider-btn.prev');
    const nextBtn = document.querySelector('.video-slider-btn.next');
    let currentIndex = 0;
    
    // 초기 슬라이드 설정
    updateSlider();
    
    // 다음 슬라이드 버튼
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });
    
    // 이전 슬라이드 버튼
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });
    
    // 점(dot) 클릭 이벤트
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateSlider();
        });
    });
    
    // 슬라이더 업데이트 함수
    function updateSlider() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // 자동 슬라이드 설정 (5초마다)
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
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
                updateSlider();
            }, 5000);
        });
        
        // 터치 이벤트
        sliderContainer.addEventListener('touchstart', () => {
            clearInterval(slideInterval);
        }, {passive: true});
        
        sliderContainer.addEventListener('touchend', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
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
                updateSlider();
            } else if (touchEndX > touchStartX + 75) {
                // 오른쪽으로 스와이프
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            }
        }
    }
});

// 모달 기능
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.modal-close');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(`${modalId}-modal`);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            // Python 모달을 대체로 보여줌
            document.getElementById('python-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
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
