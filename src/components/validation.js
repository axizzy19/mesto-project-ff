// вывод ошибки
const showInputError = (formElement, input, errorMessage, classes) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`); // спан, где будет ошибка
  input.classList.add(classes.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classes.errorClass);
}

// ошибка спрятана
const hideInputError = (formElement, input, classes) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`); // спан, где будет ошибка
  input.classList.remove(classes.inputErrorClass);
  errorElement.classList.remove(classes.errorClass);
  errorElement.textContent = '';
}

// функция проверки валидации
const checkInputValidity = (formElement, inputElement, classes) => { // formElement - форма
  if ((!inputElement.validity.valid)) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classes);
  }
  else {
    hideInputError(formElement, inputElement, classes);
  }
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
}

// функция валидации нескольких полей формы
function setEventListeners (formElement, classes) {
  const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector)); // все инпуты одной формы
  const buttonElement = formElement.querySelector(classes.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, classes); // каждый инпут одной формы
      toggleButtonState(inputList, buttonElement, classes);
    })
  })
}

// функция проверки, есть ли хотя бы одно невалидное поле (инпут)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; // если все валидны - false
  })
}

// функция переклюения состояния кнопки
const toggleButtonState = (inputList, buttonElement, classes) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classes.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  }
  else {
    buttonElement.classList.remove(classes.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

// включение валидации
function enableValidation(classes) {
  const forms = Array.from(document.querySelectorAll(classes.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, classes);
  })
}

// отчистка валидации
const clearValidation = (formElement, classes) => {
  const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, classes);
  })
  const buttonElement = formElement.querySelector(classes.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, classes);
}

export { hideInputError, toggleButtonState, setEventListeners, enableValidation, clearValidation }