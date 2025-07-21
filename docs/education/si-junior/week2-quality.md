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

### 🏢 실제 SI 프로젝트 유지보수 사례

#### 케이스 1: 레거시 코드 개선 요청

> **상황**: "기존 코드가 너무 복잡해서 버그 수정이 어렵다"는 QA 팀 피드백

```javascript
// ❌ 실제 프로젝트에서 발견된 문제 코드
function processOrder(orderData) {
  if (orderData) {
    if (orderData.items) {
      if (orderData.items.length > 0) {
        for (let i = 0; i < orderData.items.length; i++) {
          if (orderData.items[i].status === 'active') {
            if (orderData.items[i].price && orderData.items[i].quantity) {
              if (orderData.customer && orderData.customer.type === 'premium') {
                orderData.items[i].finalPrice = orderData.items[i].price * orderData.items[i].quantity * 0.9;
              } else {
                orderData.items[i].finalPrice = orderData.items[i].price * orderData.items[i].quantity;
              }
            }
          }
        }
      }
    }
  }
  return orderData;
}

// ✅ 유지보수 가능한 개선 코드
function processOrder(orderData) {
  if (!isValidOrder(orderData)) {
    return orderData;
  }

  const processedItems = orderData.items
    .filter(item => item.status === 'active')
    .filter(item => item.price && item.quantity)
    .map(item => calculateItemPrice(item, orderData.customer));

  return {
    ...orderData,
    items: processedItems
  };
}

function isValidOrder(orderData) {
  return orderData &&
         orderData.items &&
         Array.isArray(orderData.items) &&
         orderData.items.length > 0;
}

function calculateItemPrice(item, customer) {
  const basePrice = item.price * item.quantity;
  const discount = isPremiumCustomer(customer) ? 0.9 : 1;

  return {
    ...item,
    finalPrice: basePrice * discount
  };
}

function isPremiumCustomer(customer) {
  return customer && customer.type === 'premium';
}
```

#### 케이스 2: 코드 리뷰에서 자주 지적되는 문제점들

```javascript
// ❌ 리뷰에서 지적받는 코드 패턴들

// 1. 함수가 너무 많은 일을 함
function handleUserRegistration(formData) {
  // 유효성 검사 (15줄)
  // 중복 이메일 체크 (10줄)
  // 비밀번호 암호화 (5줄)
  // 데이터베이스 저장 (8줄)
  // 이메일 발송 (12줄)
  // 로그 기록 (6줄)
  // 총 56줄의 거대한 함수
}

// 2. 불명확한 boolean 반환
function checkUser(user) {
  return user.age > 18 && user.email && user.status !== 'blocked';
  // 무엇을 체크하는 건지 불분명
}

// 3. 에러 처리 없음
function getUserData(userId) {
  const response = fetch(`/api/users/${userId}`);
  return response.json(); // 에러 상황 고려 안함
}

// ✅ 리뷰 통과하는 개선 코드

// 1. 단일 책임 원칙 적용
async function handleUserRegistration(formData) {
  const validationResult = validateRegistrationForm(formData);
  if (!validationResult.isValid) {
    return { success: false, errors: validationResult.errors };
  }

  try {
    const user = await createUser(formData);
    await sendWelcomeEmail(user);
    logUserRegistration(user.id);

    return { success: true, user };
  } catch (error) {
    logError('User registration failed', error);
    return { success: false, error: error.message };
  }
}

// 2. 명확한 함수명과 목적
function isEligibleForService(user) {
  return user.age >= 18 &&
         hasValidEmail(user.email) &&
         !isBlockedUser(user);
}

function hasValidEmail(email) {
  return email && email.includes('@');
}

function isBlockedUser(user) {
  return user.status === 'blocked';
}

// 3. 완전한 에러 처리
async function getUserData(userId) {
  try {
    if (!userId) {
      throw new Error('사용자 ID가 필요합니다.');
    }

    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
      throw new Error(`서버 오류: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('사용자 데이터 조회 실패:', error);
    throw error;
  }
}
```

### 🤝 팀 협업을 위한 코딩 컨벤션

#### 1. 프로젝트별 코딩 스타일 가이드

```javascript
// ✅ 팀 협업 코딩 컨벤션 예시

// 1. 파일명 규칙
// - 컴포넌트: PascalCase (UserProfile.vue)
// - 유틸리티: camelCase (dateUtils.js)
// - 상수: UPPER_SNAKE_CASE (API_ENDPOINTS.js)

// 2. 함수명 규칙
// - 동사 + 명사 조합
// - 목적이 명확하게 드러나도록
function getUserProfile() { }      // ✅ 좋음
function getUser() { }             // ⚠️ 무엇을 가져오는지 불분명
function user() { }                // ❌ 나쁨

// 3. 변수명 규칙
// - boolean: is, has, can, should로 시작
const isLoggedIn = true;
const hasPermission = false;
const canEdit = user.role === 'admin';
const shouldShowWarning = errors.length > 0;

// - 배열: 복수형 사용
const users = [];
const errorMessages = [];
const selectedItems = [];

// 4. 상수 정의 위치
// constants/api.js
export const API_ENDPOINTS = {
  USER: '/api/users',
  ORDER: '/api/orders',
  PRODUCT: '/api/products'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

// 5. 주석 작성 규칙
/**
 * 사용자 주문 내역을 조회합니다.
 * @param {string} userId - 사용자 ID
 * @param {Object} options - 조회 옵션
 * @param {number} options.limit - 조회할 개수 (기본값: 10)
 * @param {string} options.status - 주문 상태 필터
 * @returns {Promise<Array>} 주문 내역 배열
 */
async function getUserOrders(userId, options = {}) {
  const { limit = 10, status } = options;

  // API 호출 전 사용자 ID 유효성 검사
  if (!userId) {
    throw new Error('사용자 ID는 필수입니다.');
  }

  // 주문 내역 조회 로직
  // ...
}
```

#### 2. Git 커밋 메시지 컨벤션

```text
✅ 팀 협업 Git 커밋 규칙

타입: 간단한 설명 (50자 이내)

상세 설명 (필요시)
- 변경 이유
- 주요 변경 사항
- 주의사항

예시:
feat: 사용자 프로필 수정 기능 추가

- 이메일, 전화번호 수정 가능
- 실시간 유효성 검사 적용
- 변경 내역 로그 기록

fix: 로그인 시 세션 만료 오류 해결

- 토큰 갱신 로직 개선
- 만료 시간 5분 전 자동 갱신
- 만료 시 사용자에게 알림 표시

refactor: 주문 처리 로직 함수 분리

- 복잡한 processOrder 함수를 작은 함수들로 분리
- 테스트 가능성 향상
- 코드 가독성 개선

커밋 타입:
- feat: 새로운 기능 추가
- fix: 버그 수정
- refactor: 코드 리팩토링
- style: 코드 포맷팅
- docs: 문서 수정
- test: 테스트 코드 추가/수정
```

### 🎯 실습 과제 1: 코드 리팩토링

**과제**: 다음 코드를 유지보수 가능하도록 개선하세요.

```javascript
// 개선 대상 코드
function processData(data) {
  if (data) {
    if (data.users) {
      for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].age > 18) {
          if (data.users[i].status === 'active') {
            if (data.users[i].orders) {
              let total = 0;
              for (let j = 0; j < data.users[i].orders.length; j++) {
                if (data.users[i].orders[j].status === 'completed') {
                  total += data.users[i].orders[j].amount;
                }
              }
              data.users[i].totalSpent = total;
              if (total > 1000) {
                data.users[i].vipStatus = true;
              }
            }
          }
        }
      }
    }
  }
  return data;
}
```

**해결 단계**:
1. 함수 분리하기
2. 중첩 줄이기 (조기 리턴 활용)
3. 의미 있는 변수명 사용
4. 상수 정의하기

**모범 답안**:
```javascript
const VIP_THRESHOLD = 1000;
const ADULT_AGE = 18;

function processUserData(data) {
  if (!hasValidUsers(data)) {
    return data;
  }

  const processedUsers = data.users
    .filter(isAdultActiveUser)
    .map(calculateUserVipStatus);

  return {
    ...data,
    users: processedUsers
  };
}

function hasValidUsers(data) {
  return data && data.users && Array.isArray(data.users);
}

function isAdultActiveUser(user) {
  return user.age > ADULT_AGE && user.status === 'active';
}

function calculateUserVipStatus(user) {
  const totalSpent = calculateTotalSpent(user.orders);

  return {
    ...user,
    totalSpent,
    vipStatus: totalSpent > VIP_THRESHOLD
  };
}

function calculateTotalSpent(orders) {
  if (!orders || !Array.isArray(orders)) {
    return 0;
  }

  return orders
    .filter(order => order.status === 'completed')
    .reduce((total, order) => total + order.amount, 0);
}
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

### 🌍 크로스 브라우저 호환성 실전 가이드

#### 1. 브라우저별 CSS 차이점과 해결법

```css
/* ❌ 브라우저별로 다르게 보이는 코드 */
.button {
  background: linear-gradient(to bottom, #007cba, #005a87);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* ✅ 크로스 브라우저 호환 CSS */
.button {
  /* 구버전 브라우저용 fallback */
  background: #007cba;

  /* 그라데이션 (벤더 프리픽스 포함) */
  background: -webkit-linear-gradient(top, #007cba, #005a87);
  background: -moz-linear-gradient(top, #007cba, #005a87);
  background: linear-gradient(to bottom, #007cba, #005a87);

  /* 테두리 반경 */
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;

  /* 그림자 */
  -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  -moz-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
```

#### 2. IE 호환성 문제 해결

```css
/* ✅ IE 11 이하 호환성 해결 */

/* Flexbox IE 버그 해결 */
.flex-container {
  display: -webkit-box;      /* 구버전 웹킷 */
  display: -moz-box;         /* 구버전 파이어폭스 */
  display: -ms-flexbox;      /* IE 10 */
  display: -webkit-flex;     /* 웹킷 */
  display: flex;             /* 표준 */

  /* IE에서 flex 항목이 축소되지 않도록 */
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.flex-item {
  /* IE 11에서 flex 항목 크기 고정 */
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;

  /* IE에서 최소 높이 문제 해결 */
  min-height: 1px;
}

/* CSS Grid IE 대안 */
.grid-container {
  /* IE 11용 fallback */
  display: -ms-grid;
  -ms-grid-columns: 1fr 1fr 1fr;
  -ms-grid-rows: auto;

  /* 모던 브라우저용 */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* IE 11에서 gap 대신 margin 사용 */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .grid-item {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .grid-item:nth-child(3n) {
    margin-right: 0;
  }
}
```

#### 3. 모바일 브라우저 호환성

```css
/* ✅ 모바일 브라우저 최적화 */

/* iOS Safari 터치 하이라이트 제거 */
.button {
  -webkit-tap-highlight-color: transparent;
}

/* iOS Safari 스크롤 부드럽게 */
.scroll-container {
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}

/* 안드로이드 브라우저 폰트 크기 자동 조정 방지 */
html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

/* 모바일에서 입력 필드 줌 방지 */
input, select, textarea {
  font-size: 16px; /* 16px 이상이어야 줌 방지 */
}

/* 모바일 가로/세로 전환 시 폰트 크기 변경 방지 */
@media screen and (orientation: landscape) {
  html {
    -webkit-text-size-adjust: 100%;
  }
}
```

### 📱 반응형 웹 구현 시 주의사항

#### 1. 모바일 퍼스트 접근법

```css
/* ✅ 모바일 퍼스트 CSS 작성법 */

/* 기본 스타일 (모바일) */
.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

.nav-menu {
  display: none; /* 모바일에서는 숨김 */
}

.hamburger-menu {
  display: block;
}

/* 태블릿 (768px 이상) */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
  }

  .nav-menu {
    display: flex;
  }

  .hamburger-menu {
    display: none;
  }
}

/* 데스크톱 (1200px 이상) */
@media (min-width: 1200px) {
  .container {
    max-width: 1170px;
  }
}

/* ❌ 잘못된 데스크톱 퍼스트 방식 */
.container {
  max-width: 1200px; /* 데스크톱 기준 */
}

@media (max-width: 768px) {
  .container {
    max-width: 100%; /* 모바일에서 재정의 - 비효율적 */
  }
}
```

#### 2. 이미지 반응형 처리

```html
<!-- ✅ 반응형 이미지 최적화 -->

<!-- 1. srcset을 활용한 해상도별 이미지 -->
<img
  src="image-800.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 480px) 400px,
         (max-width: 800px) 800px,
         1200px"
  alt="상품 이미지">

<!-- 2. picture 요소로 다양한 형식 지원 -->
<picture>
  <source
    media="(max-width: 480px)"
    srcset="mobile-image.webp"
    type="image/webp">
  <source
    media="(max-width: 480px)"
    srcset="mobile-image.jpg">
  <source
    srcset="desktop-image.webp"
    type="image/webp">
  <img
    src="desktop-image.jpg"
    alt="반응형 이미지">
</picture>
```

```css
/* ✅ CSS를 통한 반응형 이미지 */
.responsive-image {
  max-width: 100%;
  height: auto;

  /* 이미지 로딩 전 공간 확보 */
  aspect-ratio: 16/9;
  object-fit: cover;
}

/* 배경 이미지 반응형 처리 */
.hero-section {
  background-image: url('hero-desktop.jpg');
  background-size: cover;
  background-position: center;
  min-height: 400px;
}

@media (max-width: 768px) {
  .hero-section {
    background-image: url('hero-mobile.jpg');
    min-height: 250px;
  }
}
```

### 👥 퍼블리셔와 협업할 때 개발자가 알아야 할 것들

#### 1. 디자인 시스템과 컴포넌트 구조

```css
/* ✅ 퍼블리셔와 협업하기 좋은 CSS 구조 */

/* 1. 디자인 토큰 (CSS 변수 활용) */
:root {
  /* 컬러 팔레트 */
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;

  /* 타이포그래피 */
  --font-size-small: 0.875rem;
  --font-size-base: 1rem;
  --font-size-large: 1.25rem;
  --line-height-base: 1.5;

  /* 간격 시스템 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 3rem;

  /* 브레이크포인트 */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}

/* 2. 재사용 가능한 컴포넌트 */
.btn {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  border: 1px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
}

.btn--primary {
  color: white;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn--secondary {
  color: var(--secondary-color);
  background-color: transparent;
  border-color: var(--secondary-color);
}

/* 3. 유틸리티 클래스 */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-sm { margin-top: var(--spacing-sm); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }

.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
```

#### 2. JavaScript와 CSS 상호작용 가이드

```javascript
// ✅ CSS 클래스를 통한 상태 관리 (퍼블리셔 친화적)

// 1. 상태별 CSS 클래스 정의
// styles.css
/*
.modal {
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal--active {
  display: flex;
  opacity: 1;
}

.loading {
  position: relative;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-group--error input {
  border-color: var(--danger-color);
}

.form-group--error .error-message {
  display: block;
  color: var(--danger-color);
}
*/

// 2. JavaScript에서 클래스 조작
class UIController {
  // 모달 표시/숨김
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('modal--active');
    document.body.classList.add('modal-open'); // 스크롤 방지
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('modal--active');
    document.body.classList.remove('modal-open');
  }

  // 로딩 상태 관리
  showLoading(element) {
    element.classList.add('loading');
  }

  hideLoading(element) {
    element.classList.remove('loading');
  }

  // 폼 유효성 검사 시각적 피드백
  showFieldError(fieldName, message) {
    const formGroup = document.querySelector(`[data-field="${fieldName}"]`);
    const errorElement = formGroup.querySelector('.error-message');

    formGroup.classList.add('form-group--error');
    errorElement.textContent = message;
  }

  clearFieldError(fieldName) {
    const formGroup = document.querySelector(`[data-field="${fieldName}"]`);
    formGroup.classList.remove('form-group--error');
  }
}

// ❌ 인라인 스타일 직접 조작 (협업에 좋지 않음)
function badShowModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  // 퍼블리셔가 스타일 수정하기 어려움
}
```

#### 3. 컴포넌트 설계 가이드라인

```html
<!-- ✅ 퍼블리셔와 개발자 모두 이해하기 쉬운 HTML 구조 -->

<!-- 1. 명확한 컴포넌트 구조 -->
<div class="user-card" data-user-id="123">
  <div class="user-card__header">
    <img class="user-card__avatar" src="avatar.jpg" alt="사용자 아바타">
    <div class="user-card__info">
      <h3 class="user-card__name">홍길동</h3>
      <span class="user-card__role">개발자</span>
    </div>
  </div>

  <div class="user-card__body">
    <p class="user-card__description">프론트엔드 개발자</p>
  </div>

  <div class="user-card__footer">
    <button class="btn btn--primary" data-action="edit">수정</button>
    <button class="btn btn--secondary" data-action="delete">삭제</button>
  </div>
</div>

<!-- 2. 상태 표시를 위한 data 속성 활용 -->
<div class="form-group" data-field="email" data-required="true">
  <label class="form-group__label" for="email">이메일</label>
  <input
    class="form-group__input"
    type="email"
    id="email"
    name="email"
    data-validate="email">
  <span class="form-group__error-message error-message"></span>
</div>
```

### 🎯 실습 과제 2: 반응형 카드 컴포넌트 제작

**과제**: 다음 요구사항에 맞는 반응형 사용자 카드를 제작하세요.

**요구사항**:
- 모바일: 세로 레이아웃, 1열
- 태블릿: 2열 그리드
- 데스크톱: 3열 그리드
- IE 11 이상 지원
- 접근성 고려

**단계별 해결**:

1단계: HTML 구조 작성
```html
<div class="user-grid">
  <article class="user-card">
    <img class="user-card__avatar" src="user1.jpg" alt="김개발 프로필 사진">
    <div class="user-card__content">
      <h3 class="user-card__name">김개발</h3>
      <p class="user-card__role">프론트엔드 개발자</p>
      <p class="user-card__description">Vue.js와 React 전문가</p>
    </div>
    <div class="user-card__actions">
      <button class="btn btn--primary" aria-label="김개발에게 메시지 보내기">메시지</button>
    </div>
  </article>
</div>
```

2단계: CSS 스타일 작성
```css
/* 모바일 퍼스트 */
.user-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

.user-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  text-align: center;
}

/* 태블릿 */
@media (min-width: 768px) {
  .user-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* 데스크톱 */
@media (min-width: 1200px) {
  .user-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* IE 11 fallback */
@supports not (display: grid) {
  .user-grid {
    display: flex;
    flex-wrap: wrap;
  }

  .user-card {
    flex: 1 1 100%;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .user-card {
      flex: 1 1 calc(50% - 0.75rem);
      margin-right: 1.5rem;
    }

    .user-card:nth-child(2n) {
      margin-right: 0;
    }
  }
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

### 🚫 API 연동 시 자주 발생하는 오류와 해결법

#### 1. CORS (Cross-Origin Resource Sharing) 오류

```javascript
// ❌ CORS 오류 발생 상황
// 프론트엔드: http://localhost:3000
// 백엔드: http://localhost:8080
fetch('http://localhost:8080/api/users')
  .then(response => response.json())
  .catch(error => {
    // Error: CORS policy 오류 발생
    console.error('CORS 오류:', error);
  });

// ✅ CORS 오류 해결 방법들

// 1. 프론트엔드에서 프록시 설정 (개발환경)
// vite.config.js 또는 vue.config.js
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

// 2. fetch 요청 시 credentials 포함
fetch('/api/users', {
  method: 'GET',
  credentials: 'include', // 쿠키 포함
  headers: {
    'Content-Type': 'application/json'
  }
})

// 3. 백엔드에서 CORS 허용 (백엔드 개발자와 협의)
/*
// Spring Boot 예시
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
  // ...
}
*/
```

#### 2. 네트워크 타임아웃 처리

```javascript
// ✅ 타임아웃과 재시도 로직이 포함된 API 호출

class ApiClient {
  constructor() {
    this.baseURL = '/api';
    this.timeout = 10000; // 10초
    this.retryCount = 3;
  }

  async request(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('요청 시간이 초과되었습니다.');
      }

      throw error;
    }
  }

  async requestWithRetry(url, options = {}, retryCount = this.retryCount) {
    try {
      return await this.request(url, options);
    } catch (error) {
      if (retryCount > 0 && this.shouldRetry(error)) {
        console.warn(`API 요청 실패, ${retryCount}번 재시도...`);
        await this.delay(1000); // 1초 대기
        return this.requestWithRetry(url, options, retryCount - 1);
      }
      throw error;
    }
  }

  shouldRetry(error) {
    // 네트워크 오류나 5xx 서버 오류인 경우에만 재시도
    return error.message.includes('timeout') ||
           error.message.includes('network') ||
           error.message.includes('500') ||
           error.message.includes('502') ||
           error.message.includes('503');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 사용 예시
const apiClient = new ApiClient();

async function getUserList() {
  try {
    const users = await apiClient.requestWithRetry('/users');
    return users;
  } catch (error) {
    console.error('사용자 목록 조회 실패:', error);
    throw new Error('사용자 목록을 불러오는데 실패했습니다.');
  }
}
```

#### 3. 인증 토큰 관리와 자동 갱신

```javascript
// ✅ JWT 토큰 자동 갱신 로직

class AuthApiClient {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  async request(url, options = {}) {
    try {
      return await this.makeRequest(url, options);
    } catch (error) {
      if (error.status === 401 && !url.includes('/auth/refresh')) {
        return this.handleTokenExpired(url, options);
      }
      throw error;
    }
  }

  async makeRequest(url, options) {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }

    return response.json();
  }

  async handleTokenExpired(originalUrl, originalOptions) {
    if (this.isRefreshing) {
      // 이미 토큰 갱신 중이면 대기열에 추가
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject, url: originalUrl, options: originalOptions });
      });
    }

    this.isRefreshing = true;

    try {
      const newTokens = await this.refreshAccessToken();
      this.accessToken = newTokens.accessToken;
      this.refreshToken = newTokens.refreshToken;

      // 로컬 스토리지 업데이트
      localStorage.setItem('accessToken', this.accessToken);
      localStorage.setItem('refreshToken', this.refreshToken);

      // 대기열의 요청들 재실행
      this.processQueue(null);

      // 원래 요청 재실행
      return this.makeRequest(originalUrl, originalOptions);
    } catch (refreshError) {
      // 토큰 갱신 실패 시 로그아웃 처리
      this.processQueue(refreshError);
      this.logout();
      throw refreshError;
    } finally {
      this.isRefreshing = false;
    }
  }

  async refreshAccessToken() {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: this.refreshToken })
    });

    if (!response.ok) {
      throw new Error('토큰 갱신 실패');
    }

    return response.json();
  }

  processQueue(error) {
    this.failedQueue.forEach(({ resolve, reject, url, options }) => {
      if (error) {
        reject(error);
      } else {
        resolve(this.makeRequest(url, options));
      }
    });

    this.failedQueue = [];
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }
}
```

### ⚡ 성능 최적화를 위한 HTTP 요청 관리

#### 1. 요청 중복 방지 (Request Deduplication)

```javascript
// ✅ 동일한 요청의 중복 방지

class RequestManager {
  constructor() {
    this.pendingRequests = new Map();
  }

  async request(key, requestFn) {
    // 이미 동일한 요청이 진행 중인지 확인
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    // 새로운 요청 시작
    const promise = requestFn()
      .finally(() => {
        // 요청 완료 후 캐시에서 제거
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

// 사용 예시
const requestManager = new RequestManager();

async function getUserProfile(userId) {
  return requestManager.request(
    `user-profile-${userId}`,
    () => fetch(`/api/users/${userId}`).then(r => r.json())
  );
}

// 같은 사용자 프로필을 빠르게 여러 번 요청해도 실제로는 한 번만 호출됨
getUserProfile(123);
getUserProfile(123); // 동일한 Promise 반환
getUserProfile(123); // 동일한 Promise 반환
```

#### 2. 캐싱 전략

```javascript
// ✅ 메모리 캐시와 만료 시간 관리

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
  }

  set(key, value, ttl = 5 * 60 * 1000) { // 기본 5분
    this.cache.set(key, value);
    this.timestamps.set(key, Date.now() + ttl);
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const expireTime = this.timestamps.get(key);
    if (Date.now() > expireTime) {
      this.cache.delete(key);
      this.timestamps.delete(key);
      return null;
    }

    return this.cache.get(key);
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }
}

class CachedApiClient {
  constructor() {
    this.cache = new CacheManager();
  }

  async get(url, options = {}) {
    const cacheKey = this.getCacheKey(url, options);

    // 캐시에서 먼저 확인
    const cached = this.cache.get(cacheKey);
    if (cached && !options.skipCache) {
      return cached;
    }

    // 새로운 요청
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      // 성공한 GET 요청만 캐시
      if (response.ok && (!options.method || options.method === 'GET')) {
        this.cache.set(cacheKey, data, options.cacheTTL);
      }

      return data;
    } catch (error) {
      console.error('API 요청 실패:', error);
      throw error;
    }
  }

  getCacheKey(url, options) {
    return `${options.method || 'GET'}:${url}`;
  }

  // 특정 데이터 변경 시 관련 캐시 무효화
  invalidateCache(pattern) {
    for (const key of this.cache.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.cache.delete(key);
        this.cache.timestamps.delete(key);
      }
    }
  }
}

// 사용 예시
const apiClient = new CachedApiClient();

async function getUsers() {
  // 첫 번째 요청: API 호출 후 캐시 저장
  const users = await apiClient.get('/api/users', { cacheTTL: 10 * 60 * 1000 }); // 10분 캐시
  return users;
}

async function updateUser(userId, userData) {
  const result = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });

  // 사용자 데이터 변경 후 관련 캐시 무효화
  apiClient.invalidateCache('/api/users');

  return result;
}
```

#### 3. 배치 요청 처리

```javascript
// ✅ 여러 요청을 하나로 묶어서 처리

class BatchRequestManager {
  constructor() {
    this.batchQueue = [];
    this.batchTimeout = null;
    this.batchDelay = 100; // 100ms 내의 요청들을 묶음
  }

  async batchRequest(url, params) {
    return new Promise((resolve, reject) => {
      this.batchQueue.push({ url, params, resolve, reject });

      if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
      }

      this.batchTimeout = setTimeout(() => {
        this.processBatch();
      }, this.batchDelay);
    });
  }

  async processBatch() {
    if (this.batchQueue.length === 0) return;

    const currentBatch = [...this.batchQueue];
    this.batchQueue = [];

    try {
      // 배치 요청 API 호출
      const response = await fetch('/api/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: currentBatch.map(item => ({
            url: item.url,
            params: item.params
          }))
        })
      });

      const results = await response.json();

      // 각 요청의 결과를 해당하는 Promise에 전달
      currentBatch.forEach((item, index) => {
        const result = results[index];
        if (result.success) {
          item.resolve(result.data);
        } else {
          item.reject(new Error(result.error));
        }
      });
    } catch (error) {
      // 배치 요청 실패 시 모든 Promise를 reject
      currentBatch.forEach(item => {
        item.reject(error);
      });
    }
  }
}

// 사용 예시
const batchManager = new BatchRequestManager();

async function getUsersBatch(userIds) {
  const promises = userIds.map(id =>
    batchManager.batchRequest('/api/users', { id })
  );

  return Promise.all(promises);
}

// 100ms 내에 요청된 사용자들을 한 번의 배치 요청으로 처리
getUsersBatch([1, 2, 3]);
getUsersBatch([4, 5, 6]); // 같은 배치에 포함됨
```

### 🎯 실습 과제 3: API 에러 핸들링 시스템 구축

**과제**: 다음 요구사항을 만족하는 API 클라이언트를 구현하세요.

**요구사항**:
- 자동 재시도 (최대 3회)
- 토큰 자동 갱신
- 요청 중복 방지
- 캐싱 (5분)
- 사용자 친화적 에러 메시지

**단계별 해결**:

1단계: 기본 API 클라이언트 구조
```javascript
class ApiClient {
  constructor() {
    this.baseURL = '/api';
    this.accessToken = localStorage.getItem('accessToken');
    this.requestManager = new RequestManager();
    this.cache = new CacheManager();
    this.retryCount = 3;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const requestKey = this.getRequestKey(url, options);

    // GET 요청은 중복 방지
    if (!options.method || options.method === 'GET') {
      return this.requestManager.request(requestKey, () =>
        this.makeRequest(url, options)
      );
    }

    return this.makeRequest(url, options);
  }

  async makeRequest(url, options, retryCount = this.retryCount) {
    try {
      // 캐시 확인 (GET 요청만)
      if ((!options.method || options.method === 'GET') && !options.skipCache) {
        const cached = this.cache.get(url);
        if (cached) return cached;
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
          ...options.headers
        }
      });

      if (response.status === 401) {
        await this.refreshToken();
        return this.makeRequest(url, options, retryCount);
      }

      if (!response.ok) {
        throw new ApiError(response.status, await this.getErrorMessage(response));
      }

      const data = await response.json();

      // 성공한 GET 요청 캐시
      if ((!options.method || options.method === 'GET')) {
        this.cache.set(url, data, 5 * 60 * 1000); // 5분
      }

      return data;
    } catch (error) {
      if (retryCount > 0 && this.shouldRetry(error)) {
        await this.delay(1000);
        return this.makeRequest(url, options, retryCount - 1);
      }
      throw error;
    }
  }

  shouldRetry(error) {
    return error instanceof ApiError &&
           (error.status >= 500 || error.status === 429);
  }

  async getErrorMessage(response) {
    try {
      const errorData = await response.json();
      return errorData.message || `HTTP ${response.status} 오류`;
    } catch {
      return `HTTP ${response.status} 오류`;
    }
  }

  getUserFriendlyMessage(error) {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 400: return '입력 정보를 확인해주세요.';
        case 401: return '로그인이 필요합니다.';
        case 403: return '접근 권한이 없습니다.';
        case 404: return '요청한 정보를 찾을 수 없습니다.';
        case 429: return '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.';
        case 500: return '서버 오류가 발생했습니다. 관리자에게 문의하세요.';
        default: return '오류가 발생했습니다. 다시 시도해주세요.';
      }
    }
    return '네트워크 오류가 발생했습니다.';
  }
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}
```

2단계: 실제 사용 예시
```javascript
const apiClient = new ApiClient();

async function loadUserDashboard() {
  try {
    showLoading();

    const [user, notifications, stats] = await Promise.all([
      apiClient.request('/user/profile'),
      apiClient.request('/user/notifications'),
      apiClient.request('/user/stats')
    ]);

    renderDashboard({ user, notifications, stats });
  } catch (error) {
    const message = apiClient.getUserFriendlyMessage(error);
    showErrorMessage(message);
  } finally {
    hideLoading();
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

### 🏢 실제 SI 프로젝트 버그 사례와 해결법

#### 케이스 1: 날짜 처리 버그

> **상황**: "달력에서 선택한 날짜가 하루씩 틀려져서 저장됩니다"

```javascript
// ❌ 실제 프로젝트에서 발생한 버그
function formatDateForAPI(dateInput) {
  const date = new Date(dateInput);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

// 문제: 타임존 차이로 인한 날짜 오차
const selectedDate = '2024-07-21';
formatDateForAPI(selectedDate); // "2024-07-20" (하루 차이!)

// ✅ 해결된 코드
function formatDateForAPI(dateInput) {
  const date = new Date(dateInput);

  // 로컬 타임존 기준으로 날짜 포맷
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// 또는 더 안전한 방법
function formatDateSafely(dateString) {
  // 문자열이 YYYY-MM-DD 형식인 경우 그대로 반환
  if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // Date 객체인 경우 로컬 타임존 기준으로 변환
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('sv-SE').format(date); // 'sv-SE'는 YYYY-MM-DD 포맷
}

// 테스트 코드
function testDateFormatting() {
  const testCases = [
    '2024-07-21',
    new Date('2024-07-21'),
    new Date(2024, 6, 21), // 월은 0부터 시작
    '2024-07-21T10:30:00Z'
  ];

  testCases.forEach(testCase => {
    console.log(`입력: ${testCase}, 결과: ${formatDateSafely(testCase)}`);
  });
}
```

#### 케이스 2: 폼 유효성 검사 누락

> **상황**: "사용자가 빈 값을 제출해서 서버 에러가 발생합니다"

```javascript
// ❌ 불완전한 유효성 검사
function validateForm(formData) {
  if (!formData.email) {
    return false;
  }
  return true;
}

// ✅ 포괄적인 유효성 검사 시스템
class FormValidator {
  constructor() {
    this.rules = {
      required: (value) => value != null && value !== '',
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      minLength: (min) => (value) => value && value.length >= min,
      maxLength: (max) => (value) => value && value.length <= max,
      pattern: (regex) => (value) => regex.test(value),
      custom: (fn) => fn
    };

    this.errorMessages = {
      required: '필수 입력 항목입니다.',
      email: '올바른 이메일 형식이 아닙니다.',
      minLength: (min) => `최소 ${min}자 이상 입력해주세요.`,
      maxLength: (max) => `최대 ${max}자까지 입력 가능합니다.`,
      pattern: '입력 형식이 올바르지 않습니다.'
    };
  }

  validate(formData, schema) {
    const errors = {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = formData[field];
      const fieldErrors = [];

      for (const rule of rules) {
        const result = this.validateField(value, rule);
        if (!result.isValid) {
          fieldErrors.push(result.message);
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  validateField(value, rule) {
    const [ruleName, ...params] = rule.split(':');
    const validator = this.rules[ruleName];

    if (!validator) {
      throw new Error(`알 수 없는 유효성 검사 규칙: ${ruleName}`);
    }

    let validatorFn = validator;
    let errorMessage = this.errorMessages[ruleName];

    // 매개변수가 있는 규칙 처리
    if (params.length > 0) {
      const param = params[0];
      validatorFn = validator(param);
      errorMessage = typeof errorMessage === 'function' ? errorMessage(param) : errorMessage;
    }

    const isValid = validatorFn(value);

    return {
      isValid,
      message: isValid ? null : errorMessage
    };
  }
}

// 사용 예시
const validator = new FormValidator();

function validateUserRegistration(formData) {
  const schema = {
    email: ['required', 'email'],
    password: ['required', 'minLength:8'],
    name: ['required', 'maxLength:50'],
    phone: ['required', 'pattern:^\\d{10,11}$']
  };

  const result = validator.validate(formData, schema);

  if (!result.isValid) {
    displayValidationErrors(result.errors);
    return false;
  }

  return true;
}

function displayValidationErrors(errors) {
  // 기존 에러 메시지 제거
  document.querySelectorAll('.error-message').forEach(el => el.remove());

  for (const [field, messages] of Object.entries(errors)) {
    const fieldElement = document.querySelector(`[name="${field}"]`);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = messages[0]; // 첫 번째 에러 메시지만 표시

    fieldElement.parentNode.appendChild(errorElement);
    fieldElement.classList.add('error');
  }
}
```

#### 케이스 3: 메모리 누수와 성능 문제

> **상황**: "페이지를 오래 사용하면 점점 느려집니다"

```javascript
// ❌ 메모리 누수를 유발하는 코드
class UserList {
  constructor() {
    this.users = [];
    this.intervalId = setInterval(() => {
      this.fetchUsers(); // 컴포넌트 해제 후에도 계속 실행됨
    }, 5000);

    // 이벤트 리스너 정리 안함
    document.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    // 이벤트 처리
  }
}

// ✅ 메모리 관리가 적용된 코드
class UserList {
  constructor() {
    this.users = [];
    this.intervalId = null;
    this.abortController = new AbortController();
    this.boundHandleClick = this.handleClick.bind(this);

    this.initialize();
  }

  initialize() {
    // Abort Controller를 사용한 fetch 요청 관리
    this.fetchUsers();

    // 정리 가능한 interval 설정
    this.intervalId = setInterval(() => {
      if (!this.isDestroyed) {
        this.fetchUsers();
      }
    }, 5000);

    // 정리 가능한 이벤트 리스너 설정
    document.addEventListener('click', this.boundHandleClick, {
      signal: this.abortController.signal
    });
  }

  async fetchUsers() {
    try {
      const response = await fetch('/api/users', {
        signal: this.abortController.signal
      });

      if (!response.ok) throw new Error('Failed to fetch users');

      this.users = await response.json();
      this.render();
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('사용자 목록 조회 실패:', error);
      }
    }
  }

  handleClick(event) {
    if (this.isDestroyed) return;
    // 이벤트 처리 로직
  }

  render() {
    if (this.isDestroyed) return;

    // DOM 업데이트 전에 기존 이벤트 리스너 정리
    this.cleanupEventListeners();

    // 렌더링 로직
    const container = document.getElementById('user-list');
    container.innerHTML = this.users.map(user => `
      <div class="user-item" data-user-id="${user.id}">
        <span>${user.name}</span>
        <button class="delete-btn" data-user-id="${user.id}">삭제</button>
      </div>
    `).join('');

    // 새로운 이벤트 리스너 등록
    this.attachEventListeners();
  }

  attachEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', this.handleDelete.bind(this), {
        signal: this.abortController.signal
      });
    });
  }

  cleanupEventListeners() {
    // AbortController를 사용하여 모든 이벤트 리스너 일괄 정리
    this.abortController.abort();
    this.abortController = new AbortController();
  }

  handleDelete(event) {
    const userId = event.target.dataset.userId;
    this.deleteUser(userId);
  }

  async deleteUser(userId) {
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        signal: this.abortController.signal
      });

      this.users = this.users.filter(user => user.id !== userId);
      this.render();
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('사용자 삭제 실패:', error);
      }
    }
  }

  // 컴포넌트 정리 메서드 (반드시 호출해야 함)
  destroy() {
    this.isDestroyed = true;

    // 타이머 정리
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // 모든 요청과 이벤트 리스너 정리
    this.abortController.abort();

    // 참조 정리
    this.users = null;
    this.boundHandleClick = null;
  }
}

// 사용 예시 (SPA 라우터에서)
let currentUserList = null;

function showUserListPage() {
  // 기존 인스턴스 정리
  if (currentUserList) {
    currentUserList.destroy();
  }

  // 새 인스턴스 생성
  currentUserList = new UserList();
}

function hideUserListPage() {
  // 페이지 이동 시 정리
  if (currentUserList) {
    currentUserList.destroy();
    currentUserList = null;
  }
}
```

### 🧪 자동화된 테스트 작성법

#### 1. 단위 테스트 예시

```javascript
// ✅ 브라우저 콘솔에서 실행 가능한 간단한 테스트 프레임워크

class SimpleTest {
  constructor() {
    this.tests = [];
    this.results = {
      passed: 0,
      failed: 0,
      errors: []
    };
  }

  test(name, testFn) {
    this.tests.push({ name, testFn });
  }

  expect(actual) {
    return {
      toBe: (expected) => {
        if (actual !== expected) {
          throw new Error(`Expected ${expected}, but got ${actual}`);
        }
      },
      toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
        }
      },
      toBeTruthy: () => {
        if (!actual) {
          throw new Error(`Expected truthy value, but got ${actual}`);
        }
      },
      toBeFalsy: () => {
        if (actual) {
          throw new Error(`Expected falsy value, but got ${actual}`);
        }
      }
    };
  }

  run() {
    console.log('🧪 테스트 시작...\n');

    this.tests.forEach(({ name, testFn }) => {
      try {
        testFn();
        this.results.passed++;
        console.log(`✅ ${name}`);
      } catch (error) {
        this.results.failed++;
        this.results.errors.push({ name, error: error.message });
        console.log(`❌ ${name}: ${error.message}`);
      }
    });

    console.log(`\n📊 테스트 결과:`);
    console.log(`통과: ${this.results.passed}`);
    console.log(`실패: ${this.results.failed}`);

    if (this.results.failed > 0) {
      console.log('\n❌ 실패한 테스트:');
      this.results.errors.forEach(({ name, error }) => {
        console.log(`  - ${name}: ${error}`);
      });
    }
  }
}

// 테스트 작성 예시
const test = new SimpleTest();

// 사용자 유효성 검사 함수 테스트
test.test('validateAge - 정상적인 나이', () => {
  test.expect(validateAge(25)).toBeTruthy();
});

test.test('validateAge - null 값', () => {
  test.expect(validateAge(null)).toBeFalsy();
});

test.test('validateAge - 문자열 숫자', () => {
  test.expect(validateAge('25')).toBeTruthy();
});

test.test('validateAge - 음수', () => {
  test.expect(validateAge(-1)).toBeFalsy();
});

test.test('validateAge - 범위 초과', () => {
  test.expect(validateAge(200)).toBeFalsy();
});

// API 클라이언트 테스트 (모킹 사용)
test.test('ApiClient - 성공적인 요청', async () => {
  // 원본 fetch 백업
  const originalFetch = global.fetch;

  // fetch 모킹
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: '테스트 사용자' })
    })
  );

  const apiClient = new ApiClient();
  const result = await apiClient.request('/users/1');

  test.expect(result).toEqual({ id: 1, name: '테스트 사용자' });

  // 원본 fetch 복원
  global.fetch = originalFetch;
});

// 테스트 실행
test.run();
```

#### 2. 통합 테스트 시나리오

```javascript
// ✅ 실제 사용자 시나리오 기반 테스트

class IntegrationTest {
  constructor() {
    this.testContainer = null;
  }

  setup() {
    // 테스트용 DOM 컨테이너 생성
    this.testContainer = document.createElement('div');
    this.testContainer.id = 'test-container';
    document.body.appendChild(this.testContainer);
  }

  cleanup() {
    // 테스트 후 정리
    if (this.testContainer) {
      document.body.removeChild(this.testContainer);
      this.testContainer = null;
    }
  }

  async testUserRegistrationFlow() {
    this.setup();

    try {
      // 1. 회원가입 폼 렌더링
      this.testContainer.innerHTML = `
        <form id="registration-form">
          <input type="email" name="email" placeholder="이메일">
          <input type="password" name="password" placeholder="비밀번호">
          <input type="text" name="name" placeholder="이름">
          <button type="submit">가입하기</button>
        </form>
        <div id="error-messages"></div>
      `;

      // 2. 폼 유효성 검사 초기화
      const form = document.getElementById('registration-form');
      const validator = new FormValidator();

      // 3. 잘못된 데이터 입력 테스트
      const emailInput = form.querySelector('[name="email"]');
      const passwordInput = form.querySelector('[name="password"]');
      const nameInput = form.querySelector('[name="name"]');

      emailInput.value = 'invalid-email';
      passwordInput.value = '123'; // 너무 짧음
      nameInput.value = ''; // 필수값 누락

      // 4. 유효성 검사 실행
      const formData = {
        email: emailInput.value,
        password: passwordInput.value,
        name: nameInput.value
      };

      const validationResult = validator.validate(formData, {
        email: ['required', 'email'],
        password: ['required', 'minLength:8'],
        name: ['required']
      });

      // 5. 에러 메시지 표시 확인
      if (!validationResult.isValid) {
        displayValidationErrors(validationResult.errors);

        const errorMessages = document.querySelectorAll('.error-message');
        console.log('✅ 유효성 검사 에러 메시지 표시됨:', errorMessages.length);
      }

      // 6. 올바른 데이터 입력 테스트
      emailInput.value = 'test@example.com';
      passwordInput.value = 'password123';
      nameInput.value = '홍길동';

      const validFormData = {
        email: emailInput.value,
        password: passwordInput.value,
        name: nameInput.value
      };

      const validResult = validator.validate(validFormData, {
        email: ['required', 'email'],
        password: ['required', 'minLength:8'],
        name: ['required']
      });

      if (validResult.isValid) {
        console.log('✅ 유효성 검사 통과');
      }

      console.log('✅ 사용자 등록 플로우 테스트 완료');

    } catch (error) {
      console.error('❌ 통합 테스트 실패:', error);
    } finally {
      this.cleanup();
    }
  }
}

// 통합 테스트 실행
const integrationTest = new IntegrationTest();
integrationTest.testUserRegistrationFlow();
```

### 🎯 실습 과제 4: 에러 처리와 로깅 시스템

**과제**: 다음 요구사항을 만족하는 에러 처리 시스템을 구현하세요.

**요구사항**:
- 다양한 에러 타입별 처리
- 사용자 친화적 메시지
- 개발자용 상세 로그
- 에러 발생 시 자동 복구 시도
- 에러 통계 수집

**해결 예시**:

```javascript
class ErrorHandler {
  constructor() {
    this.errorStats = {
      networkError: 0,
      validationError: 0,
      serverError: 0,
      unknownError: 0
    };

    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    // 전역 에러 처리
    window.addEventListener('error', (event) => {
      this.handleError(event.error, '전역 JavaScript 에러');
    });

    // Promise rejection 처리
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason, 'Unhandled Promise Rejection');
      event.preventDefault(); // 브라우저 콘솔 에러 방지
    });
  }

  handleError(error, context = '') {
    const errorInfo = this.analyzeError(error);

    // 에러 통계 업데이트
    this.errorStats[errorInfo.type]++;

    // 개발자용 로그
    this.logError(error, errorInfo, context);

    // 사용자 알림
    this.showUserFriendlyMessage(errorInfo);

    // 자동 복구 시도
    this.attemptRecovery(errorInfo);

    // 에러 리포팅 (선택사항)
    this.reportError(error, errorInfo, context);
  }

  analyzeError(error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { type: 'networkError', severity: 'high', recoverable: true };
    }

    if (error instanceof ValidationError) {
      return { type: 'validationError', severity: 'low', recoverable: true };
    }

    if (error.message && error.message.includes('500')) {
      return { type: 'serverError', severity: 'high', recoverable: true };
    }

    return { type: 'unknownError', severity: 'medium', recoverable: false };
  }

  logError(error, errorInfo, context) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      errorInfo,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.group(`🚨 Error: ${errorInfo.type}`);
    console.error('Error Details:', logEntry);
    console.groupEnd();

    // 로컬 스토리지에 에러 로그 저장 (개발/디버깅용)
    this.saveErrorLog(logEntry);
  }

  saveErrorLog(logEntry) {
    try {
      const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      existingLogs.push(logEntry);

      // 최대 100개까지만 저장
      if (existingLogs.length > 100) {
        existingLogs.shift();
      }

      localStorage.setItem('errorLogs', JSON.stringify(existingLogs));
    } catch (storageError) {
      console.warn('에러 로그 저장 실패:', storageError);
    }
  }

  showUserFriendlyMessage(errorInfo) {
    const messages = {
      networkError: '인터넷 연결을 확인해주세요.',
      validationError: '입력 정보를 다시 확인해주세요.',
      serverError: '일시적인 서버 오류입니다. 잠시 후 다시 시도해주세요.',
      unknownError: '예상치 못한 오류가 발생했습니다.'
    };

    const message = messages[errorInfo.type] || messages.unknownError;

    // 토스트 메시지 표시
    this.showToast(message, errorInfo.severity);
  }

  showToast(message, severity) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${severity}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 5000);
  }

  attemptRecovery(errorInfo) {
    if (!errorInfo.recoverable) return;

    switch (errorInfo.type) {
      case 'networkError':
        // 네트워크 재연결 시도
        setTimeout(() => {
          if (navigator.onLine) {
            window.location.reload();
          }
        }, 5000);
        break;

      case 'serverError':
        // 페이지 새로고침으로 복구 시도
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        break;
    }
  }

  reportError(error, errorInfo, context) {
    // 프로덕션 환경에서 에러 리포팅 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/error-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          errorInfo,
          context,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {
        // 에러 리포팅 실패는 무시
      });
    }
  }

  getErrorStats() {
    return { ...this.errorStats };
  }

  clearErrorLogs() {
    localStorage.removeItem('errorLogs');
    console.log('에러 로그가 삭제되었습니다.');
  }
}

// 전역 에러 핸들러 초기화
const errorHandler = new ErrorHandler();

// 사용 예시
try {
  // 위험한 작업
  await someRiskyOperation();
} catch (error) {
  errorHandler.handleError(error, 'someRiskyOperation 실행 중');
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

### 📋 실무 투입 전 자가 진단

#### 🎯 코드 품질 관리 능력

```text
✅ 기본 수준:
□ 네스팅 3단계 이내 코드 작성 가능
□ 의미 있는 변수명과 함수명 사용
□ 기본적인 에러 처리 적용
□ 코드 리뷰 지적사항 이해하고 개선

✅ 중급 수준:
□ 복잡한 로직을 작은 함수로 분리
□ 방어적 프로그래밍 적용
□ 팀 코딩 컨벤션 준수
□ 성능을 고려한 코드 작성

⚠️ 보완 필요 신호:
□ 함수가 50줄 이상으로 길어짐
□ 변수명이 a, b, c, temp 등 의미 불분명
□ try-catch 없이 API 호출
□ 코드 리뷰에서 같은 지적 반복
```

#### 🌐 HTML/CSS 실무 능력

```text
✅ 기본 수준:
□ 시맨틱 태그 적절히 사용
□ CSS 선택자 우선순위 이해
□ 브라우저 개발자 도구 활용
□ 모바일 반응형 기본 구현

✅ 중급 수준:
□ 크로스 브라우저 호환성 고려
□ 접근성 기본 원칙 적용
□ CSS 최적화 및 성능 고려
□ 퍼블리셔와 원활한 협업

⚠️ 보완 필요 신호:
□ div와 span만으로 마크업
□ !important 남발
□ IE에서 레이아웃 깨짐
□ 퍼블리셔 요청 이해 어려움
```

#### 📡 네트워크와 API 활용 능력

```text
✅ 기본 수준:
□ fetch API 기본 사용법 숙지
□ HTTP 상태 코드 기본 이해
□ async/await 적절히 사용
□ 기본적인 에러 핸들링 적용

✅ 중급 수준:
□ CORS 문제 이해하고 해결
□ API 요청 최적화 (캐싱, 배치)
□ 토큰 기반 인증 구현
□ 네트워크 오류 상황 대응

⚠️ 보완 필요 신호:
□ CORS 오류 발생 시 해결 못함
□ API 호출 시 로딩 상태 미처리
□ 토큰 만료 시 자동 갱신 안됨
□ 네트워크 오류 시 무한 재시도
```

#### 🧪 테스트와 디버깅 능력

```text
✅ 기본 수준:
□ 브라우저 콘솔 활용한 디버깅
□ 경계값 테스트 수행
□ 기본적인 유효성 검사 작성
□ 에러 상황 재현하고 수정

✅ 중급 수준:
□ 체계적인 테스트 케이스 작성
□ 메모리 누수 방지 코드 작성
□ 성능 최적화 고려
□ 자동화된 테스트 도구 활용

⚠️ 보완 필요 신호:
□ console.log로만 디버깅
□ 에러 발생 시 원인 파악 어려움
□ 테스트 없이 코드 배포
□ 메모리 누수 문제 반복 발생
```

### 🚀 실무 투입 준비도 체크

#### 최종 점검 사항

```text
📋 기술적 준비도:
□ 코드 품질 관리 능력 확보
□ HTML/CSS 기본 숙지
□ API 연동 및 에러 처리 가능
□ 기본적인 테스트 및 디버깅 능력

📋 협업 준비도:
□ 팀 코딩 컨벤션 이해
□ Git을 활용한 버전 관리
□ 코드 리뷰 참여 가능
□ 퍼블리셔와 협업 가능

📋 문제 해결 능력:
□ 브라우저 호환성 문제 대응
□ 성능 이슈 기본 대응
□ 에러 상황 분석 및 해결
□ 새로운 기술 학습 의지

📋 실무 마인드:
□ 유지보수를 고려한 코드 작성
□ 사용자 경험 고려
□ 보안 기본 원칙 이해
□ 지속적인 학습과 개선 의지
```

### 📚 추가 학습 방향 가이드

#### 수준별 학습 로드맵

**기초 보완이 필요한 경우**:

1. JavaScript 기초 문법 재학습
2. HTML/CSS 기본 원리 이해
3. 브라우저 개발자 도구 활용법
4. 기본적인 알고리즘 문제 해결

**중급 수준 도달을 위한 학습**:

1. ES6+ 문법과 모던 JavaScript
2. 프레임워크/라이브러리 학습 (Vue.js, React)
3. 빌드 도구와 모듈 시스템 이해
4. 테스트 주도 개발 (TDD) 기초

**고급 수준을 위한 방향**:

1. 성능 최적화 기법
2. 디자인 패턴과 아키텍처
3. 보안 및 접근성 심화
4. DevOps와 배포 자동화

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
