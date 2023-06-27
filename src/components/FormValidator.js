export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputElements = Array.from(
      this._form.querySelectorAll(settings.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      settings.submitButtonSelector
    );
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _isFoundInvalid() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
    return;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
    return;
  }

  _toggleButtonState() {
    if (this._isFoundInvalid(this._inputElements)) {
      this.disableButton();
      return;
    }
    this._enableButton();
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
