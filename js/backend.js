'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking/';
  var REQUEST_TIMEOUT = 10000;

  // фнкция загрузки даннных с сервера и на сервер с параметрами успешной отпраки, ошибки, метода и параметров
  var sendRequest = function (onSuccess, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

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

    xhr.open(method, (method === 'GET') ? GET_URL : POST_URL);
    xhr.send(data);
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

  var showErrorMessage = function () {
    var errorAd = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var errorCloseBtn = errorAd.querySelector('.error__button');
    var main = document.querySelector('main');

    main.appendChild(errorAd);
    errorAd.querySelector('.error__message').textContent = getErrorMessage(status);

    errorCloseBtn.addEventListener('click', function () {
      main.removeChild(errorAd);
      window.utils.setActiveState();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.esc) {
        main.removeChild(errorAd);
        window.utils.setActiveState();
      }
    });
  };

  window.backend = {
    save: function (onSuccess, onError, method, data) {
      sendRequest(onSuccess, onError, method, data);
    },
    load: function (onSuccess, onError, method) {
      sendRequest(onSuccess, onError, method);
    },
    onError: showErrorMessage
  };
})();
