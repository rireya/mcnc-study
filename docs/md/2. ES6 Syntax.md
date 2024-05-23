# ES6 Syntax

## 1. 새로운 변수 선언 방식

- **let과 const의 사용법과 차이점**
  - **ES5 예시**:

    ```javascript
    var variable = 'var는 함수 스코프';
    ```

  - **ES6 예시**:

    ```javascript
    let variable = 'let은 블록 스코프';
    const constant = 'const는 재할당 불가능';
    ```

## 2. 화살표 함수

- **일반 함수와의 차이, this 바인딩 방식의 차이**
  - **ES5 예시**:

    ```javascript
    var that = this;
    var traditionalFunction = function() {
      console.log(that);
    };
    ```

  - **ES6 예시**:

    ```javascript
    const arrowFunction = () => {
      console.log(this); // 화살표 함수에서 this는 상위 컨텍스트를 참조
    };
    ```

## 3. 템플릿 리터럴

- **문자열 내에서 변수와 표현식 사용**
  - **ES5 예시**:

    ```javascript
    var name = 'Vue';

    console.log('안녕하세요, ' + name + '입니다!');
    ```

  - **ES6 예시**:

    ```javascript
    let name = 'Vue';

    console.log(`안녕하세요, ${name}입니다!`); // 백틱(`)을 사용하여 문자열 내에 변수를 포함
    ```

## 4. 디스트럭처링

- **객체와 배열의 요소를 변수로 쉽게 할당하는 방법**
  - **ES5 예시**:

    ```javascript
    var user = { name: 'mcnc', age: 30 };
    var name = user.name;
    var age = user.age;
    ```

  - **ES6 예시**:

    ```javascript
    const user = { name: 'mcnc', age: 30 };
    const { name, age } = user;
    ```

## 5. Optional Chaining (?.)

- **안전하게 중첩된 객체 속성에 접근**
  - **ES5 예시**:

    ```javascript
    var user = {
      profile: {
        name: 'mcnc'
      }
    };

    console.log(user.profile.age); // undefined
    console.log(user.info.email); // error => console.log(user.info ? user.info.email : undefined)
    ```

  - **ES6 예시**:

    ```javascript
    const user = {
      profile: {
        name: 'mcnc'
      }
    };

    console.log(user.profile?.age); // undefined
    console.log(user.info?.email); // undefined (에러가 발생하지 않음)
    ```

## 6. Promise와 async/await

- **비동기 프로그래밍을 위한 Promise와 async/await의 사용**
  - **ES5 Callback 예시**:

    ```javascript
    function fetchData(callback) {
      setTimeout(() => {
        callback('데이터 로드 완료');
      }, 2000);
    }

    function fetchAsyncData() {
      fetchData(function(data) {
        console.log(data); // '데이터 로드 완료'
      });
    }

    fetchAsyncData(); // 함수 실행
    ```

  - **ES6 Promise 예시**:

    ```javascript
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('데이터 로드 완료');
        }, 2000);
      });
    };

    function fetchAsyncData() {
      fetchData().then(data => console.log(data)); // '데이터 로드 완료'
    }

    fetchAsyncData(); // 함수 실행
    ```

  - **ES6 async/await 예시**:

    ```javascript
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('데이터 로드 완료');
        }, 2000);
      });
    };

    async function fetchAsyncData() {
      const data = await fetchData();

      console.log(data); // '데이터 로드 완료'
    }

    await fetchAsyncData(); // 함수 실행
    ```

### 6-1. Promise 관련 주요 함수

- **Promise.all**: 여러 비동기 작업이 전부 완료되기 전까지 대기 (보편적으로 사용)

  ```javascript
  const fetchData1 = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('첫 번째 데이터');
      }, 1000);
    });
  };

  const fetchData2 = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('두 번째 데이터');
      }, 2000);
    });
  };

  const fetchAllData = async () => {
    try {
      const results = await Promise.all([fetchData1(), fetchData2()]);
      console.log(results); // ['첫 번째 데이터', '두 번째 데이터']
    } catch (error) {
      console.error(error);
    }
  };

  fetchAllData();
  ```

- **Promise.race**: 여러 Promise 중 가장 먼저 처리된 Promise의 결과를 반환 (타임아웃 기능 구현등에 사용)

  ```javascript
  const fetchData1 = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('첫 번째 데이터');
      }, 1000);
    });
  };

  const fetchData2 = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('두 번째 데이터');
      }, 2000);
    });
  };

  const fetchRaceData = async () => {
    try {
      const result = await Promise.race([fetchData1(), fetchData2()]);
      console.log(result); // '첫 번째 데이터'
    } catch (error) {
      console.error(error);
    }
  };

  fetchRaceData();
  ```

## 7. Spread/Rest Syntax (...)

- **객체나 배열을 확장하거나 요소를 추출**
  - **ES5 Spread 예시**:

    ```javascript
    var nums = [1, 2, 3];
    var moreNums = nums.concat([4, 5]);

    console.log(moreNums); // [1, 2, 3, 4, 5]
    ```

  - **ES6 Spread 예시**:

    ```javascript
    const nums = [1, 2, 3];
    const moreNums = [...nums, 4, 5];

    console.log(moreNums); // [1, 2, 3, 4, 5]
    ```

  - **ES5 Rest 예시**:

    ```javascript
    var user = { name: 'mcnc', age: 30, city: 'Seoul' };
    var name = user.name;
    var rest = {};

    for (var prop in user) { // 'user' 객체의 모든 속성을 순회합니다.
        if (prop !== 'name') { // 'name' 속성을 제외한 모든 속성을 'rest' 객체에 복사합니다.
            rest[prop] = user[prop];
        }
    }

    console.log(name); // mcnc
    console.log(rest); // { age: 30, city: 'Seoul' }
    ```

  - **ES6 Rest 예시**:

    ```javascript
    const user = { name: 'mcnc', age: 30, city: 'Seoul' };
    const { name, ...rest } = user;

    console.log(name); // mcnc
    console.log(rest); // { age: 30, city: 'Seoul' }
    ```

## 7-1. Spread/Rest Syntax (...) - 객체 요소

- **ES6 Spread 객체 요소**:

  ```javascript
  const nums = [1, 2, 3];
  const moreNums = [...nums, 4, 5];

  console.log(nums); // [1, 2, 3]
  console.log(moreNums); // [1, 2, 3, 4, 5]

  // 원본 배열의 첫 번째 요소를 99로 변경
  nums[0] = 99;

  console.log(nums); // [99, 2, 3]
  console.log(moreNums); // [1, 2, 3, 4, 5]
  ```

  ```javascript
  const originalArray = [{ a: 1 }, { b: 2 }];
  const copiedArray = [...originalArray];

  console.log(originalArray); // [{ a: 1 }, { b: 2 }]
  console.log(copiedArray); // [{ a: 1 }, { b: 2 }]

  // 원본 배열의 객체 요소 변경
  originalArray[0].a = 99;

  console.log(originalArray); // [{ a: 99 }, { b: 2 }]
  console.log(copiedArray); // [{ a: 99 }, { b: 2 }]
  ```

- **ES6 Rest 객체 요소**:

  ```javascript
  const user = { name: 'mcnc', age: 30 };
  const { name, ...rest } = user;

  console.log(name); // mcnc
  console.log(rest); // { age: 30 }

  // 원본 객체 user의 age 속성을 변경합니다.
  user.age = 40;

  console.log(user); // { name: 'mcnc', age: 40 }
  console.log(rest); // { age: 30 }
  ```

  ```javascript
  const user = { name: 'mcnc', profile: { age: 30, city: 'Seoul' } };
  const { name, ...rest } = user;

  console.log(name); // mcnc
  console.log(rest); // { profile: { age: 30, city: 'Seoul' } }

  // 원본 객체 user의 중첩된 profile 객체의 age 속성을 변경합니다.
  user.profile.age = 40;

  console.log(user); // { name: 'mcnc', profile: { age: 40, city: 'Seoul' } }
  console.log(rest); // { profile: { age: 40, city: 'Seoul' } }
  ```
