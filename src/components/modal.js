
// функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc); // добавляем слушателя (закрытие через esc)
}

// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc); // отключяем слушателя (закрытие через esc)
}

// функция-обработчик события нажатия Esc
function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

// функция-обработчик события клика по оверлею
function closeByClick(evt) {
  evt.stopPropagation();
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closePopupButton(evt) {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}

export { openPopup, closePopup, closeByClick, closePopupButton };