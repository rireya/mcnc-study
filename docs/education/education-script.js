// 교육 시스템 JavaScript

// 전역 변수
const courseSelect = document.getElementById('course-select');
const daySelect = document.getElementById('day-select');
const statusBar = document.getElementById('status-bar');
const emptyState = document.getElementById('empty-state');
const educationContent = document.getElementById('education-content');
const toc = document.getElementById('toc');
const courseList = document.getElementById('course-list');
const scrollToTopBtn = document.getElementById('scroll-to-top');

// 설정 및 교육 과정 데이터
let coursesConfig = null;
let courses = {};

// Markdown-it 인스턴스 생성
const md = window.markdownit({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' + hljs.highlight(str, { language: lang }).value + '</code></pre>';
            } catch (__) {}
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadCoursesConfig().then(() => {
        initializeSelectors();
        setupEventListeners();
        loadCoursesInSidebar();
        setupScrollToTop();
        
        // 기본 과정 자동 선택 (설정에서 지정된 경우)
        if (coursesConfig.settings.defaultCourse) {
            courseSelect.value = coursesConfig.settings.defaultCourse;
            handleCourseChange();
        }
    });
});

// 교육 과정 설정 파일 로드
async function loadCoursesConfig() {
    try {
        const response = await fetch('./courses-config.json');
        if (!response.ok) {
            throw new Error('설정 파일을 불러올 수 없습니다.');
        }
        
        coursesConfig = await response.json();
        courses = coursesConfig.courses;
        
        console.log('교육 과정 설정 로드 완료:', Object.keys(courses).length + '개 과정');
        
    } catch (error) {
        console.error('설정 파일 로드 실패:', error);
        
        // 폴백: 기본 설정 사용
        coursesConfig = {
            courses: {
                'si-junior': {
                    name: 'SI 신입 교육',
                    description: 'SI 프로젝트 신규 투입 개발자 교육',
                    icon: '🏢',
                    files: [
                        { filename: 'README.md', title: '📋 교육 개요' },
                        { filename: 'day1.md', title: '📚 Day 1' }
                    ]
                }
            },
            settings: { autoRefresh: false, showDescriptions: false }
        };
        courses = coursesConfig.courses;
        
        showNotification('설정 파일을 불러올 수 없어 기본 설정을 사용합니다.', 'warning');
    }
}

// 셀렉터 초기화
function initializeSelectors() {
    courseSelect.innerHTML = '<option value="">교육 과정을 선택하세요</option>';
    
    Object.keys(courses).forEach(courseId => {
        const course = courses[courseId];
        const option = document.createElement('option');
        option.value = courseId;
        option.textContent = `${course.icon || '📚'} ${course.name}`;
        courseSelect.appendChild(option);
    });
}

// 이벤트 리스너 설정
function setupEventListeners() {
    courseSelect.addEventListener('change', handleCourseChange);
    daySelect.addEventListener('change', handleDayChange);
    
    // 설정 자동 새로고침 (개발 모드용)
    if (coursesConfig?.settings?.autoRefresh) {
        setInterval(checkForConfigUpdates, 30000); // 30초마다 체크
    }
}

// 사이드바에 교육 과정 로드
function loadCoursesInSidebar() {
    courseList.innerHTML = '';
    
    Object.keys(courses).forEach(courseId => {
        const course = courses[courseId];
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.innerHTML = `${course.icon || '📚'} ${course.name}`;
        a.onclick = () => selectCourse(courseId);
        
        // 설명 표시 옵션
        if (coursesConfig?.settings?.showDescriptions && course.description) {
            a.title = course.description;
        }
        
        li.appendChild(a);
        courseList.appendChild(li);
    });
}

// 교육 과정 변경 처리 (화면 초기화 포함)
async function handleCourseChange() {
    const selectedCourse = courseSelect.value;
    
    // 화면 초기화
    hideContent();
    daySelect.value = '';
    
    if (!selectedCourse) {
        daySelect.disabled = true;
        daySelect.innerHTML = '<option value="">먼저 교육 과정을 선택하세요</option>';
        return;
    }
    
    // Day 목록 로드
    try {
        const dayFiles = await loadDayFiles(selectedCourse);
        populateDaySelect(dayFiles);
        daySelect.disabled = false;
    } catch (error) {
        console.error('Day 파일 로드 실패:', error);
        daySelect.innerHTML = '<option value="">파일을 불러올 수 없습니다</option>';
        showNotification('교육 자료 목록을 불러올 수 없습니다.', 'error');
    }
}

// Day 파일 목록 로드 (설정 파일 기반)
async function loadDayFiles(courseId) {
    const course = courses[courseId];
    if (!course || !course.files) {
        throw new Error('교육 과정 정보를 찾을 수 없습니다.');
    }
    
    return course.files;
}

// Day 셀렉터 채우기 (설정 파일 기반)
function populateDaySelect(files) {
    daySelect.innerHTML = '<option value="">교육 자료를 선택하세요</option>';
    
    files.forEach(fileInfo => {
        const option = document.createElement('option');
        option.value = fileInfo.filename;
        option.textContent = fileInfo.title || fileInfo.filename;
        
        // 설명이 있으면 툴팁으로 표시
        if (fileInfo.description) {
            option.title = fileInfo.description;
        }
        
        daySelect.appendChild(option);
    });
}

