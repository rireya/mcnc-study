document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('.sidebar a');
  const mdViewer = document.getElementById('md-viewer');
  const md = window.markdownit({
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
              mdViewer.innerHTML = md.render(data);
              document.querySelector('.content').scrollTo(0, 0);
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
                              alert('URL이 클립보드에 복사되었습니다: ' + url);
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
});
