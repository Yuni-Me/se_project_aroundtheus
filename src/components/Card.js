// import { openPopup, closePopup } from "../utils/utils.js";

export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardText = this._cardElement.querySelector(".card__text");
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  _setEventListeners() {
    // ".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon(event);
      });
    // ".card__trash-button"
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashIcon();
      });
    // ".card__image"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  _handleLikeIcon(event) {
    event.target.classList.toggle("card__like-button_liked");
  }
  _handleTrashIcon(event) {
    this._cardElement.remove();
    this._cardElement = null;
  }
  _handleCardImage() {
    document.querySelector(".modal__image-preview").src = this._link;
    document.querySelector(".modal__image-preview").alt = this._name;
    document.querySelector(".modal__image-title").textContent = this._name;
    openPopup(document.querySelector("#image-modal"));
  }

  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
