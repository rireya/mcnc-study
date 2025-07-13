# 📚 실무 용어 및 키워드 사전

## 🎯 목적

SI 프로젝트에서 **자주 사용되는 용어들과 키워드**를 정리하여 **원활한 소통**과 **빠른 업무 적응**을 돕습니다.

---

## 💼 프로젝트 관리 용어

### 프로젝트 단계

```text
📋 프로젝트 라이프사이클:

분석(Analysis):
- 요구사항 분석
- 업무 분석
- 현행 시스템 분석
- As-Is / To-Be 분석

설계(Design):
- 시스템 설계
- DB 설계
- UI/UX 설계
- API 설계

개발(Development):
- 프론트엔드 개발
- 백엔드 개발
- 퍼블리싱
- 단위 테스트

테스트(Testing):
- 단위 테스트 (Unit Test)
- 통합 테스트 (Integration Test)
- 시스템 테스트 (System Test)
- 사용자 승인 테스트 (UAT)

이행(Migration):
- 데이터 이행
- 시스템 이행
- 병렬 운영
- 전환

운영(Operation):
- 시스템 운영
- 유지보수
- 장애 대응
- 성능 모니터링
```

### 일정 관리 용어

```text
📅 스케줄 관리:

WBS (Work Breakdown Structure):
- 작업 분해 구조
- 프로젝트를 작은 단위로 나눔

마일스톤 (Milestone):
- 중요한 완료 지점
- 프로젝트 진척도 측정 기준

Critical Path (임계 경로):
- 프로젝트 완료까지 가장 긴 경로
- 지연 시 전체 일정에 영향

Buffer Time (버퍼 시간):
- 예상치 못한 지연을 위한 여유 시간

실무에서 자주 쓰는 표현:
- "마감일이 타이트해요"
- "일정이 딜레이되고 있어요"
- "크리티컬 패스에 있는 작업입니다"
- "버퍼를 좀 더 넣어야겠어요"
```

---

## 🔧 기술 용어

### 프론트엔드 기술

```text
🎨 FE 개발 관련:

SPA (Single Page Application):
- 단일 페이지 애플리케이션
- 페이지 새로고침 없이 콘텐츠 변경

SSR (Server Side Rendering):
- 서버에서 HTML을 미리 생성
- SEO 및 초기 로딩 속도 개선

CSR (Client Side Rendering):
- 클라이언트에서 HTML 생성
- 사용자 상호작용 후 빠른 반응

PWA (Progressive Web App):
- 웹과 앱의 장점을 결합
- 오프라인 지원, 푸시 알림 등

Hydration:
- SSR로 생성된 HTML에 JavaScript 기능 추가

Tree Shaking:
- 사용하지 않는 코드 제거
- 번들 크기 최적화

Code Splitting:
- 코드를 여러 번들로 분할
- 필요할 때만 로드

Lazy Loading:
- 지연 로딩
- 필요한 시점에 리소스 로드
```

### 백엔드 연동

```text
🔌 API 관련:

REST API:
- RESTful한 API 설계 원칙
- GET, POST, PUT, DELETE 메서드

GraphQL:
- 쿼리 언어 기반 API
- 필요한 데이터만 요청 가능

CORS (Cross-Origin Resource Sharing):
- 교차 출처 리소스 공유
- 브라우저 보안 정책

JWT (JSON Web Token):
- 토큰 기반 인증
- 상태가 없는(stateless) 인증

OAuth:
- 제3자 인증 프로토콜
- 소셜 로그인 등에 사용

WebSocket:
- 양방향 실시간 통신
- 채팅, 실시간 업데이트 등

SSE (Server-Sent Events):
- 서버에서 클라이언트로 일방향 스트리밍

실무 표현:
- "API 스펙을 확인해 주세요"
- "CORS 에러가 발생했어요"
- "토큰이 만료되었습니다"
- "실시간 연동이 필요합니다"
```

---

## 🎨 디자인 및 UI/UX 용어

### 디자인 시스템

```text
🎨 디자인 관련:

Design System:
- 일관된 디자인 가이드라인
- 컴포넌트, 색상, 타이포그래피 등

UI Kit:
- 재사용 가능한 UI 컴포넌트 모음

Style Guide:
- 디자인 규칙과 가이드라인

Atomic Design:
- 원자, 분자, 유기체, 템플릿, 페이지 단위로 설계

Material Design:
- 구글의 디자인 언어

Human Interface Guidelines:
- 애플의 디자인 가이드라인

실무에서 사용:
- "디자인 시스템에 맞춰서 개발해 주세요"
- "UI 키트에 있는 컴포넌트를 사용하세요"
- "가이드라인을 벗어나지 않게 주의해 주세요"
```

### 사용자 경험

```text
🧠 UX 관련:

User Journey:
- 사용자가 목표를 달성하기까지의 과정

User Flow:
- 사용자의 화면 이동 흐름

Wireframe:
- 화면 구조 설계도
- 기능과 콘텐츠 배치

Mockup:
- 실제와 유사한 화면 디자인

Prototype:
- 동작하는 시제품
- 상호작용 확인 가능

A/B Testing:
- 두 가지 버전 비교 테스트

Usability Testing:
- 사용성 테스트

Accessibility (접근성):
- 장애인도 사용할 수 있는 설계

실무 표현:
- "사용자 플로우를 확인해 주세요"
- "와이어프레임 검토 부탁드립니다"
- "접근성을 고려해서 개발해 주세요"
- "A/B 테스트를 진행해 보겠습니다"
```

---

## 📱 모바일 웹 용어

### 반응형 디자인

```text
📱 모바일 관련:

Responsive Web Design:
- 다양한 화면 크기에 대응하는 디자인

Adaptive Design:
- 특정 화면 크기에 맞춘 디자인

Mobile First:
- 모바일을 우선으로 설계하는 접근법

Breakpoint:
- 화면 크기별 구분점

Viewport:
- 브라우저에서 보이는 영역

Touch Target:
- 터치할 수 있는 영역
- 최소 44px × 44px 권장

Gesture:
- 터치 제스처 (스와이프, 핀치 등)

실무에서:
- "반응형으로 구현해 주세요"
- "모바일 퍼스트로 개발하겠습니다"
- "브레이크포인트를 확인해 주세요"
- "터치 타겟이 너무 작아요"
```

### 성능 최적화

```text
⚡ 성능 관련:

Core Web Vitals:
- 구글이 정의한 웹 성능 지표

LCP (Largest Contentful Paint):
- 가장 큰 콘텐츠가 렌더링되는 시간

FID (First Input Delay):
- 첫 번째 입력에 대한 응답 시간

CLS (Cumulative Layout Shift):
- 누적 레이아웃 이동

FCP (First Contentful Paint):
- 첫 번째 콘텐츠가 나타나는 시간

TTI (Time to Interactive):
- 페이지가 상호작용 가능해지는 시간

TTFB (Time to First Byte):
- 첫 번째 바이트까지의 시간

Critical Rendering Path:
- 중요한 렌더링 경로

Above the Fold:
- 스크롤 없이 보이는 영역

실무 표현:
- "라이트하우스 점수를 개선해야 해요"
- "LCP를 줄여보겠습니다"
- "Above the fold 최적화가 필요해요"
```

---

## 🔄 개발 프로세스 용어

### 버전 관리

```text
🌳 Git 관련:

Repository (저장소):
- 코드가 저장되는 공간

Branch (브랜치):
- 독립적인 개발 라인

Merge (병합):
- 브랜치를 합치는 작업

Pull Request / Merge Request:
- 코드 변경 요청

Commit (커밋):
- 변경사항을 저장하는 단위

Push (푸시):
- 로컬 변경사항을 원격 저장소에 전송

Pull (풀):
- 원격 저장소의 변경사항을 로컬로 가져오기

Conflict (충돌):
- 같은 파일의 같은 부분을 다르게 수정했을 때

Rebase:
- 커밋 히스토리를 재정렬

Cherry-pick:
- 특정 커밋만 선택해서 적용

실무에서:
- "브랜치 따서 개발해 주세요"
- "PR 올려주시면 리뷰하겠습니다"
- "컨플릭트 해결해 주세요"
- "리베이스 후에 푸시해 주세요"
```

### 코드 품질

```text
🔍 품질 관리:

Code Review:
- 코드 검토

Refactoring:
- 기능 변경 없이 코드 구조 개선

Technical Debt:
- 기술 부채
- 나중에 해결해야 할 문제들

Legacy Code:
- 기존 코드, 오래된 코드

Clean Code:
- 읽기 쉽고 유지보수 가능한 코드

SOLID 원칙:
- 객체지향 설계 원칙

DRY (Don't Repeat Yourself):
- 중복 제거 원칙

KISS (Keep It Simple, Stupid):
- 단순하게 유지하라

Linting:
- 코드 스타일 검사

실무 표현:
- "리팩토링이 필요해 보여요"
- "레거시 코드를 건드리기 어려워요"
- "클린 코드로 작성해 주세요"
- "DRY 원칙을 적용했습니다"
```

---

## 🏢 조직 및 역할 용어

### 프로젝트 조직

```text
👥 조직 구성:

PM (Project Manager):
- 프로젝트 관리자
- 일정, 예산, 리스크 관리

PL (Project Leader):
- 프로젝트 리더
- 기술적 리더십

TA (Technical Architect):
- 기술 아키텍트
- 시스템 아키텍처 설계

DA (Data Architect):
- 데이터 아키텍트
- 데이터 모델링

AA (Application Architect):
- 애플리케이션 아키텍트

QA (Quality Assurance):
- 품질 보증
- 테스트 담당

BA (Business Analyst):
- 업무 분석가
- 요구사항 분석

실무에서:
- "PM에게 일정 확인해 보겠습니다"
- "TA 검토가 필요합니다"
- "QA 팀에서 테스트 중입니다"
```

### 개발팀 역할

```text
💻 개발팀 구성:

Frontend Developer:
- 프론트엔드 개발자
- 사용자 인터페이스 개발

Backend Developer:
- 백엔드 개발자
- 서버 사이드 로직 개발

Fullstack Developer:
- 풀스택 개발자
- 프론트엔드와 백엔드 모두 개발

DevOps Engineer:
- 개발과 운영의 연결고리
- CI/CD, 인프라 관리

Publisher:
- 퍼블리셔
- HTML, CSS 마크업

UI/UX Designer:
- 사용자 인터페이스/경험 디자이너

DBA (Database Administrator):
- 데이터베이스 관리자

실무 표현:
- "프론트엔드 개발자와 협의해 주세요"
- "퍼블리셔가 마크업해 주시면 기능 붙이겠습니다"
- "DevOps 엔지니어에게 배포 요청하겠습니다"
```

---

## 📊 비즈니스 용어

### 고객 관련

```text
🏢 고객사 용어:

End User:
- 최종 사용자
- 실제 시스템을 사용하는 사람

Stakeholder:
- 이해관계자
- 프로젝트에 영향을 주고받는 모든 사람

Sponsor:
- 후원자
- 프로젝트 예산을 승인하는 사람

Key User:
- 핵심 사용자
- 업무를 잘 아는 현업 담당자

Power User:
- 파워 유저
- 시스템을 능숙하게 사용하는 사용자

SME (Subject Matter Expert):
- 업무 전문가
- 특정 영역의 전문 지식을 가진 사람

실무에서:
- "키유저와 미팅 잡겠습니다"
- "최종 사용자 입장에서 생각해 보세요"
- "스테이크홀더들과 공유하겠습니다"
```

### 계약 및 일정

```text
📋 계약 관련:

SOW (Statement of Work):
- 작업 명세서
- 프로젝트 범위와 deliverable 정의

SLA (Service Level Agreement):
- 서비스 수준 협약
- 성능, 가용성 등의 기준

Change Request:
- 변경 요청
- 원래 범위에서 벗어난 추가 요구사항

Scope Creep:
- 범위 확장
- 계획에 없던 작업이 추가되는 현상

Go-Live:
- 실제 서비스 시작

UAT (User Acceptance Test):
- 사용자 승인 테스트
- 고객이 직접 검증

실무 표현:
- "이건 스코프 밖입니다"
- "CR 처리가 필요해요"
- "고라이브 일정을 확인해 주세요"
- "UAT 통과했습니다"
```

---

## 🔧 운영 및 유지보수 용어

### 시스템 운영

```text
🖥️ 운영 환경:

Development (DEV):
- 개발 환경
- 개발자가 작업하는 환경

Testing (TEST):
- 테스트 환경
- QA 테스트용 환경

Staging (STG):
- 스테이징 환경
- 운영과 동일한 환경에서 최종 테스트

Production (PRD):
- 운영 환경
- 실제 서비스 환경

Disaster Recovery (DR):
- 재해 복구
- 장애 시 복구 계획

Hot Fix:
- 긴급 수정
- 운영 중 발생한 중요 오류 즉시 수정

Rollback:
- 이전 버전으로 되돌리기

Blue-Green Deployment:
- 무중단 배포 방식

실무에서:
- "개발서버에서 테스트해 주세요"
- "스테이징 확인 후 운영 배포하겠습니다"
- "핫픽스가 필요합니다"
- "롤백해야겠어요"
```

### 모니터링

```text
📊 모니터링 관련:

SLA (Service Level Agreement):
- 서비스 수준 협약
- 가용성 99.9% 등

Uptime:
- 서비스 가동 시간

Downtime:
- 서비스 중단 시간

Performance Monitoring:
- 성능 모니터링

Log Analysis:
- 로그 분석

Alert:
- 경고
- 임계치 초과 시 알림

Dashboard:
- 모니터링 대시보드

Metrics:
- 측정 지표

실무 표현:
- "서버 응답시간이 늘어나고 있어요"
- "알럿이 울렸습니다"
- "대시보드에서 확인해 보세요"
- "로그를 분석해 보겠습니다"
```

---

## 💬 커뮤니케이션 표현

### 회의 및 보고

```text
🗣️ 미팅 관련:

Kick-off Meeting:
- 프로젝트 시작 회의

Stand-up Meeting:
- 일일 진행 상황 공유 회의

Retrospective:
- 회고 회의
- 프로젝트나 스프린트 후 개선점 논의

Stakeholder Meeting:
- 이해관계자 회의

Status Report:
- 진행 상황 보고

Issue Tracking:
- 이슈 추적

Action Item:
- 회의에서 나온 실행 항목

Minutes:
- 회의록

실무 표현:
- "킥오프 미팅 일정 잡겠습니다"
- "데일리 스탠드업에서 공유하겠습니다"
- "액션 아이템 정리해서 보내드릴게요"
- "이슈 트래킹 해주세요"
```

### 일정 및 진행

```text
📅 스케줄 표현:

On Schedule:
- 일정대로 진행

Behind Schedule:
- 일정 지연

Ahead of Schedule:
- 일정보다 빠름

Deadline:
- 마감일

Buffer Time:
- 여유 시간

Milestone:
- 중요 완료 지점

Deliverable:
- 산출물

실무에서:
- "일정이 타이트합니다"
- "마일스톤을 놓쳤어요"
- "딜리버러블을 확인해 주세요"
- "버퍼가 필요할 것 같아요"
```

---

## 🚨 이슈 및 문제 해결

### 문제 유형

```text
🐛 이슈 분류:

Critical (치명적):
- 서비스 중단
- 데이터 손실
- 보안 문제

High (높음):
- 주요 기능 오류
- 성능 심각 저하

Medium (중간):
- 일부 기능 오류
- 사용자 불편

Low (낮음):
- 미미한 오류
- 개선 사항

Bug:
- 버그, 오류

Enhancement:
- 기능 개선

Feature Request:
- 새 기능 요청

실무 표현:
- "크리티컬 이슈입니다"
- "버그 리포트 작성하겠습니다"
- "엔한스먼트 요청이 들어왔어요"
```

### 해결 과정

```text
🔧 문제 해결:

Root Cause Analysis:
- 근본 원인 분석

Workaround:
- 임시 해결책

Permanent Fix:
- 영구 해결책

Investigation:
- 조사, 분석

Reproduce:
- 재현

Resolution:
- 해결

Verification:
- 검증

실무에서:
- "루트 코즈를 분석해 보겠습니다"
- "워크어라운드로 우선 처리하겠습니다"
- "재현이 안 되네요"
- "픽스 검증 완료했습니다"
```

---

## 📈 성과 및 품질 지표

### 개발 성과

```text
📊 개발 지표:

Velocity:
- 개발 속도
- 스프린트당 완료 스토리 포인트

Burn-down Chart:
- 번다운 차트
- 남은 작업량 시각화

Code Coverage:
- 테스트 커버리지
- 테스트된 코드 비율

Technical Debt:
- 기술 부채
- 나중에 해결해야 할 문제

Code Quality:
- 코드 품질
- 복잡도, 중복 등 측정

Performance Metrics:
- 성능 지표
- 응답시간, 처리량 등

실무 표현:
- "벨로시티가 떨어지고 있어요"
- "커버리지를 높여야겠어요"
- "기술 부채가 쌓이고 있습니다"
```

### 비즈니스 지표

```text
💼 비즈니스 측정:

ROI (Return on Investment):
- 투자 수익률

TCO (Total Cost of Ownership):
- 총 소유 비용

User Adoption:
- 사용자 채택률

User Satisfaction:
- 사용자 만족도

Business Value:
- 비즈니스 가치

KPI (Key Performance Indicator):
- 핵심 성과 지표

실무에서:
- "ROI를 계산해 보겠습니다"
- "사용자 만족도가 높아졌어요"
- "KPI 달성했습니다"
```

---

## ✅ 용어 활용 체크리스트

### 회의 참여 시

```text
📋 회의에서 사용할 용어들:

진행 상황 보고:
□ "현재 스케줄대로 진행 중입니다"
□ "마일스톤 달성했습니다"
□ "이슈가 하나 있어서 공유드립니다"

문제 상황 보고:
□ "크리티컬 이슈가 발생했습니다"
□ "워크어라운드로 임시 해결했습니다"
□ "루트 코즈 분석이 필요합니다"

일정 관련:
□ "버퍼 타임이 필요할 것 같습니다"
□ "딜리버러블 일정을 확인해 주세요"
□ "스코프가 확장되고 있습니다"
```

### 기술적 소통 시

```text
💻 개발 관련 소통:

코드 리뷰:
□ "리팩토링이 필요해 보입니다"
□ "DRY 원칙을 적용했습니다"
□ "테스트 커버리지를 높였습니다"

API 연동:
□ "API 스펙을 확인해 주세요"
□ "CORS 이슈가 있습니다"
□ "토큰 인증이 필요합니다"

성능 이슈:
□ "라이트하우스 점수를 개선했습니다"
□ "번들 사이즈가 커졌어요"
□ "레이지 로딩을 적용하겠습니다"
```

---

## 🎯 마무리

### 용어 학습 팁

```text
💡 효과적인 용어 습득 방법:

1. 맥락과 함께 학습
   - 단순 암기보다는 실제 상황에서 사용되는 맥락 이해
   - 예문과 함께 기억

2. 적극적 활용
   - 회의나 업무에서 적극적으로 사용
   - 모르는 용어 나오면 즉시 질문

3. 지속적 업데이트
   - 새로운 기술과 함께 새로운 용어들 등장
   - 업계 동향 파악

4. 팀 내 용어 통일
   - 같은 개념에 대해 다른 용어 사용 시 혼란
   - 팀 내 용어 사전 만들기
```
