export default class Card {
  constructor(
    data,
    myId,
    cardSelector,
    handleCardClick,
    handleTrashIcon,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._myId = myId;
    this._likes = data.likes;
    this._userId = data.likes._id;
    this._ownerId = data.owner._id;
    this._cardLikes = this._likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashIcon = handleTrashIcon;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _fillCard() {
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._cardElement.id = this._cardId;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeCounter = this._cardElement.querySelector(".card__like-counter");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    this._trashButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._handleTrashIcon({ _id: this._cardId });
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _setTrashIcon() {
    if (this._ownerId !== this._myId) {
      this._trashButton.remove();
    }
  }
  _updateLikes(likes) {
    this._likeCounter.textContent = this._likes.length;
    if (this.cardIsLiked(likes)) {
      this._likeButton.classList.add("card__like-button_liked");
    } else {
      this._likeButton.classList.remove("card__like-button_liked");
    }
  }

  cardIsLiked() {
    return this._likes.some((like) => {
      return like._id === this._myId;
    });
  }

  setLikeCounter(likes) {
    this._likes = likes;
    this._updateLikes(likes);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._fillCard();
    this._updateLikes();
    this._setTrashIcon();
    this._setEventListeners();

    return this._cardElement;
  }
}
