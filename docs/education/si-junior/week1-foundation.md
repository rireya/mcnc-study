# 📚 Week 1: 개발 기초와 실무 준비

## 🎯 학습 목표

- **코딩 컨벤션과 주석** 작성법 습득
- **Git 기초**와 협업 워크플로우 이해
- **개발자 도구** 활용법과 디버깅 기초
- **독립적인 테스트 환경** 구축 방법
- **작업 이력 정리** 습관 형성

---

## 💡 핵심 마인드셋

### ✅ 기본 원칙
- **고객 우선**: 항상 고객의 관점에서 생각
- **품질 중시**: 완성도 높은 결과물 추구
- **협업 중시**: 팀원과의 원활한 소통
- **학습 의지**: 지속적인 기술 학습

### ✅ 코드 작성
- 남이 보는 것을 가정하고 작성
- 유지보수를 항상 고려
- 기능 구현뿐만 아니라 코드 관리 측면도 생각

---

## 📝 코딩 컨벤션과 주석

### 🎯 주석 작성의 핵심

#### 필수 주석 대상
```javascript
// ✅ 변수 선언 이유
const MAX_RETRY_COUNT = 3; // API 호출 실패 시 최대 재시도 횟수

// ✅ 분기 사유
if (userAgent.includes('Mobile')) {
  // 모바일 환경에서는 터치 이벤트 우선 처리
  attachTouchEvents();
} else {
  // PC 환경에서는 마우스 이벤트 처리
  attachMouseEvents();
}

// ✅ 함수 동작 설명
/**
 * 사용자 권한에 따라 메뉴를 필터링
 * @param {Array} menuList - 전체 메뉴 목록
 * @param {string} userRole - 사용자 권한 (admin, user, guest)
 * @returns {Array} 권한에 맞는 메뉴 목록
 */
function filterMenuByRole(menuList, userRole) {
  // 구현 로직...
}
```

#### ❌ 불필요한 주석
```javascript
// ❌ 코드 자체로 명확한 내용
let count = 0; // count를 0으로 초기화

// ❌ 의미 없는 반복
// 사용자 이름을 가져온다
const userName = getUserName();
```

### 🏷️ 네이밍 컨벤션

#### 변수/함수명 규칙
```javascript
// ✅ 의미가 명확한 이름
const isLoggedIn = checkUserLoginStatus();
const userProfileData = fetchUserProfile();
const handleLoginButtonClick = () => { /* ... */ };

// ❌ 의미 불분명한 이름
const flag = check();
const data = fetch();
const fn = () => { /* ... */ };
```

#### 상수명 규칙
```javascript
// ✅ 대문자와 언더스코어
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_PAGE_SIZE = 20;
const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  INVALID_INPUT: '입력값이 올바르지 않습니다.'
};
```

---

## 🌿 Git 기초와 협업

### 📋 GitHub Flow 기본 원칙
> 너무 어려울 필요 없이 **GitHub Flow** 정도로만 알아두자

```bash
# 1. 최신 main 브랜치로 시작
git checkout main
git pull origin main

# 2. 기능별 브랜치 생성
git checkout -b feature/login-validation

# 3. 작업 후 커밋
git add .
git commit -m "feat: 로그인 폼 유효성 검사 추가"

# 4. 원격 저장소에 푸시
git push origin feature/login-validation

# 5. Pull Request 생성 및 코드 리뷰
# 6. 리뷰 완료 후 main에 머지
```

### 💬 커밋 메시지 규칙
```bash
# ✅ 명확한 커밋 메시지
feat: 사용자 로그인 기능 추가
fix: 페이지네이션 버그 수정
docs: API 문서 업데이트
style: 코드 포맷팅 정리
refactor: 사용자 인증 로직 개선

# ❌ 불명확한 커밭 메시지
git commit -m "수정"
git commit -m "작업완료"
git commit -m "버그픽스"
```

---

## 📋 프로젝트 기록 관리

### 🎯 왜 프로젝트 기록이 필요한가?
> **"내가 진행한 프로젝트는 어딘가에 기록해둬야 한다"**

```text
💡 실무에서 꼭 필요한 이유:

✅ 이력서 작성시 구체적 내용 기재
✅ 면접에서 실무 경험 설명 가능  
✅ 유사한 문제 발생시 빠른 해결
✅ 승진/평가시 성과 증명 자료
```

### 📊 간단한 프로젝트 기록 방법

#### **기본 프로젝트 기록 템플릿**

