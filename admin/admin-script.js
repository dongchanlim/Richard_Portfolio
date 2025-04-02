// DOM 요소
const loginContainer = document.getElementById('login-container');
const adminContainer = document.getElementById('admin-container');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navItems = document.querySelectorAll('.sidebar-nav li');
const pageTitle = document.getElementById('page-title');

// 모든 콘텐츠 섹션
const sections = {
    dashboard: document.getElementById('dashboard-section'),
    content: document.getElementById('content-section'),
    users: document.getElementById('users-section'),
    stats: document.getElementById('stats-section'),
    settings: document.getElementById('settings-section')
};

// 초기화 함수
function init() {
    // 이벤트 리스너 등록
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    sidebarToggle.addEventListener('click', toggleSidebar);
    navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
}

// 로그인 처리 함수
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 여기서는 간단한 로그인 검증만 수행 (실제로는 서버 통신 필요)
    if (username && password) {
        // 로그인 성공 시
        loginContainer.style.display = 'none';
        adminContainer.style.display = 'flex';
        
        // 첫 화면으로 대시보드 표시
        showSection('dashboard');
    } else {
        alert('아이디와 비밀번호를 입력해주세요.');
    }
}

// 로그아웃 처리 함수
function handleLogout() {
    adminContainer.style.display = 'none';
    loginContainer.style.display = 'flex';
    
    // 폼 초기화
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// 사이드바 토글 함수
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
}

// 네비게이션 처리 함수
function handleNavigation(e) {
    const sectionId = e.currentTarget.getAttribute('data-section');
    
    // 활성 상태 업데이트
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // 선택한 섹션 표시
    showSection(sectionId);
}

// 섹션 표시 함수
function showSection(sectionId) {
    // 모든 섹션 숨김
    Object.values(sections).forEach(section => {
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // 선택한 섹션만 표시
    if (sections[sectionId]) {
        sections[sectionId].style.display = 'block';
    }
    
    // 페이지 타이틀 업데이트
    updatePageTitle(sectionId);
}

// 페이지 타이틀 업데이트 함수
function updatePageTitle(sectionId) {
    const titles = {
        dashboard: '대시보드',
        content: '콘텐츠 관리',
        users: '사용자 관리',
        stats: '통계 분석',
        settings: '설정'
    };
    
    pageTitle.textContent = titles[sectionId] || '대시보드';
}

// 테이블 정렬 함수 (예시)
function sortTable(tableId, columnIndex, sortDirection) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // 숫자인 경우 숫자 비교
        if (!isNaN(aValue) && !isNaN(bValue)) {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        // 문자열인 경우 문자열 비교
        return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
    });
    
    // 정렬된 행을 테이블에 다시 추가
    rows.forEach(row => tbody.appendChild(row));
}

// 테이블 필터링 함수 (예시)
function filterTable(tableId, searchTerm) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// 삭제 확인 함수 (예시)
function confirmDelete(itemId, itemType) {
    const confirmed = confirm(`정말로 이 ${itemType}을(를) 삭제하시겠습니까?`);
    
    if (confirmed) {
        // 실제로는 서버에 삭제 요청을 보내야 함
        console.log(`${itemType} ${itemId} 삭제됨`);
        return true;
    }
    return false;
}

// 모달 생성 함수 (예시)
function createModal(title, content) {
    // 모달 컨테이너 생성
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    
    // 모달 내용 생성
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // 모달 헤더 생성
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
        <h3>${title}</h3>
        <button class="modal-close">&times;</button>
    `;
    
    // 모달 바디 생성
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = content;
    
    // 모달 구성
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContainer.appendChild(modalContent);
    
    // 닫기 버튼 이벤트 리스너
    const closeButton = modalHeader.querySelector('.modal-close');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    });
    
    // 모달 외부 클릭 시 닫기
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            document.body.removeChild(modalContainer);
        }
    });
    
    // 모달을 body에 추가
    document.body.appendChild(modalContainer);
}

// 데이터 차트 생성 함수 (예시 - 실제로는 Chart.js 등의 라이브러리 사용)
function createChart(containerId, type, data) {
    // 여기서는 실제 차트 구현 대신 콘솔에 로그만 출력
    console.log(`${containerId} 차트 생성됨:`, { type, data });
}

// 실행 함수 호출
document.addEventListener('DOMContentLoaded', init);

// 페이지 로드 시 자동 로그인 (개발 모드용)
// window.addEventListener('load', () => {
//     loginContainer.style.display = 'none';
//     adminContainer.style.display = 'flex';
//     showSection('dashboard');
// });

// 콘텐츠 관리 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
    // 편집 버튼 이벤트
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const row = button.closest('tr');
            const id = row.cells[0].textContent;
            const title = row.cells[2].textContent;
            
            // 편집 모달 생성 (예시)
            const modalContent = `
                <form class="edit-form">
                    <div class="form-group">
                        <label>제목</label>
                        <input type="text" value="${title}">
                    </div>
                    <div class="form-group">
                        <label>카테고리</label>
                        <select>
                            <option>프로그래밍</option>
                            <option>데이터베이스</option>
                            <option>시각화</option>
                            <option>머신러닝</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>단계</label>
                        <select>
                            <option>Stage 1: 기초 역량</option>
                            <option>Stage 2: 핵심 기술</option>
                            <option>Stage 3: 전문 역량</option>
                            <option>Stage 4: 실무 역량</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>상태</label>
                        <select>
                            <option>활성</option>
                            <option>초안</option>
                            <option>비활성</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary">저장</button>
                </form>
            `;
            
            createModal(`콘텐츠 편집: ${title}`, modalContent);
        });
    });
    
    // 삭제 버튼 이벤트
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const row = button.closest('tr');
            const id = row.cells[0].textContent;
            const title = row.cells[2].textContent;
            
            if (confirmDelete(id, '콘텐츠')) {
                // 삭제 후 행 제거 (예시)
                row.remove();
            }
        });
    });
});
