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
  imgItem,
  ImgItemTitle,
  imgItemTitle,
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
const popupWithImage = new PopupWithImage(
  "#image-modal",
  imgItem,
  imgItemTitle
);
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
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
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
  })
  .catch(console.error);

/*----------------------------------------------------------------------------*/
/*                                  Validation                                */
/*----------------------------------------------------------------------------*/

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

/*----------------------------------------------------------------------------*/
/*                                  Functions                                 */
/*----------------------------------------------------------------------------*/

function handleLikeClick(card) {
  const isLiked = card.cardIsLiked();
  api
    .changeLikeStatus(card._cardId, isLiked)
    .then((data) => {
      card.setLikeCounter(data.likes);
    })
    .catch(console.error);
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

function handleConfirmFormSubmit(idCard) {
  api
    .deleteCard(idCard)
    .then(() => {
      cardsList.removeItem(idCard);
      popupConfirmForm.close();
    })
    .catch(console.error);
}

function handleChangeFormSubmit(items) {
  popupChangeForm.renderLoading(true);
  api
    .updateAvatarPicture(items.link)
    .then((response) => {
      newUser.setUserInfo(response);
      popupChangeForm.close();
    })
    .catch(console.error)
    .finally(() => {
      popupChangeForm.renderLoading(false, "Save");
    });
}
function handleAvatarButton() {
  popupChangeForm.open();
  formValidators["change-form"].resetValidation();
}

function handleProfileFormSubmit(items) {
  popupNameForm.renderLoading(true);
  api
    .editUserProfile(items)
    .then((response) => {
      newUser.setUserInfo(response);
      popupNameForm.close();
    })
    .catch(console.error)
    .finally(() => {
      popupNameForm.renderLoading(false, "Save");
    });
}

function handleEditButton() {
  const inputValues = newUser.getUserInfo();
  nameInput.value = inputValues.name;
  descriptionInput.value = inputValues.job;
  popupNameForm.open();
  formValidators["profile-form"].resetValidation();
}

function handleAddFormSubmit(inputs) {
  popupCardForm.renderLoading(true, "Creating...");
  api
    .addCard(inputs)
    .then((res) => {
      const cardElement = renderCard(res);
      cardsList.prependCard(cardElement);
      popupCardForm.close();
    })
    .catch(console.error)
    .finally(() => {
      popupCardForm.renderLoading(false, "Create");
    });
}

function handleAddButton() {
  popupCardForm.open();
  formValidators["card-form"].resetValidation();
}

/*----------------------------------------------------------------------------*/
/*                               Event Listeners                              */
/*----------------------------------------------------------------------------*/
profileAddButton.addEventListener("click", handleAddButton);

profileEditButton.addEventListener("click", handleEditButton);

profileAvatarButton.addEventListener("click", handleAvatarButton);
