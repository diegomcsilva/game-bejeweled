"use strict";

var targetColors, ev1, html, partent, evDefault;
var colors = ['gulp', 'css', 'node', 'js', 'html'];

var constructGameBlocks = function constructGameBlocks() {
  for (var i = 1; i <= 192; i++) {
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
    ev1 = ev.clientX; // console.log('ev1', ev);
  },
  drop: function drop(ev) {
    ev.preventDefault();
    evDefault = ev.dataTransfer.getData("text");
    html = document.getElementById(evDefault).parentNode.outerHTML;
    partent = document.getElementById(evDefault).parentNode.parentNode;

    if (ev1 < ev.clientX && ev1 * 1.4 > ev.clientX) {
      partent.removeChild(document.getElementById(evDefault).parentNode);
      ev.target.parentNode.insertAdjacentHTML('afterend', html);
      setTimeout(function () {
        actionsGame.removeItens(document.querySelectorAll('.game .div'));
      }, 500);
    } else if (ev1 > ev.clientX && ev1 - ev.clientX < ev.target.offsetWidth * 3) {
      console.log('oi');
      partent.removeChild(document.getElementById(evDefault).parentNode);
      console.log(html);
      ev.target.parentNode.insertAdjacentHTML('beforebegin', html);
      setTimeout(function () {
        actionsGame.removeItens(document.querySelectorAll('.game .div'));
      }, 500);
    }
  }
};
var actionsGame = {
  removeItens: function removeItens(list) {
    Array.from(list, function (item, index) {
      var thisColor = item.classList.value;
      var thisColorPrev = list[index - 1] && index - 1 < 64 ? list[index - 1] : false;
      var thisColorNext = list[index + 1] && index - 1 < 64 ? list[index + 1] : false;
      var thisColorPrevVert = list[index - 8] && index - 8 < 64 ? list[index - 8] : false;
      var thisColorNextVert = list[index - 8] && index - 8 < 64 ? list[index + 8] : false; // Check equals itens horizontal

      if (thisColor === (thisColorNext ? thisColorNext.classList.value : false) && thisColor === (thisColorPrev ? thisColorPrev.classList.value : false)) {
        item.classList.add('equals');
        thisColorPrev.classList.add('equals');
        thisColorNext.classList.add('equals');
        setTimeout(function () {
          actionsGame.removeItens(document.querySelectorAll('.game .div'));
        }, 1000);
        return true;
      } // Check equals itens vertical


      if (thisColor === (thisColorNextVert ? thisColorNextVert.classList.value : false) && thisColor === (thisColorPrevVert ? thisColorPrevVert.classList.value : false)) {
        item.classList.add('equals');
        thisColorPrevVert.classList.add('equals');
        thisColorNextVert.classList.add('equals');
        setTimeout(function () {
          actionsGame.removeItens(document.querySelectorAll('.game .div'));
        }, 1000);
        return true;
      }
    });
    setTimeout(function () {
      Array.from(document.querySelectorAll('.equals'), function (item) {
        item.parentNode.removeChild(item);
      });
    }, 1500);
  }
};

var controlsMusic = function controlsMusic() {
  var musicGame = new Audio('./src/music/music.mp3');
  musicGame.play();
  musicGame.loop = true; // Click Play/Pause

  document.querySelector('.controls__music--play').addEventListener('click', function (e) {
    if (document.body.classList.contains('start')) {
      document.body.classList.remove('start');
      musicGame.pause();
    } else {
      document.body.classList.add('start');
      musicGame.play();
    }
  }); // Click Mute

  document.querySelector('.controls__music--mute').addEventListener('click', function (e) {
    if (document.body.classList.contains('not-mute')) {
      document.body.classList.remove('not-mute');
      musicGame.muted = false;
    } else {
      document.body.classList.add('not-mute');
      musicGame.muted = true;
    }
  });
};

window.onload = function () {
  constructGameBlocks();
  controlsMusic();
};