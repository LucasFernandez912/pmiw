class Jugador {
  constructor(nombre) {
    this.nombre = nombre;
    this.mano = [];
  }

  agregarCarta(carta) {
    this.mano.push(carta);

    let index = this.mano.length - 1;
    let xFinal = 50 + index * 80;
    let yFinal = (this.nombre === "Jugador") ? 300 : 100;

    carta.iniciarAnimacion(xFinal, yFinal);
  }

  mostrar() {
    for (let carta of this.mano) {
      carta.actualizar();
      carta.mostrar();
    }
  }

  calcularPuntos() {
    let total = 0;
    for (let carta of this.mano) {
      total += carta.obtenerValor();
    }
    return total;
  }
}
