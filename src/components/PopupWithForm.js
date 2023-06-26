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

    if (Object.values(values).includes(undefined || null || "")) {
      return;
    } else {
      return values;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      const inputValues = this._getInputValues();
      if (inputValues !== undefined) {
        this._handleFormSubmit(inputValues);
        this.close();
      }
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
