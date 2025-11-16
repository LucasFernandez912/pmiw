class Carta {
  constructor(valor, palo) {
    this.valor = valor;
    this.palo = palo;

    this.nombreImagen = `carta-${this.palo}${this.valor}`;
    this.img = imagenesCartas[this.nombreImagen];

    // ANIMACIÓN
    this.x = -100;
    this.y = 0;
    this.xDestino = 0;
    this.yDestino = 0;
    this.vel = 0.15;
    this.animando = false;
  }

  iniciarAnimacion(xFinal, yFinal) {
    this.xDestino = xFinal;
    this.yDestino = yFinal;
    this.animando = true;

    audioClick.stop();
    audioClick.play();
  }

  actualizar() {
    if (this.animando) {
      this.x += (this.xDestino - this.x) * this.vel;
      this.y += (this.yDestino - this.y) * this.vel;

      if (abs(this.x - this.xDestino) < 0.5 &&
          abs(this.y - this.yDestino) < 0.5) {
        this.x = this.xDestino;
        this.y = this.yDestino;
        this.animando = false;
      }
    }
  }

  mostrar() {
    if (this.img) {
      image(this.img, this.x, this.y, 70, 100);
    } else {
      fill(200);
      rect(this.x, this.y, 70, 100, 10);
      fill(0);
      textSize(20);
      text(`${this.valor}${this.palo}`, this.x + 15, this.y + 30);
    }
  }

  obtenerValor() {
    if (["j","q","k"].includes(this.valor)) return 10;
    return int(this.valor);
  }
}
