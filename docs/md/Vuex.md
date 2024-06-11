
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

```typescript
// store/modules/login.ts
import { useNetwork } from '@/shared';

export default {
  namespaced: true,

  // state: 애플리케이션의 중앙 저장소로, 애플리케이션의 모든 컴포넌트가 공유하는 데이터의 상태를 보관
  state: {
    loginToken: '', // 자동 로그인 관련 토큰
  },

  // getters: State의 데이터를 계산하거나 파생하여 컴포넌트에서 쉽게 접근할 수 있게 도와주는 속성
  getters: {
    // 로그인 토큰
    loginToken: (state: any) => {
      return state.loginToken;
    },
  },

  // mutations: State를 동기적으로 수정하기 위한 메소드들로, 실제 상태를 변화
  mutations: {
    setState(state: any, { key, value }: any) {
      state[key] = value;
    }
  },

  // actions: 비동기 작업을 처리하거나 여러 Mutations을 조합하여 사용할 수 있으며, 결과적으로 Mutations를 커밋(commit)하여 상태를 변경
  actions: {
    // 로그인 요청
    async postLogin({ commit }: any, payload: {
      userId: string, // 사용자 아이디
      password: string, // 사용자 패스워드
    }) {
      const { requestLogin } = useNetwork();
      const { result, header, body }: Res = await requestLogin({
        isMock: true,
        trcode: 'DM0001',
        userId: payload.userId,
        password: payload.password,
        body: {
          userId: payload.userId,
          passwd: payload.password,
        }
      });

      return result ? { header, body } : null;
    },
    // 로그인 토큰 저장
    setLoginToken({ commit }: any, loginToken: string) {
      commit('setState', { key: 'loginToken', value: loginToken });
    },
  },
};
```

```typescript
// store/modules/user.ts
export default {
  namespaced: true,

  state: {
    user: null, // 사용자 정보
  },

  getters: {
    // 사용자 ID
    userId: (state: any) => {
      return state.user.userId;
    },
    // 사용자 이름
    userName: (state: any) => {
      return state.user.userName;
    },
    // 사용자 정보 반환
    user: (state: any) => {
      return state.user;
    },
    // 고유 값으로 본인 여부 확인
    isSelf: (state: any) => (seq: string) => {
      return state.user.userSeq === seq;
    },
  },

  mutations: {
    setState(state: any, { key, value }: any) {
      state[key] = value;
    }
  },

  actions: {
    // 유저 정보 저장
    setUser({ commit }: any, user: Json) {
      commit('setState', { key: 'user', value: user });
    },
  },
};
```

### 3-2. 스토어 생성

`store/index.ts` 파일을 생성하고 다음 코드를 추가합니다.

```typescript
// store/index.ts
import { createStore, createLogger } from 'vuex';

import login from './modules/login';
import user from './modules/user';

// 스토어 생성
export default createStore({
  modules: {
    login,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    ...(
      process.env.NODE_ENV !== 'production'
        ? [ createLogger() ]
        : []
    ),
  ]
});
```

### 3-3. 스토어를 애플리케이션에 추가

`main.ts` 파일에서 Vue 애플리케이션에 스토어를 추가합니다.

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store';

const app = createApp(App);

app.use(store);
app.mount('#app');
```

### 3-4. 스토어 사용

```typescript
// login.vue
import { computed } from 'vue';
import { useStore } from 'vuex';

// 스토어 접근
const store = useStore();

// count와 doubleCount를 게터를 통해 계산
const userName = computed(() => store.getters['user/userName']);
const isSelf = computed(() => store.getters['user/isSelf']('mcnc'));

// incrementAsync 액션 호출
const setUser = () => {
  store.dispatch('user/setUser', { userName: 'mcnc', seq: 'mcnc' });
};
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

### 4-4. 컴포넌트에서 액션과 게터

```html
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
