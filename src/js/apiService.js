const API_KEY = '19016514-f636b8f63ee9a8d1bcb803743';
const BASE_URL = 'https://pixabay.com/api/';
const CORS = 'https://cors-anywhere.herokuapp.com/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // async fetchImages() {
  //   const url = `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`;

  //   const response = await fetch(url);
  //   const images = await response.json();

  //   return images;
  // }

  resetPage() {
    this.page = 1;
  }

  getQueryPath() {
    return `${CORS}${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get pageNum() {
    return this.page;
  }

  set pageNum(newNum) {
    this.page = newNum;
  }
}
