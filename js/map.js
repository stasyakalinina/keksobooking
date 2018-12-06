'use strict';
//
var PINS_COUNT = 8;
var locationRange = {
  MIN: 130,
  MAX: 630
};
var timeCheck = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'bungalo', 'house'];
var TYPES = {
  palace: {
    ru: 'Дворец'
  },
  flat: {
    ru: 'Квартира'
  },
  bungalo: {
    ru: 'Бунгало'
  },
  house: {
    ru: 'Дом'
  }
};
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInteger = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var shuffleArray = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var addData = function () {
  var arrData = [];
  for (var i = 0; i < PINS_COUNT; i++) {
    arrData.push({
      author: {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        'title': titles[i],
        'address': getRandomInteger(0, 1000) + ',' + getRandomInteger(1, 500),
        'price': getRandomInteger(1000, 1000000),
        'type': types[getRandomInteger(0, types.length - 1)],
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 10),
        'checkin': timeCheck[getRandomInteger(0, timeCheck.length - 1)],
        'checkout': timeCheck[getRandomInteger(0, timeCheck.length - 1)],
        'features': shuffleArray(featuresArr).slice(getRandomInteger(0, featuresArr.length - 1)),
        'description': '',
        'photos': shuffleArray(photosArr)
      },

      location: {
        x: getRandomInteger(1, map.offsetWidth),
        y: getRandomInteger(locationRange.MIN, locationRange.MAX)
      }
    });
  }

  return arrData;
};

var pinsData = addData();

var renderPin = function (pinData) {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  var image = pin.querySelector('img');
  image.src = pinData.author.avatar;
  image.alt = pinData.offer.title;

  pin.style.left = pinData.location.x + 'px';
  pin.style.top = pinData.location.y + 'px';

  return pin;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinsData.length; i++) {
    fragment.appendChild(renderPin(pinsData[i]));
  }
  mapPins.appendChild(fragment);
};

renderPins();

// карточка

var renderCard = function (cardData) {
  var card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

  card.querySelector('.popup__title').textContent = cardData.offer.title;
  card.querySelector('.popup__text--address').textContent = cardData.offer.address;
  card.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = TYPES[cardData.offer.type].ru;
  card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

  var features = card.querySelector('.popup__features');
  features.innerHTML = '';
  for (var i = 0; i < cardData.offer.features.length; i++) {
    features.insertAdjacentHTML('afterBegin', '<li class="popup__feature popup__feature--' + cardData.offer.features[i] + '></li>');
  }

  var img = card.querySelector('.popup__photos');
  img.innerHTML = '';
  for (var j = 0; j < cardData.offer.photos.length; j++) {
    img.insertAdjacentHTML('afterBegin', '<img src="' + cardData.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }

  card.querySelector('.popup__description').textContent = cardData.offer.description;
  card.querySelector('.popup__avatar').textContent = cardData.author.avatar;
  return card;
};

map.insertBefore(renderCard(pinsData[0]), mapFilters);

map.classList.remove('map--faded');
