'use strict';
// form.js — модуль, который ведет  работу с фотографиями, размещенными другими участниками


(function () {

  window.filters = {};

  /*наверно тоже другой модуль */
  var filterToClass = {
    "effects__preview--none": "",
    "effects__preview--chrome": "effects__preview--chrome",
    "effects__preview--sepia": "effects__preview--sepia",
    "effects__preview--marvin": "effects__preview--marvin",
    "effects__preview--phobos": "effects__preview--phobos",
    "effects__preview--heat": "effects__preview--heat"
  };

  var filterArray = document.querySelectorAll(".effects__preview");

  var removeStylesOfImg = function () {
    window.redact.ImgUploadPreviewElement.className = ".img-upload__preview";
  };

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

  var applyFilter = function (event) { // функция применения фильтра к картинке
    var button = event.target;
    removeStylesOfImg(); // обнуляем все стили картинки, кроме основного
    var a = [];
    event.target.classList.forEach( // копируем массив классов баттона, на котором был клик
      function (style, index) {
        a[index] = style;
      }
    );

    a.remove("effects__preview"); // удаляем из массива указанный класс, тк он не нужен картинке
    window.redact.ImgUploadPreviewElement.classList.add(a[0]); // добавляем к классам картинки оставшиеся классы из списка выше
  };


  filterArray.forEach(
    function (button) {
      button.addEventListener("click", applyFilter);
    }
  );

})();
