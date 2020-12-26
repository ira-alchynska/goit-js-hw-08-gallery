import galleryItems from './gallery-items.js';


const galleryListRef = document.querySelector('ul.js-gallery');
const largeImgRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.js-lightbox');
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]', );
 const overlayRef = document.querySelector('.lightbox__overlay');


galleryListRef.addEventListener('click', onOpenModal);
closeBtnRef.addEventListener('click', onCloseModal);
overlayRef.addEventListener('click', onOverlayClick);

const createItem = (galleryItem, array) => {
const itemRef = document.createElement('li');
const linkRef = document.createElement('a');
const imgRef = document.createElement('img');
const { preview, original, description } = galleryItem;

itemRef.classList.add('gallery__item');
linkRef.classList.add('gallery__link');
imgRef.classList.add('gallery__image');
linkRef.href = original;
imgRef.dataset.source = original;
imgRef.src = preview;
imgRef.alt = description;

galleryListRef.append(itemRef);
itemRef.append(linkRef);
linkRef.append(imgRef);

return itemRef;
};


const renderListItems = (array) => {
const items = array.map((item) => createItem(item));
galleryListRef.append(...items);
};

renderListItems(galleryItems);


function onOpenModal(event) {
event.preventDefault();
window.addEventListener('keydown', onPressEscape);
console.log(event.target.nodeName);

if (event.target.nodeName !== 'IMG') {
    return;
}
modalRef.classList.add('is-open');
largeImgRef.src = event.target.dataset.source;
//console.log(event.target.dataset.source);
};

function onCloseModal() {
window.removeEventListener('keydown', onPressEscape);
modalRef.classList.remove('is-open');
};

function onOverlayClick(event) {
    if (event.currentTarget === event.target) {
      onCloseModal();
    };
};
function onPressEscape(event) {
    if (event.code === 'Escape') {
      console.log('Close, pressed ESC');
      onCloseModal();
    }
  }