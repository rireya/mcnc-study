async function loadMarkdown(fileName) {
  const repo = 'your-github-username/markdown-viewer';
  const filePath = `docs/md/${fileName}`;
  const url = `https://raw.githubusercontent.com/${repo}/main/${filePath}`;

  const response = await fetch(url);
  const markdown = await response.text();

  const html = marked(markdown);
  document.getElementById('content').innerHTML = html;
}

// 페이지가 로드될 때 기본 파일을 불러옵니다.
document.addEventListener('DOMContentLoaded', () => {
  loadMarkdown('TypeScript.md');
});
