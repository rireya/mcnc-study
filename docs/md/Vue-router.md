

# Vue Router

## 1. Vue Router란 무엇인가?

Vue Router는 Vue.js 애플리케이션을 위한 공식 라우터입니다. 이 라우터를 사용하면 페이지 간 탐색 및 URL 관리를 쉽게 할 수 있습니다.

## 2. Vue Router 설치

Vue Router를 설치하려면 다음 명령어를 사용합니다:

```bash
npm install vue-router@next
```

## 3. 기본 라우팅 사용 방법

### 3-1. 라우터 설정 파일 생성

먼저, 라우터 설정 파일을 생성합니다. `src/router/index.ts` 파일을 만듭니다.

```typescript
// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
```

### 3-2. 라우터 추가

이제 생성한 라우터를 Vue 애플리케이션에 추가합니다. `src/main.ts` 파일을 수정합니다.

```typescript
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router)
  .mount('#app');
```

### 3-3. 라우터 링크 추가

라우터 링크를 사용하여 페이지 간 이동을 구현합니다. `src/App.vue` 파일을 수정합니다.

```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <button @click="goToHome">Home</button>
      <button @click="goToAbout">About</button>
    </nav>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
    router.push({ name: 'Home' });
};

const goToAbout = () => {
    router.push({ name: 'About' });
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>
```

## 4. 라우터 모듈 관리

라우터를 모듈 단위로 관리하여 유지보수를 용이하게 할 수 있습니다.

### 4-1. 라우트 모듈 생성

각각의 라우트를 별도의 파일로 분리합니다. 예를 들어 `home.ts`와 `about.ts` 파일을 `src/router/modules` 폴더에 생성합니다.

```typescript
// src/router/modules/home.ts
import { RouteRecordRaw } from 'vue-router';

export default homeRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  }
];
```

```typescript
// src/router/modules/about.ts
import { RouteRecordRaw } from 'vue-router';

export default aboutRoutes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
];
```

### 4-2. 모듈 라우트를 메인 라우터에 통합

이제 `src/router/index.ts` 파일에서 모듈 라우트를 가져와서 통합합니다.

```typescript
// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import homeRoutes from './modules/home';
import aboutRoutes from './modules/about';

const routes: Array<RouteRecordRaw> = [
  ...homeRoutes,
  ...aboutRoutes,
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: () => import('@/views/UserDetails.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
```

## 5. 라우터 경로 이동 (프로그래밍 방식)

프로그래밍 방식으로 라우터 경로를 이동하려면 `useRouter` 훅을 사용합니다.

```vue
// src/views/Home.vue
<template>
  <div>
    <h1>Home</h1>
    <button @click="goToAbout">Go to About</button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goToAbout = () => {
  router.push({ name: 'About' });
};
</script>
```

## 6. 라우터 경로 이동시 데이터 전달

### 6-1. Query 사용

쿼리 매개변수를 사용하여 데이터를 전달할 수 있습니다.

**라우터 링크에서 쿼리 매개변수 사용**

```vue
<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Home</h1>
    <button @click="goToAboutWithQuery">Go to About with Query</button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goToAboutWithQuery = () => {
  router.push({ name: 'About', query: { ref: 'home' } });
};
</script>
```

**쿼리 매개변수 받기**

```vue
<!-- src/views/About.vue -->
<template>
  <div>
    <h1>About</h1>
    <p>Query Parameter: {{ ref }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const ref = route.query.ref;
</script>
```

### 6-2. Params 사용

URL 파라미터를 사용하여 데이터를 전달할 수 있습니다.

**라우터 설정**

```typescript
// src/router/index.ts
const routes: Array<RouteRecordRaw> = [
  // ...기존 라우트
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: () => import('@/views/UserDetails.vue')
  }
];
```

**라우터 링크에서 파라미터 사용**

```vue
<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Home</h1>
    <button @click="goToUserDetails">Go to User Details</button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goToUserDetails = () => {
  router.push({ name: 'UserDetails', params: { id: 123 } });
};
</script>
```

**파라미터 받기**

```vue
<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>User Details</h1>
    <p>User ID: {{ userId }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id;
</script>
```

## 7. 네비게이션 가드

Vue Router의 네비게이션 가드를 사용하여 라우트 이동 전후에 특정 로직을 실행할 수 있습니다.

### 7-1. beforeEach

라우트 이동 전 로직을 실행합니다.

```typescript
// src/router/index.ts
router.beforeEach((to, from) => {
  console.log('Before each route:', to.name);

  const isLogin: boolean = true;
  const isDisabled: boolean = false;

  // 인증 여부 확인 등의 로직 추가 가능
  if (isLogin) {
    // 계속 진행
    return true;
  if (isDisabled) {
    // 뒤로가기 진행 멈춤
    return false;
  } else {
    // 페이지 리다이렉션
    return {
      path: '/login',
      query: { redirect: to.fullPath }, // 이동할 위치
    };
  }
});
```

### 7-2. afterEach

라우트 이동 후 로직을 실행합니다.

```typescript
// src/router/index.ts
router.afterEach((to, from) => {
  console.log('After each route:', to.name);
  // 페이지 뷰 이벤트 트래킹 등의 로직 추가 가능
});
```
