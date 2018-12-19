'use strict';

(function () {
  var renderCard = function (cardData) {
    var card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
    var popupType = card.querySelector('.popup__type');
    var popupRoomAndGuest = card.querySelector('.popup__text--capacity');
    var popupTimeCheck = card.querySelector('.popup__text--time');
    var popupFeatures = card.querySelector('.popup__features');
    var popupImages = card.querySelector('.popup__photos');
    var popupDescription = card.querySelector('.popup__description');
    var popupAvatar = card.querySelector('.popup__avatar');
    var closeButton = card.querySelector('.popup__close');

    card.querySelector('.popup__title').textContent = cardData.offer.title;
    card.querySelector('.popup__text--address').textContent = cardData.offer.address;
    card.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';

    if (cardData.offer.type) {
      popupType.textContent = window.form.types[cardData.offer.type].ru;
    } else {
      popupType.classList.add('hidden');
    }

    if (cardData.offer.rooms && cardData.offer.guests) {
      popupRoomAndGuest.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    } else {
      popupRoomAndGuest.classList.add('hidden');
    }

    if (cardData.offer.checkin && cardData.offer.checkout) {
      popupTimeCheck.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    } else {
      popupTimeCheck.classList.add('hidden');
    }

    if (cardData.offer.features) {
      popupFeatures.innerHTML = '';
      for (var i = 0; i < cardData.offer.features.length; i++) {
        popupFeatures.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + cardData.offer.features[i] + '"></li>');
      }
    } else {
      popupFeatures.classList.add('hidden');
    }

    if (cardData.offer.photos) {
      popupImages.innerHTML = '';
      for (var j = 0; j < cardData.offer.photos.length; j++) {
        popupImages.insertAdjacentHTML('afterBegin', '<img src="' + cardData.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
      }
    } else {
      popupImages.classList.add('hidden');
    }

    if (cardData.offer.description) {
      popupDescription.textContent = cardData.offer.description;
    } else {
      popupDescription.classList.add('hidden');
    }

    if (cardData.author.avatar) {
      popupAvatar.src = cardData.author.avatar;
    } else {
      popupAvatar.classList.add('hidden');
    }

    closeButton.addEventListener('click', function () {
      window.map.closePopup(card);
    });

    closeButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.enter) {
        window.map.closePopup(card);
      }
    });

    return card;
  };

  window.card = {
    render: renderCard
  };
})();
