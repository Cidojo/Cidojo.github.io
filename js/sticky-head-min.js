"use strict";var headerWrap=document.querySelector(".main-header__wrap"),sticky=headerWrap.offsetTop;function stickHead(){window.pageYOffset>sticky?headerWrap.classList.add("main-header__wrap--stick"):headerWrap.classList.remove("main-header__wrap--stick")}window.onscroll=function(){stickHead()};