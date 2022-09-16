import card from './template/card.hbs';
import fetchUsers from './js/apiService.js';
import { scrollIntoView } from 'scroll-js';
import * as basicLightbox from 'basiclightbox';

const debounce = require('lodash.debounce');
const formInput = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
let indexElementAfterClickLoadMore = 12;



formInput.addEventListener('input', debounce(targetValueImg, 1000));

const promiseListImg = async (value, pageNumber) => {
    const promisListImg = await fetchUsers(value, pageNumber);
    const arrImg = await promisListImg.hits;  
    addMarcup(pageNumber, arrImg);
    openModalWindow(arrImg);

   
  
}

function targetValueImg(e, pageNumber) {
    value = e.target.value;
    pageNumber = 1;
    promiseListImg(value, pageNumber);
    buttonLoadMore(value ,pageNumber);
}

function buttonLoadMore(value ,pageNumber) {
     button.addEventListener('click', () => {
        pageNumber += 1;
         promiseListImg(value, pageNumber);
     });
    
}
    
function scrollElement() {
    const myElement = document.body.getElementsByTagName('li');            
    scrollIntoView(myElement[indexElementAfterClickLoadMore], document.body, { behavior: 'smooth' });
    indexElementAfterClickLoadMore += 12;
} 
 
function addMarcup(pageNumber, arrImg) {
      const marcup = card(arrImg);
    if (pageNumber === 1) {
        ul.innerHTML = marcup;
    } else {
        ul.insertAdjacentHTML('beforeend', marcup);
        scrollElement();
    }

}

function openModalWindow(arrImg){
     ul.addEventListener('click', e => {
        if (e.target.tagName === 'IMG') {
            arrImg.filter(value => {
                if (value.webformatURL.includes(e.target.src)) {
                    const instance = basicLightbox.create(
                        `<div class=modal><img src=${value.largeImageURL}></div>`
                    )
                     instance.show();
                }
            });
        }
   
    });
}