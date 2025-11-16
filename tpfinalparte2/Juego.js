class Juego {
  constructor() {
    this.mesa = new Mesa();
    this.mazo = new Mazo();
    this.jugador = new Jugador("Jugador");
    this.dealer = new Jugador("Dealer");

    this.estado = "menu";
    this.mensajeResultado = "";
  }

  mostrar() {
    background(0);

    switch (this.estado) {
      case "menu": this.pantallaMenu(); break;
      case "instrucciones": this.pantallaInstrucciones(); break;
      case "creditos": this.pantallaCreditos(); break;
      case "jugando": this.pantallaJuego(); break;
      case "resultado": this.pantallaResultado(); break;
    }
  }


  pantallaMenu() {
    image(fondoMenu, 0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);

    this.boton(220, 200, 200, 50, "JUGAR");
    this.boton(220, 270, 200, 50, "INSTRUCCIONES");
    this.boton(220, 340, 200, 50, "CRÉDITOS");
  }

  pantallaInstrucciones() {
    background(20);
    fill(255);
    textAlign(CENTER, TOP);
    textSize(24);
    text("INSTRUCCIONES", width/2, 40);

    textSize(16);
    text("El objetivo es llegar a 21 sin pasarte.\n\n" +
         "Pedir te suma una carta.\n" +
         "Plantarse deja que juegue el dealer.\n" +
         "Figuras valen 10.\n" +
         "Gana quien esté más cerca de 21.", width/2, 120);

    this.boton(220, 380, 200, 50, "VOLVER");
  }

  pantallaCreditos() {
    background(30);
    fill(255);
    textAlign(CENTER, TOP);
    textSize(24);
    text("CRÉDITOS", width/2, 60);

    textSize(16);
    text("Desarrollado por:\nIrene Ponce y Lucas Fernandez Ballarre\n\n" +
         "FBA - UNLP\nMateria: PMIW", width/2, 150);

    this.boton(220, 380, 200, 50, "VOLVER");
  }

  pantallaJuego() {
    this.mesa.mostrar();
    this.jugador.mostrar();
    this.dealer.mostrar();

    fill(255);
    textAlign(LEFT, TOP);
    textSize(18);
    text("Tus puntos: " + this.jugador.calcularPuntos(), 20, 240);
    text("Puntos dealer: " + this.dealer.calcularPuntos(), 20, 40);

    this.boton(160, 420, 150, 40, "PEDIR");
    this.boton(320, 420, 150, 40, "PLANTARSE");
  }

 pantallaResultado() {

  if (this.mensajeResultado.includes("GANASTE")) {
    background(0, 180, 0);
  } 
  else if (this.mensajeResultado.includes("PERDISTE")) {
    background(180, 0, 0);
  } 
  else {
    background(200, 180, 0);
  }

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(this.mensajeResultado, width/2, 150);

  this.boton(220, 260, 200, 50, "REPARTIR DE NUEVO");
  this.boton(220, 330, 200, 50, "MENU PRINCIPAL");
}



  repartir() {
    this.mazo = new Mazo();
    this.jugador.mano = [];
    this.dealer.mano = [];

    this.jugador.agregarCarta(this.mazo.repartirCarta());
    this.dealer.agregarCarta(this.mazo.repartirCarta());
    this.jugador.agregarCarta(this.mazo.repartirCarta());
    this.dealer.agregarCarta(this.mazo.repartirCarta());

    audioClick.play();

    this.estado = "jugando";
  }

  pedirCarta() {
    this.jugador.agregarCarta(this.mazo.repartirCarta());

    if (this.jugador.calcularPuntos() > 21) {
      this.mensajeResultado = "¡Te pasaste, PERDISTE!";
      this.estado = "resultado";
    }
  }

  plantarse() {
    while (this.dealer.calcularPuntos() < 17) {
      this.dealer.agregarCarta(this.mazo.repartirCarta());
    }

    let pj = this.jugador.calcularPuntos();
    let pd = this.dealer.calcularPuntos();

    if (pd > 21 || pj > pd) this.mensajeResultado = "¡GANASTE!";
    else if (pj === pd) this.mensajeResultado = "¡EMPATE!";
    else this.mensajeResultado = "¡PERDISTE!";

    this.estado = "resultado";
  }


  boton(x, y, w, h, texto) {
    fill(40);
    rect(x, y, w, h, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(texto, x + w/2, y + h/2);
  }

  clickEnBoton(mx, my) {

    if (this.estado === "menu") {
      if (this.clickDentro(mx,my,220,200,200,50)) this.repartir();
      if (this.clickDentro(mx,my,220,270,200,50)) this.estado = "instrucciones";
      if (this.clickDentro(mx,my,220,340,200,50)) this.estado = "creditos";
    }

    if (this.estado === "instrucciones" || this.estado === "creditos") {
      if (this.clickDentro(mx,my,220,380,200,50)) this.estado = "menu";
    }

    if (this.estado === "jugando") {
      if (this.clickDentro(mx,my,160,420,150,40)) this.pedirCarta();
      if (this.clickDentro(mx,my,320,420,150,40)) this.plantarse();
    }

    if (this.estado === "resultado") {
      if (this.clickDentro(mx,my,220,260,200,50)) this.repartir();
      if (this.clickDentro(mx,my,220,330,200,50)) this.estado = "menu";
    }
  }

  clickDentro(mx, my, x, y, w, h) {
    return mx > x && mx < x+w && my > y && my < y+h;
  }
}
