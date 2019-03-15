;
'use strict';



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
    var rand = Math.floor(Math.random() * ((max + 1) - min)) + min;
    // console.log("rand is " + rand);
    return rand;

  };


  /* создает новую array из переданной и обрезает ее длину */
  var shuffleNewArray = function (a, min, max) {
    var array = a.slice();
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }


    return array.splice(min, getRandomNumber(min, max));
  };


  /* создает новый объект */
  var createObject = function (i) {
    var newObject = {
      "url": 'photos/' + i + '.jpg', //передать индекс элемента
      "likes": getRandomNumber(MIN_NUMBER, MAX_NUMBER), // передать сюда MIN_NUMBER и MAX_NUMBER
      "comments": shuffleNewArray(CommentsArray, MIN_AMOUNT_COMMENTS, MAX_AMOUNT_COMMENTS), // передать сюда CommentsArray, MIN_AMOUNT_COMMENTS, MAX_AMOUNT_COMMENTS
      "description": descriptionArray[getRandomNumber(1, descriptionArray.length)] // передать descriptionArray
    };


    return newObject;
  };


  /* Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment */
  var fragment = document.createDocumentFragment();
  var picturesBlockElement = document.querySelector('.pictures');

  var similarPictureTemplate = document.querySelector('#picture').content;

  var drawObject = function (element) {

    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = element.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = element.likes.length;
    pictureElement.querySelector('.picture__stat--comments').textContent = element.comments.length;

    fragment.appendChild(pictureElement);
    console.log("element is " + element.url + " \n.Comments are " + element.comments + " ,its length is " + element.comments.length + " \n.Likes are " + element.likes.length);
  };

  /* запуск функции отрисовки маленьких картинок, позднее эта йкнкция удалится за ненадобностью*/
  var elementsNumber = 25;
  var picturesArray = [];


  var createAllPictures = function () {

    for (var i = 0; i <= elementsNumber; i++) {
      picturesArray[i] = createObject(i);
      console.log(picturesArray[i]);
    }
  };


  var pictures = createAllPictures();



  // // /*-------------------------отрисовка объктов---------------------------------- */
  // var fragment = document.createDocumentFragment();
  // var picturesBlockElement = document.querySelector('.pictures');

  // var similarPictureTemplate = document.querySelector('#picture').content;

  // var drawObject = function (element) {

  //   var pictureElement = similarPictureTemplate.cloneNode(true);

  //   pictureElement.querySelector('img').src = element.url;
  //   pictureElement.querySelector('.picture__stat--likes').textContent = element.likes;
  //   pictureElement.querySelector('.picture__stat--comments').textContent = element.comments;

  //   fragment.appendChild(pictureElement);
  // };

  // // /*----------------вызов всех функций-------------------------- */
  // var elementsNumber = 25;
  // var picturesArray = [];


  // var createAllPictures = function () {

  //   for (var i = 1; i <= elementsNumber; i++) {
  //     var pict = createObject(i);
  //     picturesArray.push(pict);
  //   }
  //   return picturesArray;
  // };


  // var pictures = createAllPictures();

  // var drawAllPictures = function () {

  //   pictures.forEach(function (pict) {
  //     drawObject(pict);
  //   });
  //   picturesBlockElement.appendChild(fragment);
  // };

  // drawAllPictures();


  // /*запихнуть позднее в другой модуль */
  // var bigPictureElement = document.querySelector('.big-picture');
  // var bigPictureImgElement = bigPictureElement.querySelector('img');
  // var bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
  // var bigPictureCommentsElement = bigPictureElement.querySelector('.comments-shown-count');
  // var socialCommentsElement = bigPictureElement.querySelector('.social__comments');
  // var closeBigPictureElement = bigPictureElement.querySelector('#picture-cancel');

  // if (bigPictureElement.classList.contains("hidden")) {
  //   bigPictureElement.classList.remove("hidden");
  // }
  // var removeChildrenNodes = function (list) {
  //   while (list.firstChild) {
  //     list.removeChild(list.firstChild);
  //   }
  // };

  // // console.log(pictures[0]);

  // var putBigPict = function (element) {
  //   bigPictureImgElement.src = element.url;
  //   bigPictureLikesElement.textContent = element.likes;
  //   bigPictureCommentsElement.textContent = element.comments.length;


  //   removeChildrenNodes(socialCommentsElement);

  //   var comments = element.comments;

  //   comments.forEach(function (comment) {
  //     var li = document.createElement('li');
  //     li.className = 'social__comment';

  //     var img = document.createElement('img');
  //     img.className = 'social__picture';
  //     img.src = "img/avatar-" + getRandomNumber(1, 6) + ".svg";
  //     img.alt = "Аватар комментатора фотографии";
  //     img.width = "35";
  //     img.height = "35";
  //     li.appendChild(img);

  //     var p = document.createElement('p');
  //     p.className = 'social__text';
  //     p.textContent = comment;
  //     li.appendChild(p);

  //     socialCommentsElement.appendChild(li);
  //   });


  //   var oncloseBigPictureElementClick = function() {
  //     if (!bigPictureElement.classList.contains("hidden")) {
  //       bigPictureElement.classList.add("hidden");
  //     }
  //     closeBigPictureElement.removeEventListener('click', oncloseBigPictureElementClick);
  //   };
  //   closeBigPictureElement.addEventListener('click', oncloseBigPictureElementClick);
  // };

  // putBigPict(pictures[0]);

})();
