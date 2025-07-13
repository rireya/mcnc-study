# 📱 Ionic 컴포넌트 활용 가이드

## 🎯 목적

**Ionic 컴포넌트**를 활용한 **모바일 친화적 웹 UI 개발**의 전체 과정을 학습하고, **SI 프로젝트에서 실무 적용 가능한 역량**을 갖추는 것을 목표로 합니다.

---

## 📋 학습 개요

### 교육 대상
- **Vue.js 기초 지식**이 있는 개발자
- **모바일 웹 UI**에 관심이 있는 웹 개발자
- **SI 프로젝트**에서 Ionic 컴포넌트 도입을 고려하는 개발자

### 핵심 원칙
> **"기존 웹 프로젝트에 모바일 네이티브 UX 적용"**  
> **"Ionic 컴포넌트로 일관된 모바일 디자인 구현"**  
> **"실무에서 바로 적용 가능한 컴포넌트 중심 학습"**

### ⚠️ 교육 범위
```text
✅ 포함 내용:
- Ionic 컴포넌트 라이브러리 활용
- 기존 Vue 프로젝트에 Ionic 통합
- 모바일 친화적 UI/UX 구현
- 기본 테마 활용 및 퍼블리셔 협업

❌ 제외 내용:
- 네이티브 앱 빌드 및 배포
- Ionic CLI 프로젝트 생성
- 앱스토어 배포 과정
- Capacitor 플러그인 개발
```

---

## 🚀 Ionic 컴포넌트 소개

### 💡 Ionic 컴포넌트란?

**Ionic 컴포넌트**는 **모바일 네이티브 앱의 UI/UX**를 웹에서 구현할 수 있는 **Vue.js 호환 컴포넌트 라이브러리**입니다.

```text
🎯 Ionic 컴포넌트의 핵심 가치:

✅ 네이티브 룩앤필
- iOS, Android 플랫폼별 자동 스타일 적용
- 플랫폼 가이드라인 준수 UI

✅ 웹 기술 활용
- 기존 Vue.js 프로젝트에 쉽게 통합
- 풍부한 웹 생태계 활용 가능

✅ 모바일 최적화
- 터치 제스처 지원
- 모바일 성능 최적화

✅ 일관된 디자인
- 미리 정의된 디자인 시스템
- 퍼블리셔 협업 효율성 향상
```

### 🏗️ 컴포넌트 활용 구조

```text
📱 프로젝트 내 Ionic 통합:

┌─────────────────────────────────┐
│        Vue.js Project           │
│     (기존 웹 애플리케이션)        │
├─────────────────────────────────┤
│       Ionic Components          │
│    (모바일 UI 컴포넌트 추가)      │
├─────────────────────────────────┤
│      Custom Styling             │
│    (퍼블리셔 커스텀 스타일)       │
├─────────────────────────────────┤
│      Internal Platform          │
│     (내부 하이브리드 플랫폼)      │
└─────────────────────────────────┘
```

---

## 🛠️ 기존 프로젝트에 Ionic 통합

### 1. Ionic Vue 패키지 설치

```bash
# 기존 Vue 프로젝트에서 실행
npm install @ionic/vue @ionic/vue-router

# Ionic 아이콘 패키지 설치
npm install ionicons

# TypeScript 사용시 추가 타입
npm install -D @ionic/vue@types
```

### 2. Vue 프로젝트에 Ionic 설정

#### **main.ts 설정**

```typescript
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Ionic Vue 설정
import { IonicVue } from '@ionic/vue';

// Ionic 핵심 CSS
import '@ionic/vue/css/core.css';

// 기본 테마 (필수)
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

// 선택적 CSS (필요에 따라 선택)
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// 테마 변수 (퍼블리셔 커스터마이징 가능)
import '@/theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.mount('#app');
```

---

## 📱 핵심 컴포넌트 활용법

### 🏗️ 기본 레이아웃 구조

#### **ion-app, ion-page 구조**

```vue
<template>
  <!-- 앱 전체를 감싸는 최상위 컴포넌트 -->
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
```

```vue
<template>
  <!-- 개별 페이지 구조 -->
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>페이지 제목</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <!-- 페이지 콘텐츠 -->
      <div class="page-content">
        <!-- 실제 내용 -->
      </div>
    </ion-content>
    
    <ion-footer>
      <ion-toolbar>
        <!-- 하단 도구 모음 -->
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, 
  IonContent, IonFooter 
} from '@ionic/vue';
</script>
```

### 🧭 네비게이션과 라우팅

#### **Vue Router와 Ionic 통합**

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/DetailPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
```

#### **Ionic 라이프사이클 활용**

> **중요**: **페이지 스택 관리**가 핵심입니다.

```vue
<template>
  <ion-page>
    <ion-content>
      <h1>{{ pageTitle }}</h1>
      <p>데이터: {{ data }}</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onIonViewWillEnter, onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';

const pageTitle = ref('');
const data = ref('');

// Vue 라이프사이클: 최초 진입시에만 실행
onMounted(() => {
  console.log('컴포넌트 최초 마운트');
  pageTitle.value = '페이지 제목';
});

// Ionic 라이프사이클: 페이지 진입 시마다 실행 (뒤로가기 포함)
onIonViewWillEnter(() => {
  console.log('페이지 진입 직전');
  // API 호출 등 데이터 갱신 로직
  loadLatestData();
});

onIonViewDidEnter(() => {
  console.log('페이지 진입 완료');
  // 애니메이션 시작 등
});

onIonViewWillLeave(() => {
  console.log('페이지 떠나기 직전');
  // 데이터 저장, 정리 작업
});

const loadLatestData = async () => {
  // 실제 데이터 로딩 로직
  data.value = '최신 데이터';
};
</script>
```

### 📱 모달 시스템 구현

#### **modalController 활용**

```vue
<!-- ParentPage.vue -->
<template>
  <ion-page>
    <ion-content>
      <ion-button @click="openModal" expand="block">
        모달 열기
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';
import DetailModal from '@/components/DetailModal.vue';

const openModal = async () => {
  const modal = await modalController.create({
    component: DetailModal,
    componentProps: {
      // 모달에 전달할 데이터
      title: '상세 정보',
      data: { id: 1, name: '샘플 데이터' }
    },
    cssClass: 'detail-modal',
    backdropDismiss: true
  });
  
  await modal.present();
  
  // 모달에서 반환된 데이터 처리
  const { data } = await modal.onWillDismiss();
  if (data) {
    console.log('모달에서 받은 데이터:', data);
  }
};
</script>
```

```vue
<!-- DetailModal.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="dismiss">닫기</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <div class="modal-content">
        <h2>{{ data.name }}</h2>
        <ion-button @click="saveAndClose" expand="block">
          저장하고 닫기
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';

// Props 정의
interface Props {
  title: string;
  data: { id: number; name: string };
}

const props = defineProps<Props>();

const dismiss = async () => {
  await modalController.dismiss();
};

const saveAndClose = async () => {
  // 저장 로직
  const result = { success: true, message: '저장 완료' };
  
  // 데이터와 함께 모달 닫기
  await modalController.dismiss(result);
};
</script>
```

#### **Router Guard로 모달 관리**

> **실무 팁**: 뒤로가기 버튼으로 모달이 닫히도록 구현

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { modalController } from '@ionic/vue';

const router = createRouter({
  // ...라우터 설정
});

// 뒤로가기 시 모달 자동 닫기
router.beforeEach(async (to, from) => {
  const modal = await modalController.getTop();
  if (modal) {
    await modal.dismiss(null, 'cancel');
    return false; // 라우팅 취소
  }
  return true;
});

export default router;
```

### 🍔 사이드 메뉴 구현

```vue
<!-- App.vue -->
<template>
  <ion-app>
    <!-- 사이드 메뉴 -->
    <ion-menu side="start" menu-id="main-menu" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>메뉴</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <ion-list>
          <ion-menu-toggle v-for="item in menuItems" :key="item.title">
            <ion-item button @click="navigate(item.path)">
              <ion-icon :icon="item.icon" slot="start"></ion-icon>
              <ion-label>{{ item.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
    
    <!-- 메인 콘텐츠 -->
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { menuController } from '@ionic/vue';
import { home, list, settings } from 'ionicons/icons';

const router = useRouter();

const menuItems = [
  { title: '홈', path: '/home', icon: home },
  { title: '목록', path: '/list', icon: list },
  { title: '설정', path: '/settings', icon: settings }
];

const navigate = async (path: string) => {
  await menuController.close();
  router.push(path);
};
</script>
```

### ⏳ 로딩 상태 관리

> **실무 패턴**: Pinia Store를 활용한 전역 로딩 관리

```typescript
// src/stores/loading.ts
import { defineStore } from 'pinia';
import { loadingController } from '@ionic/vue';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingStack: [] as string[],
    currentLoading: null as HTMLIonLoadingElement | null
  }),

  actions: {
    async showLoading(message = '로딩 중...') {
      this.loadingStack.push(message);
      
      if (!this.currentLoading) {
        this.currentLoading = await loadingController.create({
          message,
          spinner: 'dots',
          cssClass: 'custom-loading'
        });
        await this.currentLoading.present();
      }
    },

    async hideLoading() {
      this.loadingStack.pop();
      
      if (this.loadingStack.length === 0 && this.currentLoading) {
        await this.currentLoading.dismiss();
        this.currentLoading = null;
      }
    }
  }
});
```

```vue
<!-- 컴포넌트에서 사용 -->
<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();

const fetchData = async () => {
  try {
    await loadingStore.showLoading('데이터 로딩 중...');
    
    // API 호출
    const response = await api.getData();
    
    return response;
  } finally {
    await loadingStore.hideLoading();
  }
};
</script>
```

---

## 🔧 실무 활용 패턴

### 📋 리스트와 무한 스크롤

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>게시글 목록</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <!-- 검색 기능 -->
      <ion-searchbar 
        v-model="searchTerm"
        @ionInput="onSearch"
        placeholder="검색어를 입력하세요"
      ></ion-searchbar>
      
      <!-- 목록 -->
      <ion-list>
        <ion-item 
          v-for="item in items" 
          :key="item.id"
          button 
          @click="goToDetail(item.id)"
        >
          <ion-avatar slot="start">
            <img :src="item.avatar" :alt="item.name" />
          </ion-avatar>
          
          <ion-label>
            <h2>{{ item.title }}</h2>
            <p>{{ item.content }}</p>
            <p class="date">{{ formatDate(item.createdAt) }}</p>
          </ion-label>
          
          <ion-chip slot="end" :color="item.status === 'active' ? 'success' : 'medium'">
            {{ item.status }}
          </ion-chip>
        </ion-item>
      </ion-list>
      
      <!-- 무한 스크롤 -->
      <ion-infinite-scroll 
        @ionInfinite="loadMore" 
        :disabled="isComplete"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="더 불러오는 중..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
      
      <!-- 새로고침 -->
      <ion-refresher slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([]);
const searchTerm = ref('');
const currentPage = ref(1);
const isComplete = ref(false);

const loadData = async (page = 1, search = '') => {
  try {
    const response = await api.getItems({
      page,
      limit: 20,
      search
    });
    
    if (page === 1) {
      items.value = response.data;
    } else {
      items.value.push(...response.data);
    }
    
    isComplete.value = response.data.length < 20;
    
  } catch (error) {
    console.error('데이터 로딩 실패:', error);
  }
};

const loadMore = async (event: CustomEvent) => {
  currentPage.value++;
  await loadData(currentPage.value, searchTerm.value);
  (event.target as HTMLIonInfiniteScrollElement).complete();
};

const refresh = async (event: CustomEvent) => {
  currentPage.value = 1;
  isComplete.value = false;
  await loadData(1, searchTerm.value);
  (event.target as HTMLIonRefresherElement).complete();
};

const onSearch = async () => {
  currentPage.value = 1;
  isComplete.value = false;
  await loadData(1, searchTerm.value);
};

const goToDetail = (id: number) => {
  router.push(`/detail/${id}`);
};

onMounted(() => {
  loadData();
});
</script>
```

### 📝 폼 처리와 유효성 검사

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>게시글 작성</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="save" :disabled="!isFormValid">
            저장
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <form @submit.prevent="save">
        <!-- 제목 입력 -->
        <ion-item>
          <ion-label position="stacked">제목 *</ion-label>
          <ion-input 
            v-model="form.title"
            placeholder="제목을 입력하세요"
            :class="{ 'ion-invalid': errors.title }"
          ></ion-input>
          <ion-note slot="error" v-if="errors.title">
            {{ errors.title }}
          </ion-note>
        </ion-item>
        
        <!-- 카테고리 선택 -->
        <ion-item>
          <ion-label position="stacked">카테고리</ion-label>
          <ion-select v-model="form.category" placeholder="선택하세요">
            <ion-select-option 
              v-for="category in categories" 
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        
        <!-- 내용 입력 -->
        <ion-item>
          <ion-label position="stacked">내용 *</ion-label>
          <ion-textarea 
            v-model="form.content"
            placeholder="내용을 입력하세요"
            rows="6"
            :class="{ 'ion-invalid': errors.content }"
          ></ion-textarea>
          <ion-note slot="error" v-if="errors.content">
            {{ errors.content }}
          </ion-note>
        </ion-item>
        
        <!-- 파일 첨부 -->
        <ion-item>
          <ion-label position="stacked">첨부 파일</ion-label>
          <input 
            type="file" 
            @change="onFileChange"
            accept="image/*,.pdf,.doc,.docx"
            multiple
          />
        </ion-item>
        
        <!-- 첨부된 파일 목록 -->
        <ion-list v-if="attachedFiles.length > 0">
          <ion-item v-for="(file, index) in attachedFiles" :key="index">
            <ion-icon name="document" slot="start"></ion-icon>
            <ion-label>{{ file.name }}</ion-label>
            <ion-button 
              fill="clear" 
              size="small" 
              @click="removeFile(index)"
              slot="end"
            >
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { alertController, toastController } from '@ionic/vue';

const router = useRouter();

const form = reactive({
  title: '',
  category: '',
  content: ''
});

const errors = reactive({
  title: '',
  content: ''
});

const attachedFiles = ref<File[]>([]);
const categories = ref([
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유게시판' },
  { id: 3, name: '질문답변' }
]);

const isFormValid = computed(() => {
  return form.title.length > 0 && 
         form.content.length > 0 && 
         !errors.title && 
         !errors.content;
});

const validateForm = () => {
  errors.title = form.title.length === 0 ? '제목을 입력하세요' : '';
  errors.content = form.content.length === 0 ? '내용을 입력하세요' : '';
  
  if (form.title.length > 100) {
    errors.title = '제목은 100자 이내로 입력하세요';
  }
  
  return !errors.title && !errors.content;
};

const onFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    attachedFiles.value.push(...Array.from(files));
  }
};

const removeFile = (index: number) => {
  attachedFiles.value.splice(index, 1);
};

const save = async () => {
  if (!validateForm()) {
    const toast = await toastController.create({
      message: '입력 정보를 확인해주세요',
      duration: 2000,
      color: 'warning'
    });
    await toast.present();
    return;
  }
  
  try {
    // 파일 업로드 및 게시글 저장 로직
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('content', form.content);
    
    attachedFiles.value.forEach(file => {
      formData.append('files', file);
    });
    
    await api.createPost(formData);
    
    const toast = await toastController.create({
      message: '게시글이 저장되었습니다',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
    
    router.back();
    
  } catch (error) {
    const alert = await alertController.create({
      header: '오류',
      message: '저장 중 오류가 발생했습니다',
      buttons: ['확인']
    });
    await alert.present();
  }
};
</script>
```

---

## 🔗 공식 문서

- **<a href="https://ionicframework.com/docs" target="_blank">Ionic Framework 공식 문서</a>**
- **<a href="https://ionicframework.com/docs/vue/overview" target="_blank">Ionic Vue 가이드</a>**
- **<a href="https://ionicframework.com/docs/components" target="_blank">Ionic UI Components</a>**