// Day 변경 처리
function handleDayChange() {
    const selectedCourse = courseSelect.value;
    const selectedDay = daySelect.value;
    
    if (selectedCourse && selectedDay) {
        loadContent(selectedCourse, selectedDay);
    } else {
        hideContent();
    }
}

// 콘텐츠 로드
async function loadContent(courseId, dayFile) {
    try {
        showStatusBar(courseId, dayFile);
        
        const response = await fetch(`./${courseId}/${dayFile}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const markdown = await response.text();
        const html = md.render(markdown);
        
        showContent(html);
        updateTOC();
        addCopyButtons();
        
        // 코드 하이라이팅
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
        
        // 컨텐츠 로드 후 맨 위로 스크롤
        scrollToTop();
        
    } catch (error) {
        console.error('콘텐츠 로드 실패:', error);
        showError(`파일을 불러올 수 없습니다: ${error.message}`);
    }
}

// 상태바 표시 (개선된 버전)
function showStatusBar(courseId, dayFile) {
    const course = courses[courseId];
    const courseName = course?.name || courseId;
    const courseIcon = course?.icon || '📚';
    
    // 파일 정보 찾기
    const fileInfo = course?.files?.find(f => f.filename === dayFile);
    const fileName = fileInfo?.title || dayFile;
    
    statusBar.innerHTML = `
        <div class="progress-info">
            ${courseIcon} <strong>${courseName}</strong> - ${fileName} 
            <span style="float: right;">🕒 ${new Date().toLocaleTimeString()}</span>
        </div>
    `;
    statusBar.classList.add('active');
}

// 알림 표시 함수 추가
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // 자동으로 5초 후 제거
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// 설정 파일 업데이트 체크 (개발 모드용)
async function checkForConfigUpdates() {
    try {
        const response = await fetch('./courses-config.json?t=' + Date.now());
        if (response.ok) {
            const newConfig = await response.json();
            
            // 변경사항이 있는지 확인
            if (JSON.stringify(newConfig) !== JSON.stringify(coursesConfig)) {
                coursesConfig = newConfig;
                courses = coursesConfig.courses;
                
                // UI 새로고침
                initializeSelectors();
                loadCoursesInSidebar();
                
                showNotification('교육 과정 설정이 업데이트되었습니다.', 'success');
            }
        }
    } catch (error) {
        console.log('설정 파일 체크 실패 (정상):', error.message);
    }
}

// 수동 설정 새로고침
async function refreshConfig() {
    try {
        showNotification('설정을 새로고침하는 중...', 'info');
        
        await loadCoursesConfig();
        initializeSelectors();
        loadCoursesInSidebar();
        
        // 현재 선택 초기화
        courseSelect.value = '';
        daySelect.value = '';
        hideContent();
        
        showNotification('설정이 성공적으로 새로고침되었습니다!', 'success');
        
    } catch (error) {
        console.error('설정 새로고침 실패:', error);
        showNotification('설정 새로고침에 실패했습니다.', 'error');
    }
}

// 사이드바에서 교육 과정 선택 (화면 초기화 포함)
function selectCourse(courseId) {
    courseSelect.value = courseId;
    handleCourseChange();
}

// TOC 업데이트
function updateTOC() {
    const headers = educationContent.querySelectorAll('h1, h2, h3, h4');
    toc.innerHTML = '';
    
    if (headers.length > 0) {
        const title = document.createElement('h3');
        title.textContent = 'Table of Contents';
        toc.appendChild(title);
        
        const ul = document.createElement('ul');
        headers.forEach(header => {
            if (!header.id) {
                header.id = header.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
            }
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = header.textContent;
            a.href = `#${header.id}`;
            a.style.setProperty('--level', header.tagName.charAt(1) - 1);
            a.addEventListener('click', function(e) {
                e.preventDefault();
                header.scrollIntoView({ behavior: 'smooth' });
            });
            li.appendChild(a);
            ul.appendChild(li);
        });
        toc.appendChild(ul);
    }
}

// 복사 버튼 추가
function addCopyButtons() {
    educationContent.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.addEventListener('click', () => {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Error copying code: ', err);
            });
        });
        pre.appendChild(button);
    });
}

// 맨 위로 가기 기능 설정
function setupScrollToTop() {
    const contentDiv = document.querySelector('.content');
    
    // 스크롤 이벤트 리스너
    contentDiv.addEventListener('scroll', function() {
        if (contentDiv.scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // 버튼 클릭 이벤트
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

// 맨 위로 스크롤
function scrollToTop() {
    const contentDiv = document.querySelector('.content');
    contentDiv.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 콘텐츠 표시
function showContent(html) {
    emptyState.style.display = 'none';
    educationContent.style.display = 'block';
    educationContent.innerHTML = html;
}

// 콘텐츠 숨기기
function hideContent() {
    emptyState.style.display = 'block';
    educationContent.style.display = 'none';
    statusBar.classList.remove('active');
    toc.innerHTML = '';
}

// 에러 표시
function showError(message) {
    emptyState.style.display = 'none';
    educationContent.style.display = 'block';
    educationContent.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #dc3545;">
            <h3>⚠️ 오류가 발생했습니다</h3>
            <p>${message}</p>
        </div>
    `;
}
