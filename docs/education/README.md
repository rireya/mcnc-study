# 📚 교육 과정 추가 가이드

이 가이드는 새로운 교육 과정이나 교육 자료를 쉽게 추가하는 방법을 설명합니다.

## 🎯 교육 과정 추가하기

### 1단계: 폴더 생성
```bash
# education 폴더 내에 새 교육 과정 폴더 생성
mkdir docs/education/새교육과정명
```

### 2단계: 교육 자료 파일 생성
```bash
# 교육 과정 폴더에 마크다운 파일들 생성
docs/education/새교육과정명/
├── README.md          # 교육 개요
├── day1.md           # Day 1 교육 자료
├── day2.md           # Day 2 교육 자료 (선택)
└── resources/        # 추가 자료 폴더 (선택)
```

### 3단계: 설정 파일 업데이트
`courses-config.json` 파일을 편집하여 새 교육 과정을 추가:

```json
{
  "courses": {
    "기존과정들": "...",
    "새교육과정명": {
      "name": "새로운 교육 과정",
      "description": "교육 과정 설명",
      "icon": "🎓",
      "files": [
        {
          "filename": "README.md",
          "title": "📋 교육 개요",
          "description": "전체 교육 과정 개요"
        },
        {
          "filename": "day1.md", 
          "title": "📚 Day 1 - 기초",
          "description": "첫 번째 날 교육 내용"
        },
        {
          "filename": "day2.md",
          "title": "📚 Day 2 - 심화", 
          "description": "두 번째 날 교육 내용"
        }
      ]
    }
  }
}
```

## 📝 설정 옵션 설명

### 교육 과정 설정
- **name**: 교육 과정 이름 (필수)
- **description**: 교육 과정 설명 (선택)
- **icon**: 아이콘 이모지 (선택, 기본값: 📚)
- **files**: 교육 자료 파일 목록 (필수)

### 파일 설정
- **filename**: 실제 파일명 (필수)
- **title**: 화면에 표시될 제목 (필수)
- **description**: 파일 설명, 툴팁으로 표시 (선택)

### 전역 설정
```json
{
  "settings": {
    "autoRefresh": true,        // 설정 파일 자동 새로고침 (개발 모드)
    "showDescriptions": true,   // 설명 툴팁 표시 여부
    "defaultCourse": null,      // 기본 선택 교육 과정 (null이면 없음)
    "theme": "default"          // 테마 (향후 확장용)
  }
}
```

## 🚀 빠른 추가 예제

### Vue 심화 교육 추가
1. **폴더 생성**:
```bash
mkdir docs/education/vue-advanced
```

2. **파일 생성**:
```bash
# README.md
echo "# Vue 심화 교육" > docs/education/vue-advanced/README.md

# day1.md  
echo "# Day 1: Vue 3 고급 기능" > docs/education/vue-advanced/day1.md

# day2.md
echo "# Day 2: 상태 관리 심화" > docs/education/vue-advanced/day2.md
```

3. **설정 파일 업데이트**:
```json
"vue-advanced": {
  "name": "Vue 심화 교육",
  "description": "Vue 3 고급 기능과 최적화 기법 학습",
  "icon": "⚡",
  "files": [
    {
      "filename": "README.md",
      "title": "📋 교육 개요",
      "description": "Vue 심화 교육 전체 개요"
    },
    {
      "filename": "day1.md",
      "title": "⚡ Day 1 - 고급 기능",
      "description": "Composition API, Teleport, Suspense 등"
    },
    {
      "filename": "day2.md", 
      "title": "🏪 Day 2 - 상태 관리",
      "description": "Pinia, 복잡한 상태 패턴"
    }
  ]
}
```

## 🔧 고급 기능

### 자동 새로고침 설정
개발 중에는 `autoRefresh: true`로 설정하면 30초마다 설정 파일 변경을 체크하여 자동으로 UI를 업데이트합니다.

### 기본 과정 설정
자주 사용하는 교육 과정이 있다면 `defaultCourse`에 과정 ID를 설정하여 페이지 로드 시 자동 선택되도록 할 수 있습니다.

### 파일명 규칙 권장사항
- `README.md`: 교육 개요
- `day1.md`, `day2.md`, ...`: 날짜별 교육
- `part1.md`, `part2.md`, ...`: 파트별 교육
- `setup.md`: 환경 설정
- `practice.md`: 실습
- `qa.md`: Q&A

## 📞 문제 해결

### 새 교육 과정이 표시되지 않을 때
1. `courses-config.json` 파일 문법 오류 확인
2. 브라우저 캐시 새로고침 (Ctrl+F5)
3. 개발자 도구 콘솔에서 오류 메시지 확인

### 파일이 로드되지 않을 때
1. 파일 경로와 이름 확인
2. 파일 인코딩이 UTF-8인지 확인
3. 브라우저 Network 탭에서 HTTP 오류 확인

---

이제 `courses-config.json` 파일만 편집하면 누구나 쉽게 새로운 교육 과정을 추가할 수 있습니다! 🎉
