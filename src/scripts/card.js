export function createCard(
   card,
   template,
   identifiers,
   callbacks
) {
   const {
      deleteBtnHandler,
      likeBtnHandler,
      imgClickHandler
   } = callbacks;
   const cardElement = template.cloneNode(true);
   const cardBody = cardElement.querySelector('.card');
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');
   const deleteButton = cardElement.querySelector('.card__delete-button');
   const likeButton = cardElement.querySelector('.card__like-button');
   const likeCounter = cardElement.querySelector('.card__like-counter');

   cardBody.setAttribute('data-card-id', card['_id']);
   likeCounter.textContent = card.likes.length;
   cardImage.setAttribute('src', card.link);
   cardImage.setAttribute('alt', card.name);
   cardTitle.textContent = card.name;
   deleteButton.addEventListener('click', deleteBtnHandler);
   likeButton.addEventListener('click', likeBtnHandler);
   cardImage.addEventListener('click', () => {
      imgClickHandler(card);
   });
   const checkLikeFromMe = card.likes
      .some((like) => like['_id'] === identifiers.myId);
   if (checkLikeFromMe) likeButton.classList.add('card__like-button_is-active');
   if (card.owner['_id'] !== identifiers.myId) deleteButton.remove();
   return cardElement;
}

export function renderCards(
   cards,
   cardList,
   template,
   identifiers,
   callbacks
) {
   const cardElements = Array.from(cardList.children);
   cardElements.forEach((cardElement) => cardElement.remove());
   cards.forEach(card => {
      const newCard = createCard(card, template, identifiers, callbacks);
      cardList.append(newCard);
   });
}
