var targetColor = '';

const color = ['red', 'blue', 'green', 'yellow', 'orange'];

for (let i = 0; i < 8; i++) {
  document.querySelector('.game')
    .innerHTML = document.querySelector('.game').innerHTML + `<div id="div${i}" ondrop="drop(event)" ondragover="allowDrop(event)">
                       <p ondragstart="drag(event)" draggable="true" id="drag${i}" class="div ${color[Math.floor(Math.random() * 5)]}"></p>
                     </div>`
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);

  targetColor = ev.target.parentNode.classList.value;
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  console.log(targetColor)
  // console.log(document.getElementById(ev.target.parentNode.id).nextSibling.previousSibling.classList.value)

  console.log(document.getElementById(ev.target.parentNode.id).nextSibling.nextSibling.classList.value)

  if (document.getElementById(ev.target.parentNode.id).nextSibling.nextSibling.classList.value === targetColor) {
    alert('par');
    document.getElementById(ev.target.parentNode.id).nextSibling.nextSibling.innerHTML = '';
  }
}