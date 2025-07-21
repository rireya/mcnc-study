# 📱 1차: bizMOB4 개요 및 config

> 💡 **AI 활용 안내**: 이 교육 자료는 Claude Sonnet 4를 활용하여 제작되었습니다.

## 🎯 학습 목표

- **bizMOB 3.5 → 4.0 진화 과정** 이해
- **기술 선택 배경**과 아키텍처 철학 파악
- **핵심 설정 파일**의 중요성 인식
- **하이브리드 앱 환경**에서의 웹 개발 특성 이해

---

## 🔄 bizMOB 기술 진화 과정: 패러다임의 전환

### 📊 bizMOB 3.5

#### **정적 파일 배포 방식의 문제**

```text
📁 bizMOB 3.5 구조:
- 빌드 과정 없음 (Raw JavaScript/HTML/CSS)
- 정적 파일 직접 배포
- 브라우저 호환성을 코드 레벨에서 직접 처리
- 스크립트 간 의존성 수동 관리

⚠️ 주요 한계:
• 브라우저별 호환성 처리 복잡
• 코드 최적화 불가 (번들링, 압축, 트리셰이킹 부재)
• 모던 개발 도구 활용 제한
• 유지보수성 저하 및 기술 부채 누적
• 개발자 경험(DX) 제약으로 인한 생산성 한계
```

#### **jQuery 기반 명령형 프로그래밍의 제약**

```text
🔧 jQuery 선택 이유 (당시 기준):
✅ 다양한 브라우저 환경 호환성
✅ 안정적인 DOM 조작 API
✅ 풍부한 플러그인 생태계
✅ 상대적으로 낮은 학습 곡선

🚫 패러다임적 한계:

1️⃣ 명령형 프로그래밍: "어떻게(How)" 중심의 코드 작성
   • DOM을 단계별로 직접 조작하는 방식
   • 코드가 복잡해질수록 가독성과 유지보수성 급격히 저하
   • 비즈니스 로직보다 DOM 조작 코드에 더 많은 시간 소요

2️⃣ 상태 관리의 어려움: DOM과 비즈니스 로직의 강결합
   • 데이터 상태가 여러 DOM 요소에 분산되어 관리됨
   • UI 상태와 데이터 상태 간 동기화 문제 빈발
   • 상태 변화 추적과 디버깅의 어려움

3️⃣ 컴포넌트 기반 아키텍처의 부재: 재사용성과 확장성 제약
   • 기능별로 흩어진 스크립트 파일들의 의존성 관리 복잡
   • 유사한 UI 패턴의 중복 코드 반복 작성
   • 대규모 프로젝트에서 코드 구조화의 한계

4️⃣ 이벤트 중심 개발로 인한 복잡한 의존성 관계
   • 전역 이벤트와 콜백 함수들의 얽힌 관계
   • 코드 실행 흐름 추적의 어려움
   • 메모리 누수와 이벤트 핸들러 관리 문제
```

**💡 간단한 예제로 보는 패러다임 차이:**

```javascript
// jQuery (명령형): "어떻게" 할지 단계별로 명시
function showUserList(users) {
  $('#user-list').empty();           // 1. 기존 목록 삭제
  users.forEach(user => {            // 2. 반복문 실행
    const li = $('<li>');            // 3. 요소 생성
    li.text(user.name);              // 4. 텍스트 설정
    $('#user-list').append(li);     // 5. DOM에 추가
  });
}

// Vue (선언형): "무엇"이어야 하는지만 선언
<template>
  <ul id="user-list">
    <li v-for="user in users">{{ user.name }}</li>
  </ul>
</template>
```

```text
❌ 현재 상황의 문제점:
• 시장 점유율 지속적 하락 (5% 미만)
• 커뮤니티 규모 축소
• 모던 프레임워크 대비 개발 효율성 현저히 저하
• 이클립스 IDE 환경 제약으로 최신 개발 도구 활용 불가
• 선언형 UI 패턴에 익숙한 신규 개발자와의 기술 격차
```

### 🚀 bizMOB 4.0

#### **모던 프레임워크 도입의 전략적 필요성**

```text
🔄 패러다임 변화의 핵심:

1. 명령형 → 선언형 프로그래밍
   • jQuery: DOM을 "어떻게" 조작할지 명시
   • Vue 3: UI가 "무엇"이어야 하는지 선언

2. 스크립트 기반 → 컴포넌트 기반 아키텍처
   • 재사용 가능한 독립적 UI 단위
   • 캡슐화된 상태 관리
   • 계층적 컴포넌트 구조

3. 수동 상태 관리 → 반응형 상태 시스템
   • 데이터 변화에 자동으로 반응하는 UI
   • 단방향 데이터 플로우
   • 예측 가능한 상태 변화

📈 기술 트렌드와 개발자 경험(DX) 혁신:
- SPA(Single Page Application) 대중화
- Component 기반 개발 패러다임 표준화
- TypeScript 도입으로 개발 안정성 및 생산성 향상
- 모던 빌드 도구 (Vite, Webpack) 활용한 개발 워크플로우 자동화
- Hot Module Replacement (HMR)로 실시간 개발 피드백
- 풍부한 개발 도구 생태계 (DevTools, IDE 지원)

🎯 향상된 개발자 경험(DX)이 가져오는 생산성 향상:
• 자동 완성 및 타입 체킹으로 런타임 오류 사전 방지
• 컴포넌트 기반 개발로 코드 재사용성 극대화
• 반응형 데이터 바인딩으로 UI 상태 동기화 자동화
• 모듈 시스템으로 코드 구조화 및 의존성 관리 체계화
• 빌드 최적화로 애플리케이션 성능 및 로딩 속도 개선
```

---

## 🤔 기술 선택 과정: 상황에 맞는 최적의 도구 선택

### React vs Vue 비교 분석

#### **Vue 선택 배경: 우리 환경에 최적화된 합리적 선택**

```text
🎯 핵심 결정 요인:

1. 팀 구조 최적화
   • 퍼블리셔 ↔ FE 개발자 분업 구조에 최적화
   • Template 기반 문법으로 퍼블리셔 친화적
   • 점진적 도입 가능 (기존 jQuery 코드와 공존)

2. 학습 곡선 및 전환 비용
   • 기존 jQuery 개발자들의 상대적으로 쉬운 전환
   • 직관적인 API 설계로 빠른 생산성 확보
   • 상대적으로 낮은 진입 장벽

3. 하이브리드 앱 특성에 최적화
   • 가벼운 런타임으로 모바일 성능 우수
   • 단순한 빌드 설정으로 개발 환경 구성 용이
   • 네이티브 브릿지 통신에 적합한 구조
```

#### **React에 대한 고려사항: 현재 상황에서의 제약 요소**

```text
🤔 우리 환경에서 React 도입 시 고려사항:

1. JSX 문법과 협업 구조
   • 퍼블리셔와의 협업에서 추가적인 학습 곡선 필요
   ℹ️ 최근 트렌드: 디자이너/퍼블리셔와 개발자 간 Hand-off 프로세스를 명확히 분리하여
      이 문제를 해결하는 팀들이 증가하고 있음

2. 상태 관리 생태계
   • 과거: Redux의 복잡한 보일러플레이트 코드
   ✅ 현재 개선사항:
     - React 내장 Context API의 대폭 개선
     - Zustand, Jotai 등 가볍고 직관적인 상태 관리 라이브러리 등장
     - 더 이상 Redux의 복잡성이 React 도입의 큰 장벽이 되지 않음

3. 개발 환경 구성
   • 과거: Webpack 기반의 복잡한 빌드 설정
   ✅ 현재 개선사항:
     - Vite가 React를 공식 지원하며 Vue와 동일한 수준의 빠르고 간편한 환경 제공
     - Create React App에서 Vite 기반으로의 마이그레이션 트렌드

4. 학습 곡선과 전환 비용
   • 현재 팀 상황에서 상대적으로 높은 초기 투자 비용
   • 기존 jQuery → Vue 전환 대비 추가적인 개념 학습 필요

💡 결론: React 자체는 훌륭한 기술이지만, 우리의 특정 환경(하이브리드 앱, 팀 구성,
   전환 일정)에서는 Vue가 더 적합한 선택이었음
```

**간단한 예시:**

```javascript
// HTML
<div class="user-card">
  <h3>홍길동</h3>
  <p>시스템 개발자</p>
</div>

// React JSX
const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.role}</p>
    </div>
  );
};
```

### Nuxt.js vs Vue 단독 선택

#### **Nuxt.js 제외 이유: 하이브리드 앱 환경의 특수성**

```text
🚫 하이브리드 앱 구조와의 부적합성:

1. SSR(Server-Side Rendering)의 불필요성
   • 네이티브 앱 내 웹뷰 환경에서 SEO 최적화 불필요
   • 초기 로딩 속도보다 런타임 성능이 더 중요
   • 클라이언트 사이드 렌더링만으로 충분

2. 과도한 복잡성과 오버헤드
   • 파일 기반 라우팅이 하이브리드 앱의 네비게이션 패턴과 부조화
   • 서버 사이드 로직의 불필요한 오버헤드
   • 번들 크기 증가로 모바일 성능에 부정적 영향

3. 하이브리드 앱의 고유한 특성
   • 단일 진입점(Entry Point) 구조에 최적화 필요
   • 네이티브와의 브릿지 통신 패턴에 맞는 단순한 구조 선호
   • 복잡한 라우팅보다는 컴포넌트 기반 화면 전환이 적합

🎯 결론: Vue 단독 사용이 우리 하이브리드 앱 환경에 가장 적합한 선택
```

---

## 🏗️ bizMOB4 아키텍처 구조

### 📱 하이브리드 앱 환경의 특성

#### **웹뷰 기반 구조**

```text
📐 아키텍처 개념도:

┌─────────────────┐
│   Native App    │
├─────────────────┤
│    WebView      │  ← Vue 3 SPA
│  ┌───────────┐  │
│  │ bizMOB4   │  │
│  │   Web     │  │
│  │ Framework │  │
│  └───────────┘  │
├─────────────────┤
│ bizMOB Bridge   │  ← 네이티브 통신
├─────────────────┤
│  Device APIs    │
└─────────────────┘
```

#### **Ionic UI 컴포넌트 활용**

```text
🎨 Ionic 도입 배경:

✅ 네이티브 룩앤필 제공
✅ 모바일 최적화된 컴포넌트
✅ iOS/Android 플랫폼별 자동 스타일링
✅ 접근성 (Accessibility) 기본 지원

📦 사용 범위:
• UI 컴포넌트만 선택적 도입
• 하이브리드 앱 기능은 bizMOB 자체 구현
• Capacitor 미사용 (자체 브릿지 활용)
```

### 🌐 SPA 환경 설계 고려사항

#### **네비게이션 플로우 설계**

```text
🗺️ 주요 고려사항:

1. 화면 전환 패턴
   • Push/Pop 네비게이션
   • Modal 기반 오버레이
   • Tab 기반 네비게이션

2. 상태 관리
   • 브라우저 히스토리와 앱 네비게이션 동기화
   • 뒤로가기 버튼 처리
   • 딥링크 대응

3. 생명주기 관리
   • 앱 포그라운드/백그라운드 전환
   • 메모리 관리 최적화
```

---

## ⚙️ 핵심 설정 파일

### 🔧 vite.config.js 중요성

#### **Vite 도입 배경**

```javascript
// vite.config.js 핵심 설정 예시
export default defineConfig({
  plugins: [
    vue(),
    // Ionic 지원
    // TypeScript 지원
    // 개발 서버 최적화
  ],
  build: {
    target: 'es2015', // 모바일 브라우저 지원
    rollupOptions: {
      output: {
        manualChunks: {
          // 코드 스플리팅 전략
        }
      }
    }
  },
  server: {
    proxy: {
      // bizMOB 서버 프록시 설정
      '/api': 'http://bizmob-server:8080'
    }
  }
})
```

#### **주요 설정 포인트**

```text
🎯 필수 설정 영역:

1. 빌드 최적화
   • 번들 크기 최소화
   • 코드 스플리팅
   • 트리 셰이킹 활용

2. 개발 환경
   • 핫 모듈 리플레이스먼트 (HMR)
   • 프록시 서버 설정
   • 소스맵 생성

3. 호환성
   • 브라우저 타겟 설정
   • 폴리필 관리
   • 레거시 지원
```

### 📝 tsconfig.json 설정

#### **TypeScript 도입 이유**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "types": ["vite/client", "@ionic/vue"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### **타입 안전성 확보**

```text
🛡️ TypeScript 장점:

• 컴파일 타임 오류 검출
• IDE 자동완성 향상
• 리팩토링 안정성
• API 계약 명확화
• 팀 협업 효율성 증대
```

---

## 🔗 브릿지 통신과 세션 관리

### 🌉 bizMOB 브릿지 통신

#### **네이티브-웹 통신 구조**

```text
📡 통신 플로우:

Web (Vue) ←→ bizMOB Bridge ←→ Native App
    ↓              ↓              ↓
- UI 렌더링    - 메시지 중계    - Device API
- 사용자 입력  - 데이터 변환    - 시스템 기능
- 상태 관리    - 보안 처리     - 네트워크
```

#### **주요 브릿지 기능**

```javascript
// 브릿지 통신 예시
import Network from '@/bizMOB/Xross/Network';

const res: any = await Network.requestLogin({
  _sTrcode: trcode,
  _sUserId: userId,
  _sPassword: password,
  _oHttpHeader: {
    ...generateHttpHeader(),
    ...httpHeader
  },
  _oHeader: {
    ...generateTrHeader(),
    ...header
  },
  _oBody: body,
  _bMock: isMock,
  _nTimeout: timeout,
  _bProgressEnable: false, // Native 프로그레스는 Off
});

import App from '@/bizMOB/Xross/App';

const msg: any = await App.callPlugIn("GET_LOCATION", {
  type: "check"
});
```

```javascript
/** bizMOB Server 로그인 통신 */
static requestLogin(arg: {
  _sUserId: string, // 인증 받을 사용자 아이디
  _sPassword: string, // 인증 받을 사용자 패스워드
  _sTrcode: string, // 전문코드
  _oHeader?: Record<string, any>, // 전문 Header 객체
  _oBody?: Record<string, any>, // 전문 Body 객체
  _oHttpHeader?: Record<string, any>, // HTTP Header 객체
  _sQuery?: string, // Query String (web 전용)
  _bProgressEnable?: boolean, // 서버에 요청 통신 중일때 화면에 progress 를 표시할지에 대한 여부
  _nTimeout?: number, // 타임아웃 시간 (sec 단위)
  _bMock?: boolean, // Mock 데이터 사용 여부
}): Promise<Record<string, any>> {
  return new Promise(resolve => {
    bizMOB.Network.requestLogin({
      ...arg,
      _fCallback: function(res: any) {
        resolve(res);
      }
    });
  });
}

/**
 * Native 플러그인 호출 API
 * @param api Native Call API ID
 * @param arg call 파라미터
 * @returns
 */
static callPlugIn(api: string, arg?: {
  [key: string]: any;
  _bMock?: boolean, // Mock 데이터 사용 여부
}): Promise<Record<string, any>> {
  return new Promise(resolve => {
    bizMOB.App.callPlugIn(api, {
      ...arg,
      callback: function(res: any) {
        resolve(res);
      }
    });
  });
}
```

### 🔐 Same-Site 문제 해결

#### **프록시 서버의 필요성**

```text
⚠️ Same-Site 정책 문제:

기존 방식 (bizMOB 3.5):
웹 → 직접 bizMOB 서버 통신
❌ CORS 문제
❌ 쿠키 세션 제약
❌ 최신 브라우저 보안 정책 충돌

개선 방식 (bizMOB 4.0):
웹 → 개발 프록시 서버 → bizMOB 서버
✅ Same-Origin 정책 준수
✅ 세션 관리 안정성
✅ 개발 환경 일관성
```

#### **프록시 서버 구성**

```javascript
// 프록시 설정 예시
server: {
  proxy: {
    '/bizmob-api': {
      target: 'http://bizmob.company.com:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/bizmob-api/, '/api')
    }
  }
}
```

---

## 🛠️ 개발 환경 구성

### 💻 권장 IDE

#### **VSCode vs Cursor IDE**

```text
🆚 IDE 비교:

VSCode:
✅ 안정성과 성숙도
✅ 풍부한 확장 생태계
✅ 팀 표준화 용이
✅ Git 통합

Cursor IDE:
✅ AI 기반 코드 생성
✅ 컨텍스트 인식 자동완성
✅ 최신 AI 도구 통합
✅ 생산성 향상

📋 권장사항:
• 기본: VSCode + 필수 확장프로그램
• 고급: Cursor IDE (AI 활용 시)
```

#### **필수 확장프로그램**

```text
📦 VSCode 필수 확장:

• Vue Language Features (Volar)
• TypeScript Vue Plugin (Volar)
• Ionic Snippets
• ESLint
• Prettier
• Auto Rename Tag
• GitLens
• Thunder Client (API 테스트)
```

### 📋 Base 프로젝트 구성

#### **README.md 중요성**

```text
📖 문서화 필수 요소:

1. 프로젝트 개요
   • 기술 스택 명시
   • 프로젝트 구조 설명
   • 주요 기능 목록

2. 개발 환경 설정
   • Node.js 버전 요구사항
   • 의존성 설치 방법
   • 환경 변수 설정

3. 실행 방법
   • 개발 서버 시작
   • 빌드 프로세스
   • 배포 방법

4. 코딩 컨벤션
   • 코드 스타일 가이드
   • 커밋 메시지 규칙
   • 브랜치 전략
```

---

## 🎯 실무 적용 포인트

### 📊 초기 설정의 중요성

#### **설정 파일이 개발에 미치는 영향**

```text
⚡ 초기 설정의 파급 효과:

1. 개발 생산성
   • 자동완성 정확도
   • 오류 검출 능력
   • 리팩토링 안정성

2. 코드 품질
   • 타입 안전성
   • 코딩 컨벤션 일관성
   • 버그 예방

3. 팀 협업
   • 개발 환경 통일
   • 빌드 과정 표준화
   • 배포 자동화 기반

4. 유지보수성
   • 의존성 관리
   • 버전 호환성
   • 마이그레이션 용이성
```

---

## 📚 참고 자료

### 🔗 공식 문서

- [Vue 3 공식 문서](https://vuejs.org/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Ionic Vue 가이드](https://ionicframework.com/docs/vue/overview)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)

### 🛠️ 개발 도구

- [VSCode](https://code.visualstudio.com/)
- [Cursor IDE](https://cursor.sh/)
- [Vue DevTools](https://devtools.vuejs.org/)

---
