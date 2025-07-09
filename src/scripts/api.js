const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '8c3c178a-8043-434f-8729-e0f7e0c76d72',
    'Content-Type': 'application/json'
  }
}

export function getCards() {
   return fetch(`${config.baseUrl}/cards`, {
      headers: {
         authorization: config.headers.authorization
      }
   })
      .then(res => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export function getUserInfo(userId) {
   return fetch(`${config.baseUrl}/users/${userId}`, {
      headers: {
         authorization: config.headers.authorization
      }
   })
      .then(res => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export function editProfile(name, about) {
   return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
         authorization: config.headers.authorization,
         'Content-Type': config.headers["Content-Type"]
      },
      body: JSON.stringify({
         name: name,
         about: about
      })
   })
      .then(res => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export function addNewCard(name, link) {
   return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: {
         authorization: config.headers.authorization,
         'Content-Type': config.headers["Content-Type"]
      },
      body: JSON.stringify({
         name: name,
         link: link
      })
   })
      .then(res => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export function deleteCard(id) {
   return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
         authorization: config.headers.authorization,
         'Content-Type': config.headers["Content-Type"]
      }
   })
      .then(res => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export function putLike(id) {
   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
         authorization: config.headers.authorization,
         'Content-Type': config.headers["Content-Type"]
      }
   })
      .then(res => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export function delLike(id) {
   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
         authorization: config.headers.authorization,
         'Content-Type': config.headers["Content-Type"]
      }
   })
      .then(res => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export function changeAvatar(link) {
   return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
         authorization: config.headers.authorization,
         'Content-Type': config.headers["Content-Type"]
      },
      body: JSON.stringify({
         avatar: link
      })
   })
      .then(res => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
}