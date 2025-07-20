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

초기 (소규모) → 중기 (중규모) → 후기 (대규모)
     ↓              ↓              ↓
  단순 구조     →  모듈화 구조   →  세분화 구조

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

### 🏢 권장 폴더 구조

#### **bizMOB4 표준 구조**

```text
src/
├── 📁 views/              # 페이지 컴포넌트
│   ├── auth/             # 인증 관련 페이지
│   ├── dashboard/        # 대시보드
│   └── settings/         # 설정 페이지
├── 📁 components/         # 재사용 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   ├── forms/            # 폼 관련 컴포넌트
│   └── layouts/          # 레이아웃 컴포넌트
├── 📁 composables/        # Vue 3 Composition API
│   ├── useAuth.ts        # 인증 로직
│   ├── useApi.ts         # API 호출 로직
│   └── useBizmob.ts      # bizMOB 브릿지 로직
├── 📁 stores/             # Pinia 상태 관리
│   ├── auth.ts           # 인증 상태
│   ├── app.ts            # 앱 전역 상태
│   └── user.ts           # 사용자 상태
├── 📁 router/             # Vue Router 설정
│   ├── index.ts          # 라우터 메인 설정
│   └── guards.ts         # 네비게이션 가드
├── 📁 api/                # API 관련
│   ├── client.ts         # HTTP 클라이언트 설정
│   ├── endpoints.ts      # API 엔드포인트 정의
│   └── types.ts          # API 타입 정의
├── 📁 utils/              # 유틸리티 함수
│   ├── format.ts         # 포맷팅 함수
│   ├── validation.ts     # 검증 함수
│   └── helpers.ts        # 헬퍼 함수
├── 📁 assets/             # 정적 자원
│   ├── images/           # 이미지 파일
│   ├── icons/            # 아이콘 파일
│   └── styles/           # 스타일 파일
│       ├── variables.css # CSS 변수
│       └── global.css    # 전역 스타일
├── 📁 types/              # TypeScript 타입 정의
│   ├── api.ts            # API 관련 타입
│   ├── bizmob.ts         # bizMOB 관련 타입
│   └── common.ts         # 공통 타입
└── 📄 main.ts             # 앱 진입점
```

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

📁 composables/
• Vue 3 Composition API 활용
• 재사용 가능한 로직 분리
• 상태와 로직의 캡슐화

📁 stores/
• 전역 상태 관리 (Pinia)
• 컴포넌트 간 데이터 공유
• 복잡한 상태 로직 중앙 관리

📁 utils/
• 순수 함수형 유틸리티
• 프레임워크 독립적 로직
• 테스트 용이한 헬퍼 함수
```

---

## ⚡ SI 프로젝트 초기 작업 전략

### 📊 SI 프로젝트의 특성 이해

#### **개발 단계별 FE 작업량**

```text
📈 SI 프로젝트 개발 흐름:

요구사항 분석 → 설계 → 개발 → 테스트 → 배포
     ↓           ↓      ↓       ↓      ↓
   FE 작업:    낮음   낮음    높음    중간   낮음

⚠️ 초기 한가한 시간을 잘못 활용하면 후반부에 큰 문제 발생
```

#### **초기 작업의 중요성**

```text
🎯 초기에 해야 할 핵심 작업:

1. 프로젝트 기반 구조 설계
   • 폴더 구조 확정
   • 코딩 컨벤션 정립
   • 빌드 프로세스 구성

2. 라이브러리 검증 및 테스트
   • 필요 라이브러리 목록 작성
   • 버전 호환성 검증
   • 테스트용 샘플 화면 제작

3. 개발 환경 최적화
   • IDE 설정 표준화
   • 코드 스니펫 작성
   • 자동화 스크립트 구성

4. 문서화 작업
   • README.md 작성
   • API 문서 템플릿 준비
   • 개발 가이드 작성
```

### 🧪 라이브러리 사전 검증

#### **라이브러리 선택 기준**

```text
✅ 검증 체크리스트:

📱 모바일 호환성
□ iOS Safari 지원 여부
□ Android WebView 지원 여부
□ 터치 이벤트 처리 능력
□ 반응형 디자인 지원

🔄 버전 호환성
□ Vue 3 호환성
□ TypeScript 지원
□ Vite 빌드 도구 호환성
□ 최소 앱 지원 버전과의 호환성

📚 생태계 건강성
□ 활발한 커뮤니티
□ 정기적인 업데이트
□ 충분한 문서화
□ 이슈 대응 속도

🛡️ 보안 및 안정성
□ 보안 취약점 이력
□ 라이선스 정책
□ 번들 사이즈 영향
□ 트리 셰이킹 지원
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

### 📝 vite.config.js 최적화

#### **프로젝트별 설정 고려사항**

```javascript
// vite.config.js 고급 설정 예시
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    // 환경별 플러그인 설정
  ],

  // 경로 별칭 설정
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@composables': resolve(__dirname, 'src/composables')
    }
  },

  // 빌드 최적화
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        // 청크 분할 전략
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ionic': ['@ionic/vue'],
          'utils': ['lodash', 'moment']
        }
      }
    },
    // 소스맵 설정 (개발/운영 환경별)
    sourcemap: process.env.NODE_ENV === 'development'
  },

  // 개발 서버 설정
  server: {
    port: 3000,
    proxy: {
      '/bizmob-api': {
        target: 'http://dev.bizmob.com:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bizmob-api/, '/api')
      }
    }
  },

  // CSS 전처리기 설정
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  }
})
```

### 🔧 tsconfig.json 최적화

#### **TypeScript 설정 상세화**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowImportingTsExtensions": false,
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "skipLibCheck": true,

    // 경로 매핑 (vite.config.js와 동일하게)
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@views/*": ["src/views/*"],
      "@utils/*": ["src/utils/*"],
      "@stores/*": ["src/stores/*"],
      "@composables/*": ["src/composables/*"]
    },

    // 타입 정의
    "types": [
      "vite/client",
      "@ionic/vue",
      "node"
    ],

    // 라이브러리 지원
    "lib": ["ES2020", "DOM", "DOM.Iterable"],

    // 출력 설정
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },

  "include": [
    "src/**/*",
    "src/**/*.vue"
  ],

  "exclude": [
    "node_modules",
    "dist",
    "**/*.spec.ts",
    "**/*.test.ts"
  ]
}
```

---

## 🚀 프로젝트 안정화 작업

### 🧪 빌드 및 배포 테스트

#### **빌드 프로세스 검증**

```bash
# 빌드 테스트 스크립트 예시
#!/bin/bash

echo "🏗️ 빌드 테스트 시작..."

# 1. 의존성 설치 테스트
npm ci

# 2. 타입 체크
npm run type-check

# 3. 린트 검사
npm run lint

# 4. 단위 테스트
npm run test

# 5. 빌드 실행
npm run build

# 6. 빌드 결과 검증
if [ -d "dist" ]; then
    echo "✅ 빌드 성공"

    # 번들 크기 체크
    echo "📦 번들 크기:"
    du -sh dist/*

    # 중요 파일 존재 확인
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html 생성 확인"
    fi

else
    echo "❌ 빌드 실패"
    exit 1
fi

echo "🎉 빌드 테스트 완료"
```

#### **배포 전 체크리스트**

```text
📋 배포 검증 체크리스트:

🏗️ 빌드 검증
□ 빌드 에러 없음
□ 타입 체크 통과
□ 린트 검사 통과
□ 번들 크기 적정 수준

📱 기능 검증
□ 주요 화면 렌더링 정상
□ 라우팅 동작 확인
□ bizMOB 브릿지 통신 정상
□ API 호출 정상

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

#### **VSCode 스니펫 예시**

```json
{
  "Vue 3 Composition Component": {
    "prefix": "v3comp",
    "body": [
      "<template>",
      "  <div class=\"${1:component-name}\">",
      "    $2",
      "  </div>",
      "</template>",
      "",
      "<script setup lang=\"ts\">",
      "import { ref, computed, onMounted } from 'vue'",
      "",
      "interface Props {",
      "  $3",
      "}",
      "",
      "const props = defineProps<Props>()",
      "const emit = defineEmits<{",
      "  $4",
      "}>()",
      "",
      "// 반응형 상태",
      "const $5 = ref('')",
      "",
      "// 계산된 속성",
      "const $6 = computed(() => {",
      "  return $7",
      "})",
      "",
      "// 생명주기",
      "onMounted(() => {",
      "  $8",
      "})",
      "</script>",
      "",
      "<style scoped>",
      ".${1:component-name} {",
      "  $9",
      "}",
      "</style>"
    ],
    "description": "Vue 3 Composition API 컴포넌트 템플릿"
  },

  "bizMOB Bridge Call": {
    "prefix": "bizmob-call",
    "body": [
      "bizMOB.bridge.call({",
      "  method: '${1:methodName}',",
      "  params: {",
      "    $2",
      "  },",
      "  callback: (result) => {",
      "    if (result.success) {",
      "      $3",
      "    } else {",
      "      console.error('bizMOB 호출 실패:', result.error)",
      "      $4",
      "    }",
      "  }",
      "})"
    ],
    "description": "bizMOB 브릿지 호출 템플릿"
  }
}
```

---

## 🌍 앱 타겟별 고려사항

### 🌐 글로벌 앱 개발 고려사항

#### **다국어 지원 (i18n)**

```text
🗺️ 다국어 고려사항:

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
• 손가락 제스처 의미 차이

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
    // 날짜 포맷팅 로직
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
  },

  // 한국 주민등록번호 검증
  isValidKoreanSSN: (ssn: string): boolean => {
    // 주민등록번호 검증 로직
  }
}
```

#### **bizMOB 유틸리티**

```typescript
// src/utils/bizmob.ts
export const bizmobUtils = {
  // 디바이스 정보 조회
  getDeviceInfo: (): Promise<DeviceInfo> => {
    return new Promise((resolve, reject) => {
      bizMOB.bridge.call({
        method: 'getDeviceInfo',
        callback: (result) => {
          if (result.success) {
            resolve(result.data)
          } else {
            reject(new Error(result.error))
          }
        }
      })
    })
  },

  // 네트워크 상태 확인
  getNetworkStatus: (): Promise<NetworkStatus> => {
    return new Promise((resolve, reject) => {
      bizMOB.bridge.call({
        method: 'getNetworkStatus',
        callback: (result) => {
          if (result.success) {
            resolve(result.data)
          } else {
            reject(new Error(result.error))
          }
        }
      })
    })
  },

  // 토스트 메시지 표시
  showToast: (message: string, duration: number = 3000): void => {
    bizMOB.bridge.call({
      method: 'showToast',
      params: { message, duration }
    })
  },

  // 로딩 스피너 제어
  showLoading: (show: boolean): void => {
    bizMOB.bridge.call({
      method: show ? 'showLoading' : 'hideLoading'
    })
  }
}
```

---

## ✅ 초기 작업 완료 체크리스트

### 🎯 1주차 완료 기준

```text
📋 필수 완료 항목:

🏗️ 프로젝트 구조
□ 폴더 구조 확정 및 생성
□ 네이밍 컨벤션 문서화
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
□ 번들 크기 영향 평가

🔧 빌드 시스템
□ Vite 설정 최적화
□ 환경별 설정 분리
□ 빌드 스크립트 작성
□ 배포 프로세스 문서화

📖 문서화
□ README.md 작성
□ 개발 가이드 작성
□ API 문서 템플릿 준비
□ 트러블슈팅 가이드 초안
```

### 🚀 다음 단계 준비

```text
🎯 2주차 준비사항:

📱 bizMOB 연동
• bizMOB 브릿지 라이브러리 분석
• 주요 API 사용법 정리
• 네이티브 통신 테스트

🎨 UI 컴포넌트
• Ionic 컴포넌트 활용법
• 공통 컴포넌트 설계
• 디자인 시스템 적용

🏪 상태 관리
• Pinia 스토어 구조 설계
• API 데이터 플로우 설계
• 캐싱 전략 수립

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
