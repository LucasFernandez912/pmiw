class Mazo {
  constructor() {
    this.cartas = [];
    this.crearMazo();
    this.barajar();
  }

  crearMazo() {
    let palos = ["c", "d", "p", "t"];
    let valores = ["1","2","3","4","5","6","7","8","9","10","j","q","k"];

    for (let p of palos) {
      for (let v of valores) {
        this.cartas.push(new Carta(v, p));
      }
    }
  }

  barajar() {
    for (let i = this.cartas.length - 1; i > 0; i--) {
      let j = int(random(i + 1));
      [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
    }
  }

  repartirCarta() {
    return this.cartas.pop();
  }
}
