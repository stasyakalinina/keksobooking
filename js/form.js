'use strict';

(function () {
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
  var adForm = document.querySelector('.ad-form');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var submitBtn = adForm.querySelector('.ad-form__submit');
  var resetBtn = adForm.querySelector('.ad-form__reset');

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
      window.utils.setActiveState();
    });
  };

  // сброс полей формы, попапа и пинов кнопкой очистить
  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.utils.setInactiveState();
  });

  window.form = {
    adForm: adForm,
    types: TYPES
  };
})();
