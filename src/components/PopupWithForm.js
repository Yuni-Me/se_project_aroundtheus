import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this.popup.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._saveButton = this._popupForm.querySelector(".modal__button");
  }

  open() {
    super.open();
    this._setEventListeners();
  }

  _getInputValues() {
    const inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  _handleSubmit = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
    this._saveButton.innerHTML = this.renderLoading();
  };

  renderLoading() {
    return this._saveButton.innerHTML.trim() === "Save"
      ? "Saving..."
      : "Creating...";
  }

  hideLoading(buttonText) {
    this._saveButton.innerHTML = buttonText;
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleSubmit);
    super._setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }
}
