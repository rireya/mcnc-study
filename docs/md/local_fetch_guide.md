# 📘 localFetch.ts 사용 가이드

## 📌 목적

이 파일은 **Vue 프로젝트에서 서버 없이도 개발을 진행할 수 있도록 만들어진 Mock API 도구**입니다.\
`fetch` 함수와 유사하게 사용할 수 있으며, 데이터는 `localStorage`에 저장됩니다.

주니어 개발자도 **실제 서버 연동 환경을 학습하고 구현 테스트**까지 가능하도록 구성되어 있습니다.

---

## 📁 파일 위치

```
src/
└── api/
    └── localFetch.ts  ← 본 파일
```

---

## 🛠️ 주요 기능 요약

- localStorage 기반 데이터 저장
- fetch 스타일 인터페이스 제공: `localFetch(url, { method, body })`
- 응답 지연 시뮬레이션 (100 \~ 500ms)
- POST 요청만 처리
- JS fetch와 동일한 `Response` 객체 반환 구조 (`ok`, `status`, `json()` 등 지원)

---

## 🔧 사용 예시

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

## 📒 지원 API

### 🔐 `/login`

- 기능: 로그인 및 처음 등록
- 입력: `{ userId, password }`
- 출력: `{ userId }`

### 📄 `/list`

- 기능: 게시글 목록 조회 (검색 + 페이지네이션)
- 입력: `{ pageNumber, keyword }`
- 출력:

```json
{
  "pageNumber": 1,
  "pageSize": 3,
  "totalCount": 5,
  "list": [ { ...게시글 } ]
}
```

### 📌 `/get`

- 기능: 게시글 상세 조회
- 입력: `{ boardSeq }`
- 출력: `{ boardSeq, title, contents, userId, regDate, modDate }`

### 📝 `/post`

- 기능: 게시글 등록
- 입력: `{ title, contents, userId }`
- 출력: `{ boardSeq }`

### ✏️ `/update`

- 기능: 게시글 수정 (작성자만 가능)
- 입력: `{ boardSeq, title, contents, userId }`
- 출력: `{}`

### ❌ `/delete`

- 기능: 게시글 삭제 (작성자만 가능)
- 입력: `{ boardSeq, userId }`
- 출력: `{}`

---

## 🧠 내부 규칙 요약

- 게시글 ID(`boardSeq`)는 `Date.now().toString()` 방식 사용
- 날짜 포맷은 `yyyymmdd hhmmss` 형식
- 검색은 제목 + 내용 포함 조건
- 정렬은 등록일자 기준 최신순 내림차순
- 저장소 키 이름: `loginMap`, `boardMap`

---

## 🚧 주의사항

- `method`는 항상 `'POST'`로 호출해야 합니다.
- 사용자 인증은 간단한 비밀번호 매칭만 지원합니다.
- HTML 필터링/입력 검증은 없습니다 (실제 서비스용이 아닙니다).
- localStorage 데이터는 브라우저 저장소에 남아 있으므로 필요시 수동 초기화해야 합니다.

---

## 🧪 테스트 팁

- Chrome 개발자도구 > Application > localStorage에서 직접 확인 가능
- 초기화 시 `localStorage.clear()` 사용

---

## 👨‍🏫 교육 포인트

- REST API 흐름 학습: request → response 구조 익히기
- 에러 처리 방식 학습: statusCode, ok, statusText
- 상태 기반 SPA 구성 흐름 이해: 로그인, 목록, 상세, 등록/수정, 삭제
