
# Composable

Composable 함수는 Vue 3의 Composition API에서 재사용 가능한 기능을 제공하는 함수입니다. 이러한 함수는 Vue의 반응성을 활용하여 다양한 컴포넌트에서 공통 기능을 쉽게 공유할 수 있도록 합니다.

## 1. Composable 작성 예시

`useStore`라는 이름의 composable을 작성합니다. 이 함수는 Vuex store에 접근하고 상태 값을 쉽게 가져오고 업데이트할 수 있도록 합니다.

```typescript
// src/composables/useStore.ts

import { useStore as baseUseStore } from 'vuex';

export function useStore(module: string) {
  const store = baseUseStore();

  return {
    getters: (getter: string, payload?: any) => {
      return payload
        ? store.getters[`${module}/${getter}`](payload) // 함수형 getter 호출
        : store.getters[`${module}/${getter}`];
    },
    dispatch: (action: string, payload?: any) => {
      return store.dispatch(`${module}/${action}`, payload);
    },
  };
}
```

`useRouter`라는 이름의 composable을 작성합니다. 이 함수는 Vue Router의 네비게이션 기능을 제공합니다.

```typescript
// src/composables/useRouter.ts

import { useRouter as baseUseRouter } from 'vue-router';

export function useRouter() {
  const router = baseUseRouter();

  return {
    push: (path: string) => {
      router.push(path);
    },
    replace: (path: string) => {
      router.replace(path);
    },
    back: () => {
      router.back();
    },
  };
}
```

`composables` 폴더에 Composable을 접근 할 수 있도록 export를 작성합니다.

```typescript
// src/composables/index.ts

export { useStore } from './useStore';
export { useRouter } from './useRouter';
```

## 2. Composable 사용 예시

이제 이 composable을 컴포넌트에서 사용할 수 있습니다. 예를 들어, 상태 값을 표시하고 업데이트할 수 있는 컴포넌트를 작성합니다.

```html
<!-- src/components/StoreComponent.vue -->
<template>
  <div>
    <p>카운트 값: {{ counterCount }}</p>
    <button @click="incrementCounter">카운트 증가</button>
    <p>사용자 이름: {{ userName }}</p>
    <button @click="updateUserName">이름 업데이트</button>
    <p>화면 이동</p>
    <button @click="openPath">Open</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore, useRouter } from '@/composables';

  // Router Composable 선언
  const { push } = useRouter();

  // Store Composable 선언
  const counterStore = useStore('counter');
  const userStore = useStore('user');


  // Store 유틸 사용
  const counterCount = counterStore.getters('count');
  const userName = userStore.getters('name');

  const incrementCounter = () => {
    counterStore.dispatch('incrementAsync');
  };

  const updateUserName = () => {
    const name = prompt("새로운 사용자 이름을 입력하세요");

    if (name) {
      userStore.dispatch('setName', name);
    }
  };

  // Router 유틸 사용
  const openPath = () => {
    push({ name: 'main' })
  };
</script>
```
