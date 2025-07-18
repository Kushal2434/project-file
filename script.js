
  document.addEventListener('DOMContentLoaded', () => {
    try {
      const newsSection = document.querySelector('.news-section');
      if (!newsSection) {
        console.error('No element with class "news-section" found.');
        return;
      }

      const allArticlesRaw = localStorage.getItem('newsArticles');
      let allArticles = [];

      if (allArticlesRaw) {
        allArticles = JSON.parse(allArticlesRaw);
        if (!Array.isArray(allArticles)) {
          console.error('newsArticles in localStorage is not an array.');
          allArticles = [];
        }
      }

      const approvedArticles = allArticles.filter(article => article.approved === true);

      if (approvedArticles.length === 0) {
        // Do not remove existing articles if none approved in storage
        return;
      }

      // **Do NOT clear existing content here** (no newsSection.innerHTML = '')

      approvedArticles.forEach(article => {
        if (!article.title || !article.author || !article.date || !article.content) {
          console.warn('Skipping article with missing fields:', article);
          return;
        }

        const articleElem = document.createElement('article');
        articleElem.classList.add('news-card');

        articleElem.innerHTML = `
          ${article.img ? `<img src="${article.img}" alt="${article.title}">` : ''}
          <div class="news-content">
            <h2>${article.title}</h2>
            <p class="meta">By ${article.author} | ${article.date}</p>
            <p>${article.content.length > 150 ? article.content.substring(0, 150) + '...' : article.content}</p>
            <a href="news-details.html" class="read-more">Read More</a>
          </div>
        `;

        newsSection.appendChild(articleElem);
      });
    } catch (error) {
      console.error('Error while loading articles:', error);
    }
  });

