//  DOM-элементы для открытия и закрытия попапов
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageOpener = document.querySelector('.popup_type_image');

// Функция открытия поп-апов
export function openPopup(evt) {
    if (evt.target.closest('.profile__edit-button')) {
        popupEdit.classList.add('popup_is-opened');
        profileNameInput.value = profileName.textContent;
        profileDescInput.value = profileDesc.textContent;
    }
    else if (evt.target.closest('.profile__add-button')) {
        popupNewCard.classList.add('popup_is-opened');
    }
}

// Функция закрытия поп-апов по клику на крестик
export function closePopup(el) {
    el.addEventListener('click', function() {
        popupEdit.classList.remove('popup_is-opened');
        popupNewCard.classList.remove('popup_is-opened');
        popupImageOpener.classList.remove('popup_is-opened');
    })
}

// Функция закрытия поп-апов по клику на оверлей
export function closePopupOverlay(el) {
    el.addEventListener('click', function(evt) {
        const overlay = !evt.target.closest('.popup__content');
        if (overlay) {
            popupEdit.classList.remove('popup_is-opened');
            popupNewCard.classList.remove('popup_is-opened');
            popupImageOpener.classList.remove('popup_is-opened');
        }
    })
}

// Функция закрытия поп-апов по нажатию Esc
export function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        popupEdit.classList.remove('popup_is-opened');
        popupNewCard.classList.remove('popup_is-opened');
        popupImageOpener.classList.remove('popup_is-opened');
    }
}

// Функция редактирования информации профиля
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const profileDescInput = document.querySelector('.popup__input_type_description');
const profileDesc = document.querySelector('.profile__description');

export function handleFormSubmit(evt) {
    evt.preventDefault();
    const newName = profileNameInput.value;
    const newDesc = profileDescInput.value;
    const popupEdit = document.querySelector('.popup_type_edit');

    profileName.textContent = newName;
    profileDesc.textContent = newDesc;
    popupEdit.classList.remove('popup_is-opened');
}