# 🔧 실무 트러블슈팅 가이드

## 🎯 목적

SI 프로젝트에서 자주 발생하는 문제들과 해결 방법을 정리한 **즉시 활용 가능한 실무 가이드**입니다.

---

## 🐛 일반적인 문제 상황과 해결법

### 1. 개발 환경 문제

#### **🔥 자주 발생하는 상황**

**문제**: 로컬에서는 잘 되는데 개발서버에서는 안 됨
```text
증상:
- 로컬: 정상 동작
- 개발서버: 빈 페이지 또는 에러

원인:
1. 빌드 파일 경로 문제
2. 환경변수 차이
3. CORS 정책 차이
4. 브라우저 캐시 문제
```

**해결법**:
```javascript
// 1. 빌드 경로 확인
// vite.config.js 또는 webpack.config.js
export default {
  base: '/project-name/', // 서버 배포 경로와 일치시키기
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
}

// 2. 환경변수 확인
// .env.development vs .env.production
VITE_API_URL=http://localhost:3000  // 로컬
VITE_API_URL=https://dev-api.company.com  // 개발서버

// 3. CORS 설정 확인
// 백엔드에 요청
Access-Control-Allow-Origin: https://dev.company.com
```

**체크리스트**:
- [ ] 빌드 파일 경로가 서버와 일치하는지
- [ ] 환경변수가 올바르게 설정되었는지
- [ ] 개발자 도구 콘솔에서 에러 메시지 확인
- [ ] 네트워크 탭에서 API 요청 상태 확인

---

#### **문제**: npm install 시 에러 발생

```text
자주 보는 에러:
- "permission denied"
- "EACCES: permission denied"
- "Cannot resolve dependency"
- "peer dep missing"
```

**해결법**:
```bash
# 1. 권한 문제 해결
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install

# 2. Node.js 버전 문제
node --version  # 프로젝트 요구사항과 맞는지 확인
nvm use 16.14.0  # 프로젝트에 맞는 버전 사용

# 3. peer dependency 문제
npm install --legacy-peer-deps
# 또는
npm install --force
```

---

### 2. 브라우저 호환성 문제

#### **문제**: IE에서만 안 됨 (아직도 가끔 있음)

```javascript
// 자주 문제되는 코드들
const data = response.json(); // IE에서 Promise 지원 안함
array.includes(item); // IE에서 지원 안함
element.closest('.parent'); // IE에서 지원 안함

// 해결법
// 1. 폴리필 추가
npm install --save core-js

// 2. 대체 코드 사용
// includes 대신
array.indexOf(item) !== -1

// closest 대신
function closest(element, selector) {
  while (element && !element.matches(selector)) {
    element = element.parentElement;
  }
  return element;
}
```

---

### 3. 성능 문제

#### **문제**: 페이지 로딩이 너무 느림

**진단 방법**:
```javascript
// 1. 개발자 도구 Performance 탭 활용
// 2. Lighthouse 점수 확인
// 3. 네트워크 탭에서 큰 파일 찾기

// 자주 발견되는 문제들:
// - 큰 이미지 파일 (1MB 이상)
// - 너무 많은 JavaScript 라이브러리
// - 최적화되지 않은 CSS
// - 많은 외부 폰트
```

**해결법**:
```javascript
// 1. 이미지 최적화
// WebP 형식 사용, 적절한 크기로 리사이징

// 2. 코드 스플리팅
// Vue.js 예시
const LazyComponent = () => import('./LazyComponent.vue')

// 3. CSS 최적화
// 사용하지 않는 CSS 제거
// Critical CSS 인라인 처리

// 4. 캐싱 활용
// 브라우저 캐시 설정
// CDN 사용
```

---

## 📱 모바일 웹 특화 문제

### 1. 터치 이벤트 문제

#### **문제**: 버튼을 눌렀는데 반응이 늦음

```javascript
// 문제 코드
button.addEventListener('click', handleClick);

// 해결 코드
// 터치 디바이스에서는 touchstart 사용
if ('ontouchstart' in window) {
  button.addEventListener('touchstart', handleClick);
} else {
  button.addEventListener('click', handleClick);
}

// 또는 CSS로 해결
.button {
  touch-action: manipulation; /* 더블탭 줌 방지 */
  -webkit-tap-highlight-color: transparent; /* 터치 하이라이트 제거 */
}
```

---

#### **문제**: iOS Safari에서 스크롤이 이상함

