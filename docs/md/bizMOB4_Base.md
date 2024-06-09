# bizMOB4 Base Project

## NODE_ENV (실행 환경)

- **development**: `develop 환경`이며 디버깅과 로깅을 활성화한 develop 환경 (개발 서버와는 연관 없음)
- **production**: `release 환경`으로 최적화와 보안을 강화한 운영 환경 (운영 서버와는 연관 없음)

## 기본 환경 변수

- **.env**: 모든 서버 환경에서 공통적으로 선언될 환경 변수
- **.env.sit**: `개발 서버` 환경 변수
- **.env.uat**: `품질 서버` 환경 변수
- **.env.prod**: `운영 서버` 환경 변수

## 개발용 웹 서버 실행 명령어

deploy 명령어로 실행시 NODE_ENV가 production로 설정되기 때문에 소스 수정시 반영이 오래걸림

- 개발 서버 develop 환경 실행: **npm run serve-sit**
- 품질 서버 develop 환경 실행: **npm run serve-uat**
- 운영 서버 develop 환경 실행: **npm run serve-prod**

- 개발 서버 release 환경 실행: **npm run serve-sit:deploy**
- 품질 서버 release 환경 실행: **npm run serve-uat:deploy**
- 운영 서버 release 환경 실행: **npm run serve-prod:deploy**

## 앱 컨텐츠 배포용 명령어

마이너 배포 명령어는 컨텐츠 빌드 후에 font 폴더만 제거된 결과물

- 개발 메이저 배포시: **npm run build-sit:major**
- 품질 메이저 배포시: **npm run build-uat:major**
- 운영 메이저 배포시: **npm run build-prod:major**

- 개발 마이너 배포시: **npm run build-dev:minor**
- 품질 마이너 배포시: **npm run build-uat:minor**
- 운영 마이너 배포시: **npm run build-prod:minor**

## 기본 실행 명령어

- npm run serve-sit : .env.sit | develop 환경 | 프록시 서버 on
- npm run serve-sit:deploy : .env.sit | release 환경 | 프록시 서버 on

---

- npm run serve-uat : .env.uat | develop 환경 | 프록시 서버 on
- npm run serve-uat:deploy : .env.uat | release 환경 | 프록시 서버 on

---

- npm run serve-prod : .env.prod | develop 환경 | 프록시 서버 on
- npm run serve-prod:deploy : .env.prod | release 환경 | 프록시 서버 on

---

- npm run build-sit:major : .env.sit | release 환경 | 메이저 컨텐츠 build
- npm run build-sit:minor : .env.sit | release 환경 | 마이너 컨텐츠 build

---

- npm run build-uat:major : .env.uat | release 환경 | 메이저 컨텐츠 build
- npm run build-uat:minor : .env.uat | release 환경 | 마이너 컨텐츠 build

---

- npm run build-prod:major : .env.prod | release 환경 | 메이저 컨텐츠 build
- npm run build-prod:minor : .env.prod | release 환경 | 마이너 컨텐츠 build

## 개발시 주의 사항

- 웹페이지 B2C 개발시 SEO 고려해야 함

- 외부 라이브러리를 사용할 때, ES5 까지만 지원하는 모바일에서 추가 확인 필요 (iOS 13 미만)
  - 기본적으로 ES5 타겟으로 빌드시 빌드가 되지만 ES6만 지원하고 ES5 지원은 없거나 다른 패키지를 import 해야할 수도 있음

## bizMOB Typescript Handler 호출

javaScript로 구현된 bizMOB 서비스를 Typescript 형식으로 사용할 수 있도록 하는 Handler

```plaintext
src/
└── bizMOB/
    └── Xross/
        ├── App.ts
        │   - callPlugIn
        │   - exit
        │   - getTimeout
        │   - setTimeout
        │   - hideSplash
        ├── Contacts.ts
        │   - get
        ├── Database.ts
        │   - beginTransaction
        │   - closeDatabase
        │   - commitTransaction
        │   - executeBatchSql
        │   - executeSelect
        │   - executeSql
        │   - openDatabase
        │   - rollbackTransaction
        ├── Device.ts
        │   - getInfo
        │   - isApp
        │   - isWeb
        │   - isMobile
        │   - isPC
        │   - isAndroid
        │   - isIOS
        │   - isTablet
        │   - isPhone
        ├── Event.ts
        │   - setEvent
        │   - clearEvent
        ├── File.ts
        │   - copy
        │   - directory
        │   - download
        │   - exist
        │   - getInfo
        │   - move
        │   - open
        │   - remove
        │   - resizeImage
        │   - rotateImage
        │   - unzip
        │   - upload
        │   - zip
        ├── Localization.ts
        │   - getLocale
        │   - setLocale
        ├── Logger.ts
        │   - info
        │   - log
        │   - warn
        │   - debug
        │   - error
        ├── Network.ts
        │   - changeLocale
        │   - requestLogin
        │   - requestTr
        │   - requestHttp
        │   - requestApi
        ├── Properties.ts
        │   - get
        │   - remove
        │   - set
        │   - setList
        ├── Push.ts
        │   - getAlarm
        │   - getMessageList
        │   - getPushKey
        │   - getUnreadCount
        │   - readMessage
        │   - readReceiptMessage
        │   - registerToServer
        │   - reset
        │   - sendMessage
        │   - setAlarm
        │   - setBadgeCount
        ├── Storage.ts
        │   - get
        │   - remove
        │   - set
        │   - setList
        ├── System.ts
        │   - callBrowser
        │   - callCamera
        │   - callGallery
        │   - callMap
        │   - callSMS
        │   - callTEL
        │   - getGPS
        └── Window.ts
            - openSignPad
            - openCodeReader
            - openFileExplorer
            - openImageViewer
```

```ts
import File from '@/bizMOB/Xross/File';

const onBizMOB = async() => {
    const res: any = await File.copy({
        _sSourcePath: '{external}/document/temp.png', // 복사할 파일의 경로
        _sTargetPath: '{external}/app/temp.png', // 복사될 경로
        _bMock: false, // Mock 데이터 사용 여부
    });

    console.log(res);
};
```

### Mock 데이터 호출

- API 호출시 `_bMock: true`로 요청

```ts
import Network from '@/bizMOB/Xross/Network';

const onBizMOBReqTr = async() => {
    const res: any = await Network.requestTr({
        _bMock: true, // mock 데이터 호출 여부
        _sTrcode: 'DM0002',
        _oBody: {
            startIndex: 0,
            endIndex: 9
        },
    });

    console.log(res);
};
```

- Network Mock 데이터 위치: `public/mock/[Trcode].json`
- Native API Mock 데이터 위치: `public/mock/bizMOB/**/*.json`

### bizMOB JWT Token 통신

- (작성 예정)

### bizMOB 암호화 통신

- Web과 App에서 암호화 통신을 하는 방법에 차이가 있음
  - **App**: Native에 App 빌드시 암호화 여부를 요청시 Native에서 처리
  - **Web**: Client에서 암호화 키 발급과 갱신 처리를 추가해야  함
- Web에서 암호화 통신을 ON 하기 위해서는 .env파일에 있는 `VUE_APP_ENCRYPTION_USE` 변수를 `'true'` 로 변경
- Web에서 암호화 통신에 사용될 키와 토큰 발급을 위해는 `bizMOB BzCrypto`의 `shareAuthKey` 호출

```ts
// 키 발급
import BzCrypto from '@/bizMOB/Auth/BzCrypto';

const shareAuthKey = async () => {
    // 토큰 발급 여부 확인
    if (!BzCrypto.isToken()) {
        try {
            // 필요한 경우 Client Loading Progress 추가
            await BzCrypto.shareAuthKey({
                _bProgressEnable: false, // Native App Progress 사용 여부
            });
        } catch (error) {
            // Project 환경에 맞춰서 Error Message 처리
        }
    }
};
```

- Web에서 통신 중에 토큰이 만료된 경우 토큰 갱신 후에 재요청 필요

```ts
// 키 갱신
import BzCrypto from '@/bizMOB/Auth/BzCrypto';

const renewAuthToken = async () => {
    // 토큰 만료 여부 확인
    if (BzCrypto.isExpiredToken()) {
        try {
            // 필요한 경우 Client Loading Progress 추가
            await BzCrypto.renewAuthToken({
                _bProgressEnable: false, // Native App Progress 사용 여부
            });
        } catch (error) {
            // TODO Project 환경에 맞춰서 Error Message 처리
        }
    }
};
```

- 일반 전문 호출시 세션과 관련된 에러코드 추가됨
  - **`EAH000`**: 서버의 세션이 만료. 키 재발급 필요 (shareAuthKey)
  - **`EAH001`**: 암호화 인증 토큰 만료. 토큰 갱신 필요 (renewAuthToken)

### bizMOB Native i18n 값 셋팅

- 다국어 처리를 해야 하는 경우 bizMOB의 `LocaleService`를 통해서 Native의 다국어 코드를 수정할 수 있음
- 초기화를 해야 할 경우 `LocaleService`의 `initLocale` 호출

```ts
// App.vue
import { onMounted } from 'vue';
import { LocaleService } from '@/bizMOB/Service';
import Event from '@/bizMOB/Xross/Event';

const localeService = new LocaleService();

onMounted(async () => {
    Event.setEvent('ready', init);
});

// App, Web initialization code here
const init = () => {
    localeService.initLocale(); // 언어 초기화
};
```

- 언어를 변경해야 할 경우 `LocaleService`의 `changeLocale` 호출

```ts
// README.vue
import { LocaleService } from '@/bizMOB/Service';

const localeService = new LocaleService();

const onLocaleService = async() => {
    // 언어 코드에 따른 full code 프리셋은 public/bizMOB/bizMOB-locale.js에 작성되어 있음
    localeService.changeLocale('ko-KR'); // 또는 'ko' (프리셋에 등록되어 있어야 함.)

    console.log(await localeService.getLocale()); // {result: true, locale: 'ko-KR'}
};
```

### GlobalShared Data

- bizMOB 내부에 구현된 Vuex를 이용한 상태관리 공용 모듈
- Vuex 또는 Pinia를 따로 셋팅해서 사용하고 싶지 않다면 해당 서비스 이용
- 해당 변수는 sessionStorage나 localStorage에 저장되지 않기 때문에 Storage 저장이 필요한 경우 추가 작업 필요

```ts
// README.vue
import { GlobalDataService } from '@/bizMOB/Service';

const globalDataService = GlobalDataService();

const onGlobalDataService = () => {
    globalDataService.setGlobalDataByKey('foo', 'bar'); // 저장 (sessionStorage)

    console.log(globalDataService.getGlobalDataByKey('foo')); // bar
};
```
