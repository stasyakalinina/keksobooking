'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var fieldsets = document.querySelectorAll('.ad-form__element');

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

  // функция установки неактивных полей
  var setDisableFieldset = function () {
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };
  // Все поля блокируем по умолчанию
  setDisableFieldset();

  // Разблокируем все поля
  var removeDisableFieldset = function () {
    fieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  // функция установки активного состояния
  var setActiveState = function () {
    map.classList.remove('map--faded');
    removeDisableFieldset();
    window.form.adForm.classList.remove('ad-form--disabled');
    window.map.renderPins();
    window.map.setAdressValue();
  };

  // функция установки НЕактивного состояния
  var setInactiveState = function () {
    setDisableFieldset();
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.map.removePins();

    var popup = map.querySelector('.popup');
    if (popup) {
      window.map.closePopup(popup);
    }
    window.map.setAdressValue();
  };

  window.utils = {
    enter: ENTER_KEYCODE,
    esc: ESC_KEYCODE,
    getRandomInteger: getRandomInteger,
    shuffleArray: shuffleArray,
    setActiveState: setActiveState,
    setInactiveState: setInactiveState,
    setDisableFieldset: setDisableFieldset
  };
})();
