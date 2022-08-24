
// import debounce from "lodash.debounce"

import ImgApi from './js/imgApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import imgCardTpl from './template/imgCardTpl.hbs';


// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const formEl = document.getElementById('search-form');
const loadMoreEl = document.querySelector('.load-more');

const imgApi = new ImgApi();

formEl.addEventListener('submit', onFormSubmit);
loadMoreEl.addEventListener('click', onLoadMore);

let gallery = new SimpleLightbox('.gallery a');
// console.log(gallery);

async function onFormSubmit(e) {
    e.preventDefault();
    clearGallery()

    const searchValue = e.target.elements["searchQuery"].value.trim();
    if (searchValue === '') {
        loadMoreEl.classList.remove('visible');
        return Notify.warning('The input is empty');
    }
    imgApi.query = searchValue;
    loadMoreEl.classList.add('visible');
    loadMoreEl.classList.add('loading');
    loadMoreEl.setAttribute("disabled", "true");
    imgApi.resetPage();

    try {
        const data = await imgApi.fetchPictures();
            if (data.totalHits == 0) {
                loadMoreEl.classList.remove('loading');
                loadMoreEl.classList.remove('visible');
                loadMoreEl.removeAttribute("disabled", "true");
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
        
            loadMoreEl.classList.remove('loading');
            loadMoreEl.removeAttribute("disabled", "true");

            Notify.success(`Hooray! We found ${data.totalHits} images`);

            const imagesGroup = data.hits;
            renderCards(imagesGroup);
                
            gallery.refresh();
                if (data.hits.length < 40) {
                // Notify.warning("We're sorry, but you've reached the end of search results.");
                loadMoreEl.classList.remove('visible');
            }

        }
     catch(error) {
        console.log(error);
    }
};



async function onLoadMore() {
     if (imgApi.query === '') {
        return 
    }
    loadMoreEl.setAttribute("disabled", "true");
    loadMoreEl.classList.add('loading');

    try {
        const data = await imgApi.fetchPictures();

        loadMoreEl.classList.remove('loading');
        loadMoreEl.removeAttribute("disabled", "true");
        
        const imagesGroup = data.hits;
        renderCards(imagesGroup);
        gallery.refresh();


        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        });

        if (data.hits.length < 40) {
            Notify.warning("We're sorry, but you've reached the end of search results.");
            loadMoreEl.classList.remove('visible');
        }
    }
     catch(error) {
        console.log(error);
    };
 
}



function renderCards(objects) {
    // console.log(objects);
    galleryEl.insertAdjacentHTML('beforeend', imgCardTpl(objects));
}
function clearGallery() {
     galleryEl.innerHTML = '';
} 
















