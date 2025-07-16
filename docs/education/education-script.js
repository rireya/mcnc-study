// 교육 시스템 JavaScript

// 전역 변수
const courseSelect = document.getElementById('course-select');
const daySelect = document.getElementById('day-select');
const emptyState = document.getElementById('empty-state');
const educationContent = document.getElementById('education-content');
const toc = document.getElementById('toc');
const courseList = document.getElementById('course-list');
const scrollToTopBtn = document.getElementById('scroll-to-top');

// 설정 및 교육 과정 데이터
let coursesConfig = null;
let courses = {};

// 메모리 관리용 변수들
let intersectionObserver = null;
let tocScrollHandler = null;

// 브라우저 히스토리 관리를 위한 변수
let isHistoryUpdate = false;

// Markdown-it 인스턴스 생성
const md = window.markdownit({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(str, { language: lang }).value + '</code></pre>';
      } catch (__) { }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

// 초기화
document.addEventListener('DOMContentLoaded', function () {
  // 맨 위로 버튼 초기 상태 설정
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.remove('visible');
  }

  // 교육 시스템 제목 클릭 이벤트 설정
  setupEducationTitleClick();

  loadCoursesConfig().then(async () => {
    initializeSelectors();
    setupEventListeners();
    loadCoursesInSidebar();
    setupScrollToTop();

    // URL 쿼리 파라미터 우선 처리
    const { course, material } = getQueryParams();
    if (course || material) {
      await loadFromQueryParams();
    }
    // 쿼리 파라미터가 없고 기본 과정이 설정된 경우
    else if (coursesConfig.settings.defaultCourse) {
      courseSelect.value = coursesConfig.settings.defaultCourse;
      handleCourseChange();
    }
  });

  // 초기 히스토리 상태 설정
  setupInitialHistory();
});

// 교육 시스템 제목 클릭 이벤트 설정
function setupEducationTitleClick() {
  const educationTitle = document.getElementById('education-title');
  if (educationTitle) {
    educationTitle.addEventListener('click', function () {
      // UI 초기화
      courseSelect.value = '';
      daySelect.value = '';
      daySelect.disabled = true;
      daySelect.innerHTML = '<option value="">자료 선택</option>';
      hideContent();

      // URL 쿼리 파라미터 제거
      updateURLParams(null, null);

      // 히스토리 초기화
      window.history.replaceState(null, '', window.location.pathname);
    });
  }
}

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

  // 브라우저 뒤로가기/앞으로가기 처리
  window.addEventListener('popstate', function (event) {
    console.log('popstate 이벤트 발생:', event.state);

    // event.state가 있으면 그걸 사용하고, 없으면 URL에서 직접 읽기
    if (event.state) {
      isHistoryUpdate = true;

      const { courseId, materialFile } = event.state;

      // UI 업데이트 (히스토리 추가 방지)
      if (courseId) {
        courseSelect.value = courseId;
        handleCourseChange().then(() => {
          if (materialFile) {
            daySelect.value = materialFile;
            loadContent(courseId, materialFile, false); // 히스토리 추가하지 않음
          }
          // URL 쿼리 파라미터 업데이트
          updateURLParams(courseId, materialFile);
          isHistoryUpdate = false;
        });
      } else {
        // 초기 상태로 돌아가기
        courseSelect.value = '';
        daySelect.value = '';
        hideContent();
        // URL 쿼리 파라미터 제거
        updateURLParams(null, null);
        isHistoryUpdate = false;
      }
    } else {
      // event.state가 없는 경우 URL에서 직접 쿼리 파라미터 읽기
      isHistoryUpdate = true;
      loadFromQueryParams().then(() => {
        isHistoryUpdate = false;
      });
    }

    console.log('브라우저 뒤로가기/앞으로가기 처리 완료');
  });
}

