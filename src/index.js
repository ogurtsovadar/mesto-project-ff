import './pages/index.css';
import { placesList, initialCards, createCard, deleteCard, likeCard } from './components/cards.js';
import { openPopup, closePopup, closePopupOverlay } from './components/modal.js';

// DOM-элементы для поп-апов
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditOpener = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardOpener = document.querySelector('.profile__add-button');
const popupCloser = document.querySelectorAll('.popup__close');
const popupImageOpener = document.querySelector('.popup_type_image');
const popupImageUrl = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

// DOM-элемент для редактирования профиля
const profileForm = document.forms.editProfile;
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const profileDescInput = document.querySelector('.popup__input_type_description');
const profileDesc = document.querySelector('.profile__description');

// DOM-элемент для добавления новой карточки
const cardForm = document.forms.newPlace;
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const urlNameInput = document.querySelector('.popup__input_type_url');

// Вывести карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(createCard(item.name, item.link, deleteCard, likeCard, openPhoto));
});

// Открытие поп-апа редактирования профиля
popupEditOpener.addEventListener('click', () => openPopup(popupEdit));

// Заполнение полей формы редактирования профиля данными из профиля
profileNameInput.value = profileName.textContent;
profileDescInput.value = profileDesc.textContent;

// Открытие поп-апа карточки
popupNewCardOpener.addEventListener('click', () => openPopup(popupNewCard));

// Закрытие поп-апов по клику на крестик
popupCloser.forEach((item) => {
    item.addEventListener('click', closePopup);
})

// Закрытие поп-апов по клику на оверлей
popupEdit.addEventListener('click', closePopupOverlay);
popupNewCard.addEventListener('click', closePopupOverlay);
popupImageOpener.addEventListener('click', closePopupOverlay);

// Функция редактирования информации профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const newName = profileNameInput.value;
    const newDesc = profileDescInput.value;

    profileName.textContent = newName;
    profileDesc.textContent = newDesc;
    closePopup();
}

// Редактирование информации профиля
profileForm.addEventListener('submit', handleEditFormSubmit); 

// Функция добавления новой карточки из формы
function handleCardSubmit(evt) {
    evt.preventDefault();

    const placeName = placeNameInput.value;
    const urlName = urlNameInput.value;
    const newCard = createCard(placeName, urlName, deleteCard, likeCard, openPhoto);
  
    placesList.prepend(newCard);
    cardForm.reset();
    closePopup();

  };

// Добавление новой карточки
cardForm.addEventListener('submit', handleCardSubmit)

// Функция открытия фотографии карточки
function openPhoto(cardName, cardPic) {
  
    openPopup(popupImageOpener);

    popupImageUrl.src = cardPic;
    popupImageCaption.textContent = cardName;
    popupImageUrl.alt = cardName;
  }