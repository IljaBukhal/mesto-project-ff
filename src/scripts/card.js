export function deleteBtnHandler (evt) {
   evt.target.closest('.card').remove();
}

export function likeBtnHandler (evt) {
   evt.currentTarget.classList
   .toggle('card__like-button_is-active');
}

export function createCard(card, template, callbacks) {
   const {
      deleteBtnHandler,
      likeBtnHandler,
      imgClickHandler
   } = callbacks;
   const cardElement = template.cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');
   const deleteButton = cardElement.querySelector('.card__delete-button');
   const likeButton = cardElement.querySelector('.card__like-button');

   cardImage.setAttribute('src', card.link);
   cardImage.setAttribute('alt', card.name);
   cardTitle.textContent = card.name;
   deleteButton.addEventListener('click', deleteBtnHandler);
   likeButton.addEventListener('click', likeBtnHandler);
   cardImage.addEventListener('click', () => {
      imgClickHandler(card);
   });
   return cardElement;
}

export function renderCards(cards, cardList, template, callbacks) {
   cards.forEach(card => {
      const newCard = createCard(card, template, callbacks);
      cardList.append(newCard);
   });
}