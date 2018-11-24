"use strict";

var targetColors, ev1, html;
var colors = ['gulp', 'css', 'node', 'js', 'html'];

var constructGameBlocks = function constructGameBlocks() {
  for (var i = 1; i <= 300; i++) {
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
    ev.preventDefault();
    html = '';
    console.log('ev2', ev);

    if (ev1 < ev.clientX && ev1 * 1.25 > ev.clientX) {
      html = document.getElementById(ev.dataTransfer.getData("text")).parentNode.outerHTML;
      document.getElementById(ev.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("text")).parentNode);
      ev.target.parentNode.insertAdjacentHTML('afterend', html);
      setTimeout(function () {
        actionsGame.removeItens(document.querySelectorAll('.game .div'));

        if (actionsGame.removeItens(document.querySelectorAll('.game .div'))) {
          document.querySelector('footer').append('<div class="core"></div>');
        }
      }, 500);
    } else if (ev1 > ev.clientX && ev1 - ev.clientX < ev.target.offsetWidth * 3) {
      html = document.getElementById(ev.dataTransfer.getData("text")).parentNode.outerHTML;
      document.getElementById(ev.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("text")).parentNode);
      ev.target.parentNode.insertAdjacentHTML('beforebegin', html);
      setTimeout(function () {
        actionsGame.removeItens(document.querySelectorAll('.game .div'));

        if (actionsGame.removeItens(document.querySelectorAll('.game .div'))) {
          document.querySelector('footer').append('<div class="core"></div>');
        }
      }, 500);
    }
  }
};
var actionsGame = {
  removeItens: function removeItens(list) {
    Array.from(list, function (item, index) {
      var thisColor = item.classList.value;
      var thisColorPrev = list[index - 1] && index - 1 < 72 ? list[index - 1] : false;
      var thisColorNext = list[index + 1] ? list[index + 1] : false;
      var thisColorPrevVert = list[index - 8] && index - 8 < 72 ? list[index - 8] : false;
      var thisColorNextVert = list[index - 8] && index - 8 < 72 ? list[index + 8] : false; // Check equals itens horizontal

      if (thisColor === (thisColorNext ? thisColorNext.classList.value : false) && thisColor === (thisColorPrev ? thisColorPrev.classList.value : false)) {
        item.classList.add('equals');
        thisColorPrev.classList.add('equals');
        thisColorNext.classList.add('equals');
        console.log(item.parentNode);
        setTimeout(function () {
          item.parentNode.parentNode ? item.parentNode.parentNode.removeChild(item.parentNode) : false;
          thisColorPrev.parentNode.parentNode ? thisColorPrev.parentNode.parentNode.removeChild(thisColorPrev.parentNode) : false;
          thisColorNext.parentNode.parentNode ? thisColorNext.parentNode.parentNode.removeChild(thisColorNext.parentNode) : false;
          actionsGame.removeItens(document.querySelectorAll('.game .div'));
        }, 1000);
        return true;
      } // Check equals itens vertical


      if (thisColor === (thisColorNextVert ? thisColorNextVert.classList.value : false) && thisColor === (thisColorPrevVert ? thisColorPrevVert.classList.value : false)) {
        item.classList.add('equals');
        thisColorPrevVert.classList.add('equals');
        thisColorNextVert.classList.add('equals');
        setTimeout(function () {
          item.parentNode.parentNode ? item.parentNode.parentNode.removeChild(item.parentNode) : false;
          thisColorPrevVert.parentNode.parentNode ? thisColorPrevVert.parentNode.parentNode.removeChild(thisColorPrevVert.parentNode) : false;
          thisColorNextVert.parentNode.parentNode ? thisColorNextVert.parentNode.parentNode.removeChild(thisColorNextVert.parentNode) : false;
          actionsGame.removeItens(document.querySelectorAll('.game .div'));
        }, 1000);
        return true;
      }
    });
  }
};
constructGameBlocks();