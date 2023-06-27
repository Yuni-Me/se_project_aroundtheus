// import { closeButton } from "../utils/constants";

export default class Popup {
  constructor({ popupSelector }) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeClickButton = this._closeClickButton.bind(this);
  }
  open() {
    this.popup.classList.add("modal__opened");
    this._setEventListeners();
  }

  close() {
    this.popup.classList.remove("modal__opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this.popup.removeEventListener("click", this._closeClickButton);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _closeClickButton(evt) {
    if (
      evt.target.classList.contains("modal__opened") ||
      evt.target.classList.contains("modal__close")
    ) {
      this.close();
    }
  }

  _setEventListeners() {
    this.popup.addEventListener("click", this._closeClickButton);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
