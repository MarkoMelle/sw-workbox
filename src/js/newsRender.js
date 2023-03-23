export default class NewsController {
  constructor(list) {
    this.list = list;
    this.isRendered = false;
  }

  render(data) {
    try {
      const promises = [];
      Array.from(this.list.children).forEach((item, i) => {
        const timeDOM = item.querySelector('.item__date');
        const imgWrapper = item.querySelector('.item__img-wrapper');
        const imgDOM = document.createElement('img');
        imgDOM.classList.add('item__img');
        imgDOM.src = data[i].image;
        const descriptionDOM = item.querySelector('.item__description');

        const dateValue = new Date(data[i].date);
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        };

        const formattedDate = dateValue.toLocaleString('ru-RU', options);
        timeDOM.textContent = formattedDate;
        timeDOM.setAttribute('datetime', data[i].date);
        descriptionDOM.textContent = data[i].text;

        // добавляем Promise для каждого изображения
        const promise = new Promise((resolve, reject) => {
          imgDOM.onload = resolve;
          imgDOM.onerror = reject;
        });
        promises.push(promise);

        imgWrapper.appendChild(imgDOM);
      });

      // ждем, пока все изображения загрузятся
      Promise.all(promises).then(() => {
        this.list.classList.remove('onload');
        this.isRendered = true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  removeNews() {
    Array.from(this.list.children).forEach((item) => {
      const timeDOM = item.querySelector('.item__date');
      const imgWrapper = item.querySelector('.item__img-wrapper');
      const imgDOM = imgWrapper.querySelector('.item__img');
      const descriptionDOM = item.querySelector('.item__description');

      timeDOM.textContent = '';
      timeDOM.removeAttribute('datetime');
      imgDOM.remove();
      descriptionDOM.textContent = '';
    });
    this.list.classList.add('onload');
    this.isRendered = false;
  }
}
