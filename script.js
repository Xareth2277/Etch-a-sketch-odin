// ==========================================================================
// Etch-A-Sketch
// ==========================================================================

// Following is needed:

// - A grid to "etch" upon 
// - A function that enables "etching" with mouse
// - Setting to define the grid's size (min 16x16, max 64x64 for performance)
// - A way to change the color (may also be random/rainbow)
// - Eraser / Button to reset the grid

// ==========================================================================
// DOM References
// ==========================================================================

const container = document.querySelector('.container');
const gridSize = document.getElementById("gridSize");
const sliderValue = document.getElementById('sliderValue');
const colorMode = document.getElementById('btnColor');
const rainbowMode = document.getElementById('btnRainbow');
const eraser = document.getElementById('btnEraser');
const clear = document.getElementById('btnClear');

// ==========================================================================
// Functions
// ==========================================================================

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (c = 1; c <= (rows * cols); c++) {
        let cell = document.createElement('div');
        cell.setAttribute('id', c);
        container.appendChild(cell).className = "grid-item";
    };
};

function gridSetup() {
    sliderValue.innerHTML = `Grid Size: ${gridSize.value}x${gridSize.value}`;
    makeRows(gridSize.value, gridSize.value);

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => gridItem.addEventListener(
        'mouseover', 
        cellColor
    ));
};

function cellColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    const gridItem = e.target;
    gridItem.setAttribute('style', `background: ${pickColor()}`);
};

function pickColor() {
    if (drawingMode === "colorMode") {
        const colorPick = document.getElementById("colorpicker").value;
        return colorPick;
    } else if (drawingMode === "rainbowMode") {
        return rainbowColor();
    }
};

function rainbowColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
};

function changeMode(e) {

    console.log(e.target.id);

    if (e.target.id === "btnColor") {
        drawingMode = "colorMode";
    } else if (e.target.id === "btnRainbow") {
        drawingMode = "rainbowMode";
    } else if (e.target.id === "btnEraser") {
        drawingMode = "eraser";
    };
};

// ==========================================================================
// Input
// ==========================================================================

gridSize.oninput = gridSetup;

// This allows to draw with mouse held down
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// ==========================================================================
// Drawing Modes
// ==========================================================================

let drawingMode = "colorMode";

colorMode.addEventListener("click", changeMode);
rainbowMode.addEventListener("click", changeMode);
eraser.addEventListener("click", changeMode);
// clear.addEventListener("click", changeMode);

// ==========================================================================
// Page loaded
// ==========================================================================

// Call the gridSetup() when the page is loaded 
document.addEventListener('readystatechange', () => {
    if (document.readyState == 'complete') gridSetup();
});