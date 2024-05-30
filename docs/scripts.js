document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('.sidebar a');
  const mdViewer = document.getElementById('md-viewer');
  const toc = document.getElementById('toc');
  const md = window.markdownit({
      html: true, // HTML 태그를 허용하도록 설정
      highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
              try {
                  return '<pre class="hljs"><code>' +
                         hljs.highlight(str, { language: lang }).value +
                         '</code></pre>';
              } catch (__) {}
          }

          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
  });

  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          links.forEach(link => link.classList.remove('active'));
          e.target.classList.add('active');
          const file = e.target.getAttribute('data-file');
          fetchMD(file, file === 'Projects.md');
      });
  });

  function fetchMD(file, isProjectFile) {
      fetch(`./md/${file}`)
          .then(response => response.text())
          .then(data => {
              let renderedHtml = md.render(data);
              mdViewer.innerHTML = renderedHtml;
              document.querySelector('.content').scrollTo(0, 0);
              addCopyButtons();
              updateTOC();
              // Highlight code blocks
              document.querySelectorAll('pre code').forEach((block) => {
                  hljs.highlightBlock(block);
              });
              if (isProjectFile) {
                  // Copy link to clipboard for Projects.md
                  mdViewer.querySelectorAll('a').forEach(link => {
                      link.addEventListener('click', function(e) {
                          e.preventDefault();
                          const url = link.getAttribute('href');
                          navigator.clipboard.writeText(url).then(() => {
                              alert('URL이 클립보드에 복사되었습니다:\n' + url);
                          }).catch(err => {
                              console.error('Error copying URL: ', err);
                          });
                      });
                  });
              } else {
                  // Open links in new tab for other files
                  mdViewer.querySelectorAll('a').forEach(link => {
                      link.setAttribute('target', '_blank');
                  });
              }
          })
          .catch(error => {
              mdViewer.innerHTML = `Error: ${error}`;
          });
  }

  function addCopyButtons() {
      document.querySelectorAll('pre').forEach(pre => {
          const button = document.createElement('button');
          button.className = 'copy-button';
          button.textContent = 'Copy';
          button.addEventListener('click', () => {
              const code = pre.querySelector('code').innerText;
              navigator.clipboard.writeText(code).then(() => {
                  alert('코드가 클립보드에 복사되었습니다.');
              }).catch(err => {
                  console.error('Error copying code: ', err);
              });
          });
          pre.appendChild(button);
      });
  }

  function updateTOC() {
      const headers = mdViewer.querySelectorAll('h1, h2, h3, h4');
      toc.innerHTML = '';
      const ul = document.createElement('ul');
      headers.forEach(header => {
          if (!header.id) {
              header.id = header.textContent.trim().toLowerCase().replace(/\s+/g, '-');
          }
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.textContent = header.textContent;
          a.href = `#${header.id}`;
          a.style.setProperty('--level', header.tagName.charAt(1) - 1);
          a.addEventListener('click', function(e) {
              e.preventDefault();
              header.scrollIntoView({ behavior: 'smooth' });
          });
          li.appendChild(a);
          ul.appendChild(li);
      });
      toc.appendChild(ul);
  }

  function updateActiveLink() {
      const headers = mdViewer.querySelectorAll('h1, h2, h3, h4');
      let lastActive = null;
      headers.forEach(header => {
          const rect = header.getBoundingClientRect();
          if (rect.top <= 10) {
              lastActive = header;
          }
      });

      const links = toc.querySelectorAll('a');
      links.forEach(link => link.classList.remove('active'));
      if (lastActive) {
          const activeLink = toc.querySelector(`a[href="#${lastActive.id}"]`);
          if (activeLink) {
              activeLink.classList.add('active');
          }
      }
  }

  document.querySelector('.content').addEventListener('scroll', updateActiveLink);
});
