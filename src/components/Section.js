export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // uses this._ renderer to create the elements for rendering
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    // take the item and render it into this._element
    this._container.append(element);
  }

  prependCard(cardElement) {
    this._container.prepend(cardElement);
  }
}
