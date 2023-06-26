import "./index.css";
// Import all the classes
import {
  editModal,
  modals,
  formModals,
  profileEditButton,
  closeButtons,
  profileName,
  profileDescription,
  nameInput,
  descriptionInput,
  profileAddButton,
  addModal,
  cardForm,
  profileForm,
  cardElements,
  cardTemplate,
  imgItem,
  imgItemTitle,
  imageModal,
} from "../utils/constants";
import { initialCards, validationSettings } from "../utils/constants";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
// import validationSettings from ".";

/*----------------------------------------------------------------------------*/
/*                        Create Instances of new Classes                     */
/*----------------------------------------------------------------------------*/
// Section
const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, (handleCardClick) => {
        // const popup = new PopupWithImages("#image-modal");
        // popup.open(item);
        // popup.setEventListeners();
        handleAllCardClick(item);
      });
      const cardElement = card.getView();
      cardsList.addItem(cardElement);
    },
  },
  cardElements
);

// UserInfo

/*----------------------------------------------------------------------------*/
/*                        Initialize the instances                            */
/*----------------------------------------------------------------------------*/
// Initialize all my instances
cardsList.renderItems(initialCards);

// All the rest

/*----------------------------------------------------------------------------*/
/*                                  Validation                                */
/*----------------------------------------------------------------------------*/

const editValidator = new FormValidator(validationSettings, profileForm);
const addValidator = new FormValidator(validationSettings, cardForm);
editValidator.enableValidation();
addValidator.enableValidation();
/*----------------------------------------------------------------------------*/
/*                                  Functions                                 */
/*----------------------------------------------------------------------------*/

function handleAllCardClick(item) {
  const popupWithImages = new PopupWithImages("#image-modal");
  popupWithImages.open(item);
  popupWithImages.setEventListeners();
}

// function resetForm(button) {
//   cardForm.reset();
//   // editValidator.disableButton();
// }

function renderCard(cardData) {
  const cardElement = createCard(cardData);

  return cardElement;
}

function createCard(cardData) {
  if (Object.values(cardData).includes(undefined)) {
    return;
  }
  const cardElement = new Card(cardData, cardTemplate, (handleCardClick) => {
    handleAllCardClick(cardData);
  });
  return cardElement.getView();
}

/*----------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*----------------------------------------------------------------------------*/

function handleCardFormSubmit(card) {
  // console.log(card);
  // console.log(inputs);
  // const card = {
  //   name: "Las Vegas",
  //   link: "https://static.nationalgeographic.co.uk/files/styles/image_3200/public/weblasvegasgettyimages-642330128hr.jpg?w=1600&h=1067",
  // };
  // console.log(card);
  // console.log(card);
  // event.preventDefault();
  // const cardElement = renderCard(card);
  // const cardContainer = document.querySelector(".cards__list");
  // cardContainer.prepend(cardElement);
  // closePopup(form.closest(".modal"));
  // resetForm();
  // cardForm.reset();
  // addValidator.disableButton();
}

// function handleProfileFormSubmit(event) {
//   const form = event.target;
//   event.preventDefault();
//   const newUser = new UserInfo("Jacques Cousteau", "Explorer");
//   console.log(newUser);
//   updateProfile();
//   closePopup(form.closest(".modal"));
//   // resetForm();
// }

// function fillProfileInputs() {
//   // nameInput.value = profileName.textContent;
//   // descriptionInput.value = profileDescription.textContent;
//   newUser.getUserInfo();
// }
// function updateProfile() {
//   // profileName.textContent = nameInput.value;
//   // profileDescription.textContent = descriptionInput.value;
//   return newUser.setUserInfo();
// }

const newUser = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// const newUser = new UserInfo(".profile__title", ".profile__description");
// console.log(newUser.setUserInfo);
// const popupNameForm = new PopupWithForm(
//   "#edit-modal",
//   ({ title, description }) => {
//     newUser.setUserInfo({ name: title, job: description });
//     // popupNameForm.close();
//   }
// );
function handleProfileFormSubmit({ title, description }) {
  newUser.setUserInfo({ name: title, job: description });

  // popupNameForm.close();
}
function handleEditButton() {
  const popupNameForm = new PopupWithForm(
    "#edit-modal",
    handleProfileFormSubmit
  );
  const inputValues = newUser.getUserInfo();
  nameInput.value = inputValues.name;
  descriptionInput.value = inputValues.job;
  popupNameForm.open();
  addValidator.disableButton();
}
// function handleEditButton() {
//   newUser.getUserInfo(profileName.textContent, profileDescription.textContent);
//   nameInput.value = profileName.textContent;
//   descriptionInput.value = profileDescription.textContent;
//   popupNameForm.open();
//   // editValidator.resetValidation();
//   // const { name, job } = newUser.getUserInfo();
//   // nameInput.value = name;
//   // descriptionInput.value = job;
//   // popupNameForm.open();

//   // fillProfileInputs();
//   // openPopup(editModal);

//   // popup.open();
//   // popupNameForm.setEventListeners();
// }

//

function handleAddFormSubmit(inputs) {
  // if (Object.values(inputs).includes(undefined)) {
  //   return;
  // }
  const { title: name, link } = inputs;
  const card = {
    name: name,
    link: link,
  };
  // if (Object.values(card).includes(undefined)) {
  //   return;
  // }
  const cardElement = renderCard(card);
  const cardContainer = document.querySelector(".cards__list");
  cardContainer.prepend(cardElement);
}
function handleAddButton() {
  const popupCardForm = new PopupWithForm("#add-modal", handleAddFormSubmit);
  popupCardForm.open();
  popupCardForm.setEventListeners();
  addValidator.disableButton();
}

/*----------------------------------------------------------------------------*/
/*                               Event Listeners                              */
/*----------------------------------------------------------------------------*/
profileAddButton.addEventListener("click", handleAddButton);

profileEditButton.addEventListener("click", handleEditButton);
