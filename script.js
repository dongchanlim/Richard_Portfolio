/* ============================================================================
   Richard Lim's Portfolio - JavaScript
   ============================================================================

   목차 (Table of Contents):
   1. 히어로 섹션 - 타이프라이터 효과
   2. 헤더 - 스크롤 효과
   3. 섹션 관찰자 - 스크롤 기반 색상 변경
   4. 카드 슬라이더 컨트롤
   5. 특성(Trait) 슬라이더 컨트롤
   6. 대시보드 슬라이더 - 자동 슬라이드
   7. 대시보드 슬라이드 모달
   8. 카드 모달 기능

============================================================================ */


/* ============================================================================
   1. 히어로 섹션 - 타이프라이터 효과
   히어로 서브타이틀에 타이핑 애니메이션을 적용합니다.
============================================================================ */
document.addEventListener('DOMContentLoaded', function() {
    const subtitleElement = document.querySelector('.hero-subtitle');

    if (subtitleElement) {
        const text = subtitleElement.textContent;
        subtitleElement.textContent = '';

        let charIndex = 0;
        const typingSpeed = 50; // 글자당 밀리초

        // 타이프라이터 함수 - 한 글자씩 표시
        function typeWriter() {
            if (charIndex < text.length) {
                subtitleElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        // 타이핑 효과 시작
        typeWriter();
    }
});


/* ============================================================================
   2. 헤더 - 스크롤 효과
   스크롤 시 헤더 배경색을 변경합니다.
============================================================================ */
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');

    // 50px 이상 스크롤하면 배경색 추가
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


/* ============================================================================
   3. 섹션 관찰자 - 스크롤 기반 색상 변경
   Intersection Observer를 사용하여 현재 보이는 섹션에 따라 헤더 색상을 변경합니다.
============================================================================ */
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const header = document.getElementById('header');

    // 관찰자 옵션 설정
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',  // 상하 20% 여백
        threshold: 0.3  // 30% 이상 보이면 활성화
    };

    // 섹션 관찰자 생성
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 모든 섹션에서 활성 클래스 제거
                sections.forEach(section => {
                    section.classList.remove('section-active');
                });

                // 현재 섹션에 활성 클래스 추가
                entry.target.classList.add('section-active');

                // 헤더 색상 클래스 업데이트
                header.classList.remove(
                    'header-section-experience',
                    'header-section-skills',
                    'header-section-awards',
                    'header-section-projects'
                );

                // 섹션별 헤더 색상 적용
                if (entry.target.classList.contains('section-experience')) {
                    header.classList.add('header-section-experience');
                } else if (entry.target.classList.contains('section-skills')) {
                    header.classList.add('header-section-skills');
                } else if (entry.target.classList.contains('section-awards')) {
                    header.classList.add('header-section-awards');
                } else if (entry.target.classList.contains('section-projects')) {
                    header.classList.add('header-section-projects');
                }

                // 네비게이션 링크 활성화 상태 업데이트
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

    // 모든 섹션 관찰 시작
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});


/* ============================================================================
   4. 카드 슬라이더 컨트롤
   경력/스킬/수상/프로젝트 카드 슬라이더의 수동 및 자동 컨트롤을 처리합니다.
============================================================================ */
document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.card-slider');
    const prevBtn = container.querySelector('.slider-prev');
    const nextBtn = container.querySelector('.slider-next');

    // 수동 컨트롤 - 이전 버튼
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -800, behavior: 'smooth' });
    });

    // 수동 컨트롤 - 다음 버튼
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 800, behavior: 'smooth' });
    });

    // 자동 슬라이드 설정 (5초마다 오른쪽으로 이동)
    let autoSlideInterval = setInterval(() => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        // 끝에 도달하면 처음으로 돌아감
        if (slider.scrollLeft >= maxScroll - 10) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: 800, behavior: 'smooth' });
        }
    }, 5000);

    // 마우스 오버 시 자동 슬라이드 일시 정지
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

    // 터치 시작 시 자동 슬라이드 일시 정지
    container.addEventListener('touchstart', () => {
        clearInterval(autoSlideInterval);
    }, { passive: true });

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
    }, { passive: true });
});


/* ============================================================================
   5. 특성(Trait) 슬라이더 컨트롤
   개인 특성 카드 슬라이더의 수동 및 자동 컨트롤을 처리합니다.
============================================================================ */
document.addEventListener('DOMContentLoaded', function() {
    const traitContainer = document.querySelector('.trait-slider-container');

    if (traitContainer) {
        const traitSlider = traitContainer.querySelector('.trait-slider');
        const prevBtn = traitContainer.querySelector('.trait-slider-prev');
        const nextBtn = traitContainer.querySelector('.trait-slider-next');

        if (traitSlider && prevBtn && nextBtn) {
            // 수동 컨트롤 - 이전 버튼
            prevBtn.addEventListener('click', () => {
                traitSlider.scrollBy({ left: -400, behavior: 'smooth' });
            });

            // 수동 컨트롤 - 다음 버튼
            nextBtn.addEventListener('click', () => {
                traitSlider.scrollBy({ left: 400, behavior: 'smooth' });
            });

            // 자동 슬라이드 설정 (5초마다 오른쪽으로 이동)
            let autoSlideInterval = setInterval(() => {
                const maxScroll = traitSlider.scrollWidth - traitSlider.clientWidth;

                if (traitSlider.scrollLeft >= maxScroll - 10) {
                    traitSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    traitSlider.scrollBy({ left: 400, behavior: 'smooth' });
                }
            }, 5000);

            // 마우스 오버 시 자동 슬라이드 일시 정지
            traitContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            // 마우스 아웃 시 자동 슬라이드 재개
            traitContainer.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    const maxScroll = traitSlider.scrollWidth - traitSlider.clientWidth;

                    if (traitSlider.scrollLeft >= maxScroll - 10) {
                        traitSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        traitSlider.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                }, 5000);
            });

            // 터치 시작 시 자동 슬라이드 일시 정지
            traitContainer.addEventListener('touchstart', () => {
                clearInterval(autoSlideInterval);
            }, { passive: true });

            // 터치 종료 시 자동 슬라이드 재개
            traitContainer.addEventListener('touchend', () => {
                autoSlideInterval = setInterval(() => {
                    const maxScroll = traitSlider.scrollWidth - traitSlider.clientWidth;

                    if (traitSlider.scrollLeft >= maxScroll - 10) {
                        traitSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        traitSlider.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                }, 5000);
            }, { passive: true });
        }
    }
});


/* ============================================================================
   6. 대시보드 슬라이더 - 자동 슬라이드
   대시보드 쇼케이스의 페이지 슬라이드 기능을 처리합니다.
============================================================================ */
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.dashboard-slide');
    let currentIndex = 0;

    // 초기 슬라이드 설정
    updateDashboardSlider();

    // 슬라이더 업데이트 함수 - 현재 인덱스의 슬라이드만 활성화
    function updateDashboardSlider() {
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
        updateDashboardSlider();
    }, 5000);

    // 슬라이더 컨테이너 이벤트 리스너
    const sliderContainer = document.querySelector('.dashboard-slider-container');

    if (sliderContainer) {
        // 마우스 오버 시 자동 슬라이드 일시 정지
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        // 마우스 아웃 시 자동 슬라이드 재개
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateDashboardSlider();
            }, 5000);
        });

        // 터치 이벤트 - 일시 정지
        sliderContainer.addEventListener('touchstart', () => {
            clearInterval(slideInterval);
        }, { passive: true });

        // 터치 종료 시 자동 슬라이드 재개
        sliderContainer.addEventListener('touchend', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateDashboardSlider();
            }, 5000);
        }, { passive: true });

        // 스와이프 기능 구현
        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        // 스와이프 방향 처리 함수
        function handleSwipe() {
            const swipeThreshold = 75; // 스와이프 인식 최소 거리 (px)

            if (touchEndX < touchStartX - swipeThreshold) {
                // 왼쪽으로 스와이프 - 다음 슬라이드
                currentIndex = (currentIndex + 1) % slides.length;
                updateDashboardSlider();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // 오른쪽으로 스와이프 - 이전 슬라이드
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateDashboardSlider();
            }
        }
    }
});


/* ============================================================================
   7. 대시보드 슬라이드 모달
   대시보드 슬라이드 클릭 시 모달에 상세 정보를 표시합니다.
============================================================================ */
document.addEventListener('DOMContentLoaded', function() {
    const dashboardSlides = document.querySelectorAll('.dashboard-slide');
    const dashboardModal = document.getElementById('dashboard-slide-modal');
    const dashboardModalImage = document.getElementById('dashboard-modal-image');
    const dashboardModalTitle = document.getElementById('dashboard-modal-title');
    const dashboardModalPrevBtn = document.getElementById('dashboard-modal-prev-btn');
    const dashboardModalNextBtn = document.getElementById('dashboard-modal-next-btn');
    const dashboardModalSliderDots = document.getElementById('dashboard-modal-slider-dots');

    let allDashboardSlides = Array.from(dashboardSlides);
    let currentDashboardIndex = 0;

    // 모달 콘텐츠 업데이트 함수
    function populateDashboardModal(slide) {
        const thumbnail = slide.querySelector('.dashboard-thumbnail');
        const title = slide.querySelector('.dashboard-title');

        if (thumbnail && title) {
            dashboardModalImage.src = thumbnail.src;
            dashboardModalTitle.textContent = title.textContent;
        }

        updateDashboardModalDots();
    }

    // 도트 인디케이터 생성 함수
    function generateDashboardModalDots() {
        dashboardModalSliderDots.innerHTML = '';
        allDashboardSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentDashboardIndex) {
                dot.classList.add('active');
            }
            dot.setAttribute('data-index', index);
            // 도트 클릭 시 해당 슬라이드로 이동
            dot.addEventListener('click', () => {
                currentDashboardIndex = index;
                populateDashboardModal(allDashboardSlides[currentDashboardIndex]);
            });
            dashboardModalSliderDots.appendChild(dot);
        });
    }

    // 활성 도트 업데이트 함수
    function updateDashboardModalDots() {
        const dots = dashboardModalSliderDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentDashboardIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 이전 슬라이드 버튼 클릭
    dashboardModalPrevBtn.addEventListener('click', () => {
        currentDashboardIndex = (currentDashboardIndex - 1 + allDashboardSlides.length) % allDashboardSlides.length;
        populateDashboardModal(allDashboardSlides[currentDashboardIndex]);
    });

    // 다음 슬라이드 버튼 클릭
    dashboardModalNextBtn.addEventListener('click', () => {
        currentDashboardIndex = (currentDashboardIndex + 1) % allDashboardSlides.length;
        populateDashboardModal(allDashboardSlides[currentDashboardIndex]);
    });

    // 대시보드 슬라이드 클릭 이벤트
    dashboardSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            currentDashboardIndex = index;
            generateDashboardModalDots();
            populateDashboardModal(slide);

            if (dashboardModal) {
                dashboardModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';  // 배경 스크롤 방지
            }
        });
    });
});


/* ============================================================================
   8. 카드 모달 기능
   경력/스킬/수상/프로젝트 카드 클릭 시 모달에 상세 정보를 표시합니다.
============================================================================ */

// DOM 요소 참조
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.modal-close');

// 카드 정보 모달 요소
const cardInfoModal = document.getElementById('card-info-modal');
const cardModalImage = document.getElementById('card-modal-image');
const cardModalTitle = document.getElementById('card-modal-title');
const cardModalSubtitle = document.getElementById('card-modal-subtitle');
const cardModalTags = document.getElementById('card-modal-tags');
const cardModalDescription = document.getElementById('card-modal-description');
const modalPrevBtn = document.getElementById('modal-prev-btn');
const modalNextBtn = document.getElementById('modal-next-btn');
const modalSliderDots = document.getElementById('modal-slider-dots');

// 현재 섹션의 카드 목록과 인덱스 추적
let currentSectionCards = [];
let currentCardIndex = 0;

/**
 * 모달에 카드 콘텐츠를 채우는 함수
 * @param {HTMLElement} card - 선택된 카드 요소
 */
function populateModal(card) {
    const cardImage = card.querySelector('.card-image');
    const cardOverlay = card.querySelector('.card-overlay');
    const cardInfo = card.querySelector('.card-info');

    // 오버레이 정보 추출
    const overlayTitle = cardOverlay ? cardOverlay.querySelector('.card-title') : null;
    const overlaySubtitle = cardOverlay ? cardOverlay.querySelector('.card-subtitle') : null;
    const categoryBadge = cardOverlay ? cardOverlay.querySelector('.category-badge') : null;

    // 카드 정보 추출
    const infoTitle = cardInfo ? cardInfo.querySelector('.card-title') : null;
    const infoTags = cardInfo ? cardInfo.querySelector('.card-tags') : null;
    const infoDescription = cardInfo ? cardInfo.querySelector('.card-description') : null;

    // 이미지 설정
    if (cardImage) {
        cardModalImage.src = cardImage.src;
    }

    // 타이틀 설정 (card-info 우선, 없으면 overlay 사용)
    if (infoTitle) {
        cardModalTitle.textContent = infoTitle.textContent;
    } else if (overlayTitle) {
        cardModalTitle.textContent = overlayTitle.textContent;
    }

    // 서브타이틀 설정
    if (overlaySubtitle) {
        cardModalSubtitle.textContent = overlaySubtitle.textContent;
    } else if (categoryBadge) {
        cardModalSubtitle.textContent = categoryBadge.textContent;
    } else {
        cardModalSubtitle.textContent = '';
    }

    // 태그 설정
    if (infoTags) {
        cardModalTags.innerHTML = infoTags.innerHTML;
    } else {
        cardModalTags.innerHTML = '';
    }

    // 설명 설정
    if (infoDescription) {
        cardModalDescription.textContent = infoDescription.textContent;
    } else {
        cardModalDescription.textContent = '';
    }

    // 도트 인디케이터 업데이트
    updateModalDots();
}

/**
 * 도트 인디케이터를 생성하고 업데이트하는 함수
 */
function generateModalDots() {
    modalSliderDots.innerHTML = '';
    currentSectionCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentCardIndex) {
            dot.classList.add('active');
        }
        dot.setAttribute('data-index', index);
        // 도트 클릭 시 해당 카드로 이동
        dot.addEventListener('click', () => {
            currentCardIndex = index;
            populateModal(currentSectionCards[currentCardIndex]);
        });
        modalSliderDots.appendChild(dot);
    });
}

/**
 * 활성 도트를 업데이트하는 함수
 */
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

// 이전 카드로 이동
modalPrevBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + currentSectionCards.length) % currentSectionCards.length;
    populateModal(currentSectionCards[currentCardIndex]);
});

// 다음 카드로 이동
modalNextBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % currentSectionCards.length;
    populateModal(currentSectionCards[currentCardIndex]);
});

// 카드 클릭 이벤트
cards.forEach(card => {
    card.addEventListener('click', () => {
        // 해당 카드가 속한 슬라이더 섹션 찾기
        const cardSlider = card.closest('.card-slider');
        if (cardSlider) {
            currentSectionCards = Array.from(cardSlider.querySelectorAll('.card'));
            currentCardIndex = currentSectionCards.indexOf(card);
        } else {
            currentSectionCards = [card];
            currentCardIndex = 0;
        }

        // 도트 인디케이터 생성
        generateModalDots();

        // 모달에 카드 콘텐츠 채우기
        populateModal(card);

        // 카드 정보 모달 표시
        cardInfoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';  // 배경 스크롤 방지
    });
});

// 모달 닫기 버튼 클릭
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';  // 배경 스크롤 복원
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
