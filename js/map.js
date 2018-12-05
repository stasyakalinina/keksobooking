'use strict';
//
var PINS_COUNT = 8;
var locationRange = {
  MIN: 130,
  MAX: 630
};
var timeCheck = ['12:00', '13:00', '14:00'];
var randomTimeCheck = Math.floor(Math.random() * timeCheck.length);

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');


var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInteger = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

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
  for (var i = 0; i < PINS_COUNT; i ++) {
    arrData.push({
      author: {
          'avatar':'img/avatars/user0'+ (i + 1) +'.png'
        },

      offer: {
        'title': titles[i],
        /*
        'address': строка, адрес предложения, представляет собой запись вида '{{location.x}}, {{location.y}}', например, '600, 350'
        */
        'price': getRandomInteger(1000, 1000000),
        /*
        'type': строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo,
        */
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 10),
        /*
        'checkin': строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        'checkout': строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        */
        'features': shuffleArray(featuresArr).slice(getRandomInteger(0, featuresArr.length - 1)),
        'description': '',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
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
console.log(pinsData);

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
/*
var renderCard = function (cardData) {
  var card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

  card.querySelector('.popup__title').textContent = pinsData.offer.title;
  card.querySelector('.popup__text--address').textContent = pinsData.offer.address;
  card.querySelector('.popup__text--price').textContent = pinsData.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = ?
  card.querySelector('.popup__text--capacity').textContent = pinsData.offer.rooms + ' комнаты для ' + pinsData.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinsData.offer.checkin + ', выезд до ' + pinsData.offer.checkout;
  card.querySelector('popup__features') ?
  card.querySelector('.popup__description').textContent = pinsData.offer.description;
  card.querySelector('.popup__photos') ?

  return card;
};

map.insertBefore(renderCard(pinsData[0], mapFilters));
*/
map.classList.remove('map--faded');
