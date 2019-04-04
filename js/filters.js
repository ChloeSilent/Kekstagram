'use strict';
// form.js — модуль, который ведет  работу с фотографиями, размещенными другими участниками


(function () {

  window.filters = {};

  var filterArray = document.querySelectorAll(".effects__preview");
  const RESET_FILTER_VALUE = 100;


  Array.prototype.remove = function () { // функция удаляет из массива элемент по его значению
    var what, a = arguments,
      L = a.length,
      ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };

  var blurAndBrightnessFilters = function (num) { // функция перевода чисел до 100 в 1б2 или 3
    var converted = 2;
    if (num >= 33) {
      if (num >= 66) {
        converted = 3;
      }
    } else {
      converted = 1;
    }

    return converted;
  };

  window.filters.manageFilter = function (val, chosenFilter) { // применяет выбранный фильтр и устанавливает ему величину

    // if (chosenFilter === "effects__preview--none") {
    //   window.redact.ImgUploadPreviewElement.style.filter = "none";
    // }
    // if (chosenFilter === "effects__preview--chrome") {
    //   window.redact.ImgUploadPreviewElement.style.filter = "grayscale(" + (val / 100) + ")";
    // }
    // if (chosenFilter === "effects__preview--sepia") {
    //   window.redact.ImgUploadPreviewElement.style.filter = "sepia(" + (val / 100) + ")";
    // }
    // if (chosenFilter === "effects__preview--marvin") {
    //   window.redact.ImgUploadPreviewElement.style.filter = "invert(" + val + "%)";
    // }
    // if (chosenFilter === "effects__preview--phobos") {
    //   window.redact.ImgUploadPreviewElement.style.filter = "blur(" + blurAndBrightnessFilters(val) + "px)";
    // }
    // if (chosenFilter === "effects__preview--heat") {
    //   window.redact.ImgUploadPreviewElement.style.filter = "brightness(" + blurAndBrightnessFilters(val) + ")";
    // }
    console.log("val: " + val);
    switch (chosenFilter) {
      case "effects__preview--none":
        window.redact.ImgUploadPreviewElement.style.filter = "none";
        break;
      case "effects__preview--chrome":
        window.redact.ImgUploadPreviewElement.style.filter = "grayscale(" + (val / 100) + ")";
        break;
      case "effects__preview--sepia":
        window.redact.ImgUploadPreviewElement.style.filter = "sepia(" + (val / 100) + ")";
        break;
      case "effects__preview--marvin":
        window.redact.ImgUploadPreviewElement.style.filter = "invert(" + val + "%)";
        break;
      case "effects__preview--phobos":
        window.redact.ImgUploadPreviewElement.style.filter = "blur(" + blurAndBrightnessFilters(val) + "px)";
        break;
      case "effects__preview--heat":
        window.redact.ImgUploadPreviewElement.style.filter = "brightness(" + blurAndBrightnessFilters(val) + ")";
        break;
      default:
        // console.log("no match");
        break;
    }

  };

  var removeAllFilterClasses = function () { // удаляет все классы картинки кроме ее основного
    window.redact.ImgUploadPreviewElement.className = "img-upload__preview";
  };

  var checkFilterforSlider = function () { // убирает слайдер, если нет фильтра
    window.redact.ImgUploadPreviewElement.classList.contains("effects__preview--none") ? window.redact.slider.style.display = "none" : window.redact.slider.style.display = "block"; // убрать слайдер при отсутсвии фильтра
  };


  window.redact.setNewFilterForImg = function (event) { // убирает старый фильтр на картике и ставит новый

    var selectedFilter = event.target.classList[1];

    window.filters.manageFilter(RESET_FILTER_VALUE, selectedFilter);

  };


  var setNewFilterClass = function (event) { // функция применения класса-фильтра к картинке

    var a = [];
    event.target.classList.forEach( // копируем массив классов баттона, на котором был клик, тк у него 2 класса, а нам нужен второй
      function (style, index) {
        a[index] = style;
      }
    );

    a.remove("effects__preview"); // удаляем из массива указанный класс, тк он не нужен картинке
    window.redact.ImgUploadPreviewElement.classList.add(a[0]); // добавляем к классам картинки оставшиеся классы из списка выше

  };


  filterArray.forEach(
    function (button) {
      button.addEventListener("click", removeAllFilterClasses);
      button.addEventListener("click", window.redact.setRedactorNew);
      button.addEventListener("click", checkFilterforSlider);

      button.addEventListener("click", setNewFilterClass);
      button.addEventListener("click", window.redact.setNewFilterForImg);
    }
  );

})();