// 사이드바에 교육 과정 로드
function loadCoursesInSidebar() {
  // 기존 내용 정리
  courseList.innerHTML = '';

  Object.keys(courses).forEach(courseId => {
    const course = courses[courseId];
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.innerHTML = `${course.icon || '📚'} ${course.name}`;

    // onclick 대신 addEventListener 사용 (메모리 관리 개선)
    a.addEventListener('click', function (e) {
      e.preventDefault();
      selectCourse(courseId);
    });

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

  // 브라우저 히스토리 업데이트 (선택한 과정만)
  if (history.state && !isHistoryUpdate) {
    window.history.pushState(
      { courseId: selectedCourse, materialFile: null },
      '',
      window.location.pathname
    );
  }

  // URL 쿼리 파라미터 업데이트
  updateURLParams(selectedCourse, null);
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
async function loadContent(courseId, materialFile, updateHistory = true) {
  try {
    const response = await fetch(`./${courseId}/${materialFile}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const markdown = await response.text();
    const html = md.render(markdown);

    showContent(html);
    addCopyButtons();
    updateTOC();

    // 코드 하이라이팅
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });

    // 컨텐츠 로드 후 맨 위로 스크롤
    scrollToTop();

    // 브라우저 히스토리 업데이트 (선택한 과정 및 자료)
    if (updateHistory && !isHistoryUpdate) {
      window.history.pushState(
        { courseId, materialFile },
        '',
        window.location.pathname
      );
    }

    // URL 쿼리 파라미터 업데이트
    updateURLParams(courseId, materialFile);

  } catch (error) {
    console.error('콘텐츠 로드 실패:', error);
    showError(`파일을 불러올 수 없습니다: ${error.message}`);
  }
}

// 콘텐츠 숨기기
function hideContent() {
  emptyState.style.display = 'block';
  educationContent.style.display = 'none';

  // tocbot 정리
  if (typeof tocbot !== 'undefined' && window.tocbotInstance) {
    tocbot.destroy();
    window.tocbotInstance = false;
  }

  // Intersection Observer 정리
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }

  // TOC 스크롤 핸들러 정리
  if (tocScrollHandler) {
    document.querySelector('.content').removeEventListener('scroll', tocScrollHandler);
    tocScrollHandler = null;
  }

  // TOC와 교육 콘텐츠 정리 (메모리 해제)
  toc.innerHTML = '';
  educationContent.innerHTML = '';
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

// 사이드바에서 교육 과정 선택 (화면 초기화 포함)
function selectCourse(courseId) {
  courseSelect.value = courseId;
  handleCourseChange();
}

// TOC 업데이트
function updateTOC() {
  const headers = educationContent.querySelectorAll('h1, h2, h3, h4');

  // 기존 TOC 정리 (이벤트 리스너도 함께 제거됨)
  toc.innerHTML = '';

  // 기존 observer 정리
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }

  if (headers.length > 0) {
    const title = document.createElement('h3');
    title.textContent = 'Table of Contents';
    toc.appendChild(title);

    const ul = document.createElement('ul');
    headers.forEach((header, index) => {
      // 더 안정적인 ID 생성 (순서 기반 + 텍스트 기반)
      if (!header.id) {
        const cleanText = header.textContent
          .trim()
          .replace(/[🎯📖🔄🏗️💼🤔📝]/g, '') // 이모지 제거
          .replace(/[1-6]️⃣/g, '') // 숫자 이모지 제거
          .replace(/[\(\)]/g, '') // 괄호 제거
          .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, '') // 특수문자 제거 (한글 유지)
          .replace(/\s+/g, '-') // 공백을 하이픈으로
          .toLowerCase();

        // 헤더 인덱스를 추가하여 유일성 보장
        header.id = `header-${index}-${cleanText}`;
      }

      const li = document.createElement('li');
      const a = document.createElement('a');

      a.textContent = header.textContent;
      a.href = `#${header.id}`;
      a.style.setProperty('--level', header.tagName.charAt(1) - 1);

      // 🔧 개선된 클릭 이벤트 핸들러
      const clickHandler = function (e) {
        e.preventDefault();
        e.stopPropagation(); // 이벤트 버블링 방지

        console.log('TOC 링크 클릭:', header.textContent);

        // 헤더가 존재하는지 확인
        const targetHeader = document.getElementById(header.id);
        if (targetHeader) {
          // 부드러운 스크롤로 이동
          targetHeader.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // URL 해시 업데이트 (새로고침 없이)
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, `#${header.id}`);
          }
        } else {
          console.error('헤더를 찾을 수 없습니다:', header.id);
        }
      };

      a.addEventListener('click', clickHandler);

      li.appendChild(a);
      ul.appendChild(li);
    });
    toc.appendChild(ul);

    // TOC 생성 후 활성 추적 시작 (tocbot 사용)
    setTimeout(() => {
      setupTOCActiveTracking();
    }, 100); // DOM 업데이트 후 실행
  }
}

