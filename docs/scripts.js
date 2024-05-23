async function loadMarkdown(fileName) {
  const repo = 'mcnc-study';
  const filePath = `/md/${fileName}`;
  const url = `/${repo}/${filePath}`;

  const response = await fetch(url);
  const markdown = await response.text();

  const html = marked.parse(markdown);
  document.getElementById('content').innerHTML = html;
}

// 페이지가 로드될 때 기본 파일을 불러옵니다.
document.addEventListener('DOMContentLoaded', () => {
  loadMarkdown('TypeScript.md');
});
