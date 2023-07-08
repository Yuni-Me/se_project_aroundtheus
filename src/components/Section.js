export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
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

  removeItem({ _id }) {
    const item = document.getElementById(_id);
    item.remove();
  }
}