```css
/* iOS Safari 스크롤 문제 해결 */
.scroll-container {
  -webkit-overflow-scrolling: touch; /* 부드러운 스크롤 */
  overflow-y: auto;
}

/* iOS Safari input 줌 방지 */
input, select, textarea {
  font-size: 16px; /* 16px 이상이어야 줌 안됨 */
}
```

---

### 2. 가상 키보드 문제

#### **문제**: 키보드가 올라올 때 레이아웃이 깨짐

```javascript
// 가상 키보드 감지
let initialHeight = window.innerHeight;

window.addEventListener('resize', function() {
  let currentHeight = window.innerHeight;
  let heightDiff = initialHeight - currentHeight;

  if (heightDiff > 150) {
    // 키보드가 올라온 상태
    document.body.classList.add('keyboard-open');
  } else {
    // 키보드가 닫힌 상태
    document.body.classList.remove('keyboard-open');
  }
});
```

```css
/* 키보드 올라왔을 때 스타일 */
.keyboard-open .footer {
  display: none; /* 하단 네비게이션 숨기기 */
}

.keyboard-open .content {
  padding-bottom: 0; /* 하단 여백 제거 */
}
```

---

## 🔗 API 연동 문제

### 1. CORS 에러

#### **문제**: "Access to fetch at 'API_URL' has been blocked by CORS policy"

**즉시 해결법** (임시):
```javascript
// 개발 중에만 사용 - 프록시 설정
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
```

**근본 해결법** (백엔드 협업):
```text
백엔드 개발자에게 요청사항:
1. Access-Control-Allow-Origin 헤더 추가
2. OPTIONS 메서드 지원
3. 필요한 헤더들 허용 설정

Headers:
Access-Control-Allow-Origin: https://yoursite.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

### 2. API 응답 처리 문제

#### **문제**: API 에러 상황 처리 미흡

```javascript
// 문제 코드
fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    // 성공만 처리
    console.log(data);
  });

// 개선 코드
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');

    // HTTP 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 데이터 유효성 검사
    if (!data || !Array.isArray(data.users)) {
      throw new Error('Invalid data format');
    }

    return data;

  } catch (error) {
    console.error('API 호출 실패:', error);

    // 사용자에게 친화적인 에러 메시지
    if (error.message.includes('network')) {
      showErrorMessage('네트워크 연결을 확인해주세요.');
    } else if (error.message.includes('404')) {
      showErrorMessage('요청한 정보를 찾을 수 없습니다.');
    } else {
      showErrorMessage('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    return null;
  }
}
```

---

## 🎨 CSS 레이아웃 문제

### 1. Flexbox 정렬 문제

#### **문제**: 가운데 정렬이 안 됨

```css
/* 자주 하는 실수 */
.container {
  display: flex;
  justify-content: center; /* 수평 중앙만 됨 */
}

/* 올바른 방법 */
.container {
  display: flex;
  justify-content: center; /* 수평 중앙 */
  align-items: center; /* 수직 중앙 */
  min-height: 100vh; /* 높이 지정 필요 */
}
```

---

#### **문제**: 모바일에서 레이아웃이 깨짐

```css
/* 반응형 Flexbox */
.container {
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  gap: 20px;
}

.item {
  flex: 1 1 300px; /* grow shrink basis */
  min-width: 0; /* 텍스트 오버플로우 방지 */
}

/* 모바일에서 세로 배치 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

---

### 2. Z-index 문제

#### **문제**: 모달이 다른 요소 뒤에 가려짐

```css
/* 체계적인 z-index 관리 */
:root {
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-toast: 1080;
}

/* 모달 스타일 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal-backdrop);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: var(--z-modal);
}
```

---

## 🔍 디버깅 팁

### 1. 개발자 도구 활용

#### **Console 디버깅**

```javascript
// 단순 console.log 대신 다양한 방법 활용

// 1. 객체를 테이블로 보기
console.table(users);

// 2. 그룹화해서 보기
console.group('User API');
console.log('Request:', requestData);
console.log('Response:', responseData);
console.groupEnd();

// 3. 시간 측정
console.time('API Call');
await fetchData();
console.timeEnd('API Call');

// 4. 조건부 로그
console.assert(user.id, 'User ID is required');

// 5. 스택 트레이스
console.trace('Function call path');
```

---

#### **Network 탭 활용**

```text
📋 네트워크 탭 체크리스트:

□ Status Code 확인 (200, 404, 500 등)
□ Response Time 확인 (느린 API 찾기)
□ Request Headers 확인 (인증 토큰 등)
□ Response Data 확인 (예상과 다른 데이터)
□ CORS 에러 확인
□ 캐시 상태 확인
```

---

### 2. Vue.js 디버깅

#### **Vue Devtools 활용**

```javascript
// 컴포넌트에서 디버깅 정보 추가
export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      loading: false,
      error: null
    }
  },

  // 개발 중에만 디버깅 정보 노출
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      window.userListComponent = this;
      console.log('UserList component mounted:', this);
    }
  },

  // 에러 경계 설정
  errorCaptured(error, instance, info) {
    console.error('Vue Error:', error);
    console.error('Component:', instance);
    console.error('Info:', info);

    // 에러 로깅 서비스로 전송
    this.logError(error, info);

    return false; // 에러 전파 중단
  }
}
```

---

## 🚨 긴급 상황 대응

### 1. 운영 서버 문제 발생

#### **체크리스트**

```text
🔥 긴급 상황 대응 순서:

1. 즉시 확인 (1분 이내)
   □ 서버 상태 확인
   □ 에러 메시지 수집
   □ 영향 범위 파악

2. 임시 조치 (5분 이내)
   □ 이전 버전으로 롤백 가능한지 확인
   □ 우회 방법 있는지 확인
   □ 관련 팀에 상황 공유

3. 근본 해결 (30분 이내)
   □ 문제 원인 분석
   □ 수정 사항 개발
   □ 테스트 후 배포

4. 사후 처리
   □ 문제 원인 문서화
   □ 재발 방지 대책 수립
   □ 프로세스 개선 사항 도출
```

---

#### **자주 사용하는 긴급 수정 방법**

```javascript
// 1. JavaScript 에러 방지 (임시)
try {
  // 문제가 될 수 있는 코드
  riskyFunction();
} catch (error) {
  console.error('Error caught:', error);
  // 기본값으로 처리
  handleFallback();
}

// 2. CSS 숨김 처리 (임시)
.problematic-element {
  display: none !important; /* 임시로 숨기기 */
}

