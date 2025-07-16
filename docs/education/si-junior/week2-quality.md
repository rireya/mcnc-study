# 📚 Week 2: 코드 품질과 협업

## 🎯 학습 목표

- **유지보수를 고려한** 코드 작성법
- **HTML/CSS 기초** 필수 지식
- **네트워크와 HTTP** 이해
- **버그 없는 코드** 작성과 자체 테스트
- **구버전 호환성** 고려사항

---

## 🛠️ 유지보수를 고려한 코드 작성

### 🎯 핵심 원칙

> **"너무 어렵게 짜지 마라"**
> 기능 구현뿐만 아니라 코드 관리 측면도 생각해야 함

### 🏗️ 코드 복잡도 관리

#### 네스팅 3단계 제한 규칙

```javascript
// ❌ 너무 깊은 중첩 (4단계 이상)
function processUserData(users) {
  if (users && users.length > 0) {
    for (let user of users) {
      if (user.isActive) {
        if (user.permissions) {
          if (user.permissions.includes('admin')) {
            // 너무 깊은 중첩!
          }
        }
      }
    }
  }
}

// ✅ 개선된 코드 (조기 리턴 활용)
function processUserData(users) {
  if (!users || users.length === 0) return;

  for (let user of users) {
    if (!user.isActive) continue;
    if (!user.permissions) continue;

    if (user.permissions.includes('admin')) {
      // 깔끔한 로직
      processAdminUser(user);
    }
  }
}
```

#### 함수 분리를 통한 복잡도 감소

```javascript
// ❌ 하나의 함수에 모든 로직
function handleLogin(email, password) {
  // 유효성 검사 로직 (10줄)
  // API 호출 로직 (15줄)
  // 응답 처리 로직 (20줄)
  // 에러 처리 로직 (10줄)
  // 총 55줄의 복잡한 함수
}

// ✅ 기능별로 분리
function handleLogin(email, password) {
  if (!validateLoginForm(email, password)) {
    return showValidationError();
  }

  try {
    const response = await callLoginAPI(email, password);
    return processLoginResponse(response);
  } catch (error) {
    return handleLoginError(error);
  }
}

function validateLoginForm(email, password) {
  // 유효성 검사 로직만
}

function callLoginAPI(email, password) {
  // API 호출 로직만
}
```

### 📝 읽기 쉬운 코드 작성

#### 의미 있는 변수명

```javascript
// ❌ 의미 불분명
const d = new Date();
const u = users.filter(x => x.a);
const result = calc(a, b, c);

// ✅ 의미 명확
const currentDate = new Date();
const activeUsers = users.filter(user => user.isActive);
const totalPrice = calculateOrderTotal(price, tax, discount);
```

#### 상수를 통한 매직 넘버 제거

```javascript
// ❌ 매직 넘버 사용
if (user.age >= 19) {
  // 성인 로직
}
setTimeout(retry, 3000);

// ✅ 의미 있는 상수 사용
const ADULT_AGE = 19;
const RETRY_DELAY_MS = 3000;

if (user.age >= ADULT_AGE) {
  // 성인 로직
}
setTimeout(retry, RETRY_DELAY_MS);
```

---

## 🌐 HTML/CSS 기초 (FE 개발자 필수)

### 📋 HTML 시맨틱 태그

> **FE 개발자지만 HTML과 CSS 공부는 최소 한번은 해두는 걸 추천**

#### 의미 있는 태그 사용

```html
<!-- ❌ div 남용 -->
<div class="header">
  <div class="nav">메뉴</div>
</div>
<div class="content">
  <div class="article">본문</div>
</div>

<!-- ✅ 시맨틱 태그 활용 -->
<header>
  <nav>메뉴</nav>
</header>
<main>
  <article>본문</article>
</main>
```

#### 접근성을 고려한 마크업

```html
<!-- ✅ 접근성 고려 -->
<button
  type="button"
  aria-label="메뉴 열기"
  onclick="toggleMenu()">
  ☰
</button>

<input
  type="email"
  id="email"
  required
  aria-describedby="email-error">
<label for="email">이메일</label>
<div id="email-error" role="alert">
  이메일 형식이 올바르지 않습니다.
</div>
```

### 🎨 CSS 기초 원칙

#### 클래스명 작성 규칙

```css
/* ✅ BEM 방식 또는 의미 있는 클래스명 */
.user-card { }
.user-card__title { }
.user-card__title--highlight { }

.btn { }
.btn-primary { }
.btn-large { }

/* ❌ 의미 불분명한 클래스명 */
.box1 { }
.red-text { }
.mb-10 { }
```

#### CSS 구조화

```css
/* 1. Reset/Base */
* { box-sizing: border-box; }

/* 2. Layout */
.container { max-width: 1200px; margin: 0 auto; }

/* 3. Components */
.btn { /* 버튼 기본 스타일 */ }
.card { /* 카드 기본 스타일 */ }

/* 4. Utilities */
.text-center { text-align: center; }
.hidden { display: none; }

/* 5. Media Queries */
@media (max-width: 768px) {
  /* 모바일 스타일 */
}
```

---

## 🌐 네트워크와 HTTP 이해

### 📡 HTTP 기초 개념

#### HTTP 메서드 이해

```javascript
// GET - 데이터 조회
fetch('/api/users')
  .then(response => response.json())
  .then(users => console.log(users));

// POST - 데이터 생성
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '홍길동', email: 'hong@example.com' })
});

// PUT - 데이터 전체 수정
fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 1, name: '김길동', email: 'kim@example.com' })
});

// DELETE - 데이터 삭제
fetch('/api/users/1', {
  method: 'DELETE'
});
```

#### HTTP 상태 코드 이해

```javascript
// 상태 코드별 처리
async function apiCall() {
  try {
    const response = await fetch('/api/data');

    if (response.status === 200) {
      // 성공
      return await response.json();
    } else if (response.status === 401) {
      // 인증 실패 - 로그인 페이지로 이동
      window.location.href = '/login';
    } else if (response.status === 403) {
      // 권한 없음
      alert('접근 권한이 없습니다.');
    } else if (response.status === 404) {
      // 데이터 없음
      return null;
    } else if (response.status >= 500) {
      // 서버 에러
      throw new Error('서버 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
}
```

### 🔄 비동기 처리 패턴

#### Promise와 async/await

```javascript
// ✅ async/await 사용
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const userData = await response.json();

    // 추가 데이터 필요시 순차적 호출
    const profileResponse = await fetch(`/api/profile/${userData.id}`);
    const profileData = await profileResponse.json();

    return { ...userData, profile: profileData };
  } catch (error) {
    console.error('사용자 데이터 조회 실패:', error);
    throw error;
  }
}

// ✅ 병렬 호출이 가능한 경우
async function fetchDashboardData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);

    return { users, posts, comments };
  } catch (error) {
    console.error('대시보드 데이터 조회 실패:', error);
    throw error;
  }
}
```

---

## 🧪 버그 없는 코드와 자체 테스트

### ✅ 방어적 프로그래밍

#### null/undefined 체크

```javascript
// ✅ 안전한 객체 접근
function getUserDisplayName(user) {
  // 1단계: 객체 존재 확인
  if (!user) {
    return '익명 사용자';
  }

  // 2단계: 속성 존재 확인
  if (user.name) {
    return user.name;
  }

  // 3단계: 대안값 제공
  return user.email || user.id || '사용자';
}

// ✅ 옵셔널 체이닝 활용 (모던 브라우저)
const displayName = user?.profile?.displayName ?? '익명 사용자';
const avatarUrl = user?.profile?.avatar?.url ?? '/default-avatar.png';
```

#### 배열 처리 안전장치

```javascript
// ✅ 배열 안전 처리
function processUserList(users) {
  // 배열인지 확인
  if (!Array.isArray(users)) {
    console.warn('users가 배열이 아닙니다:', typeof users);
    return [];
  }

  // 빈 배열 처리
  if (users.length === 0) {
    return [];
  }

  return users
    .filter(user => user && user.id) // null/undefined 제거
    .map(user => ({
      id: user.id,
      name: user.name || '이름 없음',
      email: user.email || ''
    }));
}
```

### 🔍 자체 테스트 방법론

#### 1. 경계값 테스트

```javascript
// 테스트해야 할 케이스들
function validateAge(age) {
  // 경계값 테스트 케이스:
  // - null, undefined
  // - 문자열 숫자 ('25')
  // - 음수 (-1)
  // - 0
  // - 최대값 (150)
  // - 소수점 (25.5)

  if (age == null) return false;

  const numAge = Number(age);
  if (isNaN(numAge)) return false;

  return numAge >= 0 && numAge <= 150;
}

// 브라우저 콘솔에서 테스트
// validateAge(null)     // false
// validateAge('25')     // true
// validateAge(-1)       // false
// validateAge(25.5)     // true
```

#### 2. 에러 상황 테스트

```javascript
// 에러 상황 대비 코드
async function saveUserData(userData) {
  try {
    // 1. 입력값 검증
    if (!userData || !userData.email) {
      throw new Error('이메일은 필수입니다.');
    }

    // 2. API 호출
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    // 3. 응답 상태 확인
    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    // 4. 에러 로깅 및 사용자 알림
    console.error('사용자 저장 실패:', error);
    alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    throw error;
  }
}
```

---

## ⚙️ 구버전 호환성 고려사항

### 📱 브라우저 호환성

#### ES6+ 기능 사용 시 주의사항

```javascript
// ❌ 구버전에서 지원 안됨
const users = data?.users ?? [];
const [first, ...rest] = users;

// ✅ 구버전 호환 코드
const users = (data && data.users) || [];
const first = users[0];
const rest = users.slice(1);

// ✅ 또는 Babel 트랜스파일링 사용
// 개발 시 ES6+ 문법 사용 → 빌드 시 ES5로 변환
```

#### CSS 벤더 프리픽스

```css
/* ✅ 구버전 브라우저 지원 */
.animation-element {
  -webkit-transform: translateX(100px);
  -moz-transform: translateX(100px);
  -ms-transform: translateX(100px);
  transform: translateX(100px);

  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
```

#### 기능 감지 (Feature Detection)

```javascript
// ✅ 기능 지원 여부 확인 후 사용
function supportLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function saveToStorage(key, value) {
  if (supportLocalStorage()) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    // 대안: 쿠키 사용
    document.cookie = `${key}=${JSON.stringify(value)}`;
  }
}
```

### 🔧 폴리필(Polyfill) 활용

#### 핵심 개념

> **폴리필**: 구버전 브라우저에서 지원하지 않는 최신 기능을 구현해주는 코드

```javascript
// ✅ Array.prototype.includes 폴리필 (IE 지원)
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) return false;
    var n = parseInt(fromIndex) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) k = 0;
    }
    for (; k < len; k++) {
      if (O[k] === searchElement) return true;
    }
    return false;
  };
}

// 사용 예시
var fruits = ['apple', 'banana', 'orange'];
if (fruits.includes('apple')) {
  console.log('사과가 있습니다!');
}
```

#### 자주 사용하는 폴리필

```javascript
// ✅ Promise 폴리필 (IE 지원)
// CDN으로 추가: <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>

// ✅ fetch API 폴리필 (IE 지원)
// CDN으로 추가: <script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.min.js"></script>

// ✅ Object.assign 폴리필
if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}
```

#### 폴리필 라이브러리 활용

```html
<!-- ✅ core-js 폴리필 (권장) -->
<script src="https://cdn.jsdelivr.net/npm/core-js-bundle@3.32.0/minified.js"></script>

<!-- ✅ 또는 polyfill.io 서비스 -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>

<!-- ✅ 특정 기능만 선택적 로드 -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.includes,Promise,fetch"></script>
```

#### 실무 적용 예시

```javascript
// ✅ 모던 기능을 폴리필과 함께 안전하게 사용
document.addEventListener('DOMContentLoaded', function() {
  // Promise 사용 (폴리필로 IE 지원)
  fetch('/api/users')
    .then(function(response) {
      return response.json();
    })
    .then(function(users) {
      // Array.includes 사용 (폴리필로 IE 지원)
      var activeUsers = users.filter(function(user) {
        return ['active', 'premium'].includes(user.status);
      });

      // Object.assign 사용 (폴리필로 IE 지원)
      var processedUsers = activeUsers.map(function(user) {
        return Object.assign({}, user, {
          displayName: user.name || '이름 없음',
          isVip: user.status === 'premium'
        });
      });

      displayUsers(processedUsers);
    })
    .catch(function(error) {
      console.error('사용자 데이터 로드 실패:', error);
    });
});
```

---

## 🛠️ jQuery 기초 (유지보수용)

### 📚 jQuery 필요성

> **jQuery는 어느 정도는 알아두는 걸 추천**
> (기존 앱 유지보수 및 bizMOB3.5 프로젝트 투입 시 필요)

#### 기본 선택자와 이벤트

```javascript
// jQuery 기본 패턴
$(document).ready(function() {
  // DOM 요소 선택
  $('#loginBtn').click(function() {
    const email = $('#email').val();
    const password = $('#password').val();

    // 유효성 검사
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    // 로딩 상태 표시
    $(this).prop('disabled', true).text('로그인 중...');

    // Ajax 호출
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: { email: email, password: password },
      success: function(response) {
        window.location.href = '/dashboard';
      },
      error: function(xhr) {
        alert('로그인 실패: ' + xhr.responseText);
      },
      complete: function() {
        $('#loginBtn').prop('disabled', false).text('로그인');
      }
    });
  });
});
```

#### 모던 JavaScript와 jQuery 비교

```javascript
// jQuery 방식
$('#myButton').click(function() {
  $(this).addClass('active');
  $('.content').show();
});

// 모던 JavaScript 방식
document.getElementById('myButton').addEventListener('click', function() {
  this.classList.add('active');
  document.querySelector('.content').style.display = 'block';
});
```

---

## ✅ 실무 체크리스트

### 📋 코드 작성 전

- 요구사항을 정확히 이해했는가?
- 기존 코드 스타일을 확인했는가?
- 브라우저 지원 범위를 확인했는가?

### 📋 코드 작성 중

- 함수가 너무 길지 않은가? (20줄 이내 권장)
- 중첩이 3단계를 넘지 않는가?
- 변수명이 의미를 명확히 전달하는가?
- 에러 처리를 했는가?

### 📋 코드 작성 후

- 다양한 입력값으로 테스트했는가?
- 에러 상황을 테스트했는가?
- 브라우저 호환성을 확인했는가?
- 주석이 필요한 부분에 작성했는가?

---

## 📱 Ionic 컴포넌트 기초 소개

### 🎯 Ionic 컴포넌트란?

> **"모바일 네이티브 UX를 웹에서 구현하는 컴포넌트 라이브러리"**
> **"기존 Vue 프로젝트에 모바일 친화적 UI를 쉽게 추가하는 도구"**

#### **핵심 개념**

```text
📱 Ionic 컴포넌트의 특징:

1. 모바일 최적화 UI
   - 터치 친화적 인터페이스
   - iOS/Android 네이티브 룩앤필
   - 플랫폼별 자동 스타일 적용

2. Vue.js 완벽 호환
   - 기존 Vue 컴포넌트와 함께 사용
   - Vue Composition API 지원
   - TypeScript 완전 지원

3. 쉬운 통합
   - NPM 패키지로 간단 설치
   - 기존 프로젝트에 점진적 적용
   - 기본 CSS 테마 제공

4. 퍼블리셔 친화적
   - CSS 변수로 커스터마이징
   - 브랜드 아이덴티티 적용 용이
   - 반응형 디자인 내장
```

#### **SI 프로젝트에서의 활용**

```text
🏢 실무 활용 사례:

✅ 적합한 상황:
- 모바일 웹 서비스 개발
- 내부 하이브리드 플랫폼 연동
- 빠른 모바일 UI 구현 필요
- 개발-퍼블리셔 협업 프로젝트

✅ 구체적 활용:
- 리스트 및 카드 레이아웃
- 폼 입력 컴포넌트
- 네비게이션 및 탭
- 모달 및 알림

⚠️ 프로젝트 특성:
- 컴포넌트 기능만 사용 (앱 빌드 제외)
- 내부 플랫폼으로 하이브리드 구현
- 퍼블리셔가 테마 커스터마이징
```

#### **기본 컴포넌트 예시**

```vue
<template>
  <!-- 기존 Vue 프로젝트에 Ionic 컴포넌트 추가 -->
  <div class="page-container">
    <!-- 기본 Vue 헤더 -->
    <header class="page-header">
      <h1>사용자 관리</h1>
    </header>

    <!-- Ionic 컴포넌트 활용 영역 -->
    <ion-content class="main-content">
      <ion-list>
        <ion-item v-for="user in users" :key="user.id">
          <ion-avatar slot="start">
            <img :src="user.avatar" :alt="user.name" />
          </ion-avatar>
          <ion-label>
            <h2>{{ user.name }}</h2>
            <p>{{ user.email }}</p>
          </ion-label>
          <ion-badge color="primary" slot="end">
            {{ user.role }}
          </ion-badge>
        </ion-item>
      </ion-list>

      <!-- 모바일 친화적 버튼 -->
      <ion-button expand="block" @click="addUser">
        사용자 추가
      </ion-button>
    </ion-content>
  </div>
</template>

<script setup lang="ts">
import {
  IonContent, IonList, IonItem, IonLabel,
  IonAvatar, IonBadge, IonButton
} from '@ionic/vue';

const users = ref([
  { id: 1, name: '김개발', email: 'kim@example.com', role: 'admin', avatar: '/avatar1.jpg' },
  { id: 2, name: '이디자인', email: 'lee@example.com', role: 'user', avatar: '/avatar2.jpg' }
]);

const addUser = () => {
  // 사용자 추가 로직
};
</script>

<style scoped>
/* 기존 프로젝트 스타일과 Ionic 컴포넌트 조화 */
.page-container {
  max-width: 768px;
  margin: 0 auto;
}

.page-header {
  background: var(--brand-primary);
  color: white;
  padding: 1rem;
}

.main-content {
  --background: transparent;
  padding: 1rem;
}
</style>
```

---

**📧 질문이 있으시면 언제든 연락주세요!**

**프로젝트수행팀 최명훈 (<mhchoi@mcnc.co.kr>)**
