
var header = document.querySelector(".main-header");
var sticky = header.offsetTop;

window.onscroll = function() {stickHead()};

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickHead() {
  if (window.pageYOffset > sticky) {
    header.classList.add("main-header--stick");
    header.nextElementSibling.offsetTop = header.offsetHeight;
  } else {
    header.classList.remove("main-header--stick");
    header.nextElementSibling.offsetTop = 0;
  }
}
