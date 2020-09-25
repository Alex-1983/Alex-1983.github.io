'use strict';

(function() {
  // Init
  var header = document.querySelector('.header');
  var isMain = header.classList.contains('header--main');
  var headerTop = header.querySelector('.header-top');
  var mainNav = headerTop.querySelector('.header-top__main-nav');
  var userNav = headerTop.querySelector('.header-top__user-nav');

  if (isMain) {
    headerTop.classList.add('is-main');
    mainNav.classList.add('is-main');
  }

  // Sticky header
  var headerHeight;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset >= window.innerHeight) {
      if (!header.hasAttribute('style')) {
        headerHeight = header.offsetHeight;
        header.style.minHeight = headerHeight + 'px';
      }
      headerTop.classList.add('is-sticky');
      if (isMain) {
        headerTop.classList.remove('is-main');
        mainNav.classList.remove('is-main');
      }
    } else {
      header.removeAttribute('style');
      headerTop.classList.remove('is-sticky');
      if (isMain) {
        headerTop.classList.add('is-main');
        mainNav.classList.add('is-main');
      }
    }
  });


  // Search in header
  var form = headerTop.querySelector('.header-top__form');
  var searchBtn = headerTop.querySelector('.user-nav__item--search .user-nav__link');
  var giftLink = headerTop.querySelector('.header-top__gift-link');
  var closeSearchBtn = headerTop.querySelector('.search-form__close-search-btn');
  searchBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    form.classList.add('is-visible');
    giftLink.classList.add('is-not-visible');
  });

  closeSearchBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    form.classList.remove('is-visible');
    giftLink.classList.remove('is-not-visible');
  });

  // Menu
  var menuBtn = headerTop.querySelector('.header-top__btn');
  menuBtn.addEventListener('click', function() {
    headerTop.classList.add('is-open');
    mainNav.classList.add('is-open');
    userNav.classList.add('is-open');
  });

  var menuCloseBtn = mainNav.querySelector('.main-nav__close-btn');
  menuCloseBtn.addEventListener('click', function() {
    headerTop.classList.remove('is-open');
    mainNav.classList.remove('is-open');
    userNav.classList.remove('is-open');
  });

  function menuClickHandler(evt) {
    var target = evt.currentTarget;
    if (evt.target === target.firstElementChild) {
      evt.preventDefault();
      if (target.classList.contains('is-expanded')) {
        target.classList.remove('is-expanded');
        // Убираем всем затемнение, т.к. открытых элементов больше нет
        var shadedItems = mainNav.querySelectorAll('.is-shaded');
        Array.prototype.slice.call(shadedItems).forEach(function(item) {
          item.classList.remove('is-shaded');
        });
      } else {
        // Сворачиваем уже открытый элемент меню (если есть)
        var expandedItem = mainNav.querySelector('.is-expanded');
        if (expandedItem) {
          expandedItem.classList.remove('is-expanded');
        }
        target.classList.add('is-expanded');
        target.classList.remove('is-shaded');

        // Добавляем затемнение всем другим элементам
        var otherItems = mainNav.querySelectorAll('.main-nav__item:not(is-shaded):not(.is-expanded)');
        Array.prototype.slice.call(otherItems).forEach(function(item) {
          item.classList.add('is-shaded');
        });
      }
    }
  }

  var mainNavItems = mainNav.querySelectorAll('.main-nav__item');
  Array.prototype.slice.call(mainNavItems).forEach(function(item) {
    if (item.querySelector('.main-nav__sublist')) { // Если есть подменю
      item.addEventListener('click', menuClickHandler);
    }
  });
})();

// Sliders

(function() {

  function createSlider(selector, params) {
    return document.querySelector(selector) ? new window.Swiper(selector, params) : null;
  }

  // Cart slider
  createSlider('.slider .swiper-container', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 31,
    loop: true,

    breakpoints: {
      992: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },

      768: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        loopedSlides: 3,
        spaceBetween: 30,
        centeredSlides: true,
      },
    },

    navigation: {
      nextEl: '.slider__arrow--next',
      prevEl: '.slider__arrow--prev'
    },
  });

  // Promo slider
  createSlider('.promo__slider .swiper-container', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,

    pagination: {
      el: '.swiper-pagination',
    },
  });

  // Categories slider
  createSlider('.categories__slider .swiper-container', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 31,
    loop: true,

    breakpoints: {
      992: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },

      768: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        loopedSlides: 3,
        spaceBetween: 30,
        centeredSlides: true,
      },
    },

    navigation: {
      nextEl: '.slider__arrow--next',
      prevEl: '.slider__arrow--prev'
    },
  });

})();

// field-num

(function() {
  var fields = document.querySelectorAll('.field-num');

  if (fields.length) {

    Array.prototype.forEach.call(fields, function(field) {
      var input = field.querySelector('input');
      var valueMin = input.getAttribute('min') ? +input.getAttribute('min') : -Infinity;
      var valueMax = input.getAttribute('max') ? +input.getAttribute('max') : Infinity;
      var valueStep = input.getAttribute('step') ? +input.getAttribute('step') : 1;

      field.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('field-num__btn') && !input.getAttribute('disabled')) {
          var num = parseInt(input.value);
          if (isNaN(num)) num = 0;
          if (evt.target.classList.contains('field-num__btn--plus')) {
            if (num < valueMax) input.value = num + valueStep;
          }
          if (evt.target.classList.contains('field-num__btn--minus')) {
            if (num > valueMin) input.value = num - valueStep;
          }
        }
      });
    });
  };

})();

// Mask-phone

(function() {

  var createMask = window.IMask;
  var inputPhone = document.getElementById('phone');

  if (inputPhone) {
    createMask(
      inputPhone, {
        mask: '+{7} (000) 000-00-00'
      }
    );
  }

})();

// Cart

(function() {

  var cartList = document.querySelector('.cart__list');


  if (cartList) {
    var cartItems = cartList.children;

    var removeCartItems = function(item) {
      var cartCloseBtn = item.querySelector('.cart__close');

      cartCloseBtn.addEventListener('click', function () {
        item.classList.add('is-hidden');
      });
    }

    for (var i = 0; i < cartItems.length; i++) {
      removeCartItems(cartItems[i])
    }

  }

})();

(function () {

  var ESC_KEYCODE = 27;

  var createEscHandler = function (fn) {
    return function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        fn();
      }
    };
  };

  var popupOpenBtn = cartItems.querySelector('.cart__btn-open');
  var popup = document.querySelector('.popup-favourites');
  var overlay = document.querySelector('.overlay');
  var body = document.querySelector('body');

  if (popup) {

    var popupCloseBtn = popup.querySelector('.popup-favourites__close');

    var closePopup = function () {
      popup.classList.remove('is-open-popup');
      overlay.classList.remove('is-open-popup');
      body.classList.remove('no-scroll');
      overlay.removeEventListener('click', closePopup);
    };

    var openPopup = function () {
      popup.classList.add('is-open-popup');
      overlay.classList.add('s-open-popup');
      body.classList.add('no-scroll');
      overlay.addEventListener('click', closePopup);
    };

    var onClickPopupCloseBtn = function () {
      closePopup();
      document.removeEventListener('keydown', onEscDown);
    };

    var onClickPopupOpenBtn = function (evt) {
      evt.preventDefault();
      openPopup();
      document.addEventListener('keydown', onEscDown);
    };

    var onEscDown = createEscHandler(onClickPopupCloseBtn);

    popupOpenBtn.addEventListener('click', onClickPopupOpenBtn);
    popupCloseBtn.addEventListener('click', onClickPopupCloseBtn);
  }

})();

