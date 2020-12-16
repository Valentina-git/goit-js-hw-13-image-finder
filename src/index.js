import fetchImages from './js/apiService';
import addToMarkup from './js/addToMarkup';
import refs from './js/refs';
import './css/styles.css'

const API_KEY = `19525562-89f63200b6ea6b4c77491aa6b`;
let inputValue = '';
let page = 1;
refs.btnLoad.style.display = 'none';

const getFormSubmit = (event) => {
    event.preventDefault();
    refs.galleryList.innerHTML = '';
    inputValue = event.target.elements.query.value;

    if (inputValue.length > 1) {
        fetchImages(inputValue, page, API_KEY)
            .then(images => {
                addToMarkup(images)
                refs.btnLoad.style.display = 'block';
        }).catch(err => console.log(err))
    }
}

refs.form.addEventListener('submit', getFormSubmit)

const loadMoreImages = () => {
    page += 1
    fetchImages(inputValue, page, API_KEY).then(images => {
        addToMarkup(images)
        window.scrollTo({
            top: document.documentElement.offsetHeight + 400,
            behavior: 'smooth'
        });
        console.dir(document.documentElement.offsetHeight);
    }).catch(err => console.log(err))
}

refs.btnLoad.addEventListener('click', loadMoreImages)
