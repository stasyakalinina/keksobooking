'use strict';

(function () {
  var PINS_COUNT = 8;
  var locationRange = {
    MIN: 130,
    MAX: 630
  };
  var timeCheck = ['12:00', '13:00', '14:00'];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace', 'flat', 'bungalo', 'house'];
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var addData = function () {
    var arrData = [];
    var map = document.querySelector('.map');
    for (var i = 0; i < PINS_COUNT; i++) {
      arrData.push({
        author: {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          'title': titles[i],
          'address': window.utils.getRandomInteger(0, 1000) + ',' + window.utils.getRandomInteger(1, 500),
          'price': window.utils.getRandomInteger(1000, 1000000),
          'type': types[window.utils.getRandomInteger(0, types.length - 1)],
          'rooms': window.utils.getRandomInteger(1, 5),
          'guests': window.utils.getRandomInteger(1, 10),
          'checkin': timeCheck[window.utils.getRandomInteger(0, timeCheck.length - 1)],
          'checkout': timeCheck[window.utils.getRandomInteger(0, timeCheck.length - 1)],
          'features': window.utils.shuffleArray(featuresArr).slice(window.utils.getRandomInteger(0, featuresArr.length - 1)),
          'description': '',
          'photos': window.utils.shuffleArray(photosArr)
        },

        location: {
          x: window.utils.getRandomInteger(1, map.offsetWidth),
          y: window.utils.getRandomInteger(locationRange.MIN, locationRange.MAX)
        }
      });
    }

    return arrData;
  };

  window.data = {
    addData: addData,
    locationRange: locationRange
  };
})();
