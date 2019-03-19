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
  var scaleLine = document.querySelector('.scale__line');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevelElement = document.querySelector('.scale__level');



  var showRedactor = function () {
    preview.classList.remove("hidden");

  };

  var hideRedactor = function () {
    preview.classList.add("hidden");
  };

  /*функция ресайзинга изображения */
  var scaleControll = function (event) { // берет на вход событие
    event.preventDefault();
    var num = parseInt(document.querySelector('.resize__control--value').value); // считывает число, которое указано как value для инпута размера изображения

    event.target.classList.contains("resize__control--plus") ? num += 25 : num -= 25; // проверка класса элемента, по которому кликнули, если это класс плюс, то value увеличивается на 25, если нет(значит это класс минус, тк вешали обработчик только на них), то уменьшается на 25

    if (num > 0 && num <= 100) { // по ТЗ value может быть только от 0 до  100, поэтому мы будем его менять только в этом диапазоне
      var scaleNumber = num / 100; // заносим в переменную дробное число равное num / 100, тк scale  у нас может быть ТОЛЬКО меньше 1
      resizeControlElement.value = num + "%"; // меняем value инпута и добавляем туда %, тк там число со знаком %
      ImfUploadPreviewElement.style.transform = 'scale(' + scaleNumber + ')'; // меняем размер картинки через свойство transform: scale
    }

  };

  /* предвигает thumb на слайдере*/
  var moveSlider = function (e) {
    event.preventDefault();

    var startCoord = {
      x: event.clientX
    };

    var xy = scaleLine.getBoundingClientRect();
    var sliderCoords = {
      min: xy.left,
      max: xy.right
    };

    var onMouseMoove = function (moveEvent) {
      moveEvent.preventDefault();

      var shift = {
        x: startCoord.x - moveEvent.clientX
      };

      startCoord = {
        x: moveEvent.clientX
      };

      if (moveEvent.clientX >= sliderCoords.min && moveEvent.clientX <= sliderCoords.max) {
        scalePin.style.left = (scalePin.offsetLeft - shift.x) + 'px';
        scaleLevelElement.style.width = (scalePin.offsetLeft/ scaleLine.offsetWidth) * 100 + "%";
      }

    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      document.removeEventListener("mousemove", onMouseMoove);
      document.removeEventListener("mouseup", onMouseUp);
    };


    document.addEventListener("mousemove", onMouseMoove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // закрытие редактора
  closeRedactorButtonElement.addEventListener("click", hideRedactor); // по клику на крестик
  document.addEventListener('keydown', function (evt) { // обработчик на весь документ нажатие клавиши
    if (evt.keyCode === 27) { // если это клавиша ecs
      hideRedactor(); // закрыть редактор
    }
  });


  /* устанавливает дефолтовые значения для редактора*/
  var setRedactorNew = function () {
    resizeControlElement.value = "100%";
  };

  setRedactorNew();


  plusResizeButton.addEventListener("click", scaleControll);
  minusResizeButton.addEventListener("click", scaleControll);
  scalePin.addEventListener("mousedown", moveSlider);

  uploadFileElement.addEventListener("change", showRedactor); // показать редактор при загрузке img через fileuploader


  showRedactor(); // удалить - добавила, что бы не грузить каждый раз редактор
})();
