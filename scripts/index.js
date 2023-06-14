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
const formEditModal = document.forms["profile-form"];
const closeButtons = document.querySelectorAll(".modal__close");
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#description");
const nameInput = editModal.querySelector("#name-input");
const descriptionInput = editModal.querySelector("#description-input");
const profileAddButton = document.querySelector("#profile-add-button");
const addModal = document.querySelector("#add-modal");
const formAddModal = document.forms["card-form"];
const imageModal = document.querySelector("#image-modal");
const imgItem = document.querySelector(".modal__image-preview");
const imgItemTitle = document.querySelector(".modal__image-title");
const cardElementList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

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

function createNewCard() {
  const card = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const cardElement = getCardElement(card);
  cardElementList.prepend(cardElement);
}

function resetForm(button) {
  formAddModal.reset();
  button.disabled = true;
  button.classList.add("modal__button_disabled");
}

function viewImage(event) {
  imgItem.setAttribute("src", event.target.src);
  imgItem.setAttribute("alt", event.target.alt);
  imgItemTitle.textContent = event.target.alt;
}

function removeCard(event) {
  event.target.closest("li").remove();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementText = cardElement.querySelector(".card__text");
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementText.textContent = cardData.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_liked");
  });
  deleteButton.addEventListener("click", (event) => {
    removeCard(event);
  });
  cardElementImage.addEventListener("click", (event) => {
    openPopup(imageModal);
    viewImage(event);
  });
  return cardElement;
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardElementList.append(cardElement);
});
/*----------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*----------------------------------------------------------------------------*/

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function handleFormSubmit(event) {
  const form = event.target;
  const button = event.target.querySelector(".modal__button");

  event.preventDefault();

  if (form.name === "profile-form") updateProfile();
  if (form.name === "card-form") createNewCard();

  closePopup(form.closest(".modal"));
  resetForm(button);
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
