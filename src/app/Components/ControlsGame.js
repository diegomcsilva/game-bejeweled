class ControlsGame {

    removeItens(list) {
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
  
          setTimeout(() => {
            item.parentNode.parentNode.removeChild(item.parentNode);
            thisColorPrev.parentNode.parentNode.removeChild(thisColorPrev.parentNode);
            thisColorNext.parentNode.parentNode.removeChild(thisColorNext.parentNode);
  
            document.querySelector('footer').append('<div class="core"></div>')
  
            actionsGame.removeItens(document.querySelectorAll('.game .div'));
          }, 1000);
        }
  
        // Check equals itens vertical
        if((thisColor === (thisColorNextVert ? thisColorNextVert.classList.value : false)) && (thisColor === (thisColorPrevVert ? thisColorPrevVert.classList.value : false ))) {
          item.classList.add('equals');
          thisColorPrevVert.classList.add('equals');
          thisColorNextVert.classList.add('equals');
  
          setTimeout(() => {
            item.parentNode.parentNode.removeChild(item.parentNode);
            thisColorPrevVert.parentNode.parentNode.removeChild(thisColorPrevVert.parentNode);
            thisColorNextVert.parentNode.parentNode.removeChild(thisColorNextVert.parentNode);
  
            document.querySelector('footer').append('<div class="core"></div>')
  
            actionsGame.removeItens(document.querySelectorAll('.game .div'));
          }, 1000);
        }
  
      })
    }
  }

  export default ControlsGame