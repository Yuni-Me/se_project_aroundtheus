import { openPopup, closePopup } from "../utils/utils.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
        this._handleCardImage(event);
      });
  }

  _handleLikeIcon(event) {
    event.target.classList.toggle("card__like-button_liked");
  }
  _handleTrashIcon(event) {
    this._cardElement.remove();
    this._cardElement = null;
  }
  _handleCardImage(event) {
    const imageModal = document.querySelector("#image-modal");
    const imgItem = document.querySelector(".modal__image-preview");
    const imgItemTitle = document.querySelector(".modal__image-title");
    openPopup(imageModal);
    imgItem.setAttribute("src", event.target.src);
    imgItem.setAttribute("alt", event.target.alt);
    imgItemTitle.textContent = event.target.alt;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
