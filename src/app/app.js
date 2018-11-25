let targetColors, ev1, html, partent, evDefault;

const colors = ['gulp', 'css', 'node', 'js', 'html'];

const constructGameBlocks = () => {
  for (let i = 1; i <= 192; i++) {
    document
      .querySelector('.game')
      .innerHTML = document.querySelector('.game').innerHTML + `<div id="div${i}" ondrop="dragdrop.drop  (event)" ondragover="dragdrop.allowDrop(event)"><p ondragstart="dragdrop.drag(event)" draggable="true" id="drag${i}" class="div ${colors[Math.floor(Math.random() * 5)]}"></p></div>`
  };

  setTimeout(() => {  
    actionsGame.removeItens(document.querySelectorAll('.game .div'));
  }, 1000)
}

const dragdrop = {
  allowDrop: (ev) => {
    ev.preventDefault();
  },

  drag: (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);

    targetColors = ev.target.classList.value;

    ev1 = ev.clientX;

    // console.log('ev1', ev);
  },

  drop: (ev) => {
    ev.preventDefault();

    evDefault = ev.dataTransfer.getData("text")

    html = document.getElementById(evDefault).parentNode.outerHTML
    partent = document.getElementById(evDefault).parentNode.parentNode

    if ((ev1 < ev.clientX) && ((ev1 * 1.45) > ev.clientX)) {
      partent.removeChild(document.getElementById(evDefault).parentNode)
      ev.target.parentNode.insertAdjacentHTML('afterend', html);
      setTimeout(function () {
        actionsGame.removeItens(document.querySelectorAll('.game .div'));
      }, 500)
    } else if ((ev1 > ev.clientX) && ((ev1 - ev.clientX) < (ev.target.offsetWidth * 3))) {
      console.log('oi')
      partent.removeChild(document.getElementById(evDefault).parentNode)
      console.log(html)
      ev.target.parentNode.insertAdjacentHTML('beforebegin', html);
      setTimeout(function () {
        actionsGame.removeItens(document.querySelectorAll('.game .div'));
      }, 500)
    }
  }
}

const actionsGame = {
  removeItens: (list) => {

    Array.from(list, (item, index) => {
      let thisColor = item.classList.value;
      let thisColorPrev = (list[index - 1] && (index - 1) < 64) ? list[index - 1] : false;
      let thisColorNext = (list[index + 1] && (index - 1) < 64) ? list[index + 1] : false;

      let thisColorPrevVert = (list[index - 8] && (index - 8) < 64) ? list[index - 8] : false;
      let thisColorNextVert = (list[index - 8] && (index - 8) < 64) ? list[index + 8] : false;

      // Check equals itens horizontal
      if ((thisColor === (thisColorNext ? thisColorNext.classList.value : false)) && (thisColor === (thisColorPrev ? thisColorPrev.classList.value : false))) {
        item.classList.add('equals');
        thisColorPrev.classList.add('equals');
        thisColorNext.classList.add('equals');

        setTimeout(() => {
          actionsGame.removeItens(document.querySelectorAll('.game .div'));
        }, 1000);

        return true;
      }

      // Check equals itens vertical
      if ((thisColor === (thisColorNextVert ? thisColorNextVert.classList.value : false)) && (thisColor === (thisColorPrevVert ? thisColorPrevVert.classList.value : false))) {
        item.classList.add('equals');
        thisColorPrevVert.classList.add('equals');
        thisColorNextVert.classList.add('equals');

        setTimeout(() => {
          actionsGame.removeItens(document.querySelectorAll('.game .div'));
        }, 1000);

        return true;
      }
    })
    setTimeout(() => {
      Array.from(document.querySelectorAll('.equals'), (item) => {
        item.parentNode.removeChild(item);
      })
    }, 1500)
  }
}

const controlsMusic = () => {
  const musicGame = new Audio('./src/music/music.mp3');
  musicGame.play()
  musicGame.loop = true

  // Click Play/Pause
  document.querySelector('.controls__music--play').addEventListener('click', function (e) {
    if (document.body.classList.contains('start')) {
      document.body.classList.remove('start')
      musicGame.pause()
    } else {
      document.body.classList.add('start')
      musicGame.play()
    }
  })

  // Click Mute
  document.querySelector('.controls__music--mute').addEventListener('click', function (e) {
    if (document.body.classList.contains('not-mute')) {
      document.body.classList.remove('not-mute')
      musicGame.muted = false;
    } else {
      document.body.classList.add('not-mute')
      musicGame.muted = true;
    }
  })
}


window.onload = function () {
  constructGameBlocks();
  controlsMusic();
};