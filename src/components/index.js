import { forEach } from 'lodash';
import '/src/pages/index.css';
import { initialCards } from './cards.js';
import { likeCard, deleteCard, createCard } from './card.js'
import { openPopup, closePopup, closeByClick } from './modal.js'

const container = document.querySelector('.places__list'); // контейнер карточек

const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирования 
const profileAddButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки
const popupEdit = document.querySelector('.popup_type_edit'); // попап редактирования профиля
const popupNewPlace = document.querySelector('.popup_type_new-card'); // попап добавления карточки
const popupCloseButtons = document.querySelectorAll('.popup__close'); // все кнопки закрытия в document

const popupImageCard = document.querySelector('.popup_type_image'); 

// кнопка редактирования профиля
profileEditButton.addEventListener('click', function() {
  openPopup(popupEdit);
})

// кнопка добавления карточки
profileAddButton.addEventListener('click', function() {
  openPopup(popupNewPlace);
})

// кнопки закрытия попапов
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', function() {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup); 
  })
})

document.addEventListener('click', closeByClick); // закрытие по оверлею

// форма редактирования профиля
const formElement = document.querySelector('.popup_type_edit'); // находим форму
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault();
  // получаем значения полей
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  // куда надо вставить значения полей
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  // вставляем новые значения 
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
}

formElement.addEventListener('submit', function (evt) {
  handleFormSubmit(evt);
  const openedPopup = document.querySelector('.popup_is-opened');
  closePopup(openedPopup);
  nameInput.value = '';
  jobInput.value = '';
});

// форма добавления карточки
const formElementPicture = document.querySelector('.popup_type_new-card');
const placeNameInput = formElementPicture.querySelector('.popup__input_type_card-name');
const linkInput = formElementPicture.querySelector('.popup__input_type_url');

function placeFormSubmit(evt) {
  evt.preventDefault();

  const card = {
    name: placeNameInput.value,
    link: linkInput.value
  }
  container.prepend(createCard(card, deleteCard, popupImage, likeCard));
}

formElementPicture.addEventListener('submit', function(evt) {
  placeFormSubmit(evt);
  const openedPopup = document.querySelector('.popup_is-opened');
  closePopup(openedPopup);
  placeNameInput.value = '';
  linkInput.value = '';
});

// функция открытия карточки (попап)
function popupImage(evt) {
  popupImageCard.querySelector('.popup__image').src = evt.target.src;
  popupImageCard.querySelector('.popup__image').alt = evt.target.alt;
  popupImageCard.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(popupImageCard);
}

// Функция добавления карточки
function addCard(event) {
  const cardToAdd = createCard(event, deleteCard, popupImage, likeCard); // вызываем функцию для отрисовки карточки
  container.prepend(cardToAdd); // добавляем готовую карточку в контейнер
}

// Вывести карточки на страницу
initialCards.forEach(addCard);