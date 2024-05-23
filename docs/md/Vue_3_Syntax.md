
# Vue 3 Syntax

## 1. Import와 Export

모듈을 사용하여 코드를 분리하고 재사용성을 높일 수 있습니다. `import`와 `export`를 사용하여 모듈을 가져오고 내보낼 수 있습니다.

**mathUtils.ts**

```typescript
// 함수와 변수를 export 합니다.
export const PI = 3.14;

export function add(x: number, y: number): number {
  return x + y;
}

export function subtract(x: number, y: number): number {
  return x - y;
}
```

**main.ts**

```typescript
// mathUtils 모듈에서 함수를 import 합니다.
import { add, subtract, PI } from './mathUtils';

console.log('PI:', PI);
console.log('Add:', add(10, 5));
console.log('Subtract:', subtract(10, 5));
```

## 2. Vue 인스턴스의 생명주기

Vue 인스턴스는 생성되고 소멸될 때까지 여러 생명주기 단계를 거칩니다. 주요 단계는 다음과 같습니다:

- `onBeforeCreate`: 인스턴스가 초기화되기 전에 호출됩니다.
- `onCreated`: 인스턴스가 초기화된 후에 호출됩니다.
- `onBeforeMount`: DOM에 마운트되기 전에 호출됩니다.
- `onNounted` **(중요)**: DOM에 마운트된 후에 호출됩니다.
- `onBeforeUpdate`: 데이터가 변경되어 DOM이 다시 렌더링되기 전에 호출됩니다.
- `onUpdated`: 데이터가 변경되어 DOM이 다시 렌더링된 후에 호출됩니다.
- `onBeforeUnmount`: 인스턴스가 마운트 해제되기 전에 호출됩니다.
- `onUnmounted` **(중요)**: 인스턴스가 마운트 해제된 후에 호출됩니다. (중요)

**예제**

```vue
<template>
  <div>Life Cycle</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('Component has been mounted!');
});

onUnmounted(() => {
  console.log('Component has been unmounted!');
});
</script>
```

## 3. 반응형 변수 (ref, reactive)

**ref**

단일 원시 값에 대해 반응형 변수를 만듭니다. **(주로 사용됨)**

```typescript
import { ref } from 'vue';

const count = ref(0);
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]);

function increment() {
  count.value++;
}

function addItem() {
  items.value.push({ id: items.value.length + 1, name: `Item ${items.value.length + 1}` });
}
```

**reactive**

객체에 대해 반응형 변수를 만듭니다.

```typescript
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  message: 'Hello!',
});

function increment() {
  state.count++;
}
```

## 4. 데이터와 이벤트 바인딩

### 데이터 바인딩

데이터 바인딩에 사용되는 {{ }}는 Vue.js에서 템플릿 내에 데이터를 삽입하는 방식으로, 변수의 값을 화면에 출력합니다.

```vue
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message = ref('Hello, Vue 3!');
</script>
```

### 이벤트 바인딩

Vue에서는 `@click` 디렉티브를 사용하여 클릭 이벤트 리스너를 설정할 수 있습니다.

```vue
<template>
  <button @click="handleClick">Click me</button>
</template>

<script setup lang="ts">
function handleClick() {
  console.log('Button clicked!');
}
</script>
```

## 5. 조건부 렌더링과 리스트 렌더링

### 조건부 렌더링 (v-if)

조건에 따라 엘리먼트를 렌더링합니다.

```vue
<template>
  <p v-if="isVisible">This is visible</p>
  <p v-else>This is hidden</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(true);
</script>
```

### 리스트 렌더링 (v-for)

리스트를 반복하여 엘리먼트를 렌더링합니다.

```vue
<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item.name }}</li>
    </ul>
    <button @click="addItem">Add Items</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]);

function addItem() {
    // 기존의 항목은 변경 없이 추가됨 (추후 컴포넌트 마운트와 연관 됨)
  items.value.push(
    { id: 3, name: 'Item 3' },
  );
};
</script>
```

## 6. 감시자 (computed, watch)

### computed

기존 상태에 기반한 계산된 속성을 만듭니다. **(주로 사용됨)**

```typescript
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);
```

### watch

반응형 상태 변화를 감지하여 부수 효과를 실행합니다.

```typescript
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {
  if (newValue > 10) {
    console.log('Count가 10을 초과함'); // 로직 처리
  }
});

function increment() {
  count.value++;
}
```

### watch와 computed

- watch를 과도하게 사용하는 경우 성능 문제와 코드 관리 측면에서 단점이 발생.
- 최소한으로 사용하고 computed로 대체가 가능한 경우 computed로 대체.

**불필요한 watch 사용**

```vue
<template>
  <div>{{ doubleCount }}</div> <!-- count가 변경될 때 doubleCount도 자동으로 업데이트 -->
  <button @click="increment">Add</button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const count = ref(0);
const doubleCount = ref(0);

watch(count, (newValue) => {
  doubleCount.value = newValue * 2;
});

function increment() {
  count.value++;
}
</script>
```

**computed를 사용하여 watch 대체**

```vue
<template>
  <div>{{ doubleCount }}</div> <!-- count가 변경될 때 doubleCount도 자동으로 업데이트 -->
  <button @click="increment">Add</button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);

// watch 대신 computed를 사용하여 반응형 데이터 처리
const doubleCount = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>
```
