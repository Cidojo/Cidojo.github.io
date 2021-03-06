'use strict';

var headerWrap = document.querySelector('.main-header__wrap');
var sticky = headerWrap.offsetTop;

window.onscroll = function () {
  stickHead();
};

function stickHead() {
  if (window.pageYOffset > sticky) {
    headerWrap.classList.add('main-header__wrap--stick');
  } else {
    headerWrap.classList.remove('main-header__wrap--stick');
  }
}
