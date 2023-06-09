import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, imgItem, imgItemTitle) {
    super({ popupSelector });
    this._imageItemPreview = imgItem;
    this._titleItemPreview = imgItemTitle;
  }

  open({ name, link }) {
    this._imageItemPreview.src = link;
    this._imageItemPreview.alt = name;
    this._titleItemPreview.textContent = name;
    super.open();
  }
}
