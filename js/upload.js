'use strict';

(function () {
  var imagesChooser = document.querySelector('.ad-form__upload');
  var previewContainer = document.querySelector('.ad-form__photo-container');

  var addPhotos = function () {
    for (var i = 0; i < imagesChooser.files.length; i++) {
      var file = imagesChooser.files[i];
      var reader = new FileReader();
      reader.onload = function (e) {
        previewContainer.appendChild();
      };
      reader.readAsDataURL(file);
    }
  };

  imagesChooser.addEventListener('change', addPhotos);
})();