// 3. 기능 비활성화 (임시)
if (process.env.DISABLE_FEATURE === 'true') {
  return; // 문제 기능 비활성화
}
```

---

## 📞 도움 요청하기

### 언제 도움을 요청해야 할까?

```text
🤔 도움 요청 타이밍:

즉시 요청:
- 운영 서버 장애
- 보안 관련 문제
- 데이터 손실 위험

1시간 후 요청:
- 새로운 에러 메시지로 막힘
- 문서 찾아도 해결 안됨
- 3번 시도해도 같은 결과

하루 후 요청:
- 성능 최적화 방법
- 더 나은 구현 방법
- 코드 리뷰 요청
```

### 효과적인 질문 방법

```text
✅ 좋은 질문 템플릿:

제목: [긴급도] 간단한 문제 요약

내용:
1. 상황 설명
   - 무엇을 하려고 했는지
   - 어떤 문제가 발생했는지

2. 시도한 것들
   - 어떤 방법들을 시도했는지
   - 각각의 결과는 어땠는지

3. 환경 정보
   - 브라우저 종류/버전
   - 운영체제
   - 관련 라이브러리 버전

4. 에러 메시지 (있다면)
   - 전체 에러 스택
   - 콘솔 로그

5. 예상 결과
   - 어떻게 동작하기를 원하는지
```

---

## 🔗 유용한 도구와 링크

### 개발 도구

```text
🛠️ 필수 도구들:

브라우저 확장:
- Vue.js DevTools
- React Developer Tools
- Lighthouse
- JSONViewer

온라인 도구:
- JSFiddle / CodePen (테스트 코드)
- Can I Use (브라우저 지원 확인)
- CSS Validator
- JavaScript 압축/난독화

디버깅 도구:
- Sentry (에러 모니터링)
- LogRocket (사용자 세션 기록)
- Chrome DevTools
```

### 참고 사이트

```text
📚 즉시 도움되는 사이트들:

- MDN Web Docs: 웹 표준 문서
- Stack Overflow: 문제 해결
- GitHub Issues: 라이브러리 문제
- Vue.js 한국 커뮤니티
- 개발자스럽다 (슬랙)
```

---

## ✅ 마무리 체크리스트

### 예방 습관

- 코드 작성 시 예외 상황을 고려하는가?
- 정기적으로 브라우저별 테스트를 하는가?
- 성능을 고려하여 개발하는가?
- 문제 해결 과정을 문서화하는가?

---

**💡 기억하세요!**

**문제가 발생했을 때 당황하지 말고 체계적으로 접근하면 대부분의 문제는 해결할 수 있습니다!**
