// Функция открытия поп-апов
export function openPopup(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
}

// Функция закрытия поп-апов по клику на крестик
export function closePopup() {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

// Функция закрытия поп-апов по клику на оверлей
export function closePopupOverlay(evt) {
        const overlay = !evt.target.closest('.popup__content');
        if (overlay) {
            closePopup();
            document.removeEventListener('keydown', closePopupEsc);
        }
}

// Функция закрытия поп-апов по нажатию Esc
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}