'use strict';
// form.js — модуль, который ведет  работу с фотографиями, размещенными другими участниками


(function () {

  window.redact = {};

  const DIFF = 1;//МИНУС ДЛЯ выравнивания ширины полосы, тк пин имеет ширину, длина желтой полосы длинее родителя
  var uploadFileElement = document.querySelector('#upload-file');

  window.redact.preview = document.querySelector('.img-upload__overlay');
  var closeRedactorButtonElement = document.querySelector('#upload-cancel');
  var minusResizeButton = document.querySelector('.resize__control--minus');
  var plusResizeButton = document.querySelector('.resize__control--plus');
  var resizeControlElement = document.querySelector('.resize__control--value');
  window.redact.ImgUploadPreviewElement = document.querySelector('.img-upload__preview');
  var scaleLine = document.querySelector('.scale__line');
  var scalePin = document.querySelector('.scale__pin');
  window.redact.scaleLevelElement = document.querySelector('.scale__level');
  window.redact.slider = document.querySelector(".img-upload__scale");


  var showRedactor = function () {
    window.redact.preview.classList.remove("hidden");

  };

  var hideRedactor = function () {
    window.redact.preview.classList.add("hidden");
  };

  /*функция ресайзинга изображения */
  var scaleControll = function (event) { // берет на вход событие
    event.preventDefault();
    var num = parseInt(document.querySelector('.resize__control--value').value); // считывает число, которое указано как value для инпута размера изображения

    event.target.classList.contains("resize__control--plus") ? num += 25 : num -= 25; // проверка класса элемента, по которому кликнули, если это класс плюс, то value увеличивается на 25, если нет(значит это класс минус, тк вешали обработчик только на них), то уменьшается на 25

    if (num > 0 && num <= 100) { // по ТЗ value может быть только от 0 до  100, поэтому мы будем его менять только в этом диапазоне
      var scaleNumber = num / 100; // заносим в переменную дробное число равное num / 100, тк scale  у нас может быть ТОЛЬКО меньше 1
      resizeControlElement.value = num + "%"; // меняем value инпута и добавляем туда %, тк там число со знаком %
      window.redact.ImgUploadPreviewElement.style.transform = 'scale(' + scaleNumber + ')'; // меняем размер картинки через свойство transform: scale
    }

  };

  /* предвигает thumb на слайдере*/
  var moveSlider = function (e) {
    event.preventDefault();

    var startCoord = {
      x: event.clientX
    };

    var x = scaleLine.getBoundingClientRect(); //крайние точки слева(мин) и справа(макс) затемненоой полосы за под пином
    var sliderCoords = {
      min: x.left,
      max: (x.right - DIFF)
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
        window.redact.scaleLevelElement.style.width = Math.ceil((scalePin.offsetLeft / scaleLine.offsetWidth) * 100) + "%";


        var filterValue = parseInt(window.redact.scaleLevelElement.style.width);
        var filterName = window.redact.ImgUploadPreviewElement.classList[1];

        window.filters.manageFilter(filterValue, filterName);
        // console.log("scaleLine.offsetWidth: " + scaleLine.offsetWidth + " scalePin.offsetLeft: " + scalePin.offsetLeft);
        // console.log("window.redact.scaleLevelElement.style.width: " + window.redact.scaleLevelElement.style.width);
        // console.log("scalePin.style.left: " + scalePin.style.left);
        // console.log("scalePin.offsetLeft: " + scalePin.offsetLeft);
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
  window.redact.setRedactorNew = function () {
    resizeControlElement.value = "100%";
    window.redact.slider.style.display = "block";
    scalePin.style.left = "449px";
    window.redact.scaleLevelElement.style.width = "100%";
  };

  window.redact.setRedactorNew();


  plusResizeButton.addEventListener("click", scaleControll);
  minusResizeButton.addEventListener("click", scaleControll);
  scalePin.addEventListener("mousedown", moveSlider);

  uploadFileElement.addEventListener("change", showRedactor); // показать редактор при загрузке img через fileuploader


  showRedactor(); // удалить - добавила, что бы не грузить каждый раз редактор
})();
