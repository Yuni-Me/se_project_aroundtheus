import { openPopup, closePopup } from "../utils/utils.js";
const imageModal = document.querySelector("#image-modal");
const imgItem = document.querySelector(".modal__image-preview");
const imgItemTitle = document.querySelector(".modal__image-title");

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardText = this._cardElement.querySelector(".card__text");
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
        this._handleTrashIcon(event);
      });
    // ".card__image"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardImage();
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
    imgItem.src = this._link;
    imgItem.alt = this._name;
    imgItemTitle.textContent = this._name;
    openPopup(imageModal);
  }

  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
