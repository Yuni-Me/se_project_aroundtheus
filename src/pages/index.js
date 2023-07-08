// Some imports
import "./index.css";
import {
  profileEditButton,
  nameInput,
  descriptionInput,
  profileAddButton,
  profileAvatarButton,
  cardForm,
  profileForm,
  changeForm,
  cardElements,
  cardTemplate,
} from "../utils/constants";
import { initialCards, validationSettings } from "../utils/constants";
/*----------------------------------------------------------------------------*/
/*                            Import all the Classes                          */
/*----------------------------------------------------------------------------*/

import Card from "../components/Card.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

/*----------------------------------------------------------------------------*/
/*                       Create and Initialize new Classes                    */
/*----------------------------------------------------------------------------*/
// API
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "0fe9b689-fa89-45da-98e3-26ffd27d7799",
    "Content-Type": "application/json",
  },
});

// UserInfo
const newUser = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Popups
const popupCardForm = new PopupWithForm("#add-modal", handleAddFormSubmit);
const popupNameForm = new PopupWithForm("#edit-modal", handleProfileFormSubmit);
const popupWithImage = new PopupWithImage("#image-modal");
const popupConfirmForm = new PopupWithConfirm(
  "#confirm-modal",
  handleConfirmFormSubmit
);
const popupChangeForm = new PopupWithForm(
  "#change-modal",
  handleChangeFormSubmit
);

/*----------------------------------------------------------------------------*/
/*                        Initial Cards and userData                          */
/*----------------------------------------------------------------------------*/
let cardsList, myId;
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cardsData]) => {
    myId = userData._id;
    newUser.setUserInfo(userData);
    cardsList = new Section(
      {
        data: cardsData,
        renderer: renderCard,
      },
      cardElements
    );
    cardsList.renderItems(cardsData);
  }
);

/*----------------------------------------------------------------------------*/
/*                                  Validation                                */
/*----------------------------------------------------------------------------*/

const editValidator = new FormValidator(validationSettings, profileForm);
const addValidator = new FormValidator(validationSettings, cardForm);
// const confirmValidator = new FormValidator(validationSettings, confirmForm);
const changeValidator = new FormValidator(validationSettings, changeForm);
editValidator.enableValidation();
addValidator.enableValidation();
changeValidator.enableValidation();

/*----------------------------------------------------------------------------*/
/*                                  Functions                                 */
/*----------------------------------------------------------------------------*/

async function handleLikeClick(card) {
  const isLiked = card.cardIsLiked();
  await api
    .changeLikeStatus(card._cardId, isLiked)
    .then((data) => {
      this.setLikeCounter(data.likes);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleTrashIcon(item) {
  popupConfirmForm.open(item);
}

function handleCardClick(item) {
  popupWithImage.open(item);
}

function renderCard(item) {
  const card = new Card(
    item,
    myId,
    cardTemplate,
    handleCardClick,
    handleTrashIcon,
    handleLikeClick
  );
  const cardElement = card.getView();
  return cardElement;
}

/*----------------------------------------------------------------------------*/
/*                               Event Handlers                               */
/*----------------------------------------------------------------------------*/

async function handleConfirmFormSubmit(idCard) {
  await api.deleteCard(idCard).then(() => {
    cardsList.removeItem(idCard);
  });
}

function handleChangeFormSubmit(items) {
  api
    .updateAvatarPicture(items.link)
    .then((response) => {
      newUser.setUserInfo(response);
      popupChangeForm.close();
      changeForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupChangeForm.hideLoading("Save");
    });
}
function handleAvatarButton() {
  popupChangeForm.open();
  changeValidator.resetValidation();
}

function handleProfileFormSubmit(items) {
  api
    .editUserProfile(items)
    .then((response) => {
      newUser.setUserInfo(response);
      popupNameForm.close();
      profileForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupNameForm.hideLoading("Save");
    });
}

function handleEditButton() {
  const inputValues = newUser.getUserInfo();
  nameInput.value = inputValues.name;
  descriptionInput.value = inputValues.job;
  popupNameForm.open();
  editValidator.resetValidation();
}

function handleAddFormSubmit(inputs) {
  api
    .addCard(inputs)
    .then((res) => {
      const cardElement = renderCard(res);
      cardsList.prependCard(cardElement);
      popupCardForm.close();
      cardForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupCardForm.hideLoading("Create");
    });
}

function handleAddButton() {
  popupCardForm.open();
  addValidator.resetValidation();
}

/*----------------------------------------------------------------------------*/
/*                               Event Listeners                              */
/*----------------------------------------------------------------------------*/
profileAddButton.addEventListener("click", handleAddButton);

profileEditButton.addEventListener("click", handleEditButton);

profileAvatarButton.addEventListener("click", handleAvatarButton);
