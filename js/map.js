'use strict';
(function () {
  var PIN_TAIL = 18;
  var PINS_AMOUNT = 5;
  var LocationRange = {
    MIN: 130,
    MAX: 630
  };

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFilters = map.querySelector('.map__filters-container');
  var mainPin = map.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');
  var isLoadData = false;

  // данные для пинов
  var pinsData = [];

  // функция успешной загрузки данных для пинов и отрисовка пинов
  var onSuccess = function (resultRequest) {
    // проверяем пришедшие данные на содержание ключа offer, если он есть, то добавляем элемент в массив с данными
    if (resultRequest) {
      resultRequest.forEach(function (item) {
        if (item.offer) {
          pinsData.push(item);
        }
      });
    }
    var selectedPinsArray = pinsData.slice(0, PINS_AMOUNT);
    renderPins(selectedPinsArray);
    isLoadData = true;
  };

  // Обработчик клика на главном указателе карты
  var onMapPinMainClick = function () {
    window.utils.setActiveState();
    // Загрузка информации об объявлениях и добавление указателей на карту
    window.backend.load(onSuccess, window.backend.onError, 'GET');

    if (isLoadData) {
      mainPin.removeEventListener('click', onMapPinMainClick);
    }
  };

  mainPin.addEventListener('click', onMapPinMainClick);

  var setPinClass = function () {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // показываем попап
  var openPopup = function (pinData) {
    map.insertBefore(window.card.render(pinData), mapFilters);
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

  // отрисовываем пины
  var renderPins = function (arrPins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrPins.length; i++) {
      fragment.appendChild(window.pin.render(arrPins[i]));
    }
    mapPins.appendChild(fragment);
  };

  // удаляем пины
  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      mapPins.removeChild(item);
    });
    window.utils.returnMainPin();
  };

  var closePopup = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      map.removeChild(popup);
      setPinClass();
    }
  };

  // задаем координаты для поля адрес
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

  // перемещение главной метки
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var limitCoords = {
      x: {
        min: 0,
        max: map.offsetWidth - mainPin.offsetWidth
      },
      y: {
        min: LocationRange.MIN - mainPin.offsetHeight - PIN_TAIL,
        max: LocationRange.MAX - mainPin.offsetHeight - PIN_TAIL
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // высчитываем координаты смещения и ставим ограничения
      var xCoordinate = mainPin.offsetLeft - shift.x;
      var yCoordinate = mainPin.offsetTop - shift.y;

      if (xCoordinate > limitCoords.x.min && xCoordinate < limitCoords.x.max) {
        mainPin.style.left = xCoordinate + 'px';
      }
      if (yCoordinate > limitCoords.y.min && yCoordinate < limitCoords.y.max) {
        mainPin.style.top = yCoordinate + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var shift = {
        x: startCoords.x - upEvt.clientX,
        y: startCoords.y - upEvt.clientY
      };

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      var xCoordinate = mainPin.offsetLeft - shift.x;
      var yCoordinate = mainPin.offsetTop - shift.y;

      if (xCoordinate > limitCoords.x.min && xCoordinate < limitCoords.x.max) {
        mainPin.style.left = xCoordinate + 'px';
      }
      if (yCoordinate > limitCoords.y.min && yCoordinate < limitCoords.y.max) {
        mainPin.style.top = yCoordinate + 'px';
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setAdressValue();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // устанавливает значение главного пина при неактивной странице
  setAdressValue();

  // закрываем попап по ESC
  document.addEventListener('keydown', function (evt) {
    var popup = map.querySelector('.popup');
    if (evt.keyCode === window.utils.esc && popup) {
      closePopup(popup);
    }
  });

  window.map = {
    closePopup: closePopup,
    activatePin: activatePin,
    removePins: removePins,
    setAdressValue: setAdressValue,
    pinsData: pinsData,
    renderPins: renderPins
  };
})();
