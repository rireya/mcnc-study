# Ionic 컴포넌트

## 주요 컴포넌트

### [**router-outlet**](https://ionicframework.com/docs/api/router-outlet)

**설명**

`ion-router-outlet`은 라우팅을 통해 페이지 간의 내비게이션을 관리하는 데 사용됩니다. Vue Router와 함께 사용하여 페이지 전환을 처리합니다. 또한 Ionic 라이프 사이클 이벤트를 통해 페이지 상태를 관리할 수 있습니다.

#### 주요 라이프 사이클 이벤트

- `ionViewWillEnter`: 페이지가 활성화되기 직전에 호출됩니다.
- `ionViewDidEnter`: 페이지가 활성화된 후에 호출됩니다.
- `ionViewWillLeave`: 페이지가 비활성화되기 직전에 호출됩니다.
- `ionViewDidLeave`: 페이지가 비활성화된 후에 호출됩니다.

**예제**

- **src/router/index.ts**

```typescript
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

- **App.vue**

```html
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

- **HomePage.vue**

```html
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

**예제**

- **ParentComponent.vue**

```html
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

- **ChildComponent.vue**

```html
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

---

### [**menu**](https://ionicframework.com/docs/api/menu)

**설명**

`ion-menu`는 사이드바 내비게이션을 제공하는 컴포넌트로, 주요 내비게이션 링크를 담는 데 사용됩니다.

**예제**

```html
<template>
  <IonMenu side="start" content-id="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonMenuToggle auto-hide="false">
          <IonItem router-link="/home">Home</IonItem>
          <IonItem router-link="/about">About</IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
  <IonRouterOutlet id="main-content"></IonRouterOutlet>
</template>

<script lang="ts" setup>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonRouterOutlet } from '@ionic/vue';
// Ionic 컴포넌트 가져오기
</script>
```

---

### [**header, content, footer**](https://ionicframework.com/docs/api/header)

**설명**

- `ion-header`는 페이지의 상단에 고정된 영역으로, 보통 제목이나 주요 내비게이션 요소를 포함합니다.
- `ion-content`는 화면의 주된 스크롤 가능한 영역을 정의합니다. 보통 페이지의 주요 내용을 감싸는 데 사용됩니다.
- `ion-footer`는 페이지의 하단에 고정된 영역으로, 보통 보조 내비게이션이나 기타 정보를 포함합니다.

**예제**

```html
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

### [**alert**](https://ionicframework.com/docs/api/alert)

**설명**

`ion-alert`는 사용자에게 중요한 메시지를 보여주는 팝업 창입니다. 주로 경고, 정보, 확인 등의 목적으로 사용됩니다.

**예제**

```html
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

---

### [**toast**](https://ionicframework.com/docs/api/toast)

**설명**

`ion-toast`는 짧은 메시지를 화면 하단에 잠깐 동안 표시합니다.

**예제**

```html
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

```html
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

### [**loading**](https://ionicframework.com/docs/api/loading)

**설명**

- `ion-loading`은 작업이 진행 중임을 시각적으로 표시하는 데 사용됩니다.
- `ion-spinner`는 다양한 스타일의 스피너를 제공하여 로딩 상태를 표시할 수 있습니다.

**예제**

```html
<template>
  <IonButton @click="presentLoading">Show Loading</IonButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonButton, loadingController } from '@ionic/vue';

// 로딩 인디케이터를 표시하는 함수
const presentLoading = async () => {
  const loading = await loadingController

.create({
    message: 'Please wait...',
    duration: 2000,
    spinner: 'crescent'
  });
  await loading.present();
};
</script>
```

## 그 외 컴포넌트

---

### [**accordion**](https://ionicframework.com/docs/api/accordion)

**설명**

`ion-accordion`는 여러 패널을 포함하는 컴포넌트로, 각 패널은 클릭 시 확장되거나 축소됩니다.

**예제**

```html
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

```html
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

```html
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

```html
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

```html
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