```markdown
# 프로젝트명: OO 시스템 구축

## 기본 정보
- **기간**: 2024.01 ~ 2024.06 (6개월)
- **역할**: 프론트엔드 개발
- **고객**: OO 공공기관
- **기술**: Vue.js 3, JavaScript, CSS

## 주요 담당 업무
- 사용자 관리 화면 개발
- 대시보드 차트 기능
- 모바일 반응형 구현

## 기술적 이슈와 해결
**문제**: 대용량 데이터 렌더링 성능 저하
**해결**: 페이지네이션 + 가상 스크롤링 적용  
**결과**: 로딩 시간 10초 → 2초 단축

## 배운 점
- Vue 3 Composition API 실무 활용
- 성능 최적화 기법
- 공공기관 프로젝트 특성
```

#### **피드백 기록 (프로젝트 종료 후)**

실제 프로젝트에서 나온 피드백 예시:
```markdown
## OO 프로젝트 After 피드백

### 개선이 필요한 부분
- 함수가 이곳저곳 퍼져있어서 통합 필요
- 네이밍 규칙 정리 필요
- 공통 코드 처리를 store에서 관리하도록 개선

### 다음 프로젝트에서 적용할 점
- request 함수에 GET, POST 메소드 명칭 추가
- ref, reactive 차이점 명확히 구분해서 사용
- computed 활용해서 HTML에서 로직 최소화

### 새로 배운 기술
- useIonRouter 활용법
- 모달과 화면 조작 분리 방법
- Ionic 라이프사이클 훅 적용
```

### 💾 실용적인 기록 보관법

#### **1. 간단한 폴더 구조**
```text
📁 내_프로젝트_기록/
├── 📄 경력_프로필.md (전체 이력)
├── 📄 피드백_모음.md (프로젝트별 피드백)
├── 📂 2024년/
│   ├── 📄 HD현대_프로젝트.md
│   └── 📄 NS_차세대_프로젝트.md
└── 📂 기술_노트/
    ├── 📄 Vue3_경험.md
    └── 📄 문제해결_모음.md
```

#### **2. 추천 도구**
```text
💻 도구 선택:

간단한 시작:
- 메모장 or 노트패드++
- GitHub 개인 저장소
- 회사 OneDrive/GoogleDrive

체계적 관리:
- Notion (템플릿 활용)
- Obsidian (연결된 노트)
```

#### **3. 기록 주기**
```text
📅 현실적인 기록 주기:

프로젝트 중 (월 1회):
- 이번 달 주요 작업 내용
- 해결한 기술적 문제

프로젝트 종료시 (2시간):
- 전체 프로젝트 정리
- 피드백 내용 기록
- 다음에 적용할 점 정리

반기별 (1시간):
- 경력 프로필 업데이트
- 이력서 내용 보완
```

### 📊 경력 관리 테이블

실제 경력 관리 예시:
```markdown
| 프로젝트 | 고객 | 기간 | 담당업무 | 기술스택 |
|:-|:-|:-|:-|:-|
| NS 차세대 M-SFA | 농심 | 22.08~23.02 | Mobile FE | jQuery |
| HD현대 DXP 구축 | HD현대 | 23.05~24.04 | Mobile FE | Vue 3 |
| HD현대 DXP 2차 | HD현대 | 24.07~25.01 | Mobile FE | Vue 3 |
```

### 🔧 실무 팁

#### **기록시 주의사항**
```text
⚠️ 보안 고려:
- 고객사 기밀정보 제외
- 일반적인 기술 내용 위주
- 회사 승인된 범위에서 작성

✅ 효과적인 기록:
- 구체적인 수치 포함 (성능 개선 %)
- Before/After 비교
- 핵심 배운 점 위주
---

## 🔧 개발자 도구와 디버깅

### 🌐 브라우저 개발자 도구 활용

#### Console 활용법
```javascript
// ✅ 단계별 디버깅
console.log('함수 시작:', functionName);
console.log('변수 상태:', { userId, userName, userRole });
console.log('API 응답:', response);

// ✅ 조건부 로깅
if (process.env.NODE_ENV === 'development') {
  console.log('개발 모드 디버그:', debugData);
}

