'use strict';
// var arrayAdvert = [
// //   {
// //     "author": {
// //         "avatar": "img/avatars/user01.png"
// //       },
// //
// //     "offer": {
// //       "title": "Большая уютная квартира",
// //       "price": getRandomInteger(1000, 1000000),
// //       "type": "palace",
// //       "rooms": getRandomInteger(1, 5),
// //       "guests": getRandomInteger(1, 10),
// //       "checkin": randomTimeCheck,
// //       "checkout": randomTimeCheck,
// //       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
// //       "description": "",
// //       "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
// //     },
// //
// //     "location": {
// //       «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
// //       «y»: случайное число, координата y метки на карте от 130 до 630.
// //     }
// //   },
// //   {
// //     "author": {
// //       "avatar": "img/avatars/user02.png"
// //     },
// //
// //     "offer": {
// //       "title": "Маленькая неуютная квартира",
// //       "address": "600, 350",
// //       "price": getRandomInteger(1000, 1000000),
// //       "type": "flat",
// //       "rooms": getRandomInteger(1, 5),
// //       "guests": getRandomInteger(1, 10),
// //       "checkin": "13:00",
// //       "checkout": "13:00",
// //       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
// //       "description": "",
// //       "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
// //     },
// //
// //     "location": {
// //       «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
// //       «y»: случайное число, координата y метки на карте от 130 до 630.
// //     }
// //   },
// //   {
// //     "author": {
// //       "avatar": "img/avatars/user03.png"
// //       },
// //
// //     "offer": {
// //       "title": "Огромный прекрасный дворец",
// //       "address": "600, 350",
// //       "price": getRandomInteger(1000, 1000000),
// //       "type": "house",
// //       "rooms": getRandomInteger(1, 5),
// //       "guests": getRandomInteger(1, 10),
// //       "checkin": "14:00",
// //       "checkout": "14:00",
// //       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
// //       "description": "",
// //       "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
// //     },
// //
// //     "location": {
// //       «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
// //       «y»: случайное число, координата y метки на карте от 130 до 630.
// //     }
// //   },
// //   {
// //     "author": {
// //       "avatar": "img/avatars/user04.png"
// //       },
// //
// //     "offer": {
// //       "title": "Маленький ужасный дворец",
// //       "address": "600, 350",
// //       "price": getRandomInteger(1000, 1000000),
// //       "type": "bungalo",
// //       "rooms": getRandomInteger(1, 5),
// //       "guests": getRandomInteger(1, 10),
// //       "checkin": "12:00",
// //       "checkout": "12:00",
// //       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
// //       "description": "",
// //       "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
// //     },
// //
// //     "location": {
// //       «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
// //       «y»: случайное число, координата y метки на карте от 130 до 630.
// //     }
// //   },
// //   {
// //     "author": {
// //       "avatar": "img/avatars/user05.png"
// //     },
// //
// //     "offer": {
// //       "title": "Красивый гостевой домик",
// //       "address": "600, 350",
// //       "price": getRandomInteger(1000, 1000000),
// //       "type": "palace",
// //       "rooms": getRandomInteger(1, 5),
// //       "guests": getRandomInteger(1, 10),
// //       "checkin": "13:00",
// //       "checkout": "13:00",
// //       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
// //       "description": "",
// //       "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
// //     },
// //
// //     "location": {
// //       «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
// //       «y»: случайное число, координата y метки на карте от 130 до 630.
// //     }
// //   },
// //   {
// //     "author": {
// //       "avatar": "img/avatars/user06.png"
// //     },
// //
// //     "offer": {
// //       "title": "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"
// //       "address": "600, 350",
// //       "price": getRandomInteger(1000, 1000000),
// //       "type": "flat",
// //       "rooms": getRandomInteger(1, 5),
// //       "guests": getRandomInteger(1, 10),
// //       "checkin": "14:00",
// //       "checkout": "14:00",
// //       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
// //       "description": "",
// //       "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
// //     },
// //
// //     "location": {
// //       «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
// //       «y»: случайное число, координата y метки на карте от 130 до 630.
// //     }
// //   },
// //   {
// //     "author": {
// //       "avatar": "img/avatars/user07.png"
// //     },
// //
// //     "offer": {
// //       "title": "Уютное бунгало далеко от моря",
// //       "address": "600, 350",
// //       "price": getRandomInteger(1000, 1000000),
// //       "type": "house",
// //       "rooms": getRandomInteger(1, 5),
// //       "guests": getRandomInteger(1, 10),
// //       "checkin": "12:00",
// //       "checkout": "12:00",
// //       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
// //       "description": "",
// //       "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
// //     },
// //
// //     "location": {
// //       «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
// //       «y»: случайное число, координата y метки на карте от 130 до 630.
// //     }
// //   },
// //   {
// //     "author": {
// //       "avatar": "img/avatars/user08.png"
// //     },
// //
// //     "offer": {
// //       "title": "Неуютное бунгало по колено в воде"
// //       "address": "600, 350",
// //       "price": getRandomInteger(1000, 1000000),
// //       "type": "bungalo",
// //       "rooms": getRandomInteger(1, 5),
// //       "guests": getRandomInteger(1, 10),
// //       "checkin": "14:00",
// //       "checkout": "14:00",
// //       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
// //       "description": "",
// //       "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
// //     },
// //
// //     "location": {
// //       «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
// //       «y»: случайное число, координата y метки на карте от 130 до 630.
// //     }
// //   }
// // ];
// var timeCheck = ["12:00", "13:00", "14:00"];
var randomTimeCheck = Math.floor(Math.random() * timeCheck.length);
var map = document.querySelector('.map');
var avatars = ["img/avatars/user01.png", "img/avatars/user02.png", "img/avatars/user03.png", "img/avatars/user04.png", "img/avatars/user05.png", "img/avatars/user06.png", "img/avatars/user07.png", "img/avatars/user08.png"];
var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var types = ["palace", "flat", "house", "bungalo"];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var getRandomInteger = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

map.classList.remove('map--faded');
