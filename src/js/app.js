import fetchGetNews from './fetchGetNews';
import NewsController from './newsRender';

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('sw.js');
      console.log('Service worker registered: ', registration);
    } catch (error) {
      console.log('Service worker registration failed: ', error);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const newsList = document.querySelector('.news-widget__list');
  const newsController = new NewsController(newsList);
  const url = 'https://koa-get-news.onrender.com';

  async function fetchAndRenderNews() {
    try {
      const data = await fetchGetNews(`${url}/news`);
      newsController.render(data);
    } catch (e) {
      const alert = document.querySelector('.news-widget__alert');
      alert.classList.remove('news-widget__alert--hidden');
    }
  }

  fetchAndRenderNews();

  document.querySelector('.news-widget__button')
    .addEventListener('click', (e) => {
      e.preventDefault();
      if (newsController.isRendered) {
        newsController.removeNews();
      }
      fetchAndRenderNews();
    });
});