// ✅ 성능 측정
console.time('API 호출 시간');
await fetchUserData();
console.timeEnd('API 호출 시간');
```

#### Network Tab 활용

- API 호출 상태 확인
- 응답 시간 모니터링
- 에러 응답 분석
- 요청/응답 헤더 확인

#### Elements Tab 활용

- DOM 구조 분석
- CSS 스타일 실시간 수정
- 반응형 디자인 테스트
- 접근성 문제 확인

### 🐛 기본 디버깅 전략

#### 1단계: 문제 범위 좁히기

```javascript
// 함수 입구에서 파라미터 확인
function processUserData(userData) {
  console.log('입력 데이터:', userData);
  
  if (!userData) {
    console.error('userData가 없습니다');
    return;
  }
  
  // 처리 로직...
}
```

#### 2단계: 단계별 상태 확인

```javascript
// 각 처리 단계마다 상태 로깅
async function fetchAndProcessData() {
  console.log('1. 데이터 조회 시작');
  const rawData = await fetchData();
  console.log('2. 조회 완료:', rawData);
  
  console.log('3. 데이터 가공 시작');
  const processedData = processData(rawData);
  console.log('4. 가공 완료:', processedData);
  
  return processedData;
}
```

---

## 🧪 독립적인 테스트 환경 구축

### 🎯 핵심 원칙

> **"서버를 기다리지 말고 혼자 테스트할 방법을 생각하라"**

### 🏗️ Mock 데이터 활용

#### 간단한 Mock API

```javascript
// mockData.js
export const mockUsers = [
  { id: 1, name: '김개발', role: 'admin' },
  { id: 2, name: '이프론트', role: 'user' },
  { id: 3, name: '박백엔드', role: 'user' }
];

// API 함수에서 Mock 데이터 사용
async function fetchUsers() {
  if (process.env.NODE_ENV === 'development') {
    // 개발 환경에서는 Mock 데이터 사용
    return Promise.resolve(mockUsers);
  } else {
    // 운영 환경에서는 실제 API 호출
    return fetch('/api/users').then(res => res.json());
  }
}
```

#### localStorage를 활용한 임시 데이터

```javascript
// 임시 데이터 저장/조회
function saveTestData(key, data) {
  localStorage.setItem(`test_${key}`, JSON.stringify(data));
}

function getTestData(key) {
  const data = localStorage.getItem(`test_${key}`);
  return data ? JSON.parse(data) : null;
}

// 사용 예시
saveTestData('userList', mockUsers);
const testUsers = getTestData('userList');
```

### 🔍 독립 테스트 방법론

#### 1. 컴포넌트 단위 테스트

```html
<!-- 단일 컴포넌트 테스트 페이지 -->
<!DOCTYPE html>
<html>
<head>
  <title>로그인 폼 테스트</title>
</head>
<body>
  <div id="test-area">
    <!-- 테스트할 컴포넌트만 렌더링 -->
  </div>
  
  <script>
    // 테스트 시나리오 작성
    testLoginForm();
  </script>
</body>
</html>
```

#### 2. 브라우저 콘솔에서 함수 테스트

```javascript
// 개발자 도구 콘솔에서 직접 함수 테스트
window.testUtils = {
  validateEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  formatPhone: (phone) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
};

// 콘솔에서 테스트
// testUtils.validateEmail('test@example.com'); // true
// testUtils.formatPhone('01012345678'); // 010-1234-5678
```

---

## ✅ 실무 체크리스트

### 📋 개발 전 준비사항

- 요구사항 명확히 이해했는가?
- 설계/구조를 먼저 생각했는가?
- 테스트 방법을 계획했는가?
- Git 브랜치를 생성했는가?

### 📋 개발 중 점검사항

- 코드가 너무 복잡하지 않은가?
- 주석이 필요한 부분에 작성했는가?
- 네이밍이 명확한가?
- 에러 처리를 했는가?

### 📋 개발 완료 후 점검사항

- 자체 테스트를 충분히 했는가?
- 다양한 케이스를 확인했는가?
- 브라우저 호환성을 확인했는가?
- 커밋 메시지가 명확한가?

---

## 📚 참고 자료

### 🔗 필수 학습 링크

- <a href="https://git-scm.com/book/ko/v2" target="_blank">Git 기초 가이드</a>
- <a href="https://github.com/airbnb/javascript" target="_blank">JavaScript 스타일 가이드</a>
- <a href="https://developer.mozilla.org/ko/docs/Learn/Common_questions/What_are_browser_developer_tools" target="_blank">브라우저 개발자 도구 가이드</a>

### 💡 추천 도구

- **코드 에디터**: VSCode + 유용한 확장프로그램
- **Git GUI**: GitHub Desktop (초보자용)
- **API 테스트**: Postman 또는 브라우저 Network 탭

---

**📧 질문이 있으시면 언제든 연락주세요!**  
**프로젝트수행팀 최명훈 (<mhchoi@mcnc.co.kr>)**
