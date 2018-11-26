;'use strict';
// form.js — модуль, который ведет  работу с фотографиями, размещенными другими участниками


(function () {

  window.pictures = {};
  /*__________________________________________________________________________константы  */
  var MIN_NUMBER = 25;
  var MAX_NUMBER = 100;

  var MIN_AMOUNT_COMMENTS = 1;
  var MAX_AMOUNT_COMMENTS = 3;
/*__________________________________________________________________________переменные */
  var CommentsArray = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptionArray = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];


/*__________________________________________________________________________функции  */
  var getRandomNumber = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;

  };
/* создает новую array из переданной и обрезает ее длину */
var  shuffleNewArray = function(a, min, max) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }

  var randomNumber = getRandomNumber(min, max);

  return a.splice(0, randomNumber);
};


/* создает новый объект */
  var createObject = function (i) {
    var newObject = {
      "url": 'photos/' + i +'.jpg', //передать индекс элемента
      "likes": getRandomNumber(MIN_NUMBER, MAX_NUMBER), // передать сюда MIN_NUMBER и MAX_NUMBER
      "comments": shuffleNewArray(CommentsArray, MIN_AMOUNT_COMMENTS, MAX_AMOUNT_COMMENTS), // передать сюда CommentsArray, MIN_AMOUNT_COMMENTS, MAX_AMOUNT_COMMENTS
      "description": descriptionArray[getRandomNumber(0, descriptionArray.length)] // передать descriptionArray
    };
    return newObject;
  };
/*-------------------------убрать в другой модуль---------------------------------- */
  var fragment = document.createDocumentFragment();
  var picturesBlockElement = document.querySelector('.pictures');

  var similarPictureTemplate = document.querySelector('#picture').content;

  var drawObject = function (element) {

    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = element.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = element.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = element.comments;

    fragment.appendChild(pictureElement);
  };

/*----------------вызов всех функций-------------------------- */
  var elementsNumber = 25;
  var picturesArray = [];


  var createAllpictures = function () {

    for(var i = 1; i <= elementsNumber; i++){
      var pict = createObject(i);
      picturesArray.push(pict);
    }
    return picturesArray;
  }


var pictures = createAllpictures();

  var drawAllPictures  = function () {

    pictures.forEach(function(pict) {
      drawObject(pict);
    });
    picturesBlockElement.appendChild(fragment);
  }

  drawAllPictures();


  /*запихнуть позднее в другой модуль */
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImgElement = bigPictureElement.querySelector('img');
  var bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
  var bigPictureCommentsElement = bigPictureElement.querySelector('.comments-count');

  // if(bigPictureElement.classList.contains("hidden")) {
  //   bigPictureElement.classList.remove("hidden");
  // }



  // bigPictureImgElement.src =

})();
