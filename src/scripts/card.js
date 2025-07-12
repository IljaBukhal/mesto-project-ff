export function createCard(
   card,
   myId,
   template,
   identifiers,
   callbacks
) {
   const {
      deleteBtnHandler,
      imgClickHandler,
      toggleLike
   } = callbacks;
   const cardElement = template.cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');
   const deleteButton = cardElement.querySelector('.card__delete-button');
   const likeButton = cardElement.querySelector('.card__like-button');
   const likeCounter = cardElement.querySelector('.card__like-counter');
   const cardIsLikedModifier = 'card__like-button_is-active';
   let currentCard = card;
   
   function checkLikeFromMe() {
      return currentCard.likes.some((like) => like._id === myId);
   }

   function renderLikes() {
      likeButton.classList.toggle(
         cardIsLikedModifier,
         checkLikeFromMe()
      );
      likeCounter.textContent = currentCard.likes.length;
   };

   cardImage.setAttribute('src', currentCard.link);
   cardImage.setAttribute('alt', currentCard.name);
   cardTitle.textContent = currentCard.name;
   deleteButton.addEventListener('click', (evt) => {
      identifiers.idCardDel = currentCard._id;
      deleteBtnHandler(evt);
   });
   likeButton.addEventListener('click', () => {
      toggleLike(currentCard._id, checkLikeFromMe())
         .then((newCard) => {
            currentCard = newCard;
            renderLikes();
         })
         .catch(console.log);
   });
   cardImage.addEventListener('click', () => {
      imgClickHandler(currentCard);
   });

   renderLikes();
   if (currentCard.owner['_id'] !== myId) deleteButton.remove();
   return cardElement;
}
