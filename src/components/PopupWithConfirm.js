import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this.popup.querySelector(".modal__form");
    this._saveButton = this._popupForm.querySelector("#confirm-button-modal");
    this._saveButtonText = this._saveButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  open(item) {
    super.open();
    this._item = item;
    this._setEventListeners();
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this._handleFormSubmit(this._item);
    super.close();
  };

  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._saveButton.textContent = loadingText;
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }
}
