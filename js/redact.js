;
'use strict';
// form.js — модуль, который ведет  работу с фотографиями, размещенными другими участниками


(function () {

  window.redact = {};

  var uploadFileElement = document.querySelector('#upload-file');

  var preview = document.querySelector('.img-upload__overlay');
  var closeRedactorButtonElement = document.querySelector('#upload-cancel');


  var showRedactor = function () {
    preview.classList.remove("hidden");

  };

  var hideRedactor = function () {
    preview.classList.add("hidden");
  };


  if (preview.classList.contains("hidden")) { // закрытие редактора
    closeRedactorButtonElement.addEventListener("click", hideRedactor); // по клику на крестик
    document.addEventListener('keydown', function(evt) { // обработчик на весь документ нажатие клавиши
      if (evt.keyCode === 27) { // если это клавиша ecs
        hideRedactor(); // закрыть редактор
      }
    });
  }

  uploadFileElement.addEventListener("change", showRedactor);// показать редактор при загрузке img через fileuploader

})();
