const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentColor(newColor){
    currentColor = newColor;
}

const grid = document.getElementById('grid');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const colorId = document.getElementById('colorId');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
colorId.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
  }

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}
  
function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}
  
function clearGrid() {
    grid.innerHTML = '';
}

function createGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i=0; i < size * size; i++) {
        const gridElm = document.createElement('div');
        gridElm.classList.add('grid-element');
        gridElm.addEventListener('mouseover', changeColor);
        gridElm.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElm);
    }
}

function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode === 'rainbow'){
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    else if(currentMode === 'eraser'){
        e.target.style.backgroundColor = '#FFFFFF';
    }
}

function activateButton(newMode){
    if(currentMode === 'color'){
        colorBtn.classList.remove('active');
    }
    else if(currentMode === 'rainbow'){
        rainbowBtn.classList.remove('active');
    }
    else if(currentMode === 'eraser'){
        eraserBtn.classList.remove('active');
    }

    if(newMode === 'color'){
        colorBtn.classList.add('active');
    }
    else if(newMode === 'rainbow'){
        rainbowBtn.classList.add('active');
    }
    else if(newMode === 'eraser'){
        eraserBtn.classList.add('active');
    }
}


window.onload = () => {
    createGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}

