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

## bizMOB Typescript Adapter 호출

javaScript로 구현된 bizMOB 서비스를 Typescript 형식으로 사용할 수 있도록 하는 Adapter

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

- JWT Token을 이용한 인증 방식과 연관된 기능
- 서버에서 Session과 Token 방식 중에서 **Token 방식**을 이용시 사용
- 일반 전문 호출시 JWT Token과 관련된 에러코드 추가됨
  - **ERR000**: Access Token 검증 실패. Token 재발행 필요 (renewToken)
- **Token 방식에서 재발행과 관련된 기능을 사용할 경우 동시 통신에서 재발행 로직 구현시 주의 필요**
  - Access Token이 만료된 상태에서 3개의 전문을 동시에 호출시.
  - Access Token 재발행 통신을 3번 호출시 모두 새로 재발행 되며, 3개 모두 유효한 토큰
  - 프로젝트 상황에 맞춰서 로직 개발

```ts
// JWT Token 초기화
import Network from '@/bizMOB/Xross/Network';
import BzToken from '@/bizMOB/Auth/BzToken';

const sample = async () => {
    // 로그인 로직
    const res: any = await Network.requestLogin({
        _bMock: false,
        _sTrcode: 'DM0001',
        _sUserId: 'tester1',
        _sPassword : '1111',
        _oBody: {
            userId: 'tester1',
            passwd: '1111',
        }
    });

    if (res.result) {
        // 사용자 정보 저장
        userStore.dispatch('setUser', res.body);

        // 프로젝트 내에 JWT Token 정보 저장
        authStore.dispatch('setTokenInfo', {
            accessToken: res.accessToken, // 로그인 인증 Token
            accessTokenExpTime: res.accessTokenExpTime, // 로그인 인증 Token 만료 시간 (yyyy-MM-dd HH:mm:ss)
            refreshToken: res.refreshToken, // 로그인 갱신 Token
            refreshTokenExpTime: res.refreshTokenExpTime, // 로그인 갱신 Token 만료 시간 (yyyy-MM-dd HH:mm:ss)
        });

        // bizMOB 설정
        BzToken.init({
            accessToken: res.accessToken, // 로그인 인증 Token
            accessTokenExpTime: res.accessTokenExpTime, // 로그인 인증 Token 만료 시간 (yyyy-MM-dd HH:mm:ss)
            refreshToken: res.refreshToken, // 로그인 갱신 Token
            refreshTokenExpTime: res.refreshTokenExpTime, // 로그인 갱신 Token 만료 시간 (yyyy-MM-dd HH:mm:ss)
        });
    }
};
```

```ts
// JWT Token 재발행
import BzToken from '@/bizMOB/Auth/BzToken';

const sample = async () => {
    if (BzToken.isTokenExpired()) {
        const res: any = await BzToken.renewToken();

        // 프로젝트 내에 JWT Token 정보 저장
        authStore.dispatch('setTokenInfo', {
            accessToken: res.accessToken, // 로그인 인증 Token
            accessTokenExpTime: res.accessTokenExpTime, // 로그인 인증 Token 만료 시간 (yyyy-MM-dd HH:mm:ss)
            refreshToken: res.refreshToken, // 로그인 갱신 Token
            refreshTokenExpTime: res.refreshTokenExpTime, // 로그인 갱신 Token 만료 시간 (yyyy-MM-dd HH:mm:ss)
        });
    }
};
```

```ts
// 저장된 값 조회 함수
import BzToken from '@/bizMOB/Auth/BzToken';

const sample = () => {
    console.log(BzToken.getAccessToken()); // 인증 토큰 조회
    console.log(BzToken.getAccessTokenExpTime()); // 인증 토큰 만료 시간 조회 (yyyy-MM-dd HH:mm:ss)
    console.log(BzToken.getRefreshToken()); // 갱신 토큰 조회
    console.log(BzToken.getRefreshTokenExpTime()); // 갱신 토큰 만료 시간 조회 (yyyy-MM-dd HH:mm:ss)
};
```

### bizMOB 암호화 통신

- 서버 통신시 Body 데이터 암호화와 연관된 기능
- Web과 App에서 암호화 통신을 하는 방법에 차이가 있음
  - **App**: `public/bizMOB/app.config`파일의 `ENCRYPTION_USE`를 true로 설정 (운영, 품질, 개발 별도로 존재)
  - **Web**: `.env.{개발환경}` 파일에 있는 `VUE_APP_ENCRYPTION_USE`를 `'true'` 로 설정 후 **암호화 관련 로직** 추가
- 일반 전문 호출시 암호화 통신과 관련된 에러코드 추가됨
  - **EAH000**: 서버의 암호키 세션이 만료. 키 재발급 필요 (shareAuthKey)
  - **EAH001**: 서버의 암호화 인증 토큰 만료. 토큰 재발행 필요 (renewAuthToken)
- **암호화 통신 기능에서 인증 토큰 재발행과 관련된 기능을 사용할 경우 동시 통신에서 재발행 로직 구현시 주의 필요**
  - Auth Token이 만료된 상태에서 3개의 전문을 동시에 호출시.
  - Auth Token 재발행을 3번 호출시 모두 새로 재발행 되며, 3개 모두 유효한 토큰
  - 프로젝트 상황에 맞춰서 로직 개발

```ts
// 키 초기화
import BzCrypto from '@/bizMOB/Auth/BzCrypto';

const sample = async () => {
    // Store 등을 통해서 관리되고 있는 암호화 관련 정보
    const cryptoInfo = authStore.getter('cryptoInfo');

    // 암호화 통신 변수 초기화
    if (!BzCrypto.isInit()) {
        /**
         * 초기 값 설정
         * 초기 값은 프로젝트 내의 로직으로 저장 관리 필요.
         * Store 등을 통해서 관리하는 경우 초기에 null이 아닌 Store의 값을 설정.
         */
        BzCrypto.init({
            crySymKey: cryptoInfo.crySymKey,
            cryAuthToken: cryptoInfo.cryAuthToken,
            cryAuthTokenExpTime: cryptoInfo.cryAuthTokenExpTime,
            cryRefreshToken: cryptoInfo.cryRefreshToken,
            cryRefreshTokenExpTime: cryptoInfo.cryRefreshTokenExpTime,
        })
    }
};
```

```ts
// 신규 키 & 인증 토큰 발급
import BzCrypto from '@/bizMOB/Auth/BzCrypto';

const sample = async () => {
    // 토큰 발급 여부 확인
    if (BzCrypto.isTokenRequired()) {
        try {
            /**
             * shareAuthKey 호출시 내부 변수 값 설정까지 같이 진행
             */
            const crypto = await BzCrypto.shareAuthKey();

            /**
             * 암호화 정보를 관리하는 Store 등에 저장
             */
            authStore.dispatch('setCryptoInfo', {
                crySymKey: crypto.crySymKey,
                cryAuthToken: crypto.cryAuthToken,
                cryAuthTokenExpTime: crypto.cryAuthTokenExpTime,
                cryRefreshToken: crypto.cryRefreshToken,
                cryRefreshTokenExpTime: crypto.cryRefreshTokenExpTime,
            });
        } catch (error) {
            /**
             * Project 환경에 맞춰서 Error Message 처리
             *
             * 키 공유 전문(BM4001)
             *     BM4001IMPL0001
             *         서버에서 암호화 키 생성 과정에서 오류 발생(요청 cryPbKey 값이 잘못 되었거나, 서버 오류)
             *         서버 로그 확인 필요
             */
        }
    }

    console.log(BzCrypto.getCryAuthToken()) // 인증 토큰
};
```

```ts
// 인증 토큰 재발행
import BzCrypto from '@/bizMOB/Auth/BzCrypto';

const sample = async () => {
    // 토큰 만료 여부 확인
    if (BzCrypto.isTokenExpired()) {
        try {
            /**
             * BzCrypto 내에 저장되어 있는 변수 값을 기준으로 재발행 요청
             */
            const crypto = await BzCrypto.renewAuthToken();

            /**
             * 암호화 정보를 관리하는 Store 등에 저장
             */
            authStore.dispatch('setCryptoInfo', {
                crySymKey: crypto.crySymKey,
                cryAuthToken: crypto.cryAuthToken,
                cryAuthTokenExpTime: crypto.cryAuthTokenExpTime,
                cryRefreshToken: crypto.cryRefreshToken,
                cryRefreshTokenExpTime: crypto.cryRefreshTokenExpTime,
            });
        } catch (error) {
            /**
             * Project 환경에 맞춰서 Error Message 처리
             *
             * 토큰 갱신 전문(BM4002)
             *     BM4002TKER1001
             *         유효하지 않은 토큰 (bizMOB Server에서 생성된 토큰이 아닐 경우, 일반적인 상황에서는 발생 안됨)
             *     BM4002TKER1002
             *         Refresh token 이 만료 되었을 경우 발생
             *         키공유전문(BM4001) 다시 호출하여 신규 암호화키, 토큰 발행
             */
        }
    }

    console.log(BzCrypto.getCryAuthToken()) // 인증 토큰
};
```

```ts
// 저장된 값 조회 함수
import BzCrypto from '@/bizMOB/Auth/BzCrypto';

const sample = () => {
    console.log(BzCrypto.getSymKey()); // 암호화 키 조회
    console.log(BzCrypto.getCryAuthToken()); // 인증 토큰 조회
    console.log(BzCrypto.getCryAuthTokenExpTime()); // 인증 토큰 만료 시간 조회 (yyyy-MM-dd HH:mm:ss)
    console.log(BzCrypto.getCryRefreshToken()); // 갱신 토큰 조회
    console.log(BzCrypto.getCryRefreshTokenExpTime()); // 갱신 토큰 만료 시간 조회 (yyyy-MM-dd HH:mm:ss)
};
```

```ts
// 전체 과정 Sample
import BzCrypto from '@/bizMOB/Auth/BzCrypto';

const processSample = async () => {
    // Store 등을 통해서 관리되고 있는 암호화 관련 정보
    const cryptoInfo = authStore.getter('cryptoInfo');

    // 암호화 통신 변수 초기화
    if (!BzCrypto.isInit()) {
        BzCrypto.init({
            crySymKey: cryptoInfo.crySymKey,
            cryAuthToken: cryptoInfo.cryAuthToken,
            cryAuthTokenExpTime: cryptoInfo.cryAuthTokenExpTime,
            cryRefreshToken: cryptoInfo.cryRefreshToken,
            cryRefreshTokenExpTime: cryptoInfo.cryRefreshTokenExpTime,
        })
    }

    // 토큰 발급 여부 확인
    if (BzCrypto.isTokenRequired()) {
        try {
            // 암호화 키 & 인증 토큰 신규발행
            const crypto = await BzCrypto.shareAuthKey();

            // 암호화 정보 저장
            authStore.dispatch('setCryptoInfo', {
                crySymKey: crypto.crySymKey,
                cryAuthToken: crypto.cryAuthToken,
                cryAuthTokenExpTime: crypto.cryAuthTokenExpTime,
                cryRefreshToken: crypto.cryRefreshToken,
                cryRefreshTokenExpTime: crypto.cryRefreshTokenExpTime,
            });
        } catch (error) {
            // Project 환경에 맞춰서 Error Message 처리
        }
    }
    // 토큰 만료 여부 확인
    else if (BzCrypto.isTokenExpired()) {
        try {
            // 인증 토큰 재발행
            const crypto = await BzCrypto.renewAuthToken();

            // 암호화 정보 저장
            authStore.dispatch('setCryptoInfo', {
                crySymKey: crypto.crySymKey,
                cryAuthToken: crypto.cryAuthToken,
                cryAuthTokenExpTime: crypto.cryAuthTokenExpTime,
                cryRefreshToken: crypto.cryRefreshToken,
                cryRefreshTokenExpTime: crypto.cryRefreshTokenExpTime,
            });
        } catch (error) {
            // Project 환경에 맞춰서 Error Message 처리
        }
    }
};
```

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

### TrackingService

- 화면 이동 추적시 사용할 서비스
- 기본 골격만 생성해둔 상태로 requestTr을 호출하는 형식으로 함수 개발
- 추후 필요한 기능을 `mhchoi@mcnc.co.kr`로 요청시 추가 개선 예정

```ts
// README.vue
import { TrackingService } from '@/bizMOB/Service';

router.afterEach((to, from) => {
    // bizMOB Backbutton Default Event Setup
    Device.isApp() && Event.setEvent('backbutton', () => router.back());

    // 화면 추적 전문 호출 서비스
    TrackingService.track({
        _sTrcode: 'DM9999',
        _oBody: {
            _sUrl: to.path,
        },
    });
});
```

### 클래스별 지원 함수

```plaintext
src/
└ bizMOB/
    └ Xross/
        ├─ App.ts
        │     callPlugIn
        │     exit
        │     getTimeout
        │     setTimeout
        │     hideSplash
        │
        ├─ Contacts.ts
        │     get
        │
        ├─ Database.ts
        │     beginTransaction
        │     closeDatabase
        │     commitTransaction
        │     executeBatchSql
        │     executeSelect
        │     executeSql
        │     openDatabase
        │     rollbackTransaction
        │
        ├─ Device.ts
        │     getInfo
        │     isApp
        │     isWeb
        │     isMobile
        │     isPC
        │     isAndroid
        │     isIOS
        │     isTablet
        │     isPhone
        │
        ├─ Event.ts
        │     setEvent
        │     clearEvent
        │
        ├─ File.ts
        │     copy
        │     directory
        │     download
        │     exist
        │     getInfo
        │     move
        │     open
        │     remove
        │     resizeImage
        │     rotateImage
        │     unzip
        │     upload
        │     zip
        │
        ├─ Localization.ts
        │     getLocale
        │     setLocale
        │
        ├─ Logger.ts
        │     info
        │     log
        │     warn
        │     debug
        │     error
        │
        ├─ Network.ts
        │     changeLocale
        │     requestLogin
        │     requestTr
        │     requestHttp
        │     requestApi
        │
        ├─ Properties.ts
        │     get
        │     remove
        │     set
        │     setList
        │
        ├─ Push.ts
        │     getAlarm
        │     getMessageList
        │     getPushKey
        │     getUnreadCount
        │     readMessage
        │     readReceiptMessage
        │     registerToServer
        │     reset
        │     sendMessage
        │     setAlarm
        │     setBadgeCount
        │
        ├─ Storage.ts
        │     get
        │     remove
        │     set
        │     setList
        │
        ├─ System.ts
        │     callBrowser
        │     callCamera
        │     callGallery
        │     callMap
        │     callSMS
        │     callTEL
        │     getGPS
        │
        └─ Window.ts
               openSignPad
               openCodeReader
               openFileExplorer
               openImageViewer
```
