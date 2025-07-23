# 🏗️ 2차: 초기 클라이언트 아키텍처 설계시 주의점

> 💡 **AI 활용 안내**: 이 교육 자료는 Claude Sonnet 4를 활용하여 제작되었습니다.

## 🎯 학습 목표

- **폴더 구조 설계** 원칙과 전략 이해
- **SI 프로젝트 특성**을 고려한 초기 작업 계획
- **라이브러리 선택 기준**과 버전 호환성 검토
- **프로젝트 안정화** 작업의 중요성 인식

---

## 📁 폴더 구조 설계 전략

### 🧩 구조화의 기본 원칙

#### **확장성을 고려한 설계**

```text
📈 개발 규모에 따른 구조 변화:

   소규모    →    중규모     →   대규모
     ↓              ↓              ↓
  단순 구조  →  모듈화 구조  →  세분화 구조

⚠️ 주의점: 처음부터 과도한 구조화는 오히려 독이 될 수 있음
```

#### **적정 수준의 구조화**

```text
✅ 적정한 구조화:
• 직관적인 폴더명
• 기능별 명확한 분리
• 3-4 레벨 이하의 깊이
• 일관된 네이밍 컨벤션

❌ 과도한 구조화:
• 너무 깊은 폴더 계층
• 과도한 추상화
• 복잡한 의존성 관계
• 하나 수정 시 여러 파일 확인 필요
```

### 🏢 폴더 구조

#### **폴더별 역할과 책임**

```text
🎯 주요 폴더 설명:

📁 views/
• 페이지 단위 컴포넌트
• 라우터와 1:1 매핑
• 비즈니스 로직 최소화

📁 components/
• 재사용 가능한 UI 컴포넌트
• Props/Emit 기반 통신
• 순수 프레젠테이션 로직

📁 composables/ (Vue 전용 로직)
• Vue 3 Composition API 활용
• 반응형 상태를 포함한 로직
• 컴포넌트 생명주기 관련 로직
• Vue 인스턴스에 의존적인 기능

📁 stores/
• 전역 상태 관리 (Pinia)
• 컴포넌트 간 데이터 공유
• 복잡한 상태 로직 중앙 관리

📁 utils/ (범용 로직)
• 순수 함수형 유틸리티
• 프레임워크 독립적 로직
• 입력값 → 출력값 변환 함수
• 테스트 용이한 헬퍼 함수
```

#### **📂 composables vs utils 구분 가이드**

```text
🔍 둘 다 재사용 가능한 로직이지만 성격이 다름:

📁 composables (Vue 컴포넌트와 결합)
✅ Vue 반응형 시스템 사용 (ref, reactive, computed)
✅ 컴포넌트 생명주기 훅 사용 (onMounted, onUnmounted)
✅ 컴포넌트 인스턴스 접근 (getCurrentInstance)
✅ 상태를 가지고 있는 로직
✅ 컴포넌트 간 로직 공유가 목적

예시:
• useAuth() - 로그인 상태 관리
• useApi() - API 호출과 로딩 상태
• useModal() - 모달 열기/닫기 상태
• usePagination() - 페이징 상태 관리

📁 utils (독립적인 도구 함수)
✅ 입력 → 출력만 있는 순수 함수
✅ Vue/React/Angular 등 어디서든 사용 가능
✅ 상태를 가지지 않음 (stateless)
✅ 부작용(side effect) 없음
✅ 데이터 변환/검증이 목적

예시:
• formatDate() - 날짜 포맷팅
• validateEmail() - 이메일 검증
• debounce() - 디바운스 처리
• generateId() - 고유 ID 생성
```

#### **실제 코드 예시로 보는 차이점**

```typescript
// ❌ 잘못된 분류 예시
// utils/useAuth.ts (X) - Vue 반응형 시스템 사용하므로 composables에 위치해야 함
export function useAuth() {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  const login = async (credentials) => {
    // 로그인 로직
  }

  return { user, isLoggedIn, login }
}

// composables/formatDate.ts (X) - 순수 함수이므로 utils에 위치해야 함
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
```

#### **📋 분류 기준 체크리스트**

```text
🤔 어느 폴더에 넣을지 고민될 때 체크:

composables/ 폴더에 넣어야 하는 경우:
□ ref, reactive, computed 등 Vue 반응형 API 사용
□ onMounted, onUnmounted 등 생명주기 훅 사용
□ 컴포넌트와 상호작용하는 상태 관리
□ 컴포넌트 간 로직 공유가 목적
□ 'use'로 시작하는 함수명 (컨벤션)

utils/ 폴더에 넣어야 하는 경우:
□ 입력값을 받아 결과값만 반환하는 순수 함수
□ Vue 없이도 Node.js, 바닐라 JS에서 동작 가능
□ 상태를 가지지 않음 (stateless)
□ 부작용(API 호출, DOM 조작 등) 없음
□ 데이터 변환, 계산, 검증 등이 목적
```

---

## ⚡ SI 프로젝트 초기 작업 전략

### 📊 SI 프로젝트의 특성 이해

#### **개발 단계별 FE 작업량**

```text
📈 SI 프로젝트 개발 흐름 (이슈가 없는 경우):

          분석  →  설계  →  개발  →  테스트  →  배포  →  안정화
           ↓        ↓        ↓        ↓         ↓         ↓
FE 작업:  낮음     낮음     높음      중간      중간      낮음

⚠️ 초기 한가한 시간을 잘못 활용하면 후반부에 큰 문제 발생
```

#### **초기 작업의 중요성**

```text
🎯 초기에 해야 할 핵심 작업:

1. 프로젝트 기반 구조 설계
   • 폴더 구조 확정
   • 코딩 컨벤션 정립
   • 빌드 프로세스 구성

2. 프로젝트 설정 확인 및 환경 맞춤 설정
   • vite.config.ts 프로젝트 요구사항에 맞게 조정
   • tsconfig.json 컴파일 옵션 최적화
   • package.json 스크립트 및 의존성 정리
   • 환경 변수 설정 (.env 파일 구성)

3. 라이브러리 검증 및 테스트
   • 필요 라이브러리 목록 작성
   • 버전 호환성 검증
   • 테스트용 샘플 화면 제작

4. 개발 환경 최적화
   • IDE 설정 표준화
   • 코드 스니펫 작성
   • 자동화 스크립트 구성

5. 공통 기능 구현
   • 유틸리티 함수 라이브러리 구축
   • 공통 컴포넌트 개발 (로딩, 에러 처리 등)
   • API 통신 서비스 구현
   • 사용자 경험 향상 컴포넌트 (페이징, 레이지로딩 등)
```

### 🧪 라이브러리 사전 검증

#### **라이브러리 선택 기준**

```text
✅ 검증 체크리스트:

📱 모바일 호환성
□ iOS Safari 지원 여부
□ Android WebView 지원 여부
□ 터치 이벤트 처리 능력

🔄 버전 호환성
□ Vue 3 호환성
□ TypeScript 지원
□ 최소 앱 지원 버전과의 호환성 (ES5 지원 여부)

📚 생태계 건강성
□ 활발한 커뮤니티
□ 정기적인 업데이트
□ 충분한 문서화

🛡️ 보안 및 안정성
□ 보안 취약점 이력
□ 라이선스 정책
□ 번들 사이즈 영향
```

#### **테스트용 샘플 화면 제작**

```vue
<!-- 라이브러리 테스트 컴포넌트 예시 -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>라이브러리 테스트</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- 각종 라이브러리 테스트 섹션 -->
      <section class="test-section">
        <h2>날짜 선택기 테스트</h2>
        <!-- 날짜 라이브러리 테스트 -->
      </section>

      <section class="test-section">
        <h2>차트 라이브러리 테스트</h2>
        <!-- 차트 라이브러리 테스트 -->
      </section>

      <section class="test-section">
        <h2>폼 검증 테스트</h2>
        <!-- 폼 라이브러리 테스트 -->
      </section>
    </ion-content>
  </ion-page>
</template>
```

---

## ⚙️ 핵심 설정 파일 심화

### 📝 vite.config.ts 주요 설정 항목

#### **프로젝트별 설정 고려사항**

```text
🎯 vite.config.ts 핵심 설정 영역:

📁 경로 별칭 (resolve.alias)
• @/ → src/ 폴더 매핑
• @components/, @views/, @utils/ 등 주요 폴더 별칭
• 상대 경로 대신 절대 경로 사용으로 가독성 향상
• import 문 간소화 및 리팩토링 용이성

🔌 플러그인 설정 (plugins)
• @vitejs/plugin-vue: Vue SFC 지원
• @vitejs/plugin-vue-jsx: JSX 문법 지원
• vite-plugin-eslint: 빌드 시 ESLint 검사
• 환경별 플러그인 조건부 적용

🏗️ 빌드 최적화 (build)
• target: 지원 브라우저 범위 설정 (es2015, es2020 등)
• rollupOptions: 번들링 세부 설정
• manualChunks: 청크 분할 전략 (vendor, 라이브러리별)
• sourcemap: 소스맵 생성 여부 (개발/운영 환경별)

🌐 개발 서버 (server)
• port: 개발 서버 포트 설정
• proxy: API 프록시 설정 (CORS 해결)
• host: 외부 접속 허용 설정
• https: HTTPS 개발 서버 설정

🎨 CSS 전처리기 (css)
• preprocessorOptions: SCSS, Less 등 전처리기 설정
• additionalData: 전역 변수/믹스인 자동 import
• modules: CSS 모듈 설정
• postcss: PostCSS 플러그인 설정

📦 의존성 최적화 (optimizeDeps)
• include: 사전 번들링할 의존성 지정
• exclude: 사전 번들링에서 제외할 의존성
• force: 의존성 캐시 강제 재생성
```

### 🔧 tsconfig.json 주요 설정 항목

#### **TypeScript 설정 상세화**

```text
🎯 tsconfig.json 핵심 설정 영역:

🎯 컴파일러 옵션 (compilerOptions)
• target: 컴파일 대상 ECMAScript 버전
• module: 모듈 시스템 (ESNext, CommonJS 등)
• moduleResolution: 모듈 해석 방식 (node, bundler)
• strict: 엄격한 타입 검사 활성화

📁 경로 매핑 (paths)
• baseUrl: 상대 경로 기준점 설정
• paths: 경로 별칭 매핑 (vite.config.ts와 동일하게)
• 절대 경로 import로 코드 가독성 향상
• IDE 자동완성 및 리팩토링 지원

📚 라이브러리 지원 (lib, types)
• lib: 사용할 라이브러리 타입 (DOM, ES2020 등)
• types: 포함할 타입 정의 파일
• typeRoots: 타입 정의 파일 위치
• skipLibCheck: 라이브러리 타입 검사 건너뛰기

📤 출력 설정 (output)
• outDir: 컴파일된 파일 출력 디렉토리
• declaration: .d.ts 파일 생성 여부
• declarationMap: 타입 정의 소스맵 생성
• sourceMap: 소스맵 파일 생성

🔍 포함/제외 설정 (include/exclude)
• include: 컴파일에 포함할 파일/폴더 패턴
• exclude: 컴파일에서 제외할 파일/폴더 패턴
• 테스트 파일, node_modules 등 제외
• Vue SFC 파일 포함 설정

⚡ 성능 최적화
• incremental: 증분 컴파일 활성화
• tsBuildInfoFile: 빌드 정보 캐시 파일
• composite: 프로젝트 참조 기능 활성화
• skipDefaultLibCheck: 기본 라이브러리 검사 건너뛰기

🛡️ 엄격한 검사 옵션
• noImplicitAny: 암시적 any 타입 금지
• strictNullChecks: null/undefined 엄격 검사
• noImplicitReturns: 모든 코드 경로 반환값 필수
• noUnusedLocals: 미사용 지역 변수 검사
```

---

## 🚀 프로젝트 안정화 작업

### 🧪 빌드 및 배포 테스트

#### **배포 전 체크리스트**

```text
📋 배포 검증 체크리스트:

🏗️ 빌드 검증
□ 빌드 에러 없음
□ 타입 체크 통과 (npm run type-check)
□ 린트 검사 통과 (npm run lint-check)
□ 번들 크기 적정 수준

🔧 환경 설정
□ 환경 변수 설정 확인
□ 프록시 설정 동작 확인
□ 빌드 경로 설정 정상
□ 정적 자원 경로 정상

📊 성능 검증
□ 초기 로딩 시간 측정
□ 메모리 사용량 확인
□ 네트워크 요청 최적화
□ 이미지 최적화 확인
```

### 🔧 코드 스니펫 작성

#### **코드 스니펫이 필요한 이유**

```text
🎯 개발 생산성 향상:

⏰ 시간 절약
• 반복적인 코드 패턴을 빠르게 생성
• 타이핑 시간 대폭 단축
• 코드 작성 속도 3-5배 향상

🎯 일관성 유지
• 팀 전체가 동일한 코드 구조 사용
• 네이밍 컨벤션 자동 적용
• 코드 리뷰 시간 단축

❌ 실수 방지
• 오타, 구문 오류 사전 방지
• 필수 import 구문 누락 방지
• 표준 템플릿 준수
```

#### **간단한 스니펫 예시**

```json
{
  "Vue Component": {
    "prefix": "vcomp",
    "body": [
      "<template>",
      "  <div class=\"$1\">",
      "    $2",
      "  </div>",
      "</template>",
      "",
      "<script setup lang=\"ts\">",
      "$3",
      "</script>",
      "",
      "<style scoped>",
      ".$1 {",
      "  $4",
      "}",
      "</style>"
    ],
    "description": "Vue 3 기본 컴포넌트"
  }
}
```

#### **사용 예시**

```text
📝 스니펫 사용법:

1. VSCode에서 새 파일 생성
2. 'vcomp' 입력 후 Tab 키
3. 자동으로 Vue 컴포넌트 템플릿 생성
4. Tab 키로 각 필드 순서대로 입력

💡 결과:
• 빠른 기본 구조 완성
• 오타 없는 정확한 문법
• 일관된 코드 스타일 유지
• 필수 섹션 누락 방지
```

---

## 🌍 앱 타겟별 고려사항

### 🌐 글로벌 앱 개발 고려사항

#### **다국어 지원 (i18n)**

```text
🗺️ 고려사항:

📝 텍스트 관리
• 모든 텍스트 외부화 (하드코딩 금지)
• 키-값 기반 번역 관리
• 복수형, 성별 등 언어별 특성 고려
• 컨텍스트별 번역 분리

📏 텍스트 길이 대응
• 독일어: 영어 대비 30-40% 긴 텍스트
• 중국어/일본어: 세로 텍스트 가능성
• 아랍어: 우에서 좌로 읽는 방향 (RTL)
• 동적 레이아웃 조정 필요

📅 날짜/시간 형식
• 지역별 날짜 형식 (MM/DD/YYYY vs DD/MM/YYYY)
• 시간 형식 (12시간제 vs 24시간제)
• 타임존 처리
• 달력 시스템 차이 (양력/음력)
• ISO 8601 표준 형식 활용 (YYYY-MM-DDTHH:mm:ssZ)
(예시: 2025-01-15T14:30:00Z (UTC 시간), 2025-01-15T23:30:00+09:00 (한국 시간))
• API 통신 시 ISO 8601 사용으로 일관성 확보
• 프론트엔드 표시용과 백엔드 통신용 형식 분리

💰 숫자/통화 형식
• 천 단위 구분자 차이 (쉼표 vs 점)
• 소수점 표기법
• 통화 기호 위치
• 숫자 읽기 방향
```

#### **문화적 UI/UX 고려사항**

```text
🎨 문화별 UI 고려사항:

🎨 색상 의미
• 빨간색: 서구(위험) vs 중국(행운)
• 흰색: 서구(순수) vs 동아시아(죽음)
• 파란색: 서구(신뢰) vs 중동(보호)

🖼️ 이미지 사용
• 종교적 금기사항 확인
• 인종/성별 다양성 고려
• 지역별 문화적 차이 반영

📱 UX 패턴
• 읽기 방향에 따른 네비게이션 구조
• 지역별 선호하는 인터랙션 패턴
• 결제 방식 차이
• 개인정보 처리 방식 차이
```

### 📱 모바일 하이브리드 웹 특성

#### **주요 이슈와 해결방안**

```text
📱 하이브리드 앱 특성별 이슈:

🔧 iOS 관련 이슈
• 하단 홈 인디케이터 영역 (Safe Area)
• 상태바 높이 동적 변화
• WKWebView 스크롤 바운스 효과
• 키보드 노출 시 뷰포트 변화

🤖 Android 관련 이슈
• 다양한 화면 밀도 (DPI) 대응
• 네비게이션 바 영역 처리
• WebView 성능 최적화
• 하드웨어 백 버튼 처리

🌐 공통 이슈
• 네트워크 연결 상태 변화 대응
• 앱 생명주기와 웹 생명주기 동기화
• 메모리 사용량 최적화
• 배터리 소모 최소화
```

#### **네비게이션 구조 설계**

```text
🗺️ 네비게이션 패턴:

📚 Stack Navigation
• 페이지 스택 관리
• 뒤로가기 버튼 처리
• 딥링크 지원
• 메모리 효율적 관리

🏷️ Tab Navigation
• 탭 간 상태 유지
• 탭별 네비게이션 스택
• 액티브 탭 표시
• 접근성 고려

🪟 Modal Navigation
• 모달 스택 관리
• 백그라운드 인터랙션 차단
• 모달 해제 처리
• 키보드 대응
```

---

## 🛠️ 공통 유틸 및 함수 설계

### 🔧 유틸리티 함수 카테고리

#### **데이터 처리 유틸리티**

```typescript
// src/utils/format.ts
export const formatUtils = {
  // 날짜 포맷팅
  formatDate: (date: Date, format: string = 'YYYY-MM-DD'): string => {
    return date.toLocaleDateString('ko-KR')
  },

  // 숫자 포맷팅
  formatNumber: (num: number, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat('ko-KR', options).format(num)
  },

  // 파일 크기 포맷팅
  formatFileSize: (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  },

  // 문자열 마스킹
  maskString: (str: string, start: number, end: number): string => {
    return str.substring(0, start) + '*'.repeat(end - start) + str.substring(end)
  }
}
```

#### **검증 유틸리티**

```typescript
// src/utils/validation.ts
export const validationUtils = {
  // 이메일 검증
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // 한국 휴대폰 번호 검증
  isValidKoreanPhone: (phone: string): boolean => {
    const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/
    return phoneRegex.test(phone)
  },

  // 비밀번호 강도 검증
  validatePasswordStrength: (password: string) => {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  }
}
```

#### **bizMOB 유틸리티**

```typescript
// src/utils/native.ts
export const callGallery = async(max = 1) => {
  if (bizMOB.Device.isApp) {
    const msg = await bizMOB.System.callGallery("image", max);

    if (msg.result) {
      return {
        result: true,
        images: msg.images
          .sort((a: any, b: any) => a.index - b.index)
          .map((img: any) => ({
            fileName: img.filename,
            path: img.uri,
            size: Number(img.size)
          }))
      };
    }
    else {
      return { result: false, images: [] };
    }
  }
  else {
    return {
      result: true,
      images: [{ fileName: "parts_300x170_2.jpg", path: "/data/parts_300x170_2.jpg", size: 10000 }]
    };
  }
};

// GPS 위치 정보 조회
export const getGPS = async (isAddressCheck = false) => {
  const msg: any = await bizMOB.App.callPlugIn("GET_LOCATION", {
    isAddressCheck,
  });

  if (msg.result) {
    return {
      result: true,
      lat: Number(msg.latitude), // 위도
      lng: Number(msg.longitude), // 경도
      addr: isAddressCheck ? msg.address : "", // 주소
    };
  }
  else {
    return {
      result: false,
      lat: 37.566657817476,
      lng: 126.98037562885644,
      addr: "경기 성남시 분당구 정자동 4-5",
    };
  }
};
```

---

## 🚀 사용자 경험 향상 컴포넌트

### 📄 옵저버 패턴 페이징 시스템

#### **무한 스크롤 페이징 구현**

```typescript
// src/composables/usePagination.ts
export function usePagination<T>(apiCall: (page: number) => Promise<T[]>) {
  const items = ref<T[]>([])
  const page = ref(1)
  const isLoading = ref(false)
  const hasMore = ref(true)

  const loadMore = async () => {
    if (isLoading.value || !hasMore.value) return

    isLoading.value = true
    try {
      const newItems = await apiCall(page.value)
      if (newItems.length === 0) {
        hasMore.value = false
      } else {
        items.value.push(...newItems)
        page.value++
      }
    } finally {
      isLoading.value = false
    }
  }

  return { items, isLoading, hasMore, loadMore }
}
```

### ⏳ 로딩 프로세스 관리 시스템

#### **동시/연속 동작 로딩 관리**

```typescript
// src/composables/useLoadingManager.ts
export function useLoadingManager() {
  const loadingTasks = ref(new Set<string>())

  const startLoading = (taskId: string) => {
    loadingTasks.value.add(taskId)
  }

  const stopLoading = (taskId: string) => {
    loadingTasks.value.delete(taskId)
  }

  const isLoading = computed(() => loadingTasks.value.size > 0)

  return { startLoading, stopLoading, isLoading }
}
```

### 🌐 API 통신 서비스

#### **통합 API 서비스**

```typescript
// src/services/apiService.ts
export class ApiService {
  // ...

  async requestTr({
    trcode,
    httpHeader = {},
    header = {},
    body = {},
    timeout = 60, // sec 단위 (기본 60초)
    isMock = false,
    isLoading = true,
    isErrorAlert = true
  }: any): Promise<any> {
    const appStore = new StoreService('app');
    const { alert } = useMessage();


    if (isLoading) {
      // 로딩 프로그레스 on
      appStore.dispatch('showLoading');
    }

    // bizmob API 통신
    const res: any = await Network.requestTr({
      _sTrcode: trcode,
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

    if (isLoading) {
      // 로딩 프로그레스 off
      appStore.dispatch('hideLoading');
    }

    // response 에러 확인
    const state: any = handleTrcodeChecker(res);

    // 성공
    if (state.result) {
      // ...
    }
    // 실패
    else {
      // ...
    }
  }
}

export const apiService = new ApiService()
```

### 🖼️ 이미지 레이지 로딩 컴포넌트

#### **지연 로딩 이미지 컴포넌트**

```vue
<!-- src/components/LazyImage.vue -->
<template>
  <div class="lazy-image-container">
    <img
      v-if="isLoaded"
      :src="src"
      :alt="alt"
      @load="onLoad"
      @error="onError"
    />
    <div v-else-if="isLoading" class="placeholder">
      <ion-spinner></ion-spinner>
    </div>
    <div v-else-if="hasError" class="error">
      이미지 로드 실패
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt?: string
}

const props = defineProps<Props>()
const isLoading = ref(true)
const isLoaded = ref(false)
const hasError = ref(false)

const imageRef = ref<HTMLDivElement>()

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadImage()
      observer.disconnect()
    }
  })

  if (imageRef.value) observer.observe(imageRef.value)
})

const loadImage = () => {
  const img = new Image()
  img.onload = () => onLoad()
  img.onerror = () => onError()
  img.src = props.src
}

const onLoad = () => {
  isLoading.value = false
  isLoaded.value = true
}

const onError = () => {
  isLoading.value = false
  hasError.value = true
}
</script>
```

### 🔄 풀투리프레시 (Pull-to-Refresh)

#### **풀투리프레시 구현**

```vue
<!-- src/components/PullToRefresh.vue -->
<template>
  <div class="pull-refresh-container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="refresh-indicator" :class="{ active: isRefreshing }">
      <ion-spinner v-if="isRefreshing"></ion-spinner>
      <span v-else>당겨서 새로고침</span>
    </div>

    <div class="content" :style="{ transform: `translateY(${pullDistance}px)` }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  refresh: []
}>()

const isRefreshing = ref(false)
const pullDistance = ref(0)
const startY = ref(0)
const threshold = 60

const onTouchStart = (e: TouchEvent) => {
  startY.value = e.touches[0].clientY
}

const onTouchMove = (e: TouchEvent) => {
  const currentY = e.touches[0].clientY
  const diff = currentY - startY.value

  if (diff > 0 && window.scrollY === 0) {
    pullDistance.value = Math.min(diff * 0.5, threshold)
  }
}

const onTouchEnd = async () => {
  if (pullDistance.value >= threshold) {
    isRefreshing.value = true
    emit('refresh')

    // 리프레시 완료 후 애니메이션
    setTimeout(() => {
      isRefreshing.value = false
      pullDistance.value = 0
    }, 1000)
  } else {
    pullDistance.value = 0
  }
}
</script>
```

### 💀 스켈레톤 로딩 컴포넌트

#### **카드 형태 스켈레톤**

```vue
<!-- src/components/SkeletonCard.vue -->
<template>
  <div class="skeleton-card">
    <div class="skeleton-avatar"></div>
    <div class="skeleton-content">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-text"></div>
      <div class="skeleton-line skeleton-text short"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  padding: 16px;
  border-radius: 8px;
  background: #f5f5f5;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin: 8px 0;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
```

---

## ✅ 초기 작업 완료 체크리스트

### 🎯 초기 완료 기준

```text
📋 필수 완료 항목:

🏗️ 프로젝트 구조
□ 폴더 구조 확정 및 생성
□ 경로 별칭 설정 완료
□ TypeScript 설정 최적화

⚙️ 개발 환경
□ IDE 설정 표준화
□ 필수 확장프로그램 설치
□ 코드 스니펫 작성
□ 린트/포맷터 규칙 설정

📚 라이브러리 관리
□ 필요 라이브러리 목록 작성
□ 버전 호환성 검증 완료
□ 테스트 화면 구현
□ 번들 크기 영향 평가 (선택적)

🔧 빌드 시스템
□ Vite 설정 최적화
□ 환경별 설정 분리
□ 빌드 스크립트 작성
□ 배포 프로세스 문서화

📖 문서화
□ README.md 작성
□ 개발 가이드 작성
□ API 문서 템플릿 준비
```

### 🚀 다음 단계 준비

```text
🎯 준비사항:

📱 bizMOB 연동
• 주요 API 사용법 정리
• 네이티브 호출 테스트 코드 작성

🎨 UI 컴포넌트
• Ionic 컴포넌트 활용법
• 공통 컴포넌트 설계

🏪 상태 관리
• Pinia 스토어 구조 설계
• API 데이터 플로우 설계
• 캐싱 전략 수립 (선택적)

🤖 AI 도구 활용
• AI 기반 개발 워크플로우
• 코드 생성 및 리팩토링
• 자동화 도구 활용법
```

---

## 📚 참고 자료

### 🔗 핵심 문서

- [Vue 3 스타일 가이드](https://vuejs.org/style-guide/)
- [TypeScript 설정 가이드](https://www.typescriptlang.org/tsconfig)
- [Vite 설정 레퍼런스](https://vitejs.dev/config/)
- [Ionic Vue 가이드](https://ionicframework.com/docs/vue/overview)

### 🛠️ 도구 및 유틸리티

- [Pinia 상태 관리](https://pinia.vuejs.org/)
- [Vue Router 가이드](https://router.vuejs.org/)
- [ESLint Vue 규칙](https://eslint.vuejs.org/)
- [Prettier 설정](https://prettier.io/docs/en/configuration.html)

---

💡 **핵심 메시지**: 초기 아키텍처 설계는 전체 프로젝트의 성공을 좌우하는 중요한 단계입니다. 충분한 시간을 투자하여 견고한 기반을 구축하세요.
