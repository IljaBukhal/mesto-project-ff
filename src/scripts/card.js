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
   
   function checkLikeFromMe() {
      return card.likes.map((like) => like._id).some((id) => id === myId)
   }

   function renderLikes() {
      likeButton.classList.toggle(
         cardIsLikedModifier,
         checkLikeFromMe()
      );
      likeCounter.textContent = card.likes.length;
   };

   cardImage.setAttribute('src', card.link);
   cardImage.setAttribute('alt', card.name);
   cardTitle.textContent = card.name;
   deleteButton.addEventListener('click', (evt) => {
      identifiers.idCardDel = card._id;
      deleteBtnHandler(evt);
   });
   likeButton.addEventListener('click', () => {
      toggleLike(card._id, checkLikeFromMe())
         .then((newCard) => {
            card = newCard;
            renderLikes();
         })
         .catch(console.log);
   });
   cardImage.addEventListener('click', () => {
      imgClickHandler(card);
   });

   renderLikes();
   if (card.owner['_id'] !== identifiers.myId) deleteButton.remove();
   return cardElement;
}
