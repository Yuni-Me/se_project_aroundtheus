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
const saveButtonModal = editModal.querySelector("#save-button-modal");
const profileAddButton = document.querySelector("#profile-add-button");
const cardElementList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*----------------------------------------------------------------------------*/
/*                                  Functions                                 */
/*----------------------------------------------------------------------------*/

function populateField() {
  if (nameInput.value === "") {
    nameInput.value = profileName.textContent;
  } else {
    profileName.textContent = nameInput.value;
  }
  if (descriptionInput.value === "") {
    descriptionInput.value = profileDescription.textContent;
  } else {
    profileDescription.textContent = descriptionInput.value;
  }
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardData);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementText = cardElement.querySelector(".card__text");
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementText.textContent = cardData.name;
  //   cardElementImage;
  return cardElement;
}
/*----------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*----------------------------------------------------------------------------*/

function togglePopupModal() {
  editModal.classList.toggle("modal_opened");
  populateField();
}
function clearField(event) {
  event.target.value = "";
}
function handleProfileFormSubmit(event) {
  event.preventDefault();
  populateField();
  togglePopupModal();
}
/*----------------------------------------------------------------------------*/
/*                               Event Listeners                              */
/*----------------------------------------------------------------------------*/

profileEditButton.addEventListener("click", togglePopupModal);
closeModal.addEventListener("click", togglePopupModal);
nameInput.addEventListener("click", clearField);
descriptionInput.addEventListener("click", clearField);
formModal.addEventListener("submit", handleProfileFormSubmit);
// profileAddButton.addEventListener("click", );
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardElementList.append(cardElement);
});
