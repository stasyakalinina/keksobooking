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
  var INVALID_BORDER = '0 0 2px 2px #ff6547';
  var filtersForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var checkList = adForm.querySelectorAll('#title, #price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var submitBtn = adForm.querySelector('.ad-form__submit');
  var resetBtn = adForm.querySelector('.ad-form__reset');

  // функция подбора гостей по количеству выбранных комнат
  var changeRoomNumber = function () {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        item.selected = (ROOM_CAPACITY[roomNumber.value] [0] === item.value);
        item.hidden = !(ROOM_CAPACITY[roomNumber.value].indexOf(item.value) >= 0);
      });
    }
  };
  changeRoomNumber();
  roomNumber.addEventListener('change', changeRoomNumber);

  // функция подбора цены по типу жилья
  var changeType = function () {
    var minPrice = TYPES[type.value].min;
    price.min = minPrice;
    price.placeholder = minPrice;
  };

  changeType();
  type.addEventListener('change', changeType);

  // функции подбора время въезда и выезда
  var changeTimeIn = function () {
    timeout.value = timein.value;
  };

  var changeTimeOut = function () {
    timein.value = timeout.value;
  };

  timein.addEventListener('change', changeTimeIn);
  timeout.addEventListener('change', changeTimeOut);

  // показываем сообщение об успешной отправке и удаляем это сообщение по клику на нем
  var showSuccessMessage = function () {
    var successAd = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

    var onSuccessAdEscKeyDown = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.utils.esc) {
        window.backend.main.removeChild(successAd);
        adForm.reset();
        window.utils.setInactiveState();
        document.removeEventListener('keydown', onSuccessAdEscKeyDown);
      }
    };

    window.backend.main.appendChild(successAd);
    document.addEventListener('keydown', onSuccessAdEscKeyDown);

    successAd.addEventListener('click', function () {
      window.backend.main.removeChild(successAd);
      adForm.reset();
      window.utils.returnMainPin();
      window.utils.setInactiveState();
      window.upload.resetUploadPhotos();
      document.removeEventListener('keydown', onSuccessAdEscKeyDown);
    });
  };

  // валидация формы
  var addInvalidListener = function (elem) {
    var setInvalidBorder = function () {
      elem.style.boxShadow = elem.validity.valid ? 'none' : INVALID_BORDER;
    };

    var onSetInvalidField = function () {
      setInvalidBorder();
    };

    var onFieldInput = function () {
      setInvalidBorder();
    };

    elem.addEventListener('invalid', onSetInvalidField);
    elem.addEventListener('input', onFieldInput);
  };

  checkList.forEach(function (elem) {
    addInvalidListener(elem);
  });

  // обрабатываем отправку данных формы аяксом
  submitBtn.addEventListener('click', function (evt) {
    if (adForm.checkValidity()) {
      evt.preventDefault();
      var data = new FormData(adForm);
      window.backend.save(showSuccessMessage, 'POST', data);
    }
  });

  // сброс полей формы, попапа, пинов и кастомного аватара на дефолтный кнопкой очистить
  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    filtersForm.reset();
    window.utils.setInactiveState();
  });

  window.form = {
    adForm: adForm,
    types: TYPES,
    resetBtn: resetBtn
  };
})();
