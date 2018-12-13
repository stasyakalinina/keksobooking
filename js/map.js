'use strict';
//
var PINS_COUNT = 8;
var PIN_TAIL = 17;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var locationRange = {
  MIN: 130,
  MAX: 630
};
var timeCheck = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');
var inputAddress = document.querySelector('#address');

var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('.ad-form__element');
var mainPin = map.querySelector('.map__pin--main');


var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'bungalo', 'house'];

// вынести в модуль form
var TYPES = {
  palace: {
    ru: 'Дворец',
    min: 10000
  },
  flat: {
    ru: 'Квартира',
    min: 1000
  },
  bungalo: {
    ru: 'Бунгало',
    min: 0
  },
  house: {
    ru: 'Дом',
    min: 5000
  }
};
var ROOM_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};
var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');
var type = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var submitBtn = adForm.querySelector('.ad-form__submit');
var resetBtn = adForm.querySelector('.ad-form__reset');
// var fieldsForm = adForm.querySelectorAll('.ad-form input, .ad-form select');

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

var setPinClass = function () {
  var activePin = map.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};

var openPopup = function (pinData) {
  map.insertBefore(renderCard(pinData), mapFilters);
};

var activatePin = function (pin, pinData) {
  setPinClass();

  var popup = map.querySelector('.popup');
  if (popup) {
    closePopup(popup);
  }

  pin.classList.add('map__pin--active');
  openPopup(pinData);
};

var renderPin = function (pinData) {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  var image = pin.querySelector('img');
  image.src = pinData.author.avatar;
  image.alt = pinData.offer.title;

  pin.style.left = pinData.location.x + 'px';
  pin.style.top = pinData.location.y + 'px';

  pin.setAttribute('tabindex', '0');

  pin.addEventListener('click', function () {
    activatePin(pin, pinData);
  });

  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePin(pin, pinData);
    }
  });

  return pin;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinsData.length; i++) {
    fragment.appendChild(renderPin(pinsData[i]));
  }
  mapPins.appendChild(fragment);
};

var removePins = function () {
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var i = 0; i < pins.length; i++) {
    mapPins.removeChild(pins[i]);
  }
};

var closePopup = function (popup) {
  map.removeChild(popup);
  setPinClass();
};

// отрисовка карточки
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
    features.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + cardData.offer.features[i] + '"></li>');
  }

  var img = card.querySelector('.popup__photos');
  img.innerHTML = '';
  for (var j = 0; j < cardData.offer.photos.length; j++) {
    img.insertAdjacentHTML('afterBegin', '<img src="' + cardData.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }

  card.querySelector('.popup__description').textContent = cardData.offer.description;
  card.querySelector('.popup__avatar').src = cardData.author.avatar;

  var closeButton = card.querySelector('.popup__close');

  closeButton.addEventListener('click', function () {
    closePopup(card);
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup(card);
    }
  });

  return card;
};

var setDisableFieldset = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
};

// Разблокируем все поля
var removeDisableFieldset = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
};

var setAdressValue = function () {
  var leftOffset = Math.round(parseInt(mainPin.style.left, 10) + mainPin.offsetWidth / 2);
  var topOffset = 0;

  if (!map.classList.contains('map--faded')) {
    topOffset = Math.round(parseInt(mainPin.style.top, 10) + mainPin.offsetHeight + PIN_TAIL);
  } else {
    topOffset = Math.round(parseInt(mainPin.style.top, 10) + mainPin.offsetHeight + 2);
  }
  inputAddress.value = leftOffset + ', ' + topOffset;
};

var onMainPinMouseUp = function () {
  map.classList.remove('map--faded');
  removeDisableFieldset();
  adForm.classList.remove('ad-form--disabled');
  renderPins();
  setAdressValue();
  mainPin.removeEventListener('mouseup', onMainPinMouseUp);
};

// при нажатии мыши активируется карта, разблокируются поля формы и отрисовываются пины
mainPin.addEventListener('mouseup', onMainPinMouseUp);

// устанавливает значение главного пина при неактивной странице
setAdressValue();

// Все поля блокируем по умолчанию
setDisableFieldset();

// закрываем попап по ESC
document.addEventListener('keydown', function (evt) {
  var popup = map.querySelector('.popup');
  if (evt.keyCode === ESC_KEYCODE && popup) {
    closePopup(popup);
  }
});

// работа с формой
// функция подбора гостей по количеству выбранных комнат
var roomNumberChangeHandler = function () {
  if (capacity.options.length > 0) {
    [].forEach.call(capacity.options, function (item) {
      item.selected = (ROOM_CAPACITY[roomNumber.value] [0] === item.value) ? true : false;
      item.hidden = (ROOM_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
    });
  }
};
roomNumberChangeHandler();
roomNumber.addEventListener('change', roomNumberChangeHandler);

// функция подбора цены по типу жилья
var typeChangeHandler = function () {
  var minPrice = TYPES[type.value].min;
  price.min = minPrice;
  price.placeholder = minPrice;
};

typeChangeHandler();
type.addEventListener('change', typeChangeHandler);

// функции подбора время въезда и выезда
var timeInChangeHandler = function () {
  timeout.value = timein.value;
};

var timeOutChangeHandler = function () {
  timein.value = timeout.value;
};

timein.addEventListener('change', timeInChangeHandler);
timeout.addEventListener('change', timeOutChangeHandler);

// успешная отправка
var showSuccess = function () {
  var successAd = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  adForm.appendChild(successAd);
};

submitBtn.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (adForm.validity.valid) {
    showSuccess();
  } else {
    showError();
  }
});

// показ сообщения об ошибке
var showError = function () {
  var errorAd = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var errorCloseBtn = errorAd.querySelector('.error__button');
  adForm.appendChild(errorAd);
  errorCloseBtn.addEventListener('click', function () {
    adForm.removeChild(errorAd);
    onMainPinMouseUp();
  });
};

resetBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  adForm.reset();
  setDisableFieldset();
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  removePins();

  var popup = map.querySelector('.popup');
  if (popup) {
    closePopup(popup);
  }
});
