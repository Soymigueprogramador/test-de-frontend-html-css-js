// Enlazando el ID y creando los selectores.
const colorPintado = document.getElementById('colorPintado');
const grid = document.querySelector('.grid');

// Variables de control.
let dibujando = false;
let selectedColor = 'black';

// Función para crear la grilla.
function crearGrilla() {
    const filas = Math.floor(window.innerHeight / 12);
    grid.style.gridTemplateRows = `repeat(${filas}, 10px)`;
    grid.style.gridTemplateColumns = `repeat(100, 10px)`; 

    // Bucle para generar las celdas.
    for (let i = 0; i < 100 * filas; i++) {
        const celdas = document.createElement('div');
        celdas.classList.add('celdas');

        // Eventos para la interacción con el mouse.
        celdas.addEventListener('mousedown', (e) => pintarCeldas(e, celdas));
        celdas.addEventListener('mousemove', (e) => dibujarCeldas(e, celdas));
        celdas.addEventListener('contextmenu', (e) => abrirColorPintado(e));

        grid.appendChild(celdas);
    }
}

// Función para pintar una celda.
function pintarCeldas(e, celdas) {
    e.preventDefault();
    if (e.button === 0) { 
        dibujando = true;
        celdas.style.backgroundColor = celdas.style.backgroundColor === selectedColor ? 'white' : selectedColor;
    }
}

// Función para dibujar celdas al arrastrar el mouse.
function dibujarCeldas(e, celdas) {
    if (dibujando && e.buttons === 1) {
        celdas.style.backgroundColor = selectedColor;
    }
}

// Función para abrir el selector de colores.
function abrirColorPintado(e) {
    e.preventDefault();
    colorPintado.style.display = 'block';
    colorPintado.style.left = `${e.pageX}px`;
    colorPintado.style.top = `${e.pageY}px`;
}

// Función para cerrar el selector de colores.
function cerrarSelectorColores() {
    colorPintado.style.display = 'none';
}

// Función para seleccionar un color.
function seleccionarColor(e) {
    selectedColor = e.target.style.backgroundColor;
    cerrarSelectorColores();
}

// Evento para detectar cuando se deja de dibujar.
document.addEventListener('mouseup', () => dibujando = false);

// Evento para cerrar el selector de color al hacer clic fuera.
document.addEventListener('click', (e) => {
    if (!colorPintado.contains(e.target)) {
        cerrarSelectorColores();
    }
});

// Creación de los botones de color.
['red', 'blue', 'green', 'yellow', 'black'].forEach(color => {
    const opcionesColor = document.createElement('div');
    opcionesColor.style.backgroundColor = color;
    opcionesColor.addEventListener('click', seleccionarColor);
    colorPintado.appendChild(opcionesColor);
});

// Llamado a la función para crear la grilla.
crearGrilla();