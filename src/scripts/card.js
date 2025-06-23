export function deleteBtnHandler (evt) {
   evt.target.closest('.card').remove();
}

export function likeBtnHandler (evt) {
   evt.currentTarget.classList.toggle('card__like-button_is-active');
}

export function imgClickHandler(evt) {
   const mdlImage = document.querySelector('.popup_type_image');
   const popupImage = mdlImage.querySelector('.popup__image');
   const popupCaption = mdlImage.querySelector('.popup__caption');
   const selectedCard = evt.target.closest('.card');
   const caption = selectedCard.querySelector('.card__description').textContent;
   popupImage.alt = caption;
   popupImage.src = evt.target.src;
   popupCaption.textContent = caption;
}

export function createCard(card, template, callbacks) {
   const [
      deleteBtnHandler,
      likeBtnHandler,
      imgClickHandler,
      openMdl
   ] = callbacks;
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
   cardImage.addEventListener('click', (evt => {
      const mdlImage = document.querySelector('.popup_type_image');
      imgClickHandler(evt);
      openMdl(mdlImage);
   }));
   return cardElement;
}

export function renderCards(cards, cardList, template, callbacks) {
   cards.forEach(card => {
      const newCard = createCard(card, template, callbacks);
      cardList.append(newCard);
   });
}