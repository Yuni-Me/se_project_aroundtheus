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
const formModal = document.querySelector("#modal-form");
const closeModal = document.querySelector("#modal-close");
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#description");
const nameInput = editModal.querySelector("#nameInput");
const descriptionInput = editModal.querySelector("#descriptionInput");
// const saveButtonModal = editModal.querySelector("#save-button-modal");
// const profileAddButton = document.querySelector("#profile-add-button");
const cardElementList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementText = cardElement.querySelector(".card__text");
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementText.textContent = cardData.name;
  return cardElement;
}
/*----------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*----------------------------------------------------------------------------*/

function togglePopupModal() {
  editModal.classList.toggle("modal_opened");
}
function handleProfileFormSubmit(event) {
  event.preventDefault();
  fillProfileInputs();
  togglePopupModal();
}
/*----------------------------------------------------------------------------*/
/*                               Event Listeners                              */
/*----------------------------------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  togglePopupModal();
});

closeModal.addEventListener("click", togglePopupModal);
formModal.addEventListener("submit", (event) => {
  updateProfile();
  handleProfileFormSubmit(event);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardElementList.append(cardElement);
});
