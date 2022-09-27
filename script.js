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
// TOC
// ==========================================================================

// - DOM References
// - Functions
// - Input
// - Drawing Modes
// - Page Loaded

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

function gridSetup() {
    sliderValue.innerHTML = `Grid Size: ${gridSize.value}x${gridSize.value}`;

    container.style.setProperty('--grid-rows', gridSize.value);
    container.style.setProperty('--grid-cols', gridSize.value);

    // clears the grid //
    container.innerHTML = '';

    for (c = 1; c <= (gridSize.value * gridSize.value); c++) {
        let cell = document.createElement('div');
        cell.setAttribute('id', c);
        cell.addEventListener('mouseover', cellColor);
        container.appendChild(cell).className = "grid-item";
    };
};

function cellColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = pickColor();
};

function pickColor() {
    if (drawingMode === "colorMode") {
        const colorPick = document.getElementById("colorpicker").value;
        return colorPick;
    } else if (drawingMode === "rainbowMode") {
        return rainbowColor();
    } else if (drawingMode === "eraser") {
        return "white";
    }
};

function rainbowColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
};

function changeMode(e) {
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
clear.addEventListener("click", gridSetup);

// ==========================================================================
// Page Loaded
// ==========================================================================

// Call the gridSetup() when the page is loaded 
document.addEventListener('readystatechange', () => {
    if (document.readyState == 'complete') gridSetup();
});