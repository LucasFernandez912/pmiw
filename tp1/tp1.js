//Video Explicativo: https://youtu.be/LyvU3IJeeJg

let imagen; 

let centroX = 600;
let centroY = 200;

let radio1 = 180;
let radio2 = 135;
let radio3 = 95;
let radio4 = 55;

let cantidad1 = 54;
let cantidad2 = 42;
let cantidad3 = 30;
let cantidad4 = 18;

let giro1 = 0;
let giro2 = 0;
let giro3 = 0;
let giro4 = 0;

let giraAnillo1 = false;
let giraAnillo2 = false;
let giraAnillo3 = false;
let giraAnillo4 = false;

let direccion1 = 1;
let direccion2 = 1;
let direccion3 = 1;
let direccion4 = 1;

let velocidad = 0.01;
let tamaño = 14;

let inclinacion;
let giroParaAlinear;
let separacionEntreAnillos;

function preload() {
  imagen = loadImage("data/D_18.jpg");
}

function setup() {
  createCanvas(800, 400); 
  
  inclinacion = radians(10);
  giroParaAlinear = radians(90);
  separacionEntreAnillos = radians(12);
}

function draw() {
  background(128);
  image(imagen, 0, 0, 400, 400);

  if (giraAnillo1) giro1 += direccion1 * velocidad;
  if (giraAnillo2) giro2 += direccion2 * velocidad;
  if (giraAnillo3) giro3 += direccion3 * velocidad;
  if (giraAnillo4) giro4 += direccion4 * velocidad;

  dibujarAnillo(radio1, cantidad1, inclinacion, giro1, 0);
  dibujarAnillo(radio2, cantidad2, -inclinacion, giro2, 1);
  dibujarAnillo(radio3, cantidad3, inclinacion, giro3, 2);
  dibujarAnillo(radio4, cantidad4, -inclinacion, giro4, 3);
}

function dibujarAnillo(radio, cantidad, inclinacionAnillo, rotacion, numero) {
  for (let i = 0; i < cantidad; i++) {
    let angulo = map(i, 0, cantidad, 0, TWO_PI) + rotacion + numero * separacionEntreAnillos;

    let x = centroX + cos(angulo) * radio;
    let y = centroY + sin(angulo) * radio;

    if (i % 2 === 0) {
      fill(140);
      stroke(0);
    } else {
      fill(120);
      stroke(255);
    }

    push();
    translate(x, y);
    rotate(angulo + giroParaAlinear + inclinacionAnillo);
    rectMode(CENTER);
    rect(0, 0, tamaño, tamaño);
    pop();
  }
}

function clicEnImagen(x, y) {
  return x < 400 && y < 400;
}

function mousePressed() {
  if (clicEnImagen(mouseX, mouseY)) {
    giro1 = giro2 = giro3 = giro4 = 0;
    giraAnillo1 = giraAnillo2 = giraAnillo3 = giraAnillo4 = false;
    direccion1 = direccion2 = direccion3 = direccion4 = 1;
  }
}

function keyPressed() {
  if (key === '1') giraAnillo1 = !giraAnillo1;
  if (key === '2') giraAnillo2 = !giraAnillo2;
  if (key === '3') giraAnillo3 = !giraAnillo3;
  if (key === '4') giraAnillo4 = !giraAnillo4;

  if (key === 'q') direccion1 *= -1;
  if (key === 'w') direccion2 *= -1;
  if (key === 'e') direccion3 *= -1;
  if (key === 'r') direccion4 *= -1;
}
