'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking/';
  var REQUEST_TIMEOUT = 10000;

  // передаем данные на сервер
  var uploadData = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  // загружаем данные с сервера
  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', GET_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(getErrorMessage(xhr.status));
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + REQUEST_TIMEOUT + 'мс');
    });

    xhr.send();
  };

  // обрабатываем ошибки
  var getErrorMessage = function (status) {
    var errorMessage;
    switch (status) {
      case 400:
        errorMessage = 'Неверный запрос';
        break;
      case 401:
        errorMessage = 'Пользователь не авторизован';
        break;
      case 404:
        errorMessage = 'Данные не найдены';
        break;
      default:
        errorMessage = 'Ошибка доступа: ' + status;
    }

    return errorMessage;
  };
  /*
  var successHandler = function () {

  }

  var errorHandler = function () {
    var errorAd = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var errorCloseBtn = errorAd.querySelector('.error__button');
    var main = document.querySelector('main');
    main.appendChild(errorAd);

    errorCloseBtn.addEventListener('click', function () {
      main.removeChild(errorAd);
      window.utils.setActiveState();
    });
  };
  */
  window.backend = {
    upload: uploadData,
    load: loadData
  };
})();
