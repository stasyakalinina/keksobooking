'use strict';

(function () {
  var renderCard = function (cardData) {
    var card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

    card.querySelector('.popup__title').textContent = cardData.offer.title;
    card.querySelector('.popup__text--address').textContent = cardData.offer.address;
    card.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = window.form.types[cardData.offer.type].ru;
    card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    var features = card.querySelector('.popup__features');
    features.innerHTML = '';
    for (var i = 0; i < cardData.offer.features.length; i++) {
      features.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + cardData.offer.features[i] + '"></li>');
    }

    var images = card.querySelector('.popup__photos');
    images.innerHTML = '';
    for (var j = 0; j < cardData.offer.photos.length; j++) {
      images.insertAdjacentHTML('afterBegin', '<img src="' + cardData.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }

    card.querySelector('.popup__description').textContent = cardData.offer.description;
    card.querySelector('.popup__avatar').src = cardData.author.avatar;

    var closeButton = card.querySelector('.popup__close');

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
