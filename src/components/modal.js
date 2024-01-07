// Функция открытия поп-апов
export function openPopup(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
}

// Функция закрытия попапов
export function closePopup(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

// Функция закрытия поп-апов по клику на крестик или оверлей
export function closePopupByClick(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget)
    }
}

// Функция закрытия поп-апов по нажатию Esc
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

/* при наведении указателя мыши на аватар, на нём появляется иконка редактирования,
а при клике открывается модальное окно с формой редактирования аватара; */