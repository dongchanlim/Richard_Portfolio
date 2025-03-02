// 헤더 스크롤 효과
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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
