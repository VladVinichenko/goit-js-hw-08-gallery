const galleryCollection = document.querySelector(".js-gallery");
const galleryModalBox = document.querySelector(".js-lightbox");
const modalImage = galleryModalBox.querySelector(".lightbox__image");

import { galleryItems } from "./app.js";

const cardsGallery = createGalleryList(galleryItems);

function createGalleryList(galleryItems) { //create HTML li
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"/>
      </a>
    </li>`
    )
    .join("");
}

galleryCollection.insertAdjacentHTML("beforeend", cardsGallery);

function openModalWindow() {
  galleryModalBox.classList.add("is-open");     //open modal
  galleryModalBox.addEventListener("click", modalCloseBtn);
  galleryModalBox.addEventListener("click", modalCloseOverlay);
  window.addEventListener("keydown", modalCloseEcsKey);
  window.addEventListener("keydown", modalArrows);
}

function closeModalWindow() {
  galleryModalBox.classList.remove("is-open");    //close modal
  galleryModalBox.removeEventListener("click", modalCloseBtn);
  galleryModalBox.removeEventListener("click", modalCloseOverlay);
  window.removeEventListener("keydown", modalCloseEcsKey);
  window.removeEventListener("keydown", modalArrows);
  removeSrcImage();
}

galleryCollection.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  openModalWindow();    //open modal
  imageNumber(evt);     //render select image in modal window
});

function modalCloseBtn(evt) {
  if (evt.target.className === "lightbox__button") {
    closeModalWindow();   //close modal
  }
}

function modalCloseOverlay(evt) {
  if (evt.target.className === "lightbox__overlay") {
    closeModalWindow();   //close modal
  }
}

function modalCloseEcsKey(evt) {
  if (evt.code === "Escape") {
    closeModalWindow();   //close modal
  }
}
const galleryImagesArray = document.querySelectorAll(".gallery__image");    //array with all links images

const currentNumberImage = {
  current: 0,   //selected image
  min: 0,
  max: galleryImagesArray.length - 1,  //numbers images in app.js
  nextImage: function () {
    if (this.current < this.max) {
      this.current += 1;    //next image
      return;
    }
    this.current = this.min;  //next image on the next round
    return;
  },

  prevImage: function () {
    if (this.current > this.min) {
      this.current -= 1;      //prev image
      return;
    }
    this.current = this.max;      //prev image on the next round
    return;
  },
};

function imageNumber(img) {    
  galleryImagesArray.forEach((e, number) => {
    if (e === img.target) {
      currentNumberImage.current = number;
      buildImageInModal(number);      //render image with selected number image in array
    }
  });
}

function buildImageInModal(img) {
  modalImage.setAttribute("src", galleryItems[img].original);
  modalImage.setAttribute("alt", galleryItems[img].description);
}

function removeSrcImage() {
  modalImage.setAttribute("src", "");
  modalImage.setAttribute("alt", "");
}

function nextImage() {
  currentNumberImage.nextImage();
  buildImageInModal(currentNumberImage.current);      //render image with new "current" value
}

function prevImage() {
  currentNumberImage.prevImage();
  buildImageInModal(currentNumberImage.current);      //render image with new "current" value
}

function modalArrows(evt) {
  if (evt.code === "ArrowRight") {
    nextImage();
  } else if (evt.code === "ArrowLeft") {
    prevImage();
  }
}
