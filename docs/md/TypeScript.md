
# TypeScript

## 1. TypeScript 기본 개념

- **타입 시스템 소개**: TypeScript는 JavaScript에 타입을 추가하여, 컴파일 시 타입 검사를 제공합니다.
  - **예시**:

    ```typescript
    // 이 변수는 불리언 타입으로, 'true' 또는 'false' 값을 가짐
    let isDone: boolean = false;
    ```

- **변수와 함수의 타입 정의**: 변수와 함수의 반환 타입 및 매개변수 타입을 명시할 수 있습니다.
  - **예시**:

    ```typescript
    // 이 함수는 두 개의 숫자 타입 매개변수 'x'와 'y'를 받아 그 합을 숫자 타입으로 반환합니다.
    function add(x: number, y: number): number {
      return x + y;
    }
    ```

- **인터페이스와 클래스 사용법**: 객체의 형태를 정의하고, 클래스를 통해 객체 지향 프로그래밍을 할 수 있습니다.
  - **예시**:

    ```typescript
    // 인터페이스 정의: User
    interface User {
      name: string;
      age: number;
    }

    // 클래스 정의: Person
    class Person implements User {
      name: string;
      age: number;

      // 이 생성자는 'name'과 'age' 두 매개변수를 받아 객체의 속성을 초기화합니다.
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }

      // 'describe' 메서드는 사용자의 이름과 나이를 포함한 문자열을 반환합니다.
      describe(): string {
        return `${this.name} is ${this.age} years old.`;
      }
    }
    ```

## 2. 고급 타입

- **유니온 타입, 인터섹션 타입, 제네릭, 타입 가드**:
  - **예시 (유니온 타입)**:

    ```typescript
    // 이 함수는 'id' 매개변수를 받으며, 'id'는 숫자 또는 문자열 타입
    function logId(id: number | string) {
      console.log('ID:', id);
    }
    ```

  - **예시 (제네릭)**:

    ```typescript
    // 입력받은 인자를 그대로 반환하는 제네릭 함수
    function identity<T>(arg: T): T {
      return arg;
    }

    const output1 = identity('myString');  // 타입은 'string'
    const output2 = identity(42);          // 타입은 'number'
    const output3 = identity(true);        // 타입은 'boolean'
    ```

## 3. 기본 타입, any 타입, custom 타입

- **기본 타입**: `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `void`
  - **예시 (기본 타입)**:

    ```typescript
    let isActive: boolean = true;
    let decimal: number = 10;
    ```

- **any 타입**: 타입 검사를 회피할 때 사용, 가능한 사용을 피해야 합니다.
  - **예시 (any 타입)**:

    ```typescript
    let notSure: any = 4;
    notSure = 'maybe a string instead';
    notSure = false; // okay, definitely a boolean
    ```

- **custom 타입 (타입 별칭 사용)**:
  - **예시 (custom 타입)**:

    ```typescript
    type User = {
      name: string;
      age: number;
    };
    let user: User = { name: 'mcnc', age: 30 };
    ```

## 4. 배열 타입과 객체 타입

- **배열 타입**: 배열 타입은 아이템 타입 뒤에 `[]`를 붙여서 표현하거나, 제네릭 배열 타입 `Array<아이템타입>`을 사용할 수 있습니다.
  - **예시 (배열 타입)**:

    ```typescript
    let list: number[] = [1, 2, 3];
    let anotherList: Array<number> = [1, 2, 3];
    ```

- **객체 타입**: 특정 형태의 객체를 나타내는 타입을 정의할 수 있습니다.
  - **예시 (객체 타입)**:
    - **예시 (키-값 쌍 객체 타입)**:

    ```typescript
    let person: { name: string; age: number } = { name: 'dev', age: 25 };
    ```

    ```typescript
    let keyValueObject: { [key: string]: string | number } = { name: 'dev', age: 25 };
    // 이 객체는 문자열 키에 대해 문자열 값을 가지며, 키의 이름은 자유롭게 지정할 수 있습니다.
    ```

    ```typescript
    let keyValueObject: Record<string, string | number> = { name: 'dev', age: 25 };
    // 이 객체는 모든 키와 값이 문자열인 Record 타입을 사용합니다. 키의 이름은 런타임에 결정될 수 있습니다.
    ```

## 5. Enum 타입

- **Enum 정의**: TypeScript에서 enum은 명명된 숫자 상수의 집합을 정의하는 한 가지 방법입니다.
  enum을 사용하면 개발자는 관련된 상수들을 그룹화하여 좀 더 읽기 쉽게 만들 수 있습니다.

  - **예시 (Numeric enums)**:

    ```typescript
    enum Direction {
      Up = 1,
      Down,
      Left,
      Right
    }
    // 'Direction.Up'의 값은 1, 'Direction.Down'은 2, 'Direction.Left'은 3, 'Direction.Right'은 4입니다.
    ```

  - **예시 (String enums)**:

    ```typescript
    enum Direction {
      Up = 'UP',
      Down = 'DOWN',
      Left = 'LEFT',
      Right = 'RIGHT'
    }
    // 각 멤버는 문자열 리터럴로 초기화됩니다. 이는 디버깅 시 가독성을 높입니다.
    ```

  - **예시 (Heterogeneous enums)**:

    ```typescript
    enum BooleanLikeHeterogeneousEnum {
      No = 0,
      Yes = 'YES',
    }
    // 이 enum은 숫자와 문자열을 혼합하여 멤버를 정의합니다.
    ```
