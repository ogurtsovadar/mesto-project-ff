import './pages/index.css';
import { createCard, deleteCallback, likeСallback } from './components/cards.js';
import { openPopup, closePopup, closePopupByClick } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfileInfo, getInitialCards, editUserProfile, addNewCard, removeCard, likeCard,
removeLike, updateAvatar } from './components/api.js';

// DOM-элементы для поп-апов
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditOpener = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardOpener = document.querySelector('.profile__add-button');
const popupImageOpener = document.querySelector('.popup_type_image');
const popupImageUrl = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupProfilePhoto = document.querySelector('.popup_type-profile-photo');
const popupProfilePhotoOpener = document.querySelector('.profile__image');
const popupButtons = document.querySelectorAll('.popup__button');

// DOM-элемент для редактирования профиля
const profileForm = document.forms.editProfile;
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const profileDescInput = document.querySelector('.popup__input_type_description');
const profileDesc = document.querySelector('.profile__description');

// DOM-элемент для редактирования аватара
const profilePhoto = document.querySelector('.profile__image-avatar');
const profilePhotoForm = document.forms.editPhoto;
const profilePhotoUrlInput = document.querySelector(".popup__input_type_photo-url");

// DOM-элемент для добавления новой карточки
const cardForm = document.forms.newPlace;
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const urlNameInput = document.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');

// DOM-элементы для действий с карточками
const likeCounter = document.querySelector(".card__like-counter");

// Функция выведения карточек на страницу
function renderCards(cards, container, deleteCallback, likeСallback, openPhoto, currentUserId) {
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, deleteCallback, likeСallback, openPhoto,currentUserId);
      container.append(cardElement);
    });
}

// Функция открытия фотографии из карточки
function openPhoto(cardData) {
  
    openPopup(popupImageOpener);

    popupImageUrl.src = cardData.link;
    popupImageCaption.textContent = cardData.name;
    popupImageUrl.alt = cardData.name;
}

// Обработчик открытия поп-апа редактирования профиля
popupEditOpener.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileDescInput.value = profileDesc.textContent;
    clearValidation(profileForm, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__error_visible'
    });
    openPopup(popupEdit);
});

// Обработчик открытия поп-апа карточки
popupNewCardOpener.addEventListener('click', () => {
    cardForm.reset();
    clearValidation(popupNewCard, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__error_visible'
    });
    openPopup(popupNewCard);
})

// Обработчик открытия поп-апа редактирования аватара
popupProfilePhotoOpener.addEventListener('click', () => {
    profilePhotoForm.reset();
    clearValidation(popupProfilePhoto, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__error_visible'
    });
    openPopup(popupProfilePhoto);
})

// Обработчики закрытия поп-апов по нажатию на крестик, оверлей или Esc
popupEdit.addEventListener('click', closePopupByClick);
popupNewCard.addEventListener('click', closePopupByClick);
popupImageOpener.addEventListener('click', closePopupByClick);
popupProfilePhoto.addEventListener('click', closePopupByClick);


// Колбек редактирования информации профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    saveButtonStatus(popupButtons, "Сохранение...");
    editUserProfile(profileNameInput.value, profileDescInput.value)
        .then(() => {
            profileName.textContent = profileNameInput.value;
            profileDesc.textContent = profileDescInput.value;
            closePopup(popupEdit);
        })
        .catch((error) => {
            console.log(`Ошибка: ${error}`);
        })
        .finally(() => {
            saveButtonStatus(popupButtons, "Сохранить");
        })
}

// Обработчик сохранения информации профиля
profileForm.addEventListener('submit', handleEditFormSubmit);

// Колбек сохранения аватара
function handleProfilePhotoSubmit(evt) {
    evt.preventDefault();
    saveButtonStatus(popupButtons, "Сохранение...");
    const newPhotoLink = profilePhotoUrlInput.value;

    updateAvatar(newPhotoLink)
        .then((updatedUserData) => {
            console.log(updatedUserData);
            profilePhoto.src = newPhotoLink;
            closePopup(popupProfilePhoto);
        })
        .catch((error) => {
            console.log(`Ошибка: ${error}`);
        })
        .finally(() => {
            saveButtonStatus(popupButtons, "Сохранить");
        })
}

// Обработчик сохранения аватара
popupProfilePhoto.addEventListener('submit', handleProfilePhotoSubmit);

// Функция замены данных профиля с сервера
function updateProfile(name, description, photo) {
    profileName.textContent = name;
    profileDesc.textContent = description;
    profilePhoto.src = photo;
}

// Функция добавления новой карточки
function makeNewCard(name, link, likes, userId, cardId) {
    const newCardData = { name, link, likes, owner: { _id: userId }, _id: cardId };
    const newCardElement = createCard(newCardData, deleteCallback, likeСallback, openPhoto, userId, cardId);
    placesList.prepend(newCardElement);
}

// Колбек добавления новой карточки из формы
function handleCardSubmit(evt) {
    evt.preventDefault();
    saveButtonStatus(popupButtons, "Сохранение...");

    const placeName = placeNameInput.value;
    const urlName = urlNameInput.value;
    const likes = likeCounter;

    addNewCard(placeName, urlName, likes)
        .then((newCard) => {
            const userId = newCard.owner._id;
            makeNewCard(newCard.name, newCard.link, newCard.likes, userId, newCard._id);
            cardForm.reset();
            closePopup(popupNewCard);
        })
        .catch((error) => {
            console.log(`Ошибка: ${error}`);
        })
        .finally(() => {
            saveButtonStatus(popupButtons, "Сохранить");
        })
};

// Обработчик сохранения новой карточки
cardForm.addEventListener('submit', (evt) => {
    handleCardSubmit(evt, makeNewCard, cardForm, closePopup);
})

// Валидация всех форм
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
});

// Функция для обновления статуса кнопки сохранения
function saveButtonStatus(buttons, saveStatus) {
    buttons.forEach((button) => {
        button.textContent = saveStatus;
    })
}

// Загрузка данных для профиля и карточек с сервера
function loadDataFromServer() {
    return Promise.all([getProfileInfo(), getInitialCards()]);
}

loadDataFromServer()
    .then(([userInfo, cardsData]) => {
    renderCards(cardsData, placesList, deleteCallback, likeСallback, openPhoto, userInfo._id);
    updateProfile(userInfo.name, userInfo.about, userInfo.avatar);
    })
    .catch((error) => {
    console.log(`Ошибка: ${error}`);
});