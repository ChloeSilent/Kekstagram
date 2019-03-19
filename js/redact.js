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

/*функция ресайзинга изображения */
  var scaleControll = function (event) { // берет на вход событие

    var num = parseInt(document.querySelector('.resize__control--value').value); // считывает число, которое указано как value для инпута размера изображения

    event.target.classList.contains("resize__control--plus") ? num += 25: num -= 25; // проверка класса элемента, по которому кликнули, если это класс плюс, то value увеличивается на 25, если нет(значит это класс минус, тк вешали обработчик только на них), то уменьшается на 25

     if ( num > 0 && num <= 100) { // по ТЗ value может быть только от 0 до  100, поэтому мы будем его менять только в этом диапазоне
      var scaleNumber = num / 100; // заносим в переменную дробное число равное num / 100, тк scale  у нас может быть ТОЛЬКО меньше 1
      resizeControlElement.value = num + "%"; // меняем value инпута и добавляем туда %, тк там число со знаком %
      ImfUploadPreviewElement.style.transform = 'scale(' + scaleNumber + ')'; // меняем размер картинки через свойство transform: scale
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

  // plusResizeButton.addEventListener("click", scaleControllPlus);
  // minusResizeButton.addEventListener("click", scaleControllMinus);
  plusResizeButton.addEventListener("click", scaleControll);
  minusResizeButton.addEventListener("click", scaleControll);



  uploadFileElement.addEventListener("change", showRedactor); // показать редактор при загрузке img через fileuploader

})();
