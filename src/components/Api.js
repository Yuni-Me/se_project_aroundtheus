export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._avatar = {
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBc4IbrWzxh3_z-xVsrhjE3gGnbqpDEM9dm4MlCrWCpNjUByptghWQQUc6N0hmY24-cQ&usqp=CAU",
    };
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  async getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  async getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  async editUserProfile({ title: name, description: about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  async addCard({ title: name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  async deleteCard({ _id }) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  async changeLikeStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  async updateAvatarPicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      creadentials: "same-origin",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

// "https://around.nomoreparties.co/v1/cohort-3-en/cards"
// "0fe9b689-fa89-45da-98e3-26ffd27d7799"
