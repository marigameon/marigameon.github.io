const furnitures = document.querySelectorAll('.furniture');

furnitures.forEach(furniture => {
    furniture.addEventListener('dragstart', dragStart);
    furniture.addEventListener('dragend', dragEnd);
});

document.getElementById('room').addEventListener('dragover', dragOver);
document.getElementById('room').addEventListener('drop', drop);

let draggedItem = null;

function dragStart(e) {
    draggedItem = this;
    setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
    setTimeout(() => this.style.display = 'block', 0);
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
