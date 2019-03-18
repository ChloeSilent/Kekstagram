;'use strict';
// form.js — модуль, который ведет  работу с фотографиями, размещенными другими участниками


(function () {

  window.redact = {};

var uploadFileElement = document.querySelector('#upload-file');

var preview = document.querySelector('.img-upload__overlay');

var showRedactor = function() {
  preview.classList.remove("hidden");
}

uploadFileElement.addEventListener("change", showRedactor);

})();
