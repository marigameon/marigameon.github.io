const furnitures = document.querySelectorAll('.furniture');

furnitures.forEach(furniture => {
    furniture.addEventListener('dragstart', dragStart);
    furniture.addEventListener('dragend', dragEnd);
});

// Adiciona um evento de clique à lâmpada para mudar o cenário
document.getElementById('furniture3').addEventListener('click', changeScenario);

let draggedItem = null;

function dragStart(e) {
    draggedItem = this;
    setTimeout(() => this.style.opacity = '0.5', 0); // Deixa o item semi-transparente enquanto é arrastado
}

function dragEnd() {
    setTimeout(() => this.style.opacity = '1', 0); // Restaura a opacidade quando o arrasto termina
    draggedItem = null;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const room = document.getElementById('room');
    const x = e.clientX - room.offsetLeft - (draggedItem.offsetWidth / 2);
    const y = e.clientY - room.offsetTop - (draggedItem.offsetHeight / 2);

    draggedItem.style.left = `${x}px`;
    draggedItem.style.top = `${y}px`;
}

function changeScenario() {
    const room = document.getElementById('room');
    room.style.backgroundImage = 'url(images/new-scenario.jpg)'; // Define a nova imagem de fundo
    room.style.backgroundSize = 'cover'; // Ajusta o tamanho da imagem para cobrir o contêiner
}

// Adiciona a funcionalidade de redimensionamento com Interact.js
interact('.furniture').draggable({
    listeners: { move: dragMoveListener }
}).resizable({
    edges: { left: false, right: true, bottom: true, top: false },
    listeners: {
        move(event) {
            let { x, y } = event.target.dataset;

            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;

            Object.assign(event.target.style, {
                width: `${event.rect.width}px`,
                height: `${event.rect.height}px`,
                transform: `translate(${x}px, ${y}px)`
            });

            Object.assign(event.target.dataset, { x, y });
        }
    }
});

function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

window.dragMoveListener = dragMoveListener;
