export const initialCards = [
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

export const modals = [...document.querySelectorAll(".modal")];
export const formModals = [...document.querySelectorAll(".modal__form")];
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileAvatarButton = document.querySelector(
  ".profile__image-button"
);
export const editModal = "#edit-modal";
export const closeButtons = document.querySelectorAll(".modal__close");
export const profileName = document.querySelector("#profile-title");
export const profileDescription = document.querySelector("#description");
export const nameInput = document
  .querySelector(editModal)
  .querySelector("#name-input");
export const descriptionInput = document
  .querySelector(editModal)
  .querySelector("#description-input");
export const profileAddButton = document.querySelector("#profile-add-button");
export const addModal = "#add-modal";
export const cardForm = document.forms["card-form"];
export const profileForm = document.forms["profile-form"];
export const confirmForm = document.forms["confirm-form"];
export const changeForm = document.forms["change-form"];
export const cardElements = ".cards__list";
export const cardTemplate = "#card-template";
export const imgItem = document.querySelector(".modal__image-preview");
export const imgItemTitle = document.querySelector(".modal__image-title");
export const imageModal = "#image-modal";
export const closeButton = document.querySelector(".modal__close");
export const titleInput = document.querySelector("#titleInput");
export const linkInput = document.querySelector("#linkInput");

export const validationSettings = {
  // formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
