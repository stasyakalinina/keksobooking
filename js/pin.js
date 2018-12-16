'use strict';

(function () {
  var renderPin = function (pinData) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
    var image = pin.querySelector('img');
    image.src = pinData.author.avatar;
    image.alt = pinData.offer.title;

    pin.style.left = pinData.location.x + 'px';
    pin.style.top = pinData.location.y + 'px';

    pin.setAttribute('tabindex', '0');

    pin.addEventListener('click', function () {
      window.map.activatePin(pin, pinData);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.enter) {
        window.map.activatePin(pin, pinData);
      }
    });

    return pin;
  };

  window.pin = {
    render: renderPin
  };
})();
