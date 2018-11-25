let event1;

const actionsGame = {
    removeItens: (list) => {
        Array.from(list, (item, index) => {
            let thisColor = item.classList.value;
            let thisColorPrev = (list[index - 1] && (index - 1) < 72) ? list[index - 1] : false;
            let thisColorNext = list[index + 1] ? list[index + 1] : false;

            let thisColorPrevVert = (list[index - 8] && (index - 8) < 72) ? list[index - 8] : false;
            let thisColorNextVert = (list[index - 8] && (index - 8) < 72) ? list[index + 8] : false;

            // Check equals itens horizontal
            if ((thisColor === (thisColorNext ? thisColorNext.classList.value : false)) && (thisColor === (thisColorPrev ? thisColorPrev.classList.value : false))) {
                item.classList.add('equals');
                thisColorPrev.classList.add('equals');
                thisColorNext.classList.add('equals');

                setTimeout(() => {
                    item.parentNode.parentNode ? item.parentNode.parentNode.removeChild(item.parentNode) : false;
                    thisColorPrev.parentNode.parentNode ? thisColorPrev.parentNode.parentNode.removeChild(thisColorPrev.parentNode) : false;
                    thisColorNext.parentNode.parentNode ? thisColorNext.parentNode.parentNode.removeChild(thisColorNext.parentNode) : false;

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

export default class dragDrop {

    allowDrop() {
        Array.from(document.querySelectorAll(".divMain"), (item) => {
            item.addEventListener("dragover", function (event) {
                event.preventDefault();
            }, false);
        })
    };


    drag() {

        Array.from(document.querySelectorAll(".div"), (item) => {
            item.addEventListener("dragstart", function (event) {
                event.dataTransfer.setData("text", event.target.id);

                this.targetColors = event.target.classList.value;

                event1 = event.clientX;

                console.log('oi')
            }, false);

        })
    };

    drop() {

        Array.from(document.querySelectorAll(".divMain"), (item) => {
            item.addEventListener("drop", function (event) {
                event.preventDefault();

                let html = '';

                // console.log('ev2', ev);

                if ((event1 < event.clientX) && ((event1 * 1.25) > event.clientX)) {
                    html = document.getElementById(event.dataTransfer.getData("text")).parentNode.outerHTML
                    document.getElementById(event.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(event.dataTransfer.getData("text")).parentNode)
                    event.target.parentNode.insertAdjacentHTML('afterend', html);
                    setTimeout(function () {
                        actionsGame.removeItens(document.querySelectorAll('.game .div'));

                        if (actionsGame.removeItens(document.querySelectorAll('.game .div'))) {
                            document.querySelector('footer').append('<div class="core"></div>')
                        }
                    }, 500)
                } else if ((event1 > event.clientX) && ((event1 - event.clientX) < (event.target.offsetWidth * 3))) {
                    html = document.getElementById(event.dataTransfer.getData("text")).parentNode.outerHTML
                    document.getElementById(event.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(event.dataTransfer.getData("text")))
                    event.target.parentNode.insertAdjacentHTML('beforebegin', html);
                    setTimeout(function () {
                        actionsGame.removeItens(document.querySelectorAll('.game .div'));

                        if (actionsGame.removeItens(document.querySelectorAll('.game .div'))) {
                            document.querySelector('footer').append('<div class="core"></div>')
                        }
                    }, 500)
                }

            }, false);
        })

    }
}