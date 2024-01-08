import { likeCard, removeLike, removeCard } from "./api.js";

export function createCard(cardData, deleteCallback, likeСallback, openPhoto, currentUserId, cardId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const bigImage = cardElement.querySelector('.card__image');
    const userId = cardData.owner._id;

    // берём значения для названия, ссылки и количества лайков на карточке из объекта cardData
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    // постановка лайка

    // проверка наличия лайка от текущего пользователя
    const isLikedByCurrentUser = cardData.likes.some(
      (like) => like._id === currentUserId
    );

    if (isLikedByCurrentUser) {
      likeСallback(likeButton);
    }

    likeButton.addEventListener('click', () => {
      if (likeButton.classList.contains("card__like-button_is-active")) {
        // отправляем запрос на сервер для удаления лайка
        removeLike(cardData._id)
          .then((updatedCard) => {
            // убираем класс активного лайка
            likeСallback(likeButton);
            // обновляем счетчик лайков
            likeCounter.textContent = updatedCard.likes.length;
          })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          });
      } else {
        // отправляем запрос на сервер для постановки лайка
        likeCard(cardData._id)
          .then((updatedCard) => {
            // добавляем класс активного лайка
            likeСallback(likeButton);
            // обновляем счетчик лайков
            likeCounter.textContent = updatedCard.likes.length;
          })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          });
      }
    });

    // обработчик удаления карточки
    deleteButton.addEventListener("click", () => {
      deleteCallback(cardElement, cardData._id); // Передаем ID карточки для удаления
    });

    // проверяем, совпадает ли ID пользователя с владельцем карточки, чтобы оставить или удалить кнонку корзины
    if (currentUserId !== userId) {
      deleteButton.remove();
    }

    // обработчик открытия поп-апа с увеличенным фото
    bigImage.addEventListener('click', () => openPhoto(cardData));

    return cardElement;
};

// функция удаления карточки

export function deleteCallback(cardElement, cardId) {
    removeCard(cardId)
      .then(() => {
        cardElement.remove(); // удаляем элемент карточки из DOM после успешного удаления с сервера
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
};

// функция лайка
export function likeСallback(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};