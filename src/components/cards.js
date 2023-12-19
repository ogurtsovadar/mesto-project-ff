// Массив с карточками
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM-элементы для создания карточки
const content = document.querySelector('.content');
export const placesList = content.querySelector('.places__list');

// Функция создания карточки
export function createCard(cardName, cardPic, deleteCard, likeCard, openPhoto) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardName;
    cardElement.querySelector('.card__image').src = cardPic;
    cardElement.querySelector('.card__image').alt = cardName;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);

    const bigImage = cardElement.querySelector('.card__image');
    bigImage.addEventListener('click', () => openPhoto(cardName, cardPic));

    return cardElement;
};

// Функция удаления карточки

export function deleteCard(evt) {
    evt.target.closest('.card').remove();
  };

// Функция лайка

export function likeCard(evt) {
  evt.target.closest('.card__like-button').classList.toggle('card__like-button_is-active');
};