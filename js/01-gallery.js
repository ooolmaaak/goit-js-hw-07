// Создать галерею с возможностью клика по её элементам и просмотром
// полноразмерного изображения в модальном окне.

// 1.Создать и отрендерить разметку по массиву galleryItems

// 2. Сделать делегирование на ul.gallery и получить ссылку на большое изображение

// 3. Подключить скрипт и стили библиотеки модалки basicLightbox.
// Использовать CDN сервис jsdelivr и добавить в проект
// ссылки на минифицированные(.min) файлы библиотеки.

// 4. Открывыть модалку по клику на элементе галереи.
// Документация: https://github.com/electerious/basicLightbox#readme
// Примеры: https://basiclightbox.electerious.com/

// 5. Заменить значение атрибута src элемента <img> в модальном окне перед открытием.
// Использовать готоую разметку модального окна с изображением
// из примеров библиотеки basicLightbox.

// 6. Отключить перенаправление на другую страницу при клике на изображение
// (изображение обёрнуто в ссылку, перенаправление по умолчанию)

// 7. Добавить закрытие модального окна через ESC.
// Прослушивание клавиатуры должно быть только, когда открыта модалка.
// Можно использовать библиотеку basicLightbox, там есть метод для программного закрытия модального окна.

// Ссылка на оригинальное изображение должна храниться в data-атрибуте
// source на элементе < img >, и указываться в href ссылке.
// Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

import { galleryItems } from "./gallery-items.js";
// Change code below this line

// получаем доступ к основному списку, где будут изображения
const galleryContainer = document.querySelector(".gallery");

// переменная для хранения разметки новых созданных li для изображений
const imagesMarkup = createGalleryImagesMurkup(galleryItems);

// функция для создания разметки галереии preview
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

// добавляем разметку в основной блок
galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

// добавляем слушателя события на клик по элементу галереии
galleryContainer.addEventListener("click", onGalleryContainerCLick);

// деструктуризируем, создаём открываем модалку
function onGalleryContainerCLick(event) {
  // проверка
  //   const selectedImageURL = event.target.dataset.source;
  //   const selectedImageName = event.target.alt;
  //   console.log(`Клик по изображению ${selectedImageName}`);
  //   console.log(`Ссылка на большое изображ: ${selectedImageURL}`);

  //получаем новую ссылку на оригинал изображения
  const selectedImageOriginalURL = event.target.dataset.source;

  // открываем модалку и меняем в ней путь к новому изображению
  const modal = basicLightbox.create(
    `
  <img
         
            src="${selectedImageOriginalURL}"
            
            
          />
    `,
    {
      onShow: (instance) => {
        // Добавим обработчик события для закрытия модального окна при нажатии клавиши Escape
        const handleKeyPress = (event) => {
          if (event.code === "Escape") {
            instance.close();
          }
        };

        // Добавляем обработчик к документу
        document.addEventListener("keydown", handleKeyPress);

        // Очистим обработчик, когда модальное окно закроется
        instance.destroy = () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
      },
    }
  );

  modal.show();

  //отключаем перезагрузку страницы
  event.preventDefault();
}
