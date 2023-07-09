import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this.popup.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
  }

  open() {
    super.open();
    this._setEventListeners();
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _handleSubmit = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  hideLoading(buttonText) {
    this._submitButton.textContent = buttonText;
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleSubmit);
    super._setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }
}
