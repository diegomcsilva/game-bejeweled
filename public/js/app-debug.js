"use strict";

var targetColors, ev1, html;
var colors = ['gulp', 'css', 'node', 'js', 'html'];

var constructGameBlocks = function constructGameBlocks() {
  for (var i = 1; i <= 100; i++) {
    document.querySelector('.game').innerHTML = document.querySelector('.game').innerHTML + "<div id=\"div".concat(i, "\" ondrop=\"dragdrop.drop  (event)\" ondragover=\"dragdrop.allowDrop(event)\"><p ondragstart=\"dragdrop.drag(event)\" draggable=\"true\" id=\"drag").concat(i, "\" class=\"div ").concat(colors[Math.floor(Math.random() * 5)], "\"></p></div>");
  }

  ;
  setTimeout(function () {
    actionsGame.removeItens(document.querySelectorAll('.game .div'));
  }, 1000);
};

var dragdrop = {
  allowDrop: function allowDrop(ev) {
    ev.preventDefault();
  },
  drag: function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    targetColors = ev.target.classList.value;
    ev1 = ev.clientX;
    console.log('ev1', ev);
  },
  drop: function drop(ev) {
    ev.preventDefault(); // var data = ev.dataTransfer.getData("text");

    html = '';
    console.log('ev2', ev); // console.log(document.getElementById(ev.target.parentNode.id).nextSibling.previousSibling.classList.value)
    // console.log(document.getElementById(ev.target.parentNode.id).children["0"].classList.value)
    // if (document.getElementById(ev.target.parentNode.id).children["0"].classList.value === targetColors) {
    // alert('par');  
    // }  
    // console.log(ev.target.offsetWidth)
    // console.log(ev.clientX)

    if (ev1 < ev.clientX && ev1 * 1.8 > ev.clientX) {
      // console.log('oi')
      html = document.getElementById(ev.dataTransfer.getData("text")).parentNode.outerHTML;
      document.getElementById(ev.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("text")).parentNode);
      ev.target.parentNode.insertAdjacentHTML('afterend', html);
    } else if (ev1 > ev.clientX && ev1 - ev.clientX < ev.target.offsetWidth * 2.5) {
      // console.log('oill', ev.dataTransfer.getData("text").parentNode)
      html = document.getElementById(ev.dataTransfer.getData("text")).parentNode.outerHTML;
      document.getElementById(ev.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("text")).parentNode);
      ev.target.parentNode.insertAdjacentHTML('beforebegin', html);
    }
  }
};
var actionsGame = {
  removeItens: function removeItens(list) {
    Array.from(list, function (item, index) {
      var thisColor = item.classList.value;
      var thisColorPrev = list[index - 1] ? list[index - 1] : false;
      var thisColorNext = list[index + 1] ? list[index + 1] : false;

      if (thisColor === (thisColorNext ? thisColorNext.classList.value : false) && thisColor === (thisColorPrev ? thisColorPrev.classList.value : false)) {
        item.parentNode.parentNode.removeChild(item.parentNode);
        thisColorPrev.parentNode.parentNode.removeChild(thisColorPrev.parentNode);
        thisColorNext.parentNode.parentNode.removeChild(thisColorNext.parentNode);
      }
    });
  }
};
constructGameBlocks();