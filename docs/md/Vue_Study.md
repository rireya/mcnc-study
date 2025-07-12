# Vue.js 학습 프로젝트 🚀

주니어 개발자를 위한 Vue 3 + TypeScript 실습용 프로젝트입니다.

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://your-github-pages-url.github.io/mcnc-study-project/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite)](https://vitejs.dev/)

## 📋 프로젝트 개요

이 프로젝트는 Vue 3, TypeScript, Pinia를 사용한 모던 프론트엔드 개발을 학습하기 위한 교육용 프로젝트입니다. 퍼블리싱이 완료된 화면에 스크립트 로직을 구현하는 방식으로 학습할 수 있습니다.

### 🎯 학습 목표

- **Vue 3 Composition API** 이해 및 활용
- **TypeScript** 기반 타입 안전한 개발
- **Pinia** 상태 관리 패턴 학습
- **CRUD 기능** 구현 경험
- **모던 프론트엔드** 개발 워크플로우 체험

## 🛠️ 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| **Vue 3** | ^3.4.0 | 프론트엔드 프레임워크 |
| **TypeScript** | ^5.4.0 | 타입 안전성 |
| **Vite** | ^5.2.0 | 개발 서버 & 빌드 도구 |
| **Pinia** | ^2.1.0 | 상태 관리 |
| **Vue Router** | ^4.3.0 | 라우팅 |
| **SCSS** | - | 스타일링 |

## 📁 프로젝트 구조

```text
src/
├── views/
│   ├── DashboardView.vue          # 메인 대시보드
│   ├── practice/                  # 🎯 실습용 화면
│   │   ├── LoginView.vue          # 로그인 화면
│   │   ├── ListView.vue           # 게시글 목록
│   │   ├── DetailView.vue         # 게시글 상세
│   │   ├── PostView.vue           # 게시글 작성
│   │   └── UpdateView.vue         # 게시글 수정
│   └── tools/                     # 🛠️ 개발 도구 & 가이드
│       ├── LearningGuideView.vue  # 학습 가이드
│       ├── RequirementsView.vue   # 실습 요구사항
│       └── ApiGuideView.vue       # API 테스트 도구
├── components/                    # 공통 컴포넌트
├── stores/                        # Pinia 상태 관리
├── api/                           # LocalFetch API
└── router/                        # Vue Router 설정
```

## 📚 실습 화면

### 🎯 Practice Screens (구현 대상)

1. **로그인 화면** (`/login`)
   - 폼 유효성 검사
   - API 호출 처리
   - 에러 핸들링

2. **게시글 목록** (`/list`)
   - 데이터 조회 및 렌더링
   - 검색 기능
   - 카테고리 필터링
   - 페이지네이션

3. **게시글 상세** (`/detail/:id`)
   - URL 파라미터 처리
   - 데이터 바인딩
   - 수정/삭제 기능

4. **게시글 작성** (`/post`)
   - 폼 처리
   - 유효성 검사
   - 데이터 등록

5. **게시글 수정** (`/update/:id`)
   - 기존 데이터 로드
   - 수정 처리
   - 변경사항 관리

### 🛠️ Development Tools

- **학습 가이드** (`/learning-guide`) - 단계별 학습 가이드
- **실습 요구사항** (`/requirements`) - 구현 기능 가이드
- **API 가이드** (`/api-guide`) - localFetch API 테스트
- **모달 테스트** - Alert & Confirm 컴포넌트 테스트

## 🚀 시작하기

### 1. 프로젝트 클론 및 설치

```bash
git clone https://github.com/your-username/mcnc-study-project.git
cd mcnc-study-project
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

### 3. 학습 순서

1. **프로젝트 구조 파악**
   - 파일 구조 이해
   - 라우터 설정 확인
   - 컴포넌트 구조 파악

2. **API 가이드 학습**
   - `/api-guide`에서 localFetch API 학습
   - 시드 데이터 생성
   - API 테스트 수행

3. **로그인 화면 구현**
   - 폼 유효성 검사 구현
   - API 호출 처리
   - 에러 핸들링

4. **게시글 목록 구현**
   - 데이터 조회 및 렌더링
   - 검색/필터 기능
   - 페이지네이션

5. **상세/작성/수정 화면 완성**
   - CRUD 기능 완성
   - 라우터 파라미터 처리
   - 상태 관리

## 📖 개발 가이드

### LocalFetch API 사용법

```typescript
import { localFetch } from '@/api/localFetch'

// GET 요청
const response = await localFetch('/list', {
  method: 'GET',
  params: { page: 1, limit: 10 }
})

// POST 요청
const response = await localFetch('/post', {
  method: 'POST',
  body: { title: '제목', content: '내용' }
})
```

### 기본 컴포넌트 구조

```vue
<template>
  <div class="component">
    <!-- 템플릿 구현 -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useModal } from '@/stores/modal'

// 상태 관리
const data = ref([])
const form = reactive({})

// 라이프사이클
onMounted(() => {
  // 초기화 로직
})
</script>
```

### 모달 시스템 사용

```typescript
import { useModal } from '@/stores/modal'

const { alert, confirm } = useModal()

// 알림
await alert('메시지')

// 확인 다이얼로그
const result = await confirm('정말 삭제하시겠습니까?')
if (result) {
  // 확인 시 로직
}
```

## 🔧 개발 도구

### 브라우저 개발자 도구 활용

- **Console**: `devUtils` 객체로 디버깅 함수 제공
- **Network**: API 호출 모니터링
- **Vue DevTools**: 컴포넌트 상태 확인

### 개발 도우미 함수

```javascript
// 브라우저 콘솔에서 사용 가능
devUtils.debugLog.info('디버그 메시지')
devUtils.validation.email('test@example.com')
devUtils.sampleData.generatePost()
```

## 🐛 자주 발생하는 문제

### 1. 반응형 데이터가 업데이트되지 않음

```typescript
// ❌ 잘못된 방법
let count = 0
count++

// ✅ 올바른 방법  
const count = ref(0)
count.value++
```

### 2. API 응답이 undefined

- API 가이드에서 시드 데이터를 먼저 생성하세요
- 브라우저 Network 탭에서 요청 확인

### 3. 라우터 파라미터 접근 불가

```typescript
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
```

## 📞 도움이 필요할 때

1. **학습 가이드** (`/learning-guide`) - 기술별 상세 가이드
2. **요구사항 문서** (`/requirements`) - 구현 기능 명세
3. **개발자 도구** - 브라우저 콘솔의 `devUtils` 활용
4. **Vue DevTools** - 컴포넌트 상태 디버깅

## 🏆 완료 후 다음 단계

- **심화 학습**: Vuex → Pinia 마이그레이션
- **테스트 코드**: Jest + Vue Test Utils
- **빌드 최적화**: Vite 설정 커스터마이징
- **배포**: Vercel, Netlify 등 정적 호스팅

## 📝 라이센스

이 프로젝트는 교육 목적으로 제작되었습니다.
