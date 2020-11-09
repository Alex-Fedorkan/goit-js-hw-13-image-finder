import InfiniteScroll from 'infinite-scroll';
import imagesTpl from './templates/image.hbs';
import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import './css/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import ImagesApiService from './js/apiService';

const debounce = require('lodash.debounce');

const refs = {
  inputEl: document.querySelector('#search-form > input'),
  listOfImagesEL: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();

const infScroll = new InfiniteScroll(refs.listOfImagesEL, {
  responseType: 'text',
  history: false,
  path() {
    return imagesApiService.getQueryPath();
  },
});

infScroll.on('load', response => {
  imagesApiService.pageNum = infScroll.pageIndex;

  const images = JSON.parse(response);

  if (images.hits.length === 0) {
    error({
      title: 'Bad search request!',
      delay: 3000,
      mouseReset: false,
      closerHover: false,
      stickerHover: false,
    });
    return;
  }

  const proxyEl = document.createElement('div');
  proxyEl.innerHTML = imagesTpl(images.hits);

  const parsedItems = proxyEl.querySelectorAll('.gallery__item');

  infScroll.appendItems(parsedItems);
});

refs.inputEl.addEventListener('input', debounce(onInputChange, 750));
refs.listOfImagesEL.addEventListener('click', onImageClick);

function onInputChange(event) {
  event.preventDefault();

  imagesApiService.resetPage();

  imagesApiService.query = event.target.value;

  if (imagesApiService.query === '') {
    imagesApiService.resetPage();
    clearListOfImages();
    return;
  }

  clearListOfImages();

  infScroll.pageIndex = 1;
  infScroll.loadNextPage();
}

function clearListOfImages() {
  refs.listOfImagesEL.innerHTML = '';
}

function onImageClick(event) {
  const linkOnLargeImg = event.target.dataset.source;

  const modal = basicLightbox.create(
    `<img src="${linkOnLargeImg}" width="1280">`,
  );

  modal.show();
}
