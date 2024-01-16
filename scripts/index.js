// @todo: Темплейт карточки

const container = document.querySelector('.places__list'); // контейнер карточек

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card');
  const cardElementCopy = template.cloneNode(true);

  const cardTitle = cardElementCopy.querySelector('.card__title');
  const cardImage = cardElementCopy.querySelector('.card__image');
  cardImage.src = item.link; // добавляем данные
  cardTitle.textContent = item.name; // добавляем заголовок
  cardImage.alt = item.name; // добавляем данные
  

  const deleteBtn = cardElementCopy.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', deleteCard); 

  return cardElementCopy; //возвращаем карточку
  // const likeBtn = cardElementCopy.querySelector('.card__like-button');
}
// Функция добавления карточки
function addCard(card) {
  const cardToAdd = createCard(card, deleteCard); // вызываем функцию для отрисовки карточки
  container.append(cardToAdd); // добавляем готовую карточку в контейнер
}

// @todo: Функция удаления карточки

function deleteCard(card) {
  const cardToRemove = card.target.closest('.card'); // target для элемента на котором произошло событие, closest - ищет родителя
  cardToRemove.remove(); // удаляем карточку
}

// @todo: Вывести карточки на страницу
container.append(initialCards.forEach(addCard));