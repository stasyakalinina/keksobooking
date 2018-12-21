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

  var MIN_TITLE = 30;

  var filtersForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var title = adForm.querySelector('#title');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var submitBtn = adForm.querySelector('.ad-form__submit');
  var resetBtn = adForm.querySelector('.ad-form__reset');
  var invalidBorder = '0 0 2px 2px #ff6547';

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

  // показываем сообщение об успешной отправке и удаляем это сообщение по клику на нем
  var showSuccessMessage = function () {
    var successAd = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(successAd);

    successAd.addEventListener('click', function () {
      main.removeChild(successAd);
      adForm.reset();
      window.utils.returnMainPin();
      window.utils.setInactiveState();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.esc) {
        main.removeChild(successAd);
        adForm.reset();
        window.utils.setInactiveState();
      }
    });
  };

  // валидация формы
  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Описание должно состоять минимум из 30 символов');
      title.style.boxShadow = invalidBorder;
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Описание не должно превышать 100 символов');
      title.style.boxShadow = invalidBorder;
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
      title.style.boxShadow = invalidBorder;
    } else {
      title.setCustomValidity('');
    }
  });

  title.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_TITLE) {
      target.setCustomValidity('Описание должно состоять минимум из 30 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  price.addEventListener('invalid', function () {
    price.setCustomValidity('Обязательное поле');
    price.style.boxShadow = invalidBorder;
  });

  // обрабатываем отправку данных формы аяксом
  submitBtn.addEventListener('click', function (evt) {
    var data = new FormData(adForm);
    window.backend.save(showSuccessMessage, 'POST', data);
    evt.preventDefault();
  });

  // сброс полей формы, попапа и пинов кнопкой очистить
  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    filtersForm.reset();
    window.utils.setInactiveState();
  });

  window.form = {
    adForm: adForm,
    types: TYPES
  };
})();
