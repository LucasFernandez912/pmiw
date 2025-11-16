// VIDEO: https://youtu.be/9JUV66t0VfM
// Creado por: Lucas Fernandez Ballarre
// Trabajo Final Parte 2 - Videojuego Web

let juego;
let madera;
let fondoMenu;
let cancion, audioClick;
let imagenesCartas = {};

function preload() {
  soundFormats('mp3');

  cancion = loadSound('data/musica_de_fondo.mp3');
  audioClick = loadSound('data/carta.mp3');
  madera = loadImage('data/mesa.jpg');
  fondoMenu = loadImage('data/menu.jpg'); 

  let palos = ['c', 'd', 'p', 't'];
  let valores = ['1','2','3','4','5','6','7','8','9','10','j','q','k'];

  for (let palo of palos) {
    for (let valor of valores) {
      let nombre = `carta-${palo}${valor}`;
      imagenesCartas[nombre] = loadImage(`data/${nombre}.png`);
    }
  }
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego();

  if (!cancion.isPlaying()) {
    cancion.setVolume(0.3);
    cancion.loop();
  }
}

function draw() {
  juego.mostrar();
}

function mousePressed() {
  juego.clickEnBoton(mouseX, mouseY);
}
