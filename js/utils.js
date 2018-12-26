'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var StartCoordMainPin = {
    X: 570,
    Y: 375
  };
  var map = document.querySelector('.map');
  var filterSelects = map.querySelectorAll('.map__filter');
  var filterCheckboxFieldset = map.querySelector('.map__features');
  var fieldsets = document.querySelectorAll('.ad-form__element');

  // функция установки неактивных полей форм фильтрации и объявления
  var setDisableFieldset = function () {
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    filterSelects.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    filterCheckboxFieldset.setAttribute('disabled', 'disabled');
  };

  // Все поля блокируем по умолчанию
  setDisableFieldset();

  // Разблокируем все поля
  var removeDisableFieldset = function () {
    fieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    filterSelects.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    filterCheckboxFieldset.removeAttribute('disabled');
  };

  // функция установки активного состояния
  var setActiveState = function () {
    map.classList.remove('map--faded');
    removeDisableFieldset();
    window.form.adForm.classList.remove('ad-form--disabled');
    window.map.setAdressValue();
  };

  // функция установки НЕактивного состояния
  var setInactiveState = function () {
    setDisableFieldset();
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.map.removePins();
    window.map.closePopup();
    window.map.setAdressValue();
    window.map.mainPin.addEventListener('mouseup', window.map.onMapPinMainMouseUp);
  };

  var returnMainPin = function () {
    window.map.mainPin.style.left = StartCoordMainPin.X + 'px';
    window.map.mainPin.style.top = StartCoordMainPin.Y + 'px';
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var slicePins = function (arr) {
    var pins = arr.slice();
    arr.forEach(function (item) {
      if (item.offer) {
        pins.push(item);
      }
    });
    pins = pins.slice(0, window.map.pinsLimit);

    return pins;
  };

  window.utils = {
    enter: ENTER_KEYCODE,
    esc: ESC_KEYCODE,
    setActiveState: setActiveState,
    setInactiveState: setInactiveState,
    returnMainPin: returnMainPin,
    debounce: debounce,
    slicePins: slicePins
  };
})();
