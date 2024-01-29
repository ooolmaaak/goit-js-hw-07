import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

const imagesMarkup = createGalleryImagesMurkup(galleryItems);

function createGalleryImagesMurkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a href="${original}" class="gallery__link">
          <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
            
          />
        </a>
      </li>
    `;
    })
    .join("");
}

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

galleryContainer.addEventListener("click", onGalleryContainerCLick);

// добавляем параметры выводящие альт-текст через х миллисекунд
const gallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

function onGalleryContainerCLick(event) {
  gallery.on("show.simplelightbox", function () {});

  event.preventDefault();
  console.log("Open");
}
