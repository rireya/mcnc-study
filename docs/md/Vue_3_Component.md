
# Vue 3 Component

## 1. 컴포넌트 (Component)

자식 컴포넌트는 부모 컴포넌트로부터 props를 전달받아 사용합니다.

**ChildComponent.vue**

```vue
<template>
  <div>
    <p>자식 컴포넌트입니다. 이름: {{ props.string }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';

interface Json {
  [key: string]: any;
}

// 전달받은 데이터
const props = defineProps({
  string: { type: String, default: '' },
  json: { type: Object as PropType<Json>, default: {} as Json },
  array: { type: Array as PropType<string[]>, default: [] as string[] },
});
</script>
```

**ParentComponent.vue**

```vue
<template>
  <div>
    <p>부모 컴포넌트입니다.</p>
    <ChildComponent :string="'홍길동'" />
  </div>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue';
</script>
```

## 2. 컴포넌트간 통신

### 2-1. Props/Emit

Props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다. Emit은 자식 컴포넌트에서 부모 컴포넌트로 이벤트를 전달합니다.

**ChildComponent.vue**

```vue
<template>
  <div>
    <button @click="sendMessage">메시지 보내기</button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['message']);
const props = defineProps({
  string: { type: String, default: '' },
  json: { type: Object as PropType<Json>, default: {} as Json },
  array: { type: Array as PropType<string[]>, default: [] as string[] },
});

const sendMessage = () => {
  emit('message', '안녕하세요, 부모님!');
};
</script>
```

**ParentComponent.vue**

```vue
<template>
  <div>
    <p>부모 컴포넌트입니다.</p>
    <ChildComponent @message="receiveMessage" />
  </div>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue';

const receiveMessage = (msg: string) => {
  console.log(msg);
};
</script>
```

### 2-2. Provide/Inject

Provide/Inject는 조상 컴포넌트에서 후손 컴포넌트로 데이터를 전달하는 방법입니다.

**GrandparentComponent.vue**

```vue
<template>
  <div>
    <p>조상 컴포넌트입니다.</p>
    <ParentComponent />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import ParentComponent from './ParentComponent.vue';

const test = ref<string>('test');

provide('shared', {
  test: test,
  foo: () => {
    console.log('foo');
  }
});
</script>
```

**ParentComponent.vue**

```vue
<template>
  <div>
    <p>부모 컴포넌트입니다.</p>
    <ChildComponent />
  </div>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue';
</script>
```

**ChildComponent.vue**

```vue
<template>
  <div>
    <p>자식 컴포넌트입니다. 공유 데이터: {{ sharedData.test }}</p>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

const sharedData = inject<any>('shared');
</script>
```

### 2-3. defineExpose

`defineExpose`를 사용하여 setup() 함수 내의 내용을 외부에 노출할 수 있습니다.

**ChildComponent.vue**

```vue
<template>
  <div>
    <p>자식 컴포넌트입니다.</p>
  </div>
</template>

<script lang="ts" setup>
const sayHello = () => {
  console.log('안녕하세요!');
};

defineExpose({
  sayHello
});
</script>
```

**ParentComponent.vue**

```vue
<template>
  <div>
    <p>부모 컴포넌트입니다.</p>
    <ChildComponent ref="child" />
    <button @click="callChildMethod">자식 메서드 호출</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const child = ref();

const callChildMethod = () => {
  (child.value as any).sayHello();
};
</script>
```

## 3. CSS Scope

Scoped CSS는 특정 컴포넌트에만 CSS를 적용하는 방법입니다.

**ScopedComponent.vue**

```vue
<template>
  <div class="scoped-style">
    <p>이 스타일은 이 컴포넌트에만 적용됩니다.</p>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.scoped-style {
  color: blue;
}
</style>
```

## 4. Slot

Slot은 부모 컴포넌트에서 자식 컴포넌트로 콘텐츠를 전달하는 방법입니다.

### 4-1. 기본 슬롯 (Default Slot)

기본 슬롯은 자식 컴포넌트에서 slot 태그를 사용하여 정의됩니다.

**ChildComponent.vue**

```vue
<template>
  <div>
    <slot>기본 콘텐츠</slot> <!-- 부모가 전달하지 않았을 때 표시될 기본 콘텐츠 -->
  </div>
</template>

<script lang="ts" setup>
</script>
```

**ParentComponent.vue**

```vue
<template>
  <div>
    <ChildComponent>
      <p>부모에서 전달된 콘텐츠</p>
    </ChildComponent>
  </div>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue';
</script>
```

### 4-2. 명명된 슬롯 (Named Slot)

명명된 슬롯은 name 속성을 사용하여 여러 개의 슬롯을 정의할 수 있습니다.

**ChildComponent.vue**

```vue
<template>
  <div>
    <slot name="header">기본 헤더</slot>
    <slot>기본 콘텐츠</slot>
    <slot name="footer">기본 푸터</slot>
  </div>
</template>

<script lang="ts" setup>
</script>
```

**ParentComponent.vue**

```vue
<template>
  <div>
    <ChildComponent>
      <template #header>
        <p>부모에서 전달된 헤더</p>
      </template>
      <p>부모에서 전달된 기본 콘텐츠</p>
      <template #footer>
        <p>부모에서 전달된 푸터</p>
      </template>
    </ChildComponent>
  </div>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue';
</script>
```

### 4-3. 슬롯Props (Scoped Slot)

슬롯 Props는 자식 컴포넌트에서 데이터를 부모 컴포넌트로 전달하는 방법입니다.

**ChildComponent.vue**

```vue
<template>
  <div>
    <slot :message="message" :foo="foo"></slot> <!-- message 변수를 슬롯에 전달 -->
  </div>
</template>

<script lang="ts" setup>
const foo = 'foo';
const message = 'bar';
</script>
```

**ParentComponent.vue**

슬롯 Props는 자식 컴포넌트에서 데이터를 부모 컴포넌트로 전달하는 방법입니다.

```vue
<template>
  <div>
    <ChildComponent>
      <template #default="{ foo, message }">
        <p>{{ foo }} {{ message }}</p> <!-- 자식 컴포넌트로부터 전달받은 message 사용 -->
      </template>
    </ChildComponent>
  </div>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue';
</script>
```