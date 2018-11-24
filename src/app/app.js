let targetColors, ev1, html;

const colors = ['gulp', 'css', 'node', 'js', 'html'];

const constructGameBlocks = () => {
  for (let i = 1; i <= 300; i++) {
    document
      .querySelector('.game')
      .innerHTML = document.querySelector('.game').innerHTML + `<div id="div${i}" ondrop="dragdrop.drop  (event)" ondragover="dragdrop.allowDrop(event)"><p ondragstart="dragdrop.drag(event)" draggable="true" id="drag${i}" class="div ${colors[Math.floor(Math.random() * 5)]}"></p></div>`
  };

  setTimeout(() => {
    actionsGame.removeItens(document.querySelectorAll('.game .div'));
  }, 1000)
}

const dragdrop = {
  allowDrop : (ev) => {
    ev.preventDefault();
  },
  
  drag : (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  
    targetColors = ev.target.classList.value;
  
    ev1 = ev.clientX;
  
    console.log('ev1', ev);
  },
  
  drop: (ev) => {
    ev.preventDefault();
  
    html = '';
  
    console.log('ev2', ev);

    if((ev1 < ev.clientX) && ((ev1 * 1.25) > ev.clientX)) {
      html = document.getElementById(ev.dataTransfer.getData("text")).parentNode.outerHTML
      document.getElementById(ev.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("text")).parentNode)
      ev.target.parentNode.insertAdjacentHTML('afterend', html);
      setTimeout(function() {
        actionsGame.removeItens(document.querySelectorAll('.game .div'));

        if(actionsGame.removeItens(document.querySelectorAll('.game .div'))) {
          document.querySelector('footer').append('<div class="core"></div>')
        }
      }, 500)
    } else if ((ev1 > ev.clientX) && ((ev1 - ev.clientX) < (ev.target.offsetWidth * 3))) {
      html = document.getElementById(ev.dataTransfer.getData("text")).parentNode.outerHTML
      document.getElementById(ev.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("text")).parentNode)
      ev.target.parentNode.insertAdjacentHTML('beforebegin', html);
      setTimeout(function() {
        actionsGame.removeItens(document.querySelectorAll('.game .div'));

        if(actionsGame.removeItens(document.querySelectorAll('.game .div'))) {
          document.querySelector('footer').append('<div class="core"></div>')
        }
      }, 500)
    } 
  }
}

const actionsGame = {
  removeItens : (list) => {
    Array.from(list, (item, index) => {
      let thisColor = item.classList.value;
      let thisColorPrev = (list[index - 1] && (index - 1) < 72) ? list[index - 1] : false;
      let thisColorNext = list[index + 1] ? list[index + 1] : false;

      let thisColorPrevVert = (list[index - 8] && (index - 8) < 72) ? list[index - 8] : false;
      let thisColorNextVert = (list[index - 8] && (index - 8) < 72) ? list[index + 8] : false;
    
      // Check equals itens horizontal
      if((thisColor === (thisColorNext ? thisColorNext.classList.value : false)) && (thisColor === (thisColorPrev ? thisColorPrev.classList.value : false ))) {
        item.classList.add('equals');
        thisColorPrev.classList.add('equals');  
        thisColorNext.classList.add('equals');

        console.log(item.parentNode)

        setTimeout(() => {
          item.parentNode.parentNode ? item.parentNode.parentNode.removeChild(item.parentNode) : false;
          thisColorPrev.parentNode.parentNode ? thisColorPrev.parentNode.parentNode.removeChild(thisColorPrev.parentNode) : false;
          thisColorNext.parentNode.parentNode ? thisColorNext.parentNode.parentNode.removeChild(thisColorNext.parentNode) : false;

          actionsGame.removeItens(document.querySelectorAll('.game .div'));
        }, 1000);

        return true;
      }

      // Check equals itens vertical
      if((thisColor === (thisColorNextVert ? thisColorNextVert.classList.value : false)) && (thisColor === (thisColorPrevVert ? thisColorPrevVert.classList.value : false ))) {
        item.classList.add('equals');
        thisColorPrevVert.classList.add('equals');
        thisColorNextVert.classList.add('equals');

        setTimeout(() => {
          item.parentNode.parentNode ? item.parentNode.parentNode.removeChild(item.parentNode) : false;
          thisColorPrevVert.parentNode.parentNode ? thisColorPrevVert.parentNode.parentNode.removeChild(thisColorPrevVert.parentNode) : false;
          thisColorNextVert.parentNode.parentNode ? thisColorNextVert.parentNode.parentNode.removeChild(thisColorNextVert.parentNode) : false;

          actionsGame.removeItens(document.querySelectorAll('.game .div'));
        }, 1000);

        return true;
      }
    })
  }
}


constructGameBlocks();
