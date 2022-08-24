import axios from "axios";
const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '28483362-313f04b4986d5508c9cd93d3a';
// const API_KEY = '28352970-95939234ba7a7257c292bac13';


export default class ImgApi {
    constructor() {
      this.searchQuerry = '';
      this.page = 1;
    }

  async fetchPictures() {
// console.log(this);
    
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: `${this.searchQuerry}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${this.page}`,
      per_page: '40'
    }
  });
    
  // console.log(response);
    
    // const options =new URLSearchParams ({
    //         key: API_KEY,
    //         q: this.searchQuerry,
    //         image_type: 'photo',
    //         orientation: 'horizontal',
    //         safesearch: 'true',
    //         per_page: this.per_page,
    //         page: this.page,
    //     });
    // const url = `${BASE_URL}?${options}`;
    // console.log(url);
    //     const response = await axios.get(url);
  

    
  this.incrementPage();
  // console.log(response);
  // console.log(response.data);
  return response.data;

  }

  incrementPage() {
      this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
    
    get query() {
        return this.searchQuerry;
    }
    set query(newQuerry) {
        this.searchQuerry = newQuerry;
    }
}


