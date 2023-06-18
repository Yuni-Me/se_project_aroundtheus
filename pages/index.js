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
const cardForm = document.forms["card-form"];
const profileForm = document.forms["profile-form"];
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

const editValidator = new FormValidator(validationSettings, profileForm);
const addValidator = new FormValidator(validationSettings, cardForm);
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
  cardForm.reset();
  editValidator.disableButton();
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

function handleProfileFormSubmit(event) {
  const form = event.target;
  event.preventDefault();
  updateProfile();
  closePopup(form.closest(".modal"));
  resetForm();
}

function handleCardFormSubmit(event) {
  const form = event.target;
  const card = {
    name: titleInput.value,
    link: linkInput.value,
  };
  event.preventDefault();
  renderCard(card);
  closePopup(form.closest(".modal"));
  resetForm();
  addValidator.resetValidation();
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

// modal can be closed by clicking the closeButton [X]
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// modal can be closed by clicking anywhere outside its borders
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    console.log(modal);
    if (evt.target.classList.contains("modal__opened")) {
      closePopup(evt.target);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(evt.target);
    }
  });
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
