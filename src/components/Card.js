export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(event);
    });
    // ".card__trash-button"
    this._trashButton.addEventListener("click", () => {
      this._handleTrashIcon();
    });
    // ".card__image"
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon(event) {
    event.target.classList.toggle("card__like-button_liked");
  }

  _handleTrashIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._setEventListeners();

    return this._cardElement;
  }
}
