'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MAX_PHOTO = 11;
  var avatarField = window.form.adForm.querySelector('#avatar');
  var photosField = window.form.adForm.querySelector('#images');
  var avatarPreview = window.form.adForm.querySelector('.ad-form-header__preview');
  var photoPreviewBlock = window.form.adForm.querySelector('.ad-form__photo');
  var photosPreviewContainer = document.querySelector('.ad-form__photo-container');
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

  var createImageBlock = function (reader) {
    var housePhoto = document.createElement('img');
    housePhoto.width = 70;
    housePhoto.height = 70;
    housePhoto.src = reader.result;
    photoPreviewBlock.appendChild(housePhoto);
  }

  var uploadPhotos = function () {

    for (var i = 0; i < photosField.files.length; i++) {
      var file = photosField.files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        let reader = new FileReader();

        reader.addEventListener('load', function () {
          if (!photoPreviewBlock.children.length) {
            createImageBlock(reader);
          } else if (photosPreviewContainer.children.length < MAX_PHOTO)  {
            createImageBlock(reader);
            photosPreviewContainer.appendChild(photoPreviewBlock);
            console.log(photosPreviewContainer.children);
          }
          isUpload = true;
        });
        reader.readAsDataURL(file);
      }
    }
  };

  photosField.addEventListener('change', uploadPhotos);

  var resetUploadPhotos = function () {
    if (isUpload) {
      photoPreviewBlock.innerHTML = '';
    }
  };

  window.upload = {
    setDefaultAvatar: setDefaultAvatar,
    resetUploadPhotos: resetUploadPhotos
  };
})();
