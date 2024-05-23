
# Vuex

## 1. Vuex란 무엇인가?

Vuex는 Vue.js 애플리케이션에 대한 상태 관리를 위한 패턴이자 라이브러리입니다. 중앙 집중식 저장소를 사용하여 모든 컴포넌트의 상태를 관리할 수 있습니다. 이는 복잡한 애플리케이션에서 상태 관리를 단순화하고, 상태를 예측 가능하게 만들며, 디버깅과 테스트를 용이하게 합니다.

## 2. Vuex 설치

Vuex를 설치하려면 다음 명령어를 사용합니다:

```bash
npm install vuex@next --save
```

## 3. Vuex 스토어 설정

Vue 3와 TypeScript, Composition API를 사용하여 Vuex 스토어를 설정하는 방법을 설명합니다. 여기서는 Vuex를 모듈 단위로 사용하는 방법을 가정합니다.

### 3-1. 모듈 생성

`store/modules/counter.ts` 파일을 생성하고 다음 코드를 추가합니다.

```typescript
// store/modules/counter.ts
import { Module, ActionContext } from 'vuex';
import { State } from '../index';

// Counter 모듈의 상태 타입 정의
export interface CounterState {
  count: number;
}

// Counter 모듈 생성
const counter: Module<CounterState, State> = {
  state: {
    count: 0,
  },
  getters: {
    doubleCount(state: CounterState): number {
      return state.count * 2;
    },
    count(state: CounterState): number {
      return state.count;
    },
    countPlus: (state: CounterState) => (add: number): number => {
      return state.count + add;
    },
  },
  mutations: {
    increment(state: CounterState): void {
      state.count++;
    },
    decrement(state: CounterState): void {
      state.count--;
    },
  },
  actions: {
    incrementAsync({ commit }: ActionContext<CounterState, State>): void {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
    async decrementAsync({ commit }: ActionContext<CounterState, State>): Promise<void> {
      await new Promise(resolve => setTimeout(resolve, 1000));
      commit('decrement');
    },
  },
};

export default counter;
```

또 다른 모듈을 생성해봅시다. `store/modules/user.ts` 파일을 생성하고 다음 코드를 추가합니다.

```typescript
// store/modules/user.ts
import { Module, ActionContext } from 'vuex';
import { State } from '../index';

// User 모듈의 상태 타입 정의
export interface UserState {
  name: string;
}

// User 모듈 생성
const user: Module<UserState, State> = {
  state: {
    name: '',
  },
  getters: {
    upperCaseName(state: UserState): string {
      return state.name.toUpperCase();
    },
  },
  mutations: {
    updateState(state: UserState, payload: { key: keyof UserState; value: any }): void {
      state[payload.key] = payload.value;
    },
  },
  actions: {
    setName({ commit }: ActionContext<UserState, State>, newName: string): void {
      commit('updateState', { key: 'name', value: newName });
    },
  },
};

export default user;
```

### 3-2. 스토어 생성

`store/index.ts` 파일을 생성하고 다음 코드를 추가합니다.

```typescript
// store/index.ts
import { createStore } from 'vuex';
import counter, { CounterState } from './modules/counter';
import user, { UserState } from './modules/user';

// 루트 상태 타입 정의
export interface State {
  counter: CounterState;
  user: UserState;
}

// 스토어 생성
const store = createStore<State>({
  modules: {
    counter,
    user,
  },
});

export default store;
```

### 3-3. 스토어를 애플리케이션에 추가

`main.ts` 파일에서 Vue 애플리케이션에 스토어를 추가합니다.

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const app = createApp(App);

app.use(store);
app.mount('#app');
```

## 4. Vuex 사용 예제

### 4-1. 뮤테이션 (Mutation)

뮤테이션은 상태를 변경하는 동기적 메서드입니다.

```typescript
// store/modules/counter.ts
mutations: {
  increment(state: CounterState): void {
    state.count++;
  },
  decrement(state: CounterState): void {
    state.count--;
  },
},
```

### 4-2. 액션 (Action)

액션은 비동기 작업을 포함할 수 있으며, 뮤테이션을 커밋할 수 있습니다.

```typescript
// store/modules/counter.ts
actions: {
  incrementAsync({ commit }: ActionContext<CounterState, State>): void {
    setTimeout(() => {
      commit('increment');
    }, 1000);
  },
  async decrementAsync({ commit }: ActionContext<CounterState, State>): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    commit('decrement');
  },
},
```

### 4-3. 게터 (Getter)

게터는 상태를 기반으로 계산된 값을 반환합니다.

```typescript
// store/modules/counter.ts
getters: {
  doubleCount(state: CounterState): number {
    return state.count * 2;
  },
  count(state: CounterState): number {
    return state.count;
  },
  countPlus: (state: CounterState) => (add: number): number => {
    return state.count + add;
  },
},
```

### 4-4. 컴포넌트에서 액션과 게터 사용하기

```vue
<!-- components/CounterWithActions.vue -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <p>Count Plus 5: {{ countPlus5 }}</p>
    <button @click="incrementAsync">Increment Async</button>
    <button @click="decrementAsync">Decrement Async</button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

// 스토어 접근
const store = useStore();

// count와 doubleCount를 게터를 통해 계산
const count = computed(() => store.getters['counter/count']);
const doubleCount = computed(() => store.getters['counter/doubleCount']);
const countPlus5 = computed(() => store.getters['counter/countPlus'](5));

// incrementAsync 액션 호출
const incrementAsync = () => {
  store.dispatch('counter/incrementAsync');
};

// decrementAsync 액션 호출
const decrementAsync = () => {
  store.dispatch('counter/decrementAsync');
};
</script>
```

## 5. vuex-persistedstate 사용하기

`vuex-persistedstate` 라이브러리는 Vuex 상태를 브라우저의 로컬 스토리지(localStorage) 또는 세션 스토리지(sessionStorage)에 자동으로 저장하고, 애플리케이션이 다시 로드될 때 복원합니다.

### 5-1. vuex-persistedstate 설치

다음 명령어를 사용하여 `vuex-persistedstate`를 설치합니다:

```bash
npm install vuex-persistedstate --save
```

### 5-2. vuex-persistedstate 사용 설정

각 모듈의 상태를 각각 `sessionStorage`와 `localStorage`에 저장하도록 설정합니다.

```typescript
// store/index.ts
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import counter, { CounterState } from './modules/counter';
import user, { UserState } from './modules/user';

// 루트 상태 타입 정의
export interface State {
  counter: CounterState;
  user: UserState;
}

// 스토어 생성
const store = createStore<State>({
  modules: {
    counter,
    user,
  },
  plugins: [
    createPersistedState({
      key: 'store-local',
      paths: ['counter'],
      storage: window.localStorage,
    }),
    createPersistedState({
      key: 'store-session',
      paths: ['user'],
      storage: window.sessionStorage,
    }),
  ],
});

export default store;
```

이제 `counter` 모듈의 상태는 `localStorage`에, `user` 모듈의 상태는 `sessionStorage`에 저장되며, 애플리케이션이 다시 로드될 때 상태가 복원됩니다.