// 복사 버튼 추가
function addCopyButtons() {
  // 기존 복사 버튼들 제거 (중복 방지)
  educationContent.querySelectorAll('.copy-button').forEach(btn => btn.remove());

  educationContent.querySelectorAll('pre').forEach(pre => {
    // 이미 버튼이 있는지 확인
    if (pre.querySelector('.copy-button')) {
      return;
    }

    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';

    const clickHandler = () => {
      const code = pre.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }).catch(err => {
        console.error('Error copying code: ', err);
      });
    };

    button.addEventListener('click', clickHandler);
    pre.appendChild(button);
  });
}

// 맨 위로 가기 기능 설정
function setupScrollToTop() {
  const contentDiv = document.querySelector('.content');

  // 초기 상태 설정 - 버튼 숨김
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.remove('visible');
  }

  // 기존 이벤트 리스너 제거 (중복 방지)
  contentDiv.removeEventListener('scroll', handleScroll);
  scrollToTopBtn.removeEventListener('click', scrollToTop);

  // 스크롤 이벤트 리스너
  contentDiv.addEventListener('scroll', handleScroll);

  // 버튼 클릭 이벤트
  scrollToTopBtn.addEventListener('click', scrollToTop);

  // 초기 스크롤 상태 체크
  handleScroll();
}

// 스크롤 핸들러를 분리하여 재사용 가능하게 만듦
function handleScroll() {
  const contentDiv = document.querySelector('.content');
  // 스크롤 위치가 0보다 클 때만 버튼 표시 (완전히 맨 위가 아닐 때만)
  if (contentDiv && contentDiv.scrollTop > 0) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}

// 맨 위로 스크롤 - content와 TOC 모두 스크롤
function scrollToTop() {
  const contentDiv = document.querySelector('.content');
  const tocDiv = document.querySelector('.toc');

  // content 영역 스크롤
  contentDiv.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // TOC 영역도 함께 스크롤
  if (tocDiv) {
    tocDiv.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// 콘텐츠 표시
function showContent(html) {
  emptyState.style.display = 'none';
  educationContent.style.display = 'block';
  educationContent.innerHTML = html;

  // 마크다운 내 교육 자료 링크 처리
  setupEducationContentLinks();
}

// 마크다운 콘텐츠 내의 교육 자료 링크를 처리하는 함수
function setupEducationContentLinks() {
  // 현재 선택된 과정 ID 가져오기
  const currentCourse = courseSelect.value;
  if (!currentCourse || !courses[currentCourse]) return;

  // 현재 과정의 파일 목록
  const courseFiles = courses[currentCourse].files;

  // TOC 영역을 제외한 교육 콘텐츠 내의 링크만 선택
  const links = educationContent.querySelectorAll('a[href]:not(.toc a)');

  links.forEach(link => {
    const href = link.getAttribute('href');

    // 앵커 링크(#)인 경우 TOC 처리하지 않음
    if (href && href.startsWith('#')) {
      return; // TOC 링크는 건드리지 않음
    }

    // .md 파일에 대한 링크인지 확인
    if (href && href.endsWith('.md')) {
      // 파일명만 추출 (경로 제거)
      const filename = href.split('/').pop();

      // 현재 과정의 파일 목록에서 해당 파일 찾기
      const targetFile = courseFiles.find(file => file.filename === filename);

      if (targetFile) {
        // 교육 자료 링크로 변환
        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation(); // 이벤트 버블링 방지

          // 자료 선택 셀렉터 업데이트
          daySelect.value = filename;

          // 해당 자료 로드
          loadContent(currentCourse, filename);

          console.log(`교육 자료 로드: ${targetFile.title}`);
        });

        // 시각적 표시 개선
        link.style.color = '#0969da';
        link.style.textDecoration = 'none';
        link.style.borderBottom = '1px solid #0969da';
        link.style.transition = 'all 0.2s ease';

        // 호버 효과
        link.addEventListener('mouseenter', function () {
          this.style.backgroundColor = 'rgba(9, 105, 218, 0.1)';
          this.style.borderBottomColor = '#0553a1';
        });

        link.addEventListener('mouseleave', function () {
          this.style.backgroundColor = 'transparent';
          this.style.borderBottomColor = '#0969da';
        });

        // 툴팁 추가
        link.title = `${targetFile.title}로 이동`;
      } else {
        // 파일을 찾을 수 없는 경우 링크 비활성화
        link.addEventListener('click', function (e) {
          e.preventDefault();
        });
        link.style.color = '#656d76';
        link.style.textDecoration = 'line-through';
        link.title = '파일을 찾을 수 없습니다';
      }
    }
  });
}

// URL 쿼리 파라미터 처리 함수들
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    course: params.get('course'),
    material: params.get('material') // day → material로 변경
  };
}

function updateURLParams(courseId, materialFile) {
  const url = new URL(window.location);
  if (courseId) {
    url.searchParams.set('course', courseId);
  } else {
    url.searchParams.delete('course');
  }

  if (materialFile) {
    // .md 확장자 제거하여 저장
    const materialName = materialFile.replace('.md', '');
    url.searchParams.set('material', materialName);
  } else {
    url.searchParams.delete('material');
  }

  // URL 변경 (페이지 새로고침 없이)
  window.history.replaceState(null, '', url.toString());
}

async function loadFromQueryParams() {
  const { course, material } = getQueryParams();

  console.log('loadFromQueryParams 호출:', { course, material });

  if (course) {
    // 과정이 존재하는지 확인
    if (coursesConfig.courses[course]) {
      courseSelect.value = course;
      await handleCourseChange();

      if (material) {
        // .md 확장자 추가하여 파일명 생성
        const materialFile = material.endsWith('.md') ? material : material + '.md';

        // 자료가 존재하는지 확인
        const materialFiles = await loadDayFiles(course);
        const foundFile = materialFiles.find(file => file.filename === materialFile);

        if (foundFile) {
          daySelect.value = materialFile;
          await loadContent(course, materialFile, false); // 히스토리 업데이트 안함
        } else {
          console.warn('지정된 자료를 찾을 수 없습니다:', material);
          showNotification(`자료 '${material}'를 찾을 수 없습니다.`, 'warning');
        }
      }
    } else {
      console.warn('지정된 과정을 찾을 수 없습니다:', course);
      showNotification(`과정 '${course}'를 찾을 수 없습니다.`, 'warning');
    }
  } else {
    // course가 없는 경우 초기 상태로 설정
    console.log('쿼리 파라미터가 없음 - 초기 상태로 설정');
    courseSelect.value = '';
    daySelect.value = '';
    daySelect.disabled = true;
    daySelect.innerHTML = '<option value="">자료 선택</option>';
    hideContent();
  }
}

// 브라우저 히스토리 초기 설정
function setupInitialHistory() {
  // 현재 상태가 없으면 초기 상태 설정
  if (!window.history.state) {
    window.history.replaceState(
      { courseId: null, materialFile: null },
      '',
      window.location.pathname + window.location.search
    );
  }
}

// 메모리 정리 함수
function cleanup() {
  // tocbot 정리
  if (typeof tocbot !== 'undefined' && window.tocbotInstance) {
    tocbot.destroy();
    window.tocbotInstance = false;
  }

  // Intersection Observer 정리
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }

  // TOC 스크롤 핸들러 정리
  if (tocScrollHandler) {
    const contentDiv = document.querySelector('.content');
    if (contentDiv) {
      contentDiv.removeEventListener('scroll', tocScrollHandler);
    }
    tocScrollHandler = null;
  }

  // DOM 요소 정리
  if (toc) toc.innerHTML = '';
  if (educationContent) educationContent.innerHTML = '';
  if (courseList) courseList.innerHTML = '';

  // 이벤트 리스너 정리
  const contentDiv = document.querySelector('.content');
  if (contentDiv) {
    contentDiv.removeEventListener('scroll', handleScroll);
  }
  if (scrollToTopBtn) {
    scrollToTopBtn.removeEventListener('click', scrollToTop);
  }

  console.log('메모리 정리 완료');
}

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', cleanup);
window.addEventListener('unload', cleanup);

// TOC 활성 헤더 추적 함수 (tocbot 라이브러리 사용)
function setupTOCActiveTracking() {
  // 기존 핸들러 정리
  if (tocScrollHandler) {
    document.querySelector('.content').removeEventListener('scroll', tocScrollHandler);
    tocScrollHandler = null;
  }

  const headers = educationContent.querySelectorAll('h1, h2, h3, h4');
  if (headers.length === 0) return;

  // tocbot이 로드되어 있는지 확인
  if (typeof tocbot === 'undefined') {
    console.log('tocbot 라이브러리가 로드되지 않았습니다.');
    return;
  }

  // 기존 tocbot 인스턴스 제거
  if (window.tocbotInstance) {
    tocbot.destroy();
  }

  // tocbot 초기화
  tocbot.init({
    // TOC가 렌더링될 컨테이너
    tocSelector: '.toc ul',

    // 스캔할 콘텐츠 영역
    contentSelector: '.education-content',

    // 헤더 선택자
    headingSelector: 'h1, h2, h3, h4',

    // 스크롤 가능한 컨테이너
    scrollContainer: '.content',

    // 활성 클래스명
    activeLinkClass: 'active',

    // 스크롤 시 헤더 오프셋 (상단 공백 줄어든 것에 맞춰 조정)
    headingsOffset: 30, // 50 -> 30으로 줄임

    // 스크롤 매끄럽게 처리
    scrollSmooth: true,
    scrollSmoothDuration: 420,

    // 성능 최적화
    throttleTimeout: 50,

    // TOC 링크 클릭 시 스크롤 오프셋
    scrollSmoothOffset: -30, // -50 -> -30으로 조정

    // 기타 옵션
    positionFixedSelector: null,
    positionFixedClass: 'is-position-fixed',
    fixedSidebarOffset: 'auto',
    includeHtml: false,

    // 🔧 클릭 이벤트 개선
    onClick: function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('tocbot 링크 클릭:', e.target.textContent);

      // tocbot의 기본 스크롤 동작 사용하지 않고 수동 처리
      const targetId = e.target.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // URL 해시 업데이트 (새로고침 없이)
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, targetId);
          }
        }
      }

      return false; // tocbot의 기본 동작 방지
    },

    // 활성 항목이 변경될 때 호출되는 콜백
    onScroll: function (activeEl) {
      if (activeEl) {
        scrollTOCToActiveItem(activeEl);
      }
    }
  });

  window.tocbotInstance = true;
  console.log('tocbot으로 TOC 활성화 추적이 설정되었습니다.');
}

// TOC에서 활성 항목이 보이도록 스크롤 조정하는 함수
function scrollTOCToActiveItem(activeElement) {
  const tocContainer = document.querySelector('.toc');
  if (!tocContainer || !activeElement) return;

  // 활성 항목의 위치 정보
  const activeItemRect = activeElement.getBoundingClientRect();
  const tocContainerRect = tocContainer.getBoundingClientRect();

  // TOC 컨테이너의 스크롤 가능한 영역 계산
  const tocScrollTop = tocContainer.scrollTop;
  const tocHeight = tocContainer.clientHeight;
  const tocHeaderHeight = 70; // TOC 헤더 높이

  // 활성 항목이 TOC 컨테이너 내에서의 상대적 위치
  const activeItemTop = activeItemRect.top - tocContainerRect.top + tocScrollTop;
  const activeItemBottom = activeItemTop + activeElement.offsetHeight;

  // 보여야 할 스크롤 영역 계산
  const visibleTop = tocScrollTop + tocHeaderHeight;
  const visibleBottom = tocScrollTop + tocHeight;

  let newScrollTop = tocScrollTop;

  // 활성 항목이 보이는 영역 위에 있는 경우
  if (activeItemTop < visibleTop) {
    newScrollTop = activeItemTop - tocHeaderHeight - 10; // 10px 여백
  }
  // 활성 항목이 보이는 영역 아래에 있는 경우
  else if (activeItemBottom > visibleBottom) {
    newScrollTop = activeItemBottom - tocHeight + 10; // 10px 여백
  }

  // 스크롤이 필요한 경우에만 실행
  if (Math.abs(newScrollTop - tocScrollTop) > 5) { // 5px 임계값
    tocContainer.scrollTo({
      top: Math.max(0, newScrollTop), // 최소값 0
      behavior: 'smooth'
    });

    console.log('TOC 스크롤 조정:', {
      from: tocScrollTop,
      to: newScrollTop,
      activeItem: activeElement.textContent.trim()
    });
  }
}
