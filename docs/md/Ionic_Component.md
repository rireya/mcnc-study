# Ionic 컴포넌트

## 주요 컴포넌트

### [**header, content, footer**](https://ionicframework.com/docs/api/header)

**설명**

- `ion-header`는 페이지의 상단에 고정된 영역으로, 보통 제목이나 주요 내비게이션 요소를 포함합니다.
- `ion-content`는 화면의 주된 스크롤 가능한 영역을 정의합니다. 보통 페이지의 주요 내용을 감싸는 데 사용됩니다.
- `ion-footer`는 페이지의 하단에 고정된 영역으로, 보통 보조 내비게이션이나 기타 정보를 포함합니다.

**예제**

```vue
<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Header Title</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <p>Page content goes here.</p>
  </IonContent>
  <IonFooter>
    <IonToolbar>
      <IonTitle>Footer Content</IonTitle>
    </IonToolbar>
  </IonFooter>
</template>

<script lang="ts" setup>
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter } from '@ionic/vue';
// Ionic 컴포넌트 가져오기
</script>
```

---

### [**router-outlet**](https://ionicframework.com/docs/api/router-outlet)

**설명**

`ion-router-outlet`은 라우팅을 통해 페이지 간의 내비게이션을 관리하는 데 사용됩니다. Vue Router와 함께 사용하여 페이지 전환을 처리합니다. 또한 Ionic 라이프 사이클 이벤트를 통해 페이지 상태를 관리할 수 있습니다.

#### 동작 원리

- 신규 페이지 오픈시 페이지 스택이 누적됨
- 이미 열었던 페이지를 다시 열 경우 아래에 있던 페이지가 다시 올라오는 형식
- 링크가 다를 경우 동일한 페이지여도 스택을 신규로 생성할 수 있음 (예시. /board/:seq)
- **다시 화면이 오픈되는 경우 onMounted는 발생 없이 ionic 라이플 사이클만 발생**

#### 주요 라이프 사이클 이벤트

- `onIonViewWillEnter`: 페이지 Open 직전에 호출됩니다. (화면을 back 해서 진입해도 호출됨)
- `onIonViewDidEnter`: 페이지 Open 후에 호출됩니다. (화면을 back 해서 진입해도 호출됨)
- `onIonViewWillLeave`: 페이지 Back 직전에 호출됩니다.
- `onIonViewDidLeave`: 페이지 Back 후에 호출됩니다.

```ts
import { onIonViewDidEnter } from '@ionic/vue';

onIonViewDidEnter(() => {
    console.log('onIonViewDidEnter');
});
```

**예제**

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../pages/Home.vue';
import AboutPage from '../pages/About.vue';

// 라우트 설정
const routes = [
  { path: '/home', component: HomePage },
  { path: '/about', component: AboutPage },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

```vue
<!-- App.vue -->
<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
// Ionic App 및 RouterOutlet 컴포넌트 가져오기
</script>
```

```vue
<!-- HomePage.vue -->
<template>
  <IonPage>
    <IonContent>
      <IonButton @click="goToAbout">Go to About</IonButton>
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton } from '@ionic/vue';

// 라우터 훅 가져오기
const router = useRouter();

// "About" 페이지로 이동하는 함수
const goToAbout = () => {
  router.push('/about');
};
</script>
```

---

### [**modal**](https://ionicframework.com/docs/api/modal)

**설명**

`ion-modal`는 사용자가 특정 작업을 완료하도록 하는 데 사용되는 오버레이 창입니다.

- modal은 기존 bizMOB에서 popup에 해당
- 페이지가 아닌 컴포넌트로 분류됨 => modal에 데이터 전달시 defineProps 활용
- modal이 열려있는 경우 뒤로가기 버튼 클릭시 modal을 닫는 기능을 라우터에 추가 필요

**예제**

```vue
<!-- ParentComponent.vue -->
<template>
  <IonButton @click="presentModal">Open Modal</IonButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonButton, modalController } from '@ionic/vue';
import ChildComponent from './ChildComponent.vue';

// 모달을 표시하는 함수
const presentModal = async () => {
  const modal = await modalController.create({
    component: ChildComponent,
    cssClass: 'my-custom-class'
  });
  await modal.present();
};
</script>
```

```vue
<!-- ChildComponent.vue -->
<template>
  <IonContent>
    <h1>Modal Content</h1>
    <IonButton @click="dismiss">Close</IonButton>
  </IonContent>
</template>

<script lang="ts" setup>
import { modalController } from '@ionic/vue';
import { IonContent, IonButton } from '@ionic/vue';

// 모달을 닫는 함수
const dismiss = async () => {
  await modalController.dismiss();
};
</script>
```

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { modalController } from '@ionic/vue';

const routes = [
  // 라우트 구성 정의
];

const router = createVuer(createWebHistory(), routes);

router.beforeEach(async (to, from) => {
  const modal = await modalController.getTop(); // 현재 최상위 모달 가져오기
  if (modal) {
    await modal.dismiss(null, 'cancel'); // 모달이 있으면 닫기

    // next(false);
    return false; // 현재의 라우팅을 취소
  } else {
    return true; // 모달이 없으면 라우팅 진행
  }
});

export default router;
```

---

### [**menu**](https://ionicframework.com/docs/api/menu)

**설명**

`ion-menu`는 사이드바 내비게이션을 제공하는 컴포넌트로, 주요 내비게이션 링크를 담는 데 사용됩니다.

**예제**

```vue
<!-- @/components/AppMenu.vue -->
<template>
    <!-- side: start = 왼쪽, end = 오른쪽 -->
    <ion-menu
        side="end"
        menu-id="side-menu"
        content-id="ion-router-outlet"
        :max-edge-start="0"
        @ion-will-close="appStore.dispatch('setMenuState', false)"
        @ion-will-open="appStore.dispatch('setMenuState', true)"
    >
        <slot></slot>
    </ion-menu>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { IonMenu, menuController } from '@ionic/vue';
import { StoreService } from '@/shared';

const appStore = new StoreService('app');

watch(
    () => appStore.getters('isShowMenu'),
    async(value) => {
        if (value) {
            await menuController.open('side-menu');
        } else {
            await menuController.close();
        }
    }
);
</script>
```

```vue
<!-- @/views/MENU/MENU0100.vue -->
<template>
    <ion-page>
        <ion-content>
            <div class="menu-content">
                <ul class="menu-list_1">
                    <!-- 1depth -->
                    <li class="menu-item">
                        <p class="menu-name">Sample</p>
                        <ul class="menu-list_2">
                            <!-- 2depth -->
                            <li class="menu-item">
                                <div class="menu-title">
                                    <button type="button" class="menu-link" @click="onClickMenu('MAIN0100')">
                                        <span class="menu-name">메인</span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useNavigate } from '@/shared';

const { openPage, closeMenu } = useNavigate();

const onClickMenu = (menu: string) => {
    closeMenu();
    openPage(menu);
};
</script>
```

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { menuController } from '@ionic/vue';

const routes = [
  // 라우트 구성 정의
];

const router = createRouter(createWebHistory(), routes);

router.beforeEach(async (to, from, next) => {
  const isOpen = await menuController.isOpen(); // 현재 메뉴의 열림 상태 확인
  if (isOpen) {
    await menuController.close(); // 메뉴가 열려 있으면 닫기
    return false; // 현재의 라우팅을 취소
  } else {
    return true; // 메뉴가 닫혀 있으면 라우팅 진행
  }
});

export default router;
```

```vue
<!-- App.vue -->
<template>
    <ion-app>
        <!-- 메뉴 Component -->
        <AppMenu>
            <!-- 메뉴 화면 -->
            <MENU0100 />
        </AppMenu>

        <!-- Ion Router -->
        <ion-router-outlet id="ion-router-outlet" />
    </ion-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import AppMenu from '@/components/AppMenu.vue';
import MENU0100 from '@/views/MENU/MENU0100.vue';
</script>
```

---

### [**loading**](https://ionicframework.com/docs/api/loading)

**설명**

- `ion-loading`은 작업이 진행 중임을 시각적으로 표시하는 데 사용됩니다.
- `ion-spinner`는 다양한 스타일의 스피너를 제공하여 로딩 상태를 표시할 수 있습니다.

**예제**

```typescript
// @/store/modules/app.ts
export default {
    namespaced: true,
    state: {
        loadingHandler: [], // 로딩 핸들러
        isShowLoading: false, // 프로그레스 표시 여부
    },
    getters: {
        loadingHandler: (state: any) => {
            return state.loadingHandler;
        },
        isShowLoading: (state: any) => {
            return state.isShowLoading;
        },
    },
    mutations: {
        setState(state: any, { key, value }: any) {
            state[key] = value;
        },
        pushLoadingHandler(state: any) {
            state.loadingHandler.push(true);
        },
        popLoadingHandler(state: any) {
            state.loadingHandler.pop();
        },
    },
    actions: {
        // 프로그레스 표시 여부 설정
        setLoadingState({ commit }: any, is: boolean) {
            commit('setState', { key: 'isShowLoading', value: is });
        },
        // 프로그레스 Show
        showLoading({ commit, getters }: any) {
            if (getters.loadingHandler.length === 0) {
                commit('pushLoadingHandler');
                commit('setState', { key: 'isShowLoading', value: true });
            }
            else {
                commit('pushLoadingHandler');
            }
        },
        // 프로그레스 Hide
        hideLoading({ commit, getters }: any) {
            setTimeout(async() => {
                commit('popLoadingHandler');

                if (getters.loadingHandler.length === 0) {
                    commit('setState', { key: 'isShowLoading', value: false });
                }
            }, 100);
        },
    },
};
```

```vue
<!-- @/components/AppLoading.vue -->
<template>
    <ion-loading
        spinner="dots"
        :is-open="isShowLoading"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonLoading } from '@ionic/vue';
import { StoreService } from '@/shared';

const appStore = new StoreService('app');

const isShowLoading = computed<boolean>(() => appStore.getters('isShowLoading'));
</script>

<style lang="scss">
ion-loading {
    --background: transparent !important;
    --spinner-color: #062f87 !important;

    .loading-wrapper {
    box-shadow: none !important;
    }

    ion-backdrop {
    background: rgba(255, 255, 255, 0.7) !important;
    }

    ion-spinner {
    width: 50px;
    height: 50px;
    }
}
</style>
```

```vue
<!-- App.vue -->
<template>
    <ion-app>
        <!-- Loading Progress Component -->
        <AppLoading />

        <!-- Ion Router -->
        <ion-router-outlet id="ion-router-outlet" />
    </ion-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import AppLoading from '@/components/AppLoading.vue';
</script>
```

```typescript
// @/shared/composables/useNetwork.ts
import { StoreService } from '@/shared';

const onApi = async () => {
  const appStore = new StoreService('app');

  appStore.dispatch('showLoading');

  // ... Async API

  appStore.dispatch('hideLoading');

  return response;
};
```

---

### [**alert**](https://ionicframework.com/docs/api/alert)

**설명**

`ion-alert`는 사용자에게 중요한 메시지를 보여주는 팝업 창입니다. 주로 경고, 정보, 확인 등의 목적으로 사용됩니다.

**예제**

```vue
<template>
  <IonButton @click="showAlert">Show Alert</IonButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonButton, alertController } from '@ionic/vue';

// 알림을 표시하는 함수
const showAlert = async () => {
  const alert = await alertController.create({
    header: 'Alert',
    subHeader: 'Important message',
    message: 'This is an alert message.',
    buttons: ['OK'],
  });
  await alert.present();
};
</script>
```

```typescript
import { createRouter, createWebHistory } from 'vue-router';
import { alertController } from '@ionic/vue';

const routes = [
  // 라우트 구성 정의
];

const router = createRouter(createWebHistory(), routes);

router.beforeEach(async (to, from, next) => {
  const alert = await alertController.getTop(); // 현재 최상위 경고 가져오기
  if (alert) {
    await alert.dismiss(); // 경고가 있으면 닫기
    return false; // 현재의 라우팅을 취소
  } else {
    return true; // 경고가 없으면 라우팅 진행
  }
});

export default router;
```

---

### [**toast**](https://ionicframework.com/docs/api/toast)

**설명**

`ion-toast`는 짧은 메시지를 화면 하단에 잠깐 동안 표시합니다.

**예제**

```vue
<template>
  <IonButton @click="showToast">Show Toast</IonButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonButton, toastController } from '@ionic/vue';

// 토스트 메시지를 표시하는 함수
const showToast = async () => {
  const toast = await toastController.create({
    message: 'This is a toast message.',
    duration: 2000
  });
  await toast.present();
};
</script>
```

---

### [**infinite-scroll**](https://ionicframework.com/docs/api/infinite-scroll)

**설명**

`ion-infinite-scroll`는 스크롤을 내릴 때 추가 데이터를 로드하는 기능을 제공합니다. 주로 목록이나 피드와 같은 긴 콘텐츠를 표시할 때 사용됩니다.

**예제**

```vue
<template>
  <IonContent>
    <IonList>
      <IonItem v-for="item in items" :key="item">{{ item }}</IonItem>
    </IonList>
    <IonInfiniteScroll @ionInfinite="loadMoreData">
      <IonInfiniteScrollContent></IonInfiniteScrollContent>
    </IonInfiniteScroll>
  </IonContent>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonContent, IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';

// 초기 항목 목록
const items = ref<string[]>(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

// 더 많은 데이터를 로드하는 함수
const loadMoreData = (event: CustomEvent) => {
  setTimeout(() => {
    const newItems = Array.from({ length: 20 }, (_, i) => `Item ${items.value.length + i + 1}`);
    items.value.push(...newItems);
    (event.target as HTMLIonInfiniteScrollElement).complete();
  }, 500);
};
</script>
```

---

## 그 외 컴포넌트

### [**accordion**](https://ionicframework.com/docs/api/accordion)

**설명**

`ion-accordion`는 여러 패널을 포함하는 컴포넌트로, 각 패널은 클릭 시 확장되거나 축소됩니다.

**예제**

```vue
<template>
  <IonAccordionGroup>
    <IonAccordion value="first">
      <IonItem slot="header">
        <IonLabel>First Accordion</IonLabel>
      </IonItem>
      <div slot="content">
        This is the content of the first accordion.
      </div>
    </IonAccordion>
  </IonAccordionGroup>
</template>

<script lang="ts" setup>
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/vue';
// Ionic 컴포넌트 가져오기
</script>
```

---

### [**fab (Floating Action Button)**](https://ionicframework.com/docs/api/fab)

**설명**

`ion-fab`는 화면에 떠 있는 버튼으로, 주로 중요한 액션을 강조하기 위해 사용됩니다.

**예제**

```vue
<template>
  <IonContent>
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton>
        <IonIcon :icon="add" />
      </IonFabButton>
    </IonFab>
  </IonContent>
</template>

<script lang="ts" setup>
import { IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
// Ionic 컴포넌트 및 아이콘 가져오기
</script>
```

---

### [**refresher**](https://ionicframework.com/docs/api/refresher)

**설명**

`ion-refresher`는 사용자가 스크롤을 당겨서 콘텐츠를 새로 고치는 기능을 제공합니다.

**예제**

```vue
<template>
  <IonContent>
    <IonRefresher slot="fixed" @ionRefresh="doRefresh">
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
    <IonList>
      <IonItem v-for="item in items" :key="item">{{ item }}</IonItem>
    </IonList>
  </IonContent>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonContent, IonRefresher, IonRefresherContent, IonList, IonItem } from '@ionic/vue';

// 초기 항목 목록
const items = ref<string[]>(['Item 1', 'Item 2', 'Item 3']);

// 목록을 새로 고치는 함수
const doRefresh = (event: CustomEvent) => {
  setTimeout(() => {
    items.value = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    (event.target as HTMLIonRefresherElement).complete();
  }, 2000);
};
</script>
```

---

### [**reorder**](https://ionicframework.com/docs/api/reorder)

**설명**

`ion-reorder`는 목록 아이템의 순서를 드래그 앤 드롭으로 변경할 수 있는 기능을 제공합니다.

**예제**

```vue
<template>
  <IonContent>
    <IonList>
      <IonReorderGroup :disabled="false" @ionItemReorder="doReorder">
        <IonItem v-for="item in items" :key="item">
          <IonLabel>{{ item }}</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>
      </IonReorderGroup>
    </IonList>
  </IonContent>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonContent, IonList, IonItem, IonLabel, IonReorder, IonReorderGroup } from '@ionic/vue';

// 초기 항목 목록
const items = ref<string[]>(['Item 1', 'Item 2', 'Item 3']);

// 항목 순서를 변경하는 함수
const doReorder = (event: CustomEvent) => {
  const movedItem = items.value.splice(event.detail.from, 1)[0];
  items.value.splice(event.detail.to, 0, movedItem);
  event.detail.complete();
};
</script>
```

---

### [**datetime**](https://ionicframework.com/docs/api/datetime)

**설명**

`ion-datetime`은 날짜와 시간을 선택할 수 있는 입력 필드를 제공합니다.

**예제**

```vue
<template>
  <IonContent>
    <IonItem>
      <IonLabel>Date</IonLabel>
      <IonDatetime display-format="MM/DD/YYYY" picker-format="MM/DD/YYYY" v-model="selectedDate"></IonDatetime>
    </IonItem>
  </IonContent>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonContent, IonItem, IonLabel, IonDatetime } from '@ionic/vue';

// 선택된 날짜
const selectedDate = ref(new Date().toISOString());
</script>
```
