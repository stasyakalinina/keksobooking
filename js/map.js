'use strict';
(function () {
  var PIN_TAIL = 19;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFilters = map.querySelector('.map__filters-container');
  var mainPin = map.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  // данные для пинов
  var pinsData = window.data.addData();

  var setPinClass = function () {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

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
  var renderPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pinsData.length; i++) {
      fragment.appendChild(window.pin.render(pinsData[i]));
    }
    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      mapPins.removeChild(item);
    });
  };

  var closePopup = function (popup) {
    map.removeChild(popup);
    setPinClass();
  };

  //
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
        min: window.data.locationRange.MIN - mainPin.offsetHeight - PIN_TAIL,
        max: window.data.locationRange.MAX - mainPin.offsetHeight - PIN_TAIL
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

    window.utils.setActiveState();
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
    renderPins: renderPins,
    removePins: removePins,
    setAdressValue: setAdressValue
  };
})();
