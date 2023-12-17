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
    bigImage.addEventListener('click', openPhoto);

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

// Функция открытия фотографии

export function openPhoto(evt) {
  const popupImageOpener = document.querySelector('.popup_type_image');
  const popupImageUrl = document.querySelector('.popup__image');
  const popupImageCaption = document.querySelector('.popup__caption');

  popupImageOpener.classList.add('popup_is-opened');

  popupImageUrl.src = evt.target.src;
  popupImageCaption.textContent = evt.target.closest('.card').textContent;
}

// Функция добавления новой карточки из формы
export function handleCardSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = document.querySelector('.popup__input_type_card-name');
  const urlNameInput = document.querySelector('.popup__input_type_url');

  const placeName = placeNameInput.value;
  const urlName = urlNameInput.value;
  const newCard = createCard(placeName, urlName, deleteCard, likeCard, openPhoto);
  const cardForm = document.forms.newPlace;
  const popupNewCard = document.querySelector('.popup_type_new-card');

  placesList.prepend(newCard);
  cardForm.reset();
  popupNewCard.classList.remove('popup_is-opened');
};