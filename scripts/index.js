// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardName, cardPic, callbcak) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__description').textContent = cardName;
    cardElement.querySelector('.card__image').src = cardPic;

    placesList.append(cardElement);

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard)
};

// @todo: Функция удаления карточки

function deleteCard(evt) {
    evt.target.parentElement.remove();
  };

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    createCard(item.name, item.link, deleteCard);
});