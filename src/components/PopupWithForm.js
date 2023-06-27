import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this.popup.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  _handleSubmit = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }

  close() {
    this._popupForm.removeEventListener("submit", this._handleSubmit);
    this._popupForm.reset();
    super.close();
  }
}
