# 📦 3차: 주요 라이브러리

> **교육 목표**: bizMOB4 베이스 프로젝트에 포함된 주요 라이브러리들의 실무 활용 방법을 학습하여 효율적인 개발 능력을 습득합니다.

---

## 📚 목차

1. [🏪 상태 관리 - Pinia](#-상태-관리---pinia)
2. [📱 UI 프레임워크 - Ionic Vue](#-ui-프레임워크---ionic-vue)
3. [🔒 보안 & 유틸리티 라이브러리](#-보안--유틸리티-라이브러리)
4. [🌍 국제화 - Vue I18n](#-국제화---vue-i18n)
5. [⚡ 개발 효율성 도구](#-개발-효율성-도구)
6. [🎯 실무 활용 패턴](#-실무-활용-패턴)

---

## 🏪 상태 관리 - Pinia

### 1.1 Pinia 개요

```typescript
// 📦 주요 라이브러리
"pinia": "^3.0.3",                    // Vue 3 상태 관리
"pinia-plugin-persistedstate": "^4.4.1"  // 상태 영속화
```

**Pinia**는 Vue 3를 위한 공식 상태 관리 라이브러리로, Vuex의 후속작입니다.

#### 🎯 Pinia의 주요 장점
- **타입스크립트 완벽 지원** - 타입 추론 자동화
- **DevTools 지원** - 개발자 도구 연동
- **모듈화** - 스토어별 독립적 관리
- **Composition API 스타일** - Vue 3와 일관된 문법

### 1.2 기본 스토어 생성

```typescript
// stores/userStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  // Getters
  const userName = computed(() => user.value?.name || '게스트')
  const userRole = computed(() => user.value?.role || 'user')

  // Actions
  const login = async (credentials: LoginData) => {
    try {
      const response = await authAPI.login(credentials)
      user.value = response.user
      isLoggedIn.value = true
    } catch (error) {
      console.error('로그인 실패:', error)
      throw error
    }
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
  }

  return {
    // State
    user: readonly(user),
    isLoggedIn: readonly(isLoggedIn),

    // Getters
    userName,
    userRole,

    // Actions
    login,
    logout
  }
})
```

### 1.3 영속화 설정 (persistedstate)

```typescript
// stores/settingsStore.ts
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('light')
  const language = ref('ko')
  const notifications = ref(true)

  return { theme, language, notifications }
}, {
  // 💾 상태 영속화 설정
  persist: {
    key: 'app-settings',
    storage: localStorage,
    // 특정 속성만 저장
    paths: ['theme', 'language']
  }
})
```

### 1.4 컴포넌트에서 사용

```vue
<template>
  <div>
    <h1>안녕하세요, {{ userName }}님!</h1>
    <ion-button @click="handleLogout" v-if="isLoggedIn">
      로그아웃
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// 구조분해할당으로 반응형 유지
const { userName, isLoggedIn } = storeToRefs(userStore)

const handleLogout = () => {
  userStore.logout()
}
</script>
```

---

## 📱 UI 프레임워크 - Ionic Vue

### 2.1 Ionic Vue 개요

```typescript
// 📦 Ionic 관련 라이브러리
"@ionic/vue": "^8.6.3",        // Ionic Vue 컴포넌트
"@ionic/vue-router": "^8.6.3"  // Ionic 라우터 통합
```

**Ionic Vue**는 모바일 중심의 UI 컴포넌트 라이브러리입니다.

### 2.2 핵심 컴포넌트 활용

#### 📄 페이지 레이아웃
```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>사용자 목록</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openModal">
            <ion-icon :icon="addOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- 페이지 내용 -->
      <ion-list>
        <ion-item v-for="user in users" :key="user.id">
          <ion-avatar slot="start">
            <img :src="user.avatar" />
          </ion-avatar>
          <ion-label>
            <h2>{{ user.name }}</h2>
            <p>{{ user.email }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
```

#### 🔄 상호작용 컴포넌트
```vue
<template>
  <!-- 액션시트 -->
  <ion-button @click="presentActionSheet">옵션 선택</ion-button>

  <!-- 토스트 알림 -->
  <ion-button @click="showToast">알림 표시</ion-button>

  <!-- 로딩 스피너 -->
  <ion-button @click="showLoading">로딩 표시</ion-button>
</template>

<script setup lang="ts">
import {
  actionSheetController,
  toastController,
  loadingController
} from '@ionic/vue'

const presentActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    header: '작업 선택',
    buttons: [
      {
        text: '편집',
        icon: 'create-outline',
        handler: () => console.log('편집 선택')
      },
      {
        text: '삭제',
        role: 'destructive',
        icon: 'trash-outline',
        handler: () => console.log('삭제 선택')
      },
      {
        text: '취소',
        role: 'cancel'
      }
    ]
  })
  await actionSheet.present()
}

const showToast = async () => {
  const toast = await toastController.create({
    message: '작업이 완료되었습니다!',
    duration: 2000,
    position: 'bottom'
  })
  await toast.present()
}

const showLoading = async () => {
  const loading = await loadingController.create({
    message: '로딩 중...',
    duration: 2000
  })
  await loading.present()
}
</script>
```

### 2.3 라우팅 통합

```typescript
// router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: () => import('@/views/TabsPage.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/ProfilePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

---

## 🔒 보안 & 유틸리티 라이브러리

### 3.1 암호화 - crypto-js

```typescript
// 📦 보안 관련 라이브러리
"crypto-js": "^4.2.0"  // 암호화/복호화
```

#### 🔐 데이터 암호화
```typescript
// utils/crypto.ts
import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.VITE_CRYPTO_SECRET || 'default-secret'

export const cryptoUtils = {
  // 데이터 암호화
  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
  },

  // 데이터 복호화
  decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  },

  // 해시 생성
  hash(data: string): string {
    return CryptoJS.SHA256(data).toString()
  },

  // 토큰 생성
  generateToken(): string {
    return CryptoJS.lib.WordArray.random(32).toString()
  }
}

// 실제 사용 예시
const sensitiveData = '사용자 민감 정보'
const encrypted = cryptoUtils.encrypt(sensitiveData)
const decrypted = cryptoUtils.decrypt(encrypted)
```

### 3.2 XSS 방지 - DOMPurify

```typescript
// 📦 XSS 방지
"dompurify": "^3.2.6"
```

```typescript
// utils/sanitizer.ts
import DOMPurify from 'dompurify'

export const sanitizer = {
  // HTML 정화
  sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target']
    })
  },

  // 사용자 입력 정화
  sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] })
  }
}

// Vue 컴포넌트에서 사용
const userContent = ref('')
const safeContent = computed(() =>
  sanitizer.sanitizeHtml(userContent.value)
)
```

### 3.3 날짜/시간 처리 - Luxon

```typescript
// 📦 날짜/시간 처리
"luxon": "^3.7.1"
```

```typescript
// utils/datetime.ts
import { DateTime } from 'luxon'

export const dateUtils = {
  // 현재 시간
  now(): DateTime {
    return DateTime.now()
  },

  // 포맷팅
  format(date: DateTime, format = 'yyyy-MM-dd HH:mm'): string {
    return date.toFormat(format)
  },

  // 상대적 시간
  relative(date: DateTime): string {
    return date.toRelative() || ''
  },

  // 날짜 계산
  addDays(date: DateTime, days: number): DateTime {
    return date.plus({ days })
  },

  // ISO 문자열에서 DateTime 생성
  fromISO(isoString: string): DateTime {
    return DateTime.fromISO(isoString)
  },

  // 타임존 변환
  toTimeZone(date: DateTime, zone: string): DateTime {
    return date.setZone(zone)
  }
}

// 실제 사용 예시
const now = dateUtils.now()
const formatted = dateUtils.format(now, 'yyyy년 MM월 dd일')
const tomorrow = dateUtils.addDays(now, 1)
```

### 3.4 Base64 인코딩 - url-safe-base64

```typescript
// 📦 Base64 인코딩
"url-safe-base64": "^1.3.0"
```

```typescript
// utils/encoding.ts
import base64 from 'url-safe-base64'

export const encodingUtils = {
  // 인코딩
  encode(data: string): string {
    return base64.encode(Buffer.from(data, 'utf-8'))
  },

  // 디코딩
  decode(encoded: string): string {
    return base64.decode(encoded).toString('utf-8')
  },

  // 파일 ID 생성 (URL Safe)
  generateFileId(filename: string): string {
    const timestamp = Date.now().toString()
    const combined = `${filename}_${timestamp}`
    return this.encode(combined)
  }
}
```

---

## 🌍 국제화 - Vue I18n

### 4.1 Vue I18n 설정

```typescript
// 📦 국제화
"vue-i18n": "^11.1.9",
"@intlify/unplugin-vue-i18n": "^6.0.8"
```

#### 🗣️ 다국어 설정
```typescript
// i18n/index.ts
import { createI18n } from 'vue-i18n'
import ko from './locales/ko.json'
import en from './locales/en.json'

const i18n = createI18n({
  locale: 'ko',
  fallbackLocale: 'en',
  messages: {
    ko,
    en
  }
})

export default i18n
```

#### 📝 언어 파일
```json
// i18n/locales/ko.json
{
  "common": {
    "save": "저장",
    "cancel": "취소",
    "delete": "삭제",
    "edit": "편집",
    "loading": "로딩 중..."
  },
  "user": {
    "profile": "프로필",
    "settings": "설정",
    "logout": "로그아웃"
  },
  "validation": {
    "required": "필수 입력 항목입니다",
    "email": "올바른 이메일 형식이 아닙니다",
    "minLength": "최소 {min}자 이상 입력해주세요"
  }
}
```

### 4.2 컴포넌트에서 사용

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('user.profile') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-label>{{ $t('common.loading') }}</ion-label>
      </ion-item>

      <!-- 매개변수 전달 -->
      <ion-note>
        {{ $t('validation.minLength', { min: 8 }) }}
      </ion-note>

      <!-- 언어 선택 -->
      <ion-select v-model="currentLocale" @selectionChange="changeLocale">
        <ion-select-option value="ko">한국어</ion-select-option>
        <ion-select-option value="en">English</ion-select-option>
      </ion-select>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const currentLocale = ref(locale.value)

const changeLocale = (event: any) => {
  locale.value = event.detail.value
  // 로컬스토리지에 저장
  localStorage.setItem('locale', locale.value)
}
</script>
```

---

## ⚡ 개발 효율성 도구

### 5.1 레거시 브라우저 지원

```typescript
// 📦 레거시 지원
"@vitejs/plugin-legacy": "^7.0.0",
"core-js": "^3.44.0",
"regenerator-runtime": "^0.14.1"
```

#### 🔧 Vite 설정
```typescript
// vite.config.ts
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ]
})
```

### 5.2 타입스크립트 설정

```typescript
// 📦 타입스크립트
"typescript": "~5.8.0",
"vue-tsc": "^2.2.10"
```

#### 📄 타입 정의 예시
```typescript
// types/api.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  createdAt: string
  lastLoginAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
```

---

## 🎯 실무 활용 패턴

### 6.1 통합 활용 예시

#### 📊 데이터 관리 패턴
```typescript
// composables/useUserManagement.ts
import { useUserStore } from '@/stores/userStore'
import { cryptoUtils } from '@/utils/crypto'
import { dateUtils } from '@/utils/datetime'
import { useI18n } from 'vue-i18n'

export function useUserManagement() {
  const userStore = useUserStore()
  const { t } = useI18n()

  const createUser = async (userData: CreateUserData) => {
    try {
      // 민감 정보 암호화
      const encryptedData = {
        ...userData,
        personalInfo: cryptoUtils.encrypt(
          JSON.stringify(userData.personalInfo)
        )
      }

      // API 호출
      const response = await userAPI.create(encryptedData)

      // 상태 업데이트
      userStore.addUser(response.data)

      // 성공 알림
      showToast(t('user.createSuccess'))

      return response.data
    } catch (error) {
      console.error('사용자 생성 실패:', error)
      throw error
    }
  }

  const formatUserDate = (dateString: string) => {
    return dateUtils.format(
      dateUtils.fromISO(dateString),
      'yyyy년 MM월 dd일'
    )
  }

  return {
    createUser,
    formatUserDate
  }
}
```

### 6.2 에러 처리 패턴

```typescript
// composables/useErrorHandler.ts
import { toastController } from '@ionic/vue'
import { useI18n } from 'vue-i18n'

export function useErrorHandler() {
  const { t } = useI18n()

  const handleApiError = async (error: any) => {
    let message = t('common.unknownError')

    if (error.response?.status === 401) {
      message = t('auth.unauthorized')
      // 로그아웃 처리
      const userStore = useUserStore()
      userStore.logout()
    } else if (error.response?.data?.message) {
      message = error.response.data.message
    }

    const toast = await toastController.create({
      message,
      duration: 3000,
      color: 'danger'
    })
    await toast.present()
  }

  return { handleApiError }
}
```

### 6.3 성능 최적화 패턴

```vue
<template>
  <ion-page>
    <!-- 가상 스크롤 적용 -->
    <ion-content>
      <ion-virtual-scroll
        :items="users"
        approxItemHeight="70px"
      >
        <template v-slot="{ item }">
          <UserCard :user="item" />
        </template>
      </ion-virtual-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// 지연 로딩
const UserCard = defineAsyncComponent(() =>
  import('@/components/UserCard.vue')
)

// 메모이제이션
const processedUsers = computed(() =>
  users.value.map(user => ({
    ...user,
    formattedDate: dateUtils.format(
      dateUtils.fromISO(user.createdAt)
    )
  }))
)
</script>
```
