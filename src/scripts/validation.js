function showInputError (
   formElement,
   inputElement,
   errorMessage,
   validationConfig
) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(validationConfig.inputErrorClass);
   if (inputElement.validity.patternMismatch) {
      errorElement.textContent = inputElement.getAttribute('data-pattern-error');
   } else {
      errorElement.textContent = errorMessage;
   }
   errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(validationConfig.inputErrorClass);
   errorElement.classList.remove(validationConfig.errorClass);
   errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement, validationConfig) {
   if (!inputElement.validity.valid) {
      showInputError(
         formElement,
         inputElement,
         inputElement.validationMessage,
         validationConfig
         );
   } else {
      hideInputError(formElement, inputElement, validationConfig);
   }
}

function hasInvalidInput(inputList) {
   return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
   if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'true');
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
   } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(validationConfig.inactiveButtonClass); 
   }
}

export function clearValidation(formElement, validationConfig) {
   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
   inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
   });
   toggleButtonState(inputList, buttonElement, validationConfig);
}

function setEventListeners(formElement, validationConfig) {
   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
   toggleButtonState(inputList, buttonElement, validationConfig);

   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
         checkInputValidity(formElement, inputElement, validationConfig);
         toggleButtonState(inputList, buttonElement, validationConfig);
      });
   });
}

export function enableValidation(validationConfig) {
   const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
   formList.forEach((formElement) => setEventListeners(formElement, validationConfig));
}