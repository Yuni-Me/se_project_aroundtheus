import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openPopup, closePopup } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*----------------------------------------------------------------------------*/
/*                                  Elements                                  */
/*----------------------------------------------------------------------------*/

const modals = [...document.querySelectorAll(".modal")];
const formModals = [...document.querySelectorAll(".modal__form")];
const profileEditButton = document.querySelector("#profile-edit-button");
const editModal = document.querySelector("#edit-modal");
const closeButtons = document.querySelectorAll(".modal__close");
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#description");
const nameInput = editModal.querySelector("#name-input");
const descriptionInput = editModal.querySelector("#description-input");
const profileAddButton = document.querySelector("#profile-add-button");
const addModal = document.querySelector("#add-modal");
const formAddModal = document.forms["card-form"];
const cardElementList = document.querySelector(".cards__list");

/*----------------------------------------------------------------------------*/
/*                                  Validation                                */
/*----------------------------------------------------------------------------*/
const validationSettings = {
  // formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = document.forms["profile-form"];
const addFormElement = document.forms["card-form"];

const editValidator = new FormValidator(validationSettings, editFormElement);
const addValidator = new FormValidator(validationSettings, addFormElement);
editValidator.enableValidation();
addValidator.enableValidation();
/*----------------------------------------------------------------------------*/
/*                                  Functions                                 */
/*----------------------------------------------------------------------------*/

function fillProfileInputs() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function updateProfile() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

function resetForm(button) {
  formAddModal.reset();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardElementList.prepend(cardElement);
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template").getView();
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardElementList.append(cardElement);
});

/*----------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*----------------------------------------------------------------------------*/

function handleFormSubmit(event) {
  const form = event.target;
  const button = event.target.querySelector(".modal__button");
  const card = {
    name: titleInput.value,
    link: linkInput.value,
  };

  event.preventDefault();

  if (form.name === "profile-form") updateProfile();
  if (form.name === "card-form") renderCard(card);

  closePopup(form.closest(".modal"));
  resetForm(button);

  if (form.name === "profile-form") {
    editValidator.validationOtherReset();
    return;
  }
  addValidator.validationReset();
}

/*----------------------------------------------------------------------------*/
/*                               Event Listeners                              */
/*----------------------------------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  openPopup(editModal);
});

profileAddButton.addEventListener("click", () => {
  openPopup(addModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
      }
    }
    if (evt.target.classList.contains("modal_close")) {
      if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
      }
    }
  });
});

formModals.forEach((formModal) => {
  formModal.addEventListener("submit", handleFormSubmit);
});
