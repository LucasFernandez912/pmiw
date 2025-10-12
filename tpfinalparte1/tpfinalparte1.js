// =========================================================
// VIDEO: https://youtu.be/n_RN1W_YJMY
// Creado por: Lucas Fernandez Ballarre
// Trabajo Final Parte 1 - Aventura Gráfica
// Basado en "Alí Babá y los 40 Ladrones"
// =========================================================

let imagenes = [];   // Arreglo de imágenes
let textos = [];     // Arreglo de textos
let imag = [];       // Imágen de flecha
let momento = 0;     // Pantalla actual
let cancion, sonidoClick, volumen; // Audio y slider

let INDICE_CREDITOS = 20;

let creditos = [
  "Creado por: Lucas Fernandez Ballarre",
  "Trabajo Final Parte 1",
  "Aventura Gráfica",
  "Basado en 'Alí Babá y los 40 Ladrones'",
  "Música: On A Dark Night - Alan Menken",
  "Imágenes: Irene Ponce y Gemini",
  "Gracias por participar."
];

let imageFiles = [
  'data/0.jpg','data/1.jpg','data/2.jpg','data/3.jpg','data/4.jpg','data/5.jpg',
  'data/6_1.jpg','data/6_2.jpg','data/7_1.jpg','data/7_2.jpg',
  'data/8_1.jpg','data/8_2.jpg','data/9_1.jpg','data/9_2.jpg',
  'data/10_1.jpg','data/10_2.jpg','data/10_3.jpg',
  'data/11_2.jpg','data/11_3.jpg','data/12_3.jpg'
];

// ================== PRELOAD =====================
function preload(){
  soundFormats('mp3');
  cancion = loadSound('data/musica_de_fondo.mp3');
  sonidoClick = loadSound('data/clic.mp3');
  imag['Flecha'] = loadImage('data/Flecha.png');

  for(let i=0;i<imageFiles.length;i++){
    imagenes[i] = loadImage(imageFiles[i]);
  }

  textos = loadStrings('data/textos.txt');
}

// ================== SETUP =====================
function setup(){
  createCanvas(640,480);
  textFont('Georgia');
  textSize(16);
  textAlign(LEFT, TOP);
  volumen = createSlider(0,1,0.5,0.01);
}

// ================== DRAW =====================
function draw(){
  background(0);

  if (momento === 0) {
    mostrarInicio();
  } else if (momento === 5) {
    mostrarDecision(5, 6, 7);
  } else if (momento === 13) {
    mostrarDecision(13, 15, 16);
  } else if (momento === INDICE_CREDITOS) {
    mostrarCreditos();
  } else if (momento >= 1 && momento <= 19) {
    mostrarHistoria(momento);
  } else {
    momento = 0;
  }

  // Botones de sonido
  fill(220);
  rect(20, 10, 40, 40, 8); 
  fill(35,190,210);
  triangle(30, 20, 30, 40, 50, 30);

  fill(220);
  rect(20, 65, 40, 40, 8);
  fill(220, 30, 50);
  rect(30, 75, 20, 20);

  volumen.position(-25, 170);
  volumen.style('transform', 'rotate(-90deg)');
  if (cancion) cancion.setVolume(volumen.value());
}

// ================== INTERACCIÓN =====================
function mousePressed(){
  userStartAudio();

  if (mouseX > 20 && mouseY > 10 && mouseX < 60 && mouseY < 40 && cancion){
    if (!cancion.isPlaying()) cancion.loop();
  }
  if (mouseX > 20 && mouseY > 65 && mouseX < 60 && mouseY < 105 && cancion){
    if (cancion.isPlaying()) cancion.pause();
  }
}

function mouseReleased(){
  if (momento === 0 && mouseX > 207 && mouseX < 429 && mouseY > 290 && mouseY < 340) {
    momento = 1;
    if (cancion && !cancion.isPlaying()) cancion.loop();
    if (sonidoClick && sonidoClick.isLoaded()) sonidoClick.play();
    return;
  }

  if (mouseX > 565 && mouseX < 630 && mouseY > 145 && mouseY < 180) {
    if (momento >= 1 && momento <= 19 && momento !== 5 && momento !== 13) {
      avanzarHistoria();
      if (sonidoClick && sonidoClick.isLoaded()) sonidoClick.play();
      return;
    }
  }

  // DECISIONES
  if (momento === 5) {
    if (mouseX > 180 && mouseX < 270 && mouseY > 250 && mouseY < 290) momento=6;
    if (mouseX > 320 && mouseX < 410 && mouseY > 250 && mouseY < 290) momento=7;
    if (sonidoClick && sonidoClick.isLoaded()) sonidoClick.play();
  }

  if (momento === 13) {
    if (mouseX > 180 && mouseX < 270 && mouseY > 250 && mouseY < 290) momento=15;
    if (mouseX > 320 && mouseX < 410 && mouseY > 250 && mouseY < 290) momento=16;
    if (sonidoClick && sonidoClick.isLoaded()) sonidoClick.play();
  }

  // Reinicio desde créditos
  if (momento === INDICE_CREDITOS && mouseX > 230 && mouseX < 410 && mouseY > 400 && mouseY < 450){
    momento = 0;
    if (sonidoClick && sonidoClick.isLoaded()) sonidoClick.play();
  }
}

// ================== FUNCIONES DE PANTALLA =====================
function mostrarInicio(){
  background(209,164,51);
  if (imagenes[0]) image(imagenes[0], 80, 10, 480, 340);
  fill(0,150); rect(0, height - 120, width, 120);
  fill(255); 
  textAlign(CENTER, CENTER); 
  textSize(16);
  text((textos && textos[0]) ? textos[0] : "", 20, height - 120, width - 40, 100);
  botonComenzar();
}

function botonComenzar(){
  fill(100,70,40);
  rect(207, 290, 222, 49, 10);
  fill(255);
  textSize(26);
  textAlign(CENTER, CENTER);
  text("Comenzar", 320, 315);
}

function mostrarHistoria(n){
  background(209,164,51);
  if (imagenes[n]) image(imagenes[n], 80, 10, 480, 340);
  fill(0,150); rect(0, height - 120, width, 120);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  text((textos && textos[n]) ? textos[n] : "", 20, height - 110, width - 40, 100);
  dibujarFlecha();
}

function mostrarDecision(indice){
  background(209,164,51);
  if (imagenes[indice]) image(imagenes[indice], 80, 10, 480, 340);
  fill(0,150); rect(0, height - 120, width, 120);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  text((textos && textos[indice]) ? textos[indice] : "", 20, height - 110, width - 40, 100);
  botonSiNo();
}

function dibujarFlecha(){
  if (imag['Flecha']) image(imag['Flecha'], 565, 145, 70, 50);
}

function botonSiNo(){
  fill(100,70,40);
  rect(180,250,90,40,10);
  fill(255);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("Sí", 225, 270);

  fill(100,70,40);
  rect(320,250,90,40,10);
  fill(255);
  text("No", 365, 270);
}

function avanzarHistoria(){
  let avance = {
    1:2,2:3,3:4,4:5,6:8,8:10,10:12,12:14,14:INDICE_CREDITOS,
    7:9,9:11,11:13,15:17,17:INDICE_CREDITOS,16:18,18:19,19:INDICE_CREDITOS
  };
  if(avance[momento]) momento = avance[momento];
}

function mostrarCreditos(){
  background(0);
  fill(255);
  textSize(22);
  textAlign(CENTER);
  text("CRÉDITOS", width/2, 40);
  textSize(16);
  textAlign(LEFT);
  for(let i=0;i<creditos.length;i++){
    text(creditos[i], 100, 100 + i*30);
  }
  botonReinicio();
}

function botonReinicio(){
  fill(50,120,200);
  rect(230,400,180,50,10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Volver al inicio", 320, 425);
}
