import '/src/pages/index.css';
import { initialCards } from './cards.js';
import { likeCard, deleteCard, createCard } from './card.js'
import { openPopup, closePopup, closeByClick, closePopupButton } from './modal.js'

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
profileAddButton.addEventListener('click', function() {
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

function handleEditProfile(evt) {
  evt.preventDefault();
  // получаем значения полей
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  // вставляем новые значения 
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', function (evt) {
  handleEditProfile(evt);
  nameInput.value = '';
  jobInput.value = '';
});

// кнопка редактирования профиля
profileEditButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
})

// форма добавления карточки
const formElementPicture = document.querySelector('.popup_type_new-card');
const placeNameInput = formElementPicture.querySelector('.popup__input_type_card-name');
const linkInput = formElementPicture.querySelector('.popup__input_type_url');

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: placeNameInput.value,
    link: linkInput.value
  }
  container.prepend(createCard(card, deleteCard, openImage, likeCard));
  closePopup(popupPlace);
}

formElementPicture.addEventListener('submit', function(evt) {
  handlePlaceFormSubmit(evt);
  placeNameInput.value = '';
  linkInput.value = '';
});

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
function addCard(card) {
  const cardHandlers = {
    deleteCard: deleteCard,
    likeCard: likeCard,
    openImage: openImage,
    }
  const cardToAdd = createCard(card, cardHandlers); // вызываем функцию для отрисовки карточки
  container.prepend(cardToAdd); // добавляем готовую карточку в контейнер
}

// Вывести карточки на страницу
initialCards.forEach(addCard);