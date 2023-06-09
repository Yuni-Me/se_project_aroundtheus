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

const profileEditButton = document.querySelector("#profile-edit-button");
const editModal = document.querySelector("#edit-modal");
const formEditModal = document.querySelector("#edit-modal-form");
const closeEditModal = document.querySelector("#edit-modal-close");
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#description");
const nameInput = editModal.querySelector("#name-input");
const descriptionInput = editModal.querySelector("#description-input");
const profileAddButton = document.querySelector("#profile-add-button");
const addModal = document.querySelector("#add-modal");
const formAddModal = document.querySelector("#add-modal-form");
const closeAddModal = document.querySelector("#add-modal-close");
const imageModal = document.querySelector("#image-modal");
const imageContainer = document.querySelector("#image-container");
const closeImageModal = document.querySelector("#image-modal-close");
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

function viewImage(event) {
  const imgItem = document.createElement("img");
  const imgItemTitle = document.createElement("p");
  imgItem.setAttribute("src", event.target.src);
  imgItem.setAttribute("alt", event.target.alt);
  imgItem.classList.add("modal__image-item");
  imgItemTitle.textContent = event.target.alt;
  imgItemTitle.classList.add("modal__image-text");
  imageContainer.prepend(imgItem);
  imageContainer.append(imgItemTitle);
}

function removeCard(event) {
  event.target.parentNode.remove();
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
  const cardImage = cardElement.querySelector(".card__image");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_liked");
  });
  deleteButton.addEventListener("click", (event) => {
    removeCard(event);
  });
  cardImage.addEventListener("click", (event) => {
    togglePopupModal(imageModal);
    viewImage(event);
  });
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardElementList.append(cardElement);
});
/*----------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*----------------------------------------------------------------------------*/

function togglePopupModal(modal) {
  modal.classList.toggle("modal_opened");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  fillProfileInputs();
  togglePopupModal(editModal);
}

function handlePlaceFormSubmit(event) {
  event.preventDefault();
  createNewCard();
  togglePopupModal(addModal);
}
/*----------------------------------------------------------------------------*/
/*                               Event Listeners                              */
/*----------------------------------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  togglePopupModal(editModal);
});

profileAddButton.addEventListener("click", () => {
  titleInput.value = "";
  linkInput.value = "";
  togglePopupModal(addModal);
});

closeEditModal.addEventListener("click", () => {
  togglePopupModal(editModal);
});
closeAddModal.addEventListener("click", () => {
  togglePopupModal(addModal);
});
closeImageModal.addEventListener("click", () => {
  togglePopupModal(imageModal);
  document.querySelector(".modal__image-item").remove();
  document.querySelector(".modal__image-text").remove();
});
formEditModal.addEventListener("submit", (event) => {
  updateProfile();
  handleProfileFormSubmit(event);
});
formAddModal.addEventListener("submit", (event) => {
  handlePlaceFormSubmit(event);
});
