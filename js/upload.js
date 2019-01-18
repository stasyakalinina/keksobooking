'use strict';

(function () {
//  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MAX_PHOTO = 11;
  var imagesChooser = document.querySelector('#images');
  var previewContainer = document.querySelector('.ad-form__photo-container');
  var previewPhotoBlock = previewContainer.querySelector('.ad-form__photo');

  var uploadPhotos = function () {
    for (var i = 0; i < imagesChooser.files.length; i++) {
      var file = imagesChooser.files[i];
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (!previewPhotoBlock.children.length) {
          var housePhoto = document.createElement('img');
          housePhoto.width = 70;
          housePhoto.height = 70;
          housePhoto.src = reader.result;
          previewPhotoBlock.appendChild(housePhoto);

        } else if (previewContainer.children.length < MAX_PHOTO) {
          var photoContainer = document.createElement('div');
          photoContainer.classList.add('ad-form__photo');
          housePhoto = document.createElement('img');
          housePhoto.width = 70;
          housePhoto.height = 70;
          housePhoto.src = reader.result;
          previewContainer.appendChild(photoContainer);
          photoContainer.appendChild(housePhoto);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  imagesChooser.addEventListener('change', uploadPhotos);
})();
