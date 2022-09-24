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
// Functions
// ==========================================================================

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (c = 1; c <= (rows * cols); c++) {
        let cell = document.createElement('div');
        cell.setAttribute('id', c);
        container.appendChild(cell).className = "grid-item";
    }
}

function cellColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    
    const gridItem = e.target;

    gridItem.setAttribute('style', 'background: black');
}

// ==========================================================================

const container = document.querySelector('.container');

makeRows(64, 64);

const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(gridItem => gridItem.addEventListener('mouseover', cellColor));

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


