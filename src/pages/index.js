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

/*----------------------------------------------------------------------------*/
/*                        Create Instances of new Classes                     */
/*----------------------------------------------------------------------------*/
// Section
const cardsList = new Section(
  {
    data: initialCards,
    renderer: renderCard,
  },
  cardElements
);

// Popups
const popupCardForm = new PopupWithForm("#add-modal", handleAddFormSubmit);
const popupNameForm = new PopupWithForm("#edit-modal", handleProfileFormSubmit);
const popupWithImages = new PopupWithImages("#image-modal");
// UserInfo

/*----------------------------------------------------------------------------*/
/*                        Initialize the instances                            */
/*----------------------------------------------------------------------------*/
// Initialize all my instances
cardsList.renderItems();

// All the rest

/*----------------------------------------------------------------------------*/
/*                                  Validation                                */
/*----------------------------------------------------------------------------*/

const editValidator = new FormValidator(validationSettings, profileForm);
const addValidator = new FormValidator(validationSettings, cardForm);

/*----------------------------------------------------------------------------*/
/*                                  Functions                                 */
/*----------------------------------------------------------------------------*/

function handleCardClick(item) {
  popupWithImages.open(item);
}

function renderCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.getView();
  return cardElement;
}

/*----------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*----------------------------------------------------------------------------*/

const newUser = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleProfileFormSubmit({ title, description }) {
  newUser.setUserInfo({ name: title, job: description });
  popupNameForm.close();
}
function handleEditButton() {
  const inputValues = newUser.getUserInfo();
  nameInput.value = inputValues.name;
  descriptionInput.value = inputValues.job;
  popupNameForm.open();
  popupNameForm.setEventListeners();
  editValidator.enableValidation();
}

function handleAddFormSubmit(inputs) {
  const { title: name, link } = inputs;
  const card = {
    name: name,
    link: link,
  };
  const cardElement = renderCard(card);
  cardsList.prependCard(cardElement);
  popupCardForm.close();
}

function handleAddButton() {
  popupCardForm.open();
  popupCardForm.setEventListeners();
  addValidator.enableValidation();
}

/*----------------------------------------------------------------------------*/
/*                               Event Listeners                              */
/*----------------------------------------------------------------------------*/
profileAddButton.addEventListener("click", handleAddButton);

profileEditButton.addEventListener("click", handleEditButton);
