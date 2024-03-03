import '/src/pages/index.css';
import { initialCards } from './cards.js';
import { likeCard, deleteCard, createCard } from './card.js'
import { openPopup, closePopup, closeByClick, closePopupButton } from './modal.js'
import { hideInputError, toggleButtonState, setEventListeners, enableValidation, clearValidation } from './validation.js'

// объекты валидации
const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const container = document.querySelector('.places__list'); // контейнер карточек

const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирования 
const profileAddButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки
const popupEdit = document.querySelector('.popup_type_edit'); // попап редактирования профиля
const popupPlace = document.querySelector('.popup_type_new-card'); // попап добавления карточки
const popupNewPlace = document.querySelector('.popup_type_new-card'); // попап добавления карточки
const popupCloseButtons = document.querySelectorAll('.popup__close'); // все кнопки закрытия в document
const allPopups = document.querySelectorAll('.popup'); // все попапы
const popupImageCard = document.querySelector('.popup_type_image');

// кнопка добавления карточки
profileAddButton.addEventListener('click', function () {
  clearValidation(formElementPicture, classes); // отчистили валидацию формы новое место
  openPopup(popupNewPlace);
})

// кнопки закрытия попапов (по нажатию на крестик)
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', closePopupButton);
})

// закрытие по оверлею
allPopups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', closeByClick);
})

// форма редактирования профиля
const formEditProfile = document.querySelector('.popup_type_edit'); // находим форму
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title'); // куда надо вставить значения полей
const profileDescription = document.querySelector('.profile__description'); // куда надо вставить значения полей
const profileImage = document.querySelector('.profile__image'); // фото профиля
const editSubmitButton = formEditProfile.querySelector(`${classes.submitButtonSelector}`);

function handleEditProfile(evt) {
  evt.preventDefault();
  editSubmitButton.textContent = "Сохранение...";
  // получаем значения полей
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  // вставляем новые значения 
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  const profile = {
    name: nameInput.value,
    about: jobInput.value
  }
  editProfile(profile); // отправляем данные на сервер
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', function (evt) {
  handleEditProfile(evt);
  nameInput.value = '';
  jobInput.value = '';
});

// кнопка редактирования профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, classes); // отчистили валидацию формы редактирования профиля
  openPopup(popupEdit);
})

// форма добавления карточки
const formElementPicture = document.querySelector('.popup_type_new-card');
const placeNameInput = formElementPicture.querySelector('.popup__input_type_card-name');
const linkInput = formElementPicture.querySelector('.popup__input_type_url');
const newCardSubmitButton = formElementPicture.querySelector(`${classes.submitButtonSelector}`);

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  newCardSubmitButton.textContent = "Сохранение...";
  const card = {
    name: placeNameInput.value,
    link: linkInput.value
  }
  addNewCard(card) // отправляем данные на сервер
    .then((data) => {
      addCard(data, data.owner._id);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
  closePopup(popupPlace);
}

formElementPicture.addEventListener('submit', function (evt) {
  handlePlaceFormSubmit(evt);
  placeNameInput.value = '';
  linkInput.value = '';
});

// форм обновления аватара
const popupProfileAvatar = document.querySelector('.popup_type_avatar');
const avatarImage = document.querySelector('.profile__image');
const urlInput = popupProfileAvatar.querySelector('.popup__input_type_url'); // инпут
const newAvatarSubmitButton = popupProfileAvatar.querySelector(`${classes.submitButtonSelector}`);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newUrl = urlInput.value;
  avatarImage.style = `background-image: url(${newUrl})`;
  updateAvatar(newUrl);
  newAvatarSubmitButton.textContent = "Сохранение...";
  closePopup(popupProfileAvatar);
}

avatarImage.addEventListener('click', function () {
  urlInput.value = '';
  clearValidation(popupProfileAvatar, classes);
  openPopup(popupProfileAvatar);
})

popupProfileAvatar.addEventListener('submit', function (evt) {
  handleAvatarFormSubmit(evt);
  urlInput.value = '';
})

// функция открытия карточки (попап)
const popupCard = popupImageCard.querySelector('.popup__image');
const popupCaption = popupImageCard.querySelector('.popup__caption');

function openImage(evt) {
  popupCard.src = evt.target.src;
  popupCard.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupImageCard);
}

// Функция добавления карточки
function addCard(card, userId) {
  const cardHandlers = {
    deleteCard: deleteCard,
    likeCard: likeCard,
    openImage: openImage,
  }
  const cardToAdd = createCard(card, userId, cardHandlers); // вызываем функцию для отрисовки карточки
  container.prepend(cardToAdd); // добавляем готовую карточку в контейнер
}

enableValidation(classes);

/////////////////////////////////////////////////////
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: '35c02d02-ff23-40e2-9ac1-535987aab634',
    'Content-Type': 'application/json'
  }
}

// функция проверяет, что все хорошо
function checkResponse(data) {
  if (data.ok) {
    return data.json();
  }
  return Promise.reject(`Ошибка: ${data.status}`);
}

// запрос GET: Вывод карточек на страницу
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// запрос GET: Загрузка информации о пользователе с сервера
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

const setProfileData = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style = `background-image: url('${data.avatar}')`;
}

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, user]) => {
    cards.forEach((card) => {
      // console.log(card.likes.length);
      addCard(card, user._id); // отрисовали картинки
    })
    setProfileData(user);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

// запрос PATCH: Редактирование профиля
const editProfile = (profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about
    })
  })
    .then(checkResponse);
}

// запрос POST: Добавление новой карточки
const addNewCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
    .then(checkResponse);
}

// запрос DELETE: удаление карточки
const removeCard = (card, id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}

// запрос PUT: Добавляем лайк
const sendLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse);
}

// запрос DELETE: Убираем лайк
const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse);
}

// запрос PATCH: Обновление аватара пользователя
const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
    .then(checkResponse);
}

export { sendLike, deleteLike, removeCard }