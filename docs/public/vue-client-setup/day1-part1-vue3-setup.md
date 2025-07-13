# 🎯 Day 1 Part 1: Vue 3 기초 및 환경 설정

**교육 시간**: 09:00 - 10:30 (1시간 30분)  
**교육 목표**: Vue 3 개발 환경 구축 및 기본 개념 이해

---

## 🎯 학습 목표

이 세션을 통해 다음 내용을 학습합니다:

- [ ] Vue 3의 새로운 특징과 변화점
- [ ] 개발 환경 구축 (Node.js, Vite, VS Code)
- [ ] 프로젝트 구조 및 기본 설정
- [ ] Hello World 애플리케이션 작성

---

## 🆕 Vue 3의 주요 변화점

### Vue 2 vs Vue 3 비교

| 기능 | Vue 2 | Vue 3 |
|------|-------|-------|
| **API 스타일** | Options API | **Composition API** + Options API |
| **번들 크기** | ~35KB | **~10KB** (Tree-shaking) |
| **성능** | 기준 | **최대 2배 향상** |
| **TypeScript** | 부분 지원 | **완전 지원** |
| **다중 루트** | 불가능 | **가능** |

### 🚀 Vue 3의 핵심 장점

- **Composition API**: 로직 재사용성과 코드 구성 개선
- **성능 향상**: Proxy 기반 반응성, Tree-shaking
- **TypeScript**: 완전한 타입 지원
- **Fragment**: 다중 루트 노드 지원
- **Teleport**: DOM 트리 외부 렌더링

---

## 🛠️ 개발 환경 구축

### 1️⃣ Node.js 설치 확인

```bash
# Node.js 버전 확인 (v18 이상 권장)
node --version

# npm 버전 확인
npm --version
```

### 2️⃣ Vue 프로젝트 생성

```bash
# Vite를 사용한 Vue 프로젝트 생성
npm create vue@latest my-vue-app

# 프로젝트 옵션 선택
✔ TypeScript? ... Yes
✔ JSX Support? ... No
✔ Vue Router? ... Yes
✔ Pinia? ... Yes
✔ Vitest? ... No
✔ ESLint? ... Yes
✔ Prettier? ... Yes

# 프로젝트 디렉토리 이동
cd my-vue-app

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 3️⃣ VS Code 확장 설치

**필수 확장:**

- **Vue Language Features (Volar)**: Vue 3 지원
- **TypeScript Vue Plugin (Volar)**: TypeScript 지원

**권장 확장:**

- **Auto Rename Tag**: HTML 태그 자동 수정
- **Bracket Pair Colorizer**: 괄호 색상 구분
- **ES7+ React/Redux/React-Native snippets**: 코드 스니펫

---

## 📁 프로젝트 구조 이해

```text
my-vue-app/
├── public/              # 정적 파일
│   └── favicon.ico
├── src/                 # 소스 코드
│   ├── assets/         # 에셋 파일 (이미지, 스타일)
│   ├── components/     # Vue 컴포넌트
│   ├── router/         # Vue Router 설정
│   ├── stores/         # Pinia 스토어
│   ├── views/          # 페이지 컴포넌트
│   ├── App.vue         # 루트 컴포넌트
│   └── main.ts         # 앱 진입점
├── index.html          # HTML 템플릿
├── package.json        # 프로젝트 설정
├── tsconfig.json       # TypeScript 설정
└── vite.config.ts      # Vite 설정
```

### 핵심 파일 설명

#### `main.ts` - 앱 진입점

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

#### `App.vue` - 루트 컴포넌트

```vue
<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
```

---

## 🎨 첫 번째 컴포넌트 만들기

### Hello World 컴포넌트

**파일**: `src/components/HelloWorld.vue`

```vue
<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
    <p>{{ message }}</p>
    <button @click="increaseCount">클릭 횟수: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 반응형 데이터
const count = ref(0)
const name = ref('Vue 3')

// 컴퓨티드 속성
const greeting = computed(() => `안녕하세요, ${name.value}!`)
const message = computed(() => `현재 클릭 횟수는 ${count.value}번입니다.`)

// 메서드
const increaseCount = () => {
  count.value++
}
</script>

<style scoped>
.hello {
  text-align: center;
  padding: 2rem;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369870;
}
</style>
```

### 컴포넌트 사용하기

**파일**: `src/views/HomeView.vue`

```vue
<template>
  <main>
    <HelloWorld />
  </main>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>
```

---

## 🔄 Composition API 기초

### ref vs reactive

```typescript
import { ref, reactive } from 'vue'

// ref: 기본 타입용
const count = ref(0)
const name = ref('Vue')

// reactive: 객체 타입용
const user = reactive({
  id: 1,
  name: 'John',
  email: 'john@example.com'
})

// 사용법
console.log(count.value) // ref는 .value 필요
console.log(user.name)   // reactive는 직접 접근
```

### computed와 watch

```typescript
import { ref, computed, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// computed: 파생된 상태
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// watch: 상태 변화 감지
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
```

---

## 💡 실습 과제

### 과제 1: 카운터 앱 개선
기본 카운터에 다음 기능을 추가해 보세요:

- [ ] 감소 버튼 추가
- [ ] 리셋 버튼 추가
- [ ] 카운트가 10의 배수일 때 특별한 메시지 표시

### 과제 2: 사용자 정보 컴포넌트
사용자 정보를 표시하고 수정할 수 있는 컴포넌트를 만들어 보세요:

- [ ] 이름, 이메일, 나이 입력 필드
- [ ] 실시간 미리보기
- [ ] 유효성 검사 (이메일 형식, 나이 범위)

---

## 🤔 Q&A 시간

### 자주 묻는 질문들

**Q: Options API와 Composition API 중 어떤 것을 사용해야 하나요?**
A: 새 프로젝트는 Composition API를 권장합니다. 더 유연하고 TypeScript 지원이 좋습니다.

**Q: ref와 reactive 중 언제 무엇을 사용하나요?**
A: 기본 타입(number, string, boolean)은 ref, 객체는 reactive를 사용하세요.

**Q: Vue 2 경험이 있는데 Vue 3 학습 시 주의점은?**
A: Composition API와 새로운 반응성 시스템에 집중하세요. 기존 지식을 버리지 말고 확장하세요.

---

## 📝 정리 및 다음 세션 안내

### 오늘 배운 내용

- Vue 3의 새로운 특징과 장점
- 개발 환경 구축 및 프로젝트 생성
- 기본 컴포넌트 작성 및 Composition API

### 다음 세션 예고

**Part 2: TypeScript & Composition API** (10:45 - 12:00)

- TypeScript 기본 문법
- 고급 Composition API 패턴
- 커스텀 Composables 작성

---

**📞 질문이 있으시면 언제든 말씀해 주세요!**
