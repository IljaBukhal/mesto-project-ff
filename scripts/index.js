// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const templateCard = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function addCard(img, ttl) {
   const cardElement = templateCard.cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');
   const deleteButton = cardElement.querySelector('.card__delete-button');

   cardImage.setAttribute('src', img);
   cardImage.setAttribute('alt', 'фотография места');
   cardTitle.insertAdjacentText('afterbegin', ttl);
   deleteButton.addEventListener('click', evt => {
      evt.target.closest('.card').remove();
   });

   placesList.append(cardElement);
}

function addAllCards() {
   initialCards.forEach(card => {
      addCard(card.link, card.name);
   });
}

addAllCards();
