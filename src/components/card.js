

// функция создания карточки
function createCard(item, {deleteCard, openImage, likeCard}) {
  const template = document.querySelector('#card-template').content.querySelector('.card');
  const cardElementCopy = template.cloneNode(true);
  const likeButton = cardElementCopy.querySelector('.card__like-button');

  const cardTitle = cardElementCopy.querySelector('.card__title');
  const cardImage = cardElementCopy.querySelector('.card__image');
  cardImage.src = item.link; // добавляем данные
  cardTitle.textContent = item.name; // добавляем заголовок
  cardImage.alt = item.name; // добавляем данные
  
  const deleteBtn = cardElementCopy.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', deleteCard); 

  cardImage.addEventListener('click', openImage);
  likeButton.addEventListener('click', likeCard);

  return cardElementCopy; //возвращаем карточку
}

// Функция удаления карточки
function deleteCard(card) {
  const cardToRemove = card.target.closest('.card'); // target для элемента на котором произошло событие, closest - ищет родителя
  cardToRemove.remove(); // удаляем карточку
}

// функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { likeCard, deleteCard, createCard };