import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

const imagesMarkup = createGalleryImagesMurkup(galleryItems);

function createGalleryImagesMurkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a href="" class="gallery__link">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
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

function onGalleryContainerCLick(event) {
  const selectedImageOriginalURL = event.target.dataset.source;

  const modal = basicLightbox.create(
    `
  <img
         
            src="${selectedImageOriginalURL}"
            
            
          />
    `,
    {
      onShow: (instance) => {
        const handleKeyPress = (event) => {
          if (event.code === "Escape") {
            instance.close();
          }
        };

        document.addEventListener("keydown", handleKeyPress);

        instance.destroy = () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
      },
    }
  );

  modal.show();

  event.preventDefault();
}
