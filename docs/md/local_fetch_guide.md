# 📘 localFetch.ts 사용 가이드

## 📌 목적

이 파일은 **Vue 프로젝트에서 서버 없이도 개발을 진행할 수 있도록 만들어진 Mock API 도구**입니다.\
`fetch` 함수와 갈이 같이 사용할 수 있으며, 데이터는 `localStorage`에 저장됩니다.

주니어 개발자도 **실제 서버 연동 환경을 학습하고 구현 테스트**까지 가능하도록 구성되어 있습니다.

[Download](https://rireya.github.io/mcnc-study/file/localFetch.ts)

---

## 📁 파일 위치

```bash
src/
├── api/
│   └── localFetch.ts  ← 본 파일
└── views/
    └── {화면}.vue  ← 예제 컨포넌트
```

---

## 🛠️ 해당 기능

| 기능                    | 설명                                                        |
| --------------------- | --------------------------------------------------------- |
| `localStorage` 기본 저장  | 실제 서버 없이 사용자 정보와 게시글 저장 가능                                |
| fetch 스타일 인터페이스       | `await localFetch(url, { method, body })`                 |
| 지연 응답 지원              | 100 \~ 500ms 랜덤 시간 응답                                     |
| POST 요청만 처리           | 현재는 `method: 'POST'` 만 사용                                 |
| 서버처럼 `Response` 객체 반환 | `response.ok`, `response.status`, `response.json()` 사용 가능 |

---

## 🔧 사용 방법

```ts
import { localFetch } from '@/api/localFetch'

const response = await localFetch('/login', {
  method: 'POST',
  body: {
    userId: 'tester',
    password: '1234'
  }
})

if (response.ok) {
  const data = await response.json()
  console.log(data.userId)
} else {
  alert(`[${response.status}] ${response.statusText}`)
}
```

---

## 📒 지원 API 목록

### 🔐 `/login`

- **기능**: 로그인 및 처음 등록
- **입력**: `{ userId, password }`
- **출력**: `{ userId }`

### 📄 `/list`

- **기능**: 게시글 목록 조회 (uac80색 + 페이지링)
- **입력**: `{ pageNumber, keyword }`
- **출력**:
  ```json
  {
    "pageNumber": 1,
    "pageSize": 3,
    "totalCount": 5,
    "list": [ { ...게시글 } ]
  }
  ```

### 📌 `/get`

- **기능**: 게시글 상세 조회
- **입력**: `{ boardSeq }`
- **출력**: `{ boardSeq, title, contents, userId, regDate, modDate }`

### 📝 `/post`

- **기능**: 게시글 등록
- **입력**: `{ title, contents, userId }`
- **출력**: `{ boardSeq }`

### ✏️ `/update`

- **기능**: 게시글 수정 (작성자만 가능)
- **입력**: `{ boardSeq, title, contents, userId }`
- **출력**: `{}`

### ❌ `/delete`

- **기능**: 게시글 삭제 (작성자만 가능)
- **입력**: `{ boardSeq, userId }`
- **출력**: `{}`

---

## 🧠 내부 규칙 요약

| 항목                  | 설명                                    |
| ------------------- | ------------------------------------- |
| 게시글 ID (`boardSeq`) | `Date.now().toString()` 사용            |
| 날짜 포맷               | `yyyymmdd hhmmss` 형식                  |
| 검색 필터               | 제목 + 내용 포함 조건                         |
| 정렬 기준               | 등록일자 기준 최신순 내림차순                      |
| 저장소 키 이름            | `loginMap`, `boardMap` (localStorage) |

---

## 🚧 주의사항

- `method`는 항상 `'POST'` 로 호출해야 합니다.
- 사용자 인증은 간단한 비밀번호 매칭만 지원합니다.
- HTML 필터링/입력 검증은 없습니다 (실제 서비스용이 아닙니다).
- localStorage 데이터는 브라우저 저장소에 남아있으므로 필요시 수동 초기화해야 합니다.

---

## 🔪 개발 테스트 핀

- 크론 개발자도구 > Application > localStorage에서 데이터 지정 확인 가능
- 초기 테스트시 `localStorage.clear()` 로 초기화 가능

---

## 👨‍🏫 교육 포인트

- **REST API 환경 차이 학습**: request → response 환경 이호하기
- **에러 처리 방식 학습**: statusCode, ok, statusText 사용
- **SPA 구조 이호**: 로그인, 목록, 상세, 작성/수정 환경
