# Projects

## bizMOB4-Base Project (Last. 24-06-24)

Vue3를 기반으로 제작된 bizMOB Base 프로젝트

[Download](https://rireya.github.io/mcnc-study/file/bizMOB4Vue-Base.zip)

- vue3
- vue/cli-service
- vue-router
- ionic/vue
- ionic/vue-router
- moment
- sass
- typescript

### 24-06-24. bizMOB4-Base 변경 사항

- Base에서 Default Store인 vuex 삭제
- GlobalDataService 제거
- LocaleService 파일 및 위치 수정
  - BzClass/BzLocale로 파일 위치 수정
  - Static Class 형식으로 수정
- BzCrypto, BzToken 위치 수정
  - BzClass/BzCrypto로 파일 위치 수정
  - BzClass/BzToken로 파일 위치 수정
- TrackingService 삭제(샘플 프로젝트에 로직 예시 추가)
- Config.ts 파일 위치 수정
  - Xross/Config.ts로 파일 위치 수정
  - main.ts에서 config 호출 영역의 import 파일 경로 수정
- 개발 서버 주소를 도메인에서 아이피로 변경
- README.md 파일 갱신
  - bizMOB Typescript Adapter를 bizMOB Typescript Class로 명칭 수정
  - BzClass import 경로로 수정
  - GlobalShared Data 내용 제거
  - TrackingService 내용 제거
  - 클래스별 지원 함수에 Config 추가

### 24-06-17. bizMOB4-Base 변경 사항

- JWT Token 관련 기능 추가
- 암호화 통신 기능 개선 (bizMOB4 Base Project 탭 확인)
- 화면 추적을 위한 Tracking 서비스 추가

## bizMOB4-SI Project (Last. 24-06-24)

Base를 기반으로 기본적인 공통 함수 및 샘플 화면이 추가된 프로젝트

[Download](https://rireya.github.io/mcnc-study/file/bizMOB4Vue-SI.zip)

### 24-06-24. bizMOB4-SI 변경 사항

- bizMOB 프레임워크 최신화
- 화면 카운팅용 샘플 소스 추가
  - src/router/index.ts (beforeEach)
  - src/shared/composables/useModal.ts (openPopup)

### 24-06-17. bizMOB4-SI 변경 사항

- JWT Token 관련 기능 추가
- 암호화 통신 기능 개선 (bizMOB4 Base Project 탭 확인)
- 화면 추적을 위한 Tracking 서비스 및 예제 추가

## bizMOB4 Base Publishing Project (Last. 24-06-10)

bizMOB4에 맞춘 퍼블리싱 Base 프로젝트

[Download](https://rireya.github.io/mcnc-study/file/bizMOB4Vue-Publishing.zip)

## bizMOB3.5 Base Project (New. 24-06-17)

이클립스 IDE + jQuery를 기반으로 제작된 bizMOB3.5 Base 프로젝트

[Download](https://rireya.github.io/mcnc-study/file/bizMOB3.5jQuery-Base.zip)