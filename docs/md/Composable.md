
# Composable

Composable 함수는 Vue 3의 Composition API에서 재사용 가능한 기능을 제공하는 함수입니다. 이러한 함수는 Vue의 반응성을 활용하여 다양한 컴포넌트에서 공통 기능을 쉽게 공유할 수 있도록 합니다.

## 1. Store Service 작성

`StoreService`라는 이름의 클래스를 작성합니다. 이 함수는 Vue Store 기능을 제공합니다.

```typescript
// src/shared/services/StoreService.ts
import { DispatchOptions, useStore } from 'vuex';
import store from '@/store';

export default class StoreService {
    private namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace + '/';
    }

    /**
   * getters
   */
    public getters(type: string, param?: any): any {
        if (param !== undefined) {
            return store.getters[this.namespace + type](param);
        }
        else {
            const getter = store.getters[this.namespace + type];

            if (typeof getter === 'function') {
                return getter();
            }
            else {
                return store.getters[this.namespace + type];
            }
        }
    }

    /**
   * dispatch
   */
    public dispatch(type: string, payload?: any, options?: DispatchOptions | undefined): Promise<any> {
        return store.dispatch(this.namespace + type, payload, options);
    }
}
```

## 2. Navigate Composable 작성

`useRouter`라는 이름의 composable을 작성합니다. 이 함수는 Vue Router의 네비게이션 기능을 제공합니다.

```typescript
// src/shared/composables/useNavigate.ts
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIonRouter } from '@ionic/vue';
import { StoreService } from '@/shared';
import app from '@/store/modules/app';

/**
 * @title Navigate Composable
 * @description 화면 제어와 연관된 공통함수
 */
export function useNavigate() {
    const ionRouter = useIonRouter();
    const route = useRoute();
    const router = useRouter();

    function getLocation(name: string, params?: any) {
        const location: any = {};

        // name이 '/'로 시작하면 path로 인식
        if (name.indexOf('/') === 0) {
            location['path'] = name;
        }
        else {
            location['name'] = name;
        }

        if (params) {
            location['query'] = params;
        }

        return location;
    }

    return {
        // 실시간 hash를 반환하는 함수
        getHashComp: () => {
            return computed(() => route.hash);
        },

        // 실시간 props를 반환하는 함수
        getPropsComp: (def: Record<any, any>) => {
            return computed(() => ({ ...def, ...route.params, ...route.query }));
        },

        // 화면 오픈 (to는 path 또는 name)
        openPage: (to: string | Json, params?: Json, isAnimation = true): void => {
            const appStore = new StoreService('app');
            appStore.dispatch('setRouteNext', true);

            const location = (typeof  to === 'string') ? getLocation(to, params) : to;
            ionRouter.navigate(location, isAnimation ? 'forward' : 'none', 'push');
        },

        // 화면 교체 (to는 path 또는 name)
        replacePage: (to: string | Json, params?: Json, isAnimation = true): void => {
            const appStore = new StoreService('app');
            appStore.dispatch('setRouteNext', true);

            const location = (typeof  to === 'string') ? getLocation(to, params) : to;
            ionRouter.navigate(location, isAnimation ? 'forward' : 'none', 'replace');
        },

        // 화면 닫기
        back: (): void => {
            router.back();
        },
    };
}
```

Composable과 Service에 접근 할 수 있도록 export를 작성합니다.

```typescript
// src/shared/index.ts
import StoreService from './services/StoreService';
export { StoreService };

export { useNavigate } from './composables/useNavigate';
```

## 3. 사용 예시

```vue
<!-- src/components/StoreComponent.vue -->
<template>
  <div>
    <input v-model="id" placeholder="id" />
    <input v-model="pw" placeholder="pw" />
    <button @click="onLogin">Login</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { StoreService, useNavigate } from '@/shared';

const loginStore = new StoreService('login');
const { openPage } = useNavigate();

const id = ref<string>('tester1');
const pw = ref<string>('1111');

// 로그인 버튼 클릭
const onLogin = async (): Promise<boolean> => {
    const { header, body }: Json = await loginStore.dispatch('postLogin', {
        userId: id.value,
        password: pw.value,
    });

    if (isLogin(header)) {
        // 사용자 정보 저장 (후처리 과정에서 필요할 수 있기 때문에 미리 저장)
        loginStore.dispatch('setLoginToken', 'TEST_TOKEN_01');
        userStore.dispatch('setUser', body);

        // 화면 이동
        openPage('MAIN0100');
    }
};

// 정상 로그인 판단
const isLogin = (header: Json): boolean => {
    // 로그인 실패 코드
    if (header.error_code === 'DM000100501') {
        alert(header.error_text);
        return false;
    }
    else {
        return true;
    }
};
</script>
```
