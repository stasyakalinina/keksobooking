 'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MAX_PHOTO = 11;
  var PHOTOS_PREVIEW_BLOCK_AMOUNT = 2;
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

    if (!photoPreviewBlock.children.length) {
      photoPreviewBlock.appendChild(housePhoto);
    } else if (photosPreviewContainer.children.length < MAX_PHOTO) {
      photoPreviewBlock = document.createElement('div');
      photoPreviewBlock.classList.add("ad-form__photo");
      photosPreviewContainer.appendChild(photoPreviewBlock);
      photoPreviewBlock.appendChild(housePhoto);
    }
      return photoPreviewBlock;
  };

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
          createImageBlock(reader);
          isUpload = true;
        });
        reader.readAsDataURL(file);
      }
    }
  };

  photosField.addEventListener('change', uploadPhotos);

  var resetUploadPhotos = function () {
    if (isUpload) {
      if (photosPreviewContainer.children.length > PHOTOS_PREVIEW_BLOCK_AMOUNT) {
        let obj = document.querySelectorAll('.ad-form__photo');
        for (let i = 1; i < obj.length; i++) {
         obj[i].remove();
        }
        obj[0].innerHTML = '';
      }
      else if (photosPreviewContainer.children.length === PHOTOS_PREVIEW_BLOCK_AMOUNT) {
        photoPreviewBlock.innerHTML = '';
      }
    }
  };

  window.upload = {
    setDefaultAvatar: setDefaultAvatar,
    resetUploadPhotos: resetUploadPhotos
  };
})();
