const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-3',
    headers: {
      authorization: 'c94bfd38-26a2-483c-8480-332741fea109',
      'Content-Type': 'application/json',
    }
}

// Загрузка информации о пользователе с сервера
export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

// Загрузка карточек с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Редактирование профиля
export const editUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Запрос на добавление новой карточки
export const addNewCard = (name, link) => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-3/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Удаление карточки
export const removeCard = (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-3/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Постановка и снятие лайка
export const likeCard = (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-3/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const removeLike = (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-3/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Обновление аватара пользователя
export const updateAvatar = (avatarLink) => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-3/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}