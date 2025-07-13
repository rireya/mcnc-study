# 🖼️ 이미지 샘플 가이드

이 문서는 GitHub Pages에서 이미지를 표시하는 방법을 보여주는 샘플입니다.

## 📸 샘플 이미지

아래는 `docs/imgs` 폴더에 있는 `@sample.png` 이미지입니다:

![샘플 이미지](../imgs/@sample.png)

### 🔗 이미지 표시 방법

#### 1. 기본 이미지 표시
```markdown
![대체 텍스트](../imgs/@sample.png)
```

#### 2. 이미지 링크와 함께 표시
```markdown
[![샘플 이미지](../imgs/@sample.png)](../imgs/@sample.png)
```

클릭 가능한 이미지:
[![샘플 이미지](../imgs/@sample.png)](../imgs/@sample.png)

#### 3. HTML 태그를 사용한 크기 조절
```html
<img src="../imgs/@sample.png" alt="샘플 이미지" width="300">
```

크기 조절된 이미지:
<img src="../imgs/@sample.png" alt="샘플 이미지" width="300">

#### 4. 중앙 정렬 이미지
```html
<div align="center">
  <img src="../imgs/@sample.png" alt="샘플 이미지" width="400">
</div>
```

<div align="center">
  <img src="../imgs/@sample.png" alt="샘플 이미지" width="400">
</div>

## 📋 이미지 사용 가이드

### ✅ 권장사항

- **적절한 대체 텍스트** 사용 (접근성 고려)
- **상대 경로** 사용으로 이식성 확보
- **적절한 이미지 크기** 설정 (페이지 로딩 속도 고려)
- **의미있는 파일명** 사용

### 📁 이미지 경로 규칙

GitHub Pages에서 이미지를 표시할 때의 경로 규칙:

```
docs/
├── imgs/              # 이미지 파일 저장소
│   └── @sample.png    # 샘플 이미지
├── public/            # 현재 문서 위치
│   └── image-sample.md # 이 문서
└── index.html
```

현재 문서(`public/image-sample.md`)에서 이미지를 참조할 때:
- **상대 경로**: `../imgs/@sample.png`
- **절대 경로**: `/mcnc-study/imgs/@sample.png` (GitHub Pages의 repository 이름 포함)

### 🌐 GitHub Pages URL 구조

GitHub Pages에서 실제 이미지 URL:
```
https://rireya.github.io/mcnc-study/imgs/@sample.png
```

## 🎨 이미지 스타일링

### CSS를 활용한 스타일링

```html
<img src="../imgs/@sample.png" 
     alt="샘플 이미지" 
     style="border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
```

스타일이 적용된 이미지:
<img src="../imgs/@sample.png" 
     alt="샘플 이미지" 
     style="border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 300px;">

## 🔧 문제 해결

### 이미지가 표시되지 않을 때

1. **경로 확인**: 상대 경로가 올바른지 확인
2. **파일명 확인**: 대소문자 구분 및 특수문자 확인
3. **파일 존재 확인**: 실제 이미지 파일이 있는지 확인
4. **GitHub Pages 빌드**: 변경사항이 반영되었는지 확인

### 파일명 특수문자 처리

`@sample.png`와 같이 특수문자가 포함된 파일명은 URL 인코딩이 필요할 수 있습니다:
- `@` → `%40`
- 하지만 GitHub에서는 대부분 자동으로 처리됩니다.

---

## 📞 참고 자료

- [GitHub Pages 이미지 가이드](https://docs.github.com/en/pages)
- [Markdown 이미지 문법](https://www.markdownguide.org/basic-syntax/#images)
- [HTML 이미지 태그](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

---

**📝 Note**: 이 샘플을 참고하여 다른 이미지도 문서에 포함시킬 수 있습니다!
