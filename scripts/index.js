const templateCard = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function handleDeleteCard (evt) {
   evt.target.closest('.card').remove();
}

function createCard(card) {
   const cardElement = templateCard.cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');
   const deleteButton = cardElement.querySelector('.card__delete-button');

   cardImage.setAttribute('src', card.link);
   cardImage.setAttribute('alt', 'фотография места');
   cardTitle.insertAdjacentText('afterbegin', card.name);
   deleteButton.addEventListener('click', handleDeleteCard);
   return cardElement;
}

function renderCards() {
   initialCards.forEach(card => {
      const newCard = createCard(card);
      placesList.append(newCard);
   });
}

renderCards();