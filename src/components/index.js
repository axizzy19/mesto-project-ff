import '/src/pages/index.css';
import { initialCards } from './cards.js';
import { likeCard, deleteCard, createCard } from './card.js'
import { openPopup, closePopup, closeByClick, closePopupButton } from './modal.js'
import { hideInputError, toggleButtonState, setEventListeners, enableValidation, clearValidation } from './validation.js'
import { sendLike, deleteLike, removeCard, editProfile, addNewCard, updateAvatar, loadAll } from './api.js'

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
  const profile = {
    name: nameInput.value,
    about: jobInput.value
  }
  editProfile(profile) // отправляем данные на сервер
    .then(() => {
      // вставляем новые значения 
      profileTitle.textContent = nameInputValue;
      profileDescription.textContent = jobInputValue;
      closePopup(popupEdit);
      nameInput.value = '';
      jobInput.value = '';
    })  
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editSubmitButton.textContent = "Сохранить";
    })
}

formEditProfile.addEventListener('submit', function (evt) {
  handleEditProfile(evt);
});

// подгружаем все
const setProfileData = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style = `background-image: url('${data.avatar}')`;
}

loadAll()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      addCard(card, user._id); // отрисовали картинки
    })
    setProfileData(user);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

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
      closePopup(popupPlace);
      placeNameInput.value = '';
      linkInput.value = '';
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
    .finally(() => {
      newCardSubmitButton.textContent = "Сохранить";
    })
}

formElementPicture.addEventListener('submit', function (evt) {
  handlePlaceFormSubmit(evt);
});

// форм обновления аватара
const popupProfileAvatar = document.querySelector('.popup_type_avatar');
const avatarImage = document.querySelector('.profile__image');
const urlInput = popupProfileAvatar.querySelector('.popup__input_type_url'); // инпут
const newAvatarSubmitButton = popupProfileAvatar.querySelector(`${classes.submitButtonSelector}`);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newUrl = urlInput.value;
  newAvatarSubmitButton.textContent = "Сохранение...";
  updateAvatar(newUrl)
    .then(() => {
      avatarImage.style = `background-image: url(${newUrl})`;
      closePopup(popupProfileAvatar);
      urlInput.value = '';
    })
    .catch((err) => {
      console.log(err.status);
    })
    .finally(() => {
      newAvatarSubmitButton.textContent = "Сохранить";
    })
}

avatarImage.addEventListener('click', function () {
  clearValidation(popupProfileAvatar, classes);
  openPopup(popupProfileAvatar);
})

popupProfileAvatar.addEventListener('submit', function (evt) {
  handleAvatarFormSubmit(evt);
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

export { addCard }