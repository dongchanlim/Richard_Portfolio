// 헤더 스크롤 효과
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // 스크롤 진행 표시기 업데이트
    updateScrollProgress();
});

// 스크롤 진행 표시기 함수
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    if (scrollProgress) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    }
}

// 스크롤 애니메이션 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 한 번 실행
    checkScrollAnimation();
    
    // 부드러운 스크롤 기능 추가
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") {
                // 홈으로 스크롤
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // 해당 섹션으로 스크롤
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 스크롤 진행 표시기 생성
    createScrollProgressBar();
});

// 스크롤 진행 표시기 생성 함수
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress-bar';
    
    progressBar.appendChild(progressIndicator);
    document.body.appendChild(progressBar);
}

// 페이지를 내릴 때 요소들이 화면에 나타나는 애니메이션
window.addEventListener('scroll', function() {
    checkScrollAnimation();
});

// 스크롤 감지하여 애니메이션 적용
function checkScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

// 페이지에 animate-on-scroll 클래스 추가
document.addEventListener('DOMContentLoaded', function() {
    // 각 섹션 타이틀에 애니메이션 추가
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('animate-on-scroll', 'fade-in-left');
    });
    
    // 카드에 순차적 애니메이션 추가
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
        card.classList.add('animate-on-scroll', 'fade-in-up');
    });
    
    // 히어로 컨텐츠에 애니메이션 추가
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-on-scroll', 'fade-in-right');
    }
    
    // 비디오 슬라이더에 애니메이션 추가
    const videoSlider = document.querySelector('.video-slider-container');
    if (videoSlider) {
        videoSlider.classList.add('animate-on-scroll', 'fade-in-left');
    }
    
    // 푸터에 애니메이션 추가
    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.add('animate-on-scroll', 'fade-in-up');
    }
    
    // 초기 애니메이션 실행
    setTimeout(checkScrollAnimation, 100);
});

// 스크롤 spy 기능 - 현재 보고 있는 섹션에 따라 해당하는 네비게이션 링크 활성화
window.addEventListener('scroll', function() {
    // 모든 섹션 가져오기
    const sections = document.querySelectorAll('section[id]');
    // 현재 스크롤 위치
    const scrollPosition = window.scrollY + 100; // 약간의 오프셋 추가
    
    // 각 섹션을 순회하며 현재 보이는 섹션 찾기
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // 현재 보이는 섹션인지 확인
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // 모든 네비게이션 링크에서 active 클래스 제거
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // 현재 섹션에 해당하는 네비게이션 링크에 active 클래스 추가
            document.querySelector(`.nav-links a[href="#${sectionId}"]`).classList.add('active');
        }
    });
    
    // 페이지 상단에 있을 때 홈 링크 활성화
    if (scrollPosition < 300) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('.nav-links a[href="#"]').classList.add('active');
    }
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
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -800, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 800, behavior: 'smooth' });
    });
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
});// 헤더 스크롤 효과
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 스크롤 spy 기능 - 현재 보고 있는 섹션에 따라 해당하는 네비게이션 링크 활성화
window.addEventListener('scroll', function() {
    // 모든 섹션 가져오기
    const sections = document.querySelectorAll('section[id]');
    // 현재 스크롤 위치
    const scrollPosition = window.scrollY + 100; // 약간의 오프셋 추가
    
    // 각 섹션을 순회하며 현재 보이는 섹션 찾기
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // 현재 보이는 섹션인지 확인
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // 모든 네비게이션 링크에서 active 클래스 제거
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // 현재 섹션에 해당하는 네비게이션 링크에 active 클래스 추가
            document.querySelector(`.nav-links a[href="#${sectionId}"]`).classList.add('active');
        }
    });
    
    // 페이지 상단에 있을 때 홈 링크 활성화
    if (scrollPosition < 300) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('.nav-links a[href="#"]').classList.add('active');
    }
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
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -800, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 800, behavior: 'smooth' });
    });
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
});// 헤더 스크롤 효과
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -800, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 800, behavior: 'smooth' });
    });
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
});// 헤더 스크롤 효과
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -800, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 800, behavior: 'smooth' });
    });
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
});// 헤더 스크롤 효과
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -800, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 800, behavior: 'smooth' });
    });
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
