import './pages/index.css';
import { placesList, initialCards, createCard, deleteCard, likeCard, openPhoto, handleCardSubmit } from './components/cards.js';
import { openPopup, closePopup, closePopupOverlay, closePopupEsc, handleFormSubmit } from './components/modal.js';

// DOM-элементы для поп-апов
const popups = document.querySelectorAll('.popup');
const popupEditOpener = document.querySelector('.profile__edit-button');
const popupNewCardOpener = document.querySelector('.profile__add-button');
const popupCloser = document.querySelectorAll('.popup__close');

// DOM-элемент для редактирования профиля
const profileForm = document.forms.editProfile;

// DOM-элемент для добавления новой карточки
const cardForm = document.forms.newPlace;

// Вывести карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(createCard(item.name, item.link, deleteCard, likeCard, openPhoto));
});

// Открытие поп-апов редактирования профиля и поп-апа карточки
popupEditOpener.addEventListener('click', openPopup);
popupNewCardOpener.addEventListener('click', openPopup);

// Закрытие поп-апов по клику на крестик
popupCloser.forEach(closePopup);

// Закрытие поп-апов по клику на оверлей
popups.forEach(closePopupOverlay);

// Закрытие поп-апов по нажатию Esc
document.addEventListener('keydown', closePopupEsc);

// Редактирование информации профиля
profileForm.addEventListener('submit', handleFormSubmit); 

// Добавление новой карточки
cardForm.addEventListener('submit', handleCardSubmit)

