;
'use strict';
// form.js — модуль, который ведет  работу с фотографиями, размещенными другими участниками


(function () {

  window.redact = {};

  var uploadFileElement = document.querySelector('#upload-file');

  var preview = document.querySelector('.img-upload__overlay');
  var closeRedactorButtonElement = document.querySelector('#upload-cancel');
  var minusResizeButton = document.querySelector('.resize__control--minus');
  var plusResizeButton = document.querySelector('.resize__control--plus');
  var resizeControlElement = document.querySelector('.resize__control--value');
  var ImfUploadPreviewElement = document.querySelector('.img-upload__preview');


  var showRedactor = function () {
    preview.classList.remove("hidden");

  };

  var hideRedactor = function () {
    preview.classList.add("hidden");
  };

  var scaleControllPlus = function () {
    var num = parseInt(document.querySelector('.resize__control--value').value); //

    num += 25;
    if (num <= 100) {
      var scaleNumber = num / 100;
      resizeControlElement.value = num + "%";
      ImfUploadPreviewElement.style.transform = 'scale(' + scaleNumber + ')';
      console.log("resizeControlElement.value + is " + resizeControlElement.value + " scaleNumber is " + scaleNumber);
    }
  };

  var scaleControllMinus = function () {
    var num = parseInt(document.querySelector('.resize__control--value').value); //

    num -= 25;
    if (num > 0) {
      var scaleNumber = num / 100;
      resizeControlElement.value = num + "%";
      ImfUploadPreviewElement.style.transform = 'scale(' + scaleNumber + ')';
      console.log("resizeControlElement.value + is " + resizeControlElement.value + " scaleNumber is " + scaleNumber);
    }
  };

  // закрытие редактора
  closeRedactorButtonElement.addEventListener("click", hideRedactor); // по клику на крестик
  document.addEventListener('keydown', function (evt) { // обработчик на весь документ нажатие клавиши
    if (evt.keyCode === 27) { // если это клавиша ecs
      hideRedactor(); // закрыть редактор
    }
  });

  var setRedactorNew = function () { // устанавливает дефолтовые значения для редактора
    resizeControlElement.value = "100%";
  };

  setRedactorNew();

  plusResizeButton.addEventListener("click", scaleControllPlus);
  minusResizeButton.addEventListener("click", scaleControllMinus);



  uploadFileElement.addEventListener("change", showRedactor); // показать редактор при загрузке img через fileuploader

})();
