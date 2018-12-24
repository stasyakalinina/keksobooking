'use strict';

(function () {
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];
  var avatarField = window.form.adForm.querySelector('#avatar');
  var photosField = window.form.adForm.querySelector('#images');
  var avatarPreview = window.form.adForm.querySelector('.ad-form-header__preview');
  var photosPreview = window.form.adForm.querySelectorAll('.ad-form__photo');
  var isUpload = false;

  avatarField.addEventListener('change', function () {
    var file = avatarField.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.innerHTML = '';
        avatarPreview.insertAdjacentHTML('afterBegin', '<img src="' + reader.result + '" alt="Аватар пользователя" width="40" height="44">');
        isUpload = true;
      });
      reader.readAsDataURL(file);
    }
  });

  var setDefaultAvatar = function () {
    if (isUpload) {
      avatarPreview.innerHTML = '';
      avatarPreview.insertAdjacentHTML('afterBegin', '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">');
    }
  };

  photosField.addEventListener('change', function (evt) {
    var file = evt.target.files;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {

        /*
        photosPreview.innerHTML = '';
        photosPreview.forEach(function (item) {
          item.insertAdjacentHTML('afterBegin', '<img src="' + reader.result + '" alt="Фотографии" height="70">');
        });
        isUpload = true;
        */
      });
      reader.readAsDataURL(file);
    }
  });

  var resetUploadPhotos = function () {
    if (isUpload) {
      photosPreview.forEach(function (item) {
        item.innerHTML = '';
      });
    }
  };

  window.upload = {
    setDefaultAvatar: setDefaultAvatar,
    resetUploadPhotos: resetUploadPhotos
  };
})();
