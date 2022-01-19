
// ---------------------------
//   DECLARACIÓN DE VARIABLES
// ---------------------------

let nombreJugador = "";
let numerosTotales = 15; // la cantidad total de números que pueden salir
let numeroFilas = 2; // número de filas de cada cartón
let numerosPorFila = 3;
let numerosPorCarton = numeroFilas * numerosPorFila; // la cantidad de números que hay por cartón
let errorImportante = (numerosPorCarton>numerosTotales); // no se puede tener más números por cartón que números totales

let numeroJugadoresRanking = 10; // número de filas del ránking
let puntuacionAleatoriaTope = 1000;
let puntuacionMaximaPorPartida = puntuacionAleatoriaTope;
let numeroMaximoDeTurnos = numerosTotales;
let numeroMinimoDeTurnos = numerosPorCarton;
let puntuacionPorTurnoPerdido = Math.trunc(puntuacionMaximaPorPartida / (numeroMaximoDeTurnos - numeroMinimoDeTurnos));
let puntuacionPorFilaCompletada = puntuacionPorTurnoPerdido;
let puntuacionJugador = puntuacionAleatoriaTope;

let abandonarJuego = false;
let nuevaPartida = true;

//--------------------------------------------------
//    CLASES
//--------------------------------------------------

   // se genera una clase turno que contiene el número de turno y un array con todos los números que se dirán en un orden determinado
   class ClaseTurno {
     constructor(){
	   this.numTurno = 0;
       this.arrayTurnos = [];
	   this.numeroMaximoDeTurnos = numerosTotales;
	 }
	   
	 iniciarTurno() {
	   this.numTurno=0;
	   this.generarArrayTurnos();
	 }
	 turnoActual(){return this.numTurno;}
	 incrementarTurno(){this.numTurno++;}
	 esTurnoUltimoNumero() {if (this.numTurno===this.numeroMaximoDeTurnos) {return true;} else {return false;}}
	 generarArrayTurnos(){
		let array1 = [];
		this.arrayTurnos = [];
		for (let i=1; i<=this.numeroMaximoDeTurnos; i++){
		  array1.push(i);
		}
		while (array1.length>0) {
		  let min = 0;
		  let max = array1.length;
		  let numAleatorio = Math.floor(Math.random() * (max - min)) + min;
		  let elementoQuitado = array1.splice(numAleatorio, 1)[0]; // devuelve un array de 1 elemento
		  this.arrayTurnos.push(elementoQuitado);
		}
	 }
	 numeroGenerado(){return this.arrayTurnos[this.numTurno];}
   }

   class ClaseCarton {
	  constructor(){
		this.numeros = [];
		this.numFilas = numeroFilas;
		this.numPorFila = numerosPorFila;
		this.numerosEsteCarton = numerosPorCarton;
		this.cantidadNumerosTotales = numerosTotales;
		this.seHaCantadoLineaYa = false;
	  }	
	
	  generarNuevoCarton(){
		  if (this.numerosEsteCarton>this.cantidadNumerosTotales){
		   this.numeros = [];
		  } else {
			  let array1 = [];
			  this.numeros = [];
			  for (let i=1; i<=this.cantidadNumerosTotales; i++){
				array1.push(i);
			  }
			  let quedan = this.numerosEsteCarton;
			  let contadorI = 0; // contador de columnas
			  let contadorJ = 0; // contador de filas
			  let aux = [];
			  while (quedan>0) {
				let min = 0;
				let max = array1.length;
				let numAleatorio = Math.floor(Math.random() * (max - min)) + min;
				let elementoQuitado = array1.splice(numAleatorio, 1)[0]; // devuelve un array de 1 elemento
				const parIndividual = {};
				parIndividual.numero = elementoQuitado;
				parIndividual.acertado = false;
				
				if (contadorJ < this.numFilas) {
					if (contadorI < this.numPorFila) {
						aux.push(parIndividual);
						contadorI++;
					} else {
						if (contadorI===this.numPorFila){
							contadorI = 0;
							this.numeros.push(aux);
							aux = [];
							aux.push(parIndividual);
							contadorJ++;
							contadorI++;
						}
					}
				}
				quedan--;
			  }
			  this.numeros.push(aux);
		  }
	  }
	  
	  marcarNumeroSiAcertado(valor){
		let acertado = false;  
        for (let j=0; j<this.numFilas;j++){ 		  
			for (let i=0; i<this.numPorFila;i++){
			  if (this.numeros[j][i].numero===valor) {
				  this.numeros[j][i].acertado = true;
				  acertado = true;
				  console.log("¡HA ACERTADO ESTE NÚMERO!"); 
				  return acertado;
				  break;
			  }
			}	  
		}
		return acertado;
	  }
	  
	  hayFilaCompleta(){
		let filaCompleta = true;  
        for (let j=0; j<this.numFilas;j++){
			filaCompleta = true;
			for (let i=0; i<this.numPorFila;i++){
			  if (this.numeros[j][i].acertado===false) {
				  filaCompleta = false;
				  break;
			  }
			}
			if (filaCompleta===true) {
			  this.seHaCantadoLineaYa=true;
 			  return filaCompleta;
			}
		}
		return filaCompleta;
	  }
	  
	  hayCartonCompleto(){
	  let cartonCompleto = true;
	  for (let j=0; j<this.numFilas;j++){
		  for (let i=0; i<this.numPorFila;i++){
			  if (this.numeros[j][i].acertado===false){
				  cartonCompleto = false; 
				  break; 
			  } 
			}
	  }	
		return cartonCompleto;
	  }
	  
/*	  mostrarCartonEnTabla(){
		console.table(this.numeros[0]);
		console.table(this.numeros[1]);
	  }*/
	  
	  mostrarCartonEnConsola(){
		console.log("----------------------------------------");
		let cadena = "";  
		for (let j=0; j<this.numFilas; j++) {
			for (let i=0; i<this.numPorFila;i++){
				if (this.numeros[j][i].acertado===true) {
				  cadena += "X";	
				} else {
				  cadena += (this.numeros[j][i].numero);	
				}
				cadena += "\t";
			}
		cadena += "\n";
		}
		console.log("ESTE ES SU CARTÓN:");
		console.log("----------------------------------------");
		console.log(cadena);
		console.log("----------------------------------------");
	  }
   }		  

   class ClaseRanking {
     constructor(){
       this.arrayRanking = [];
	 }

	 // escoge y devuelve un nombre de una lista de nombres aleatoriamente
    nombreJugadorAleatorio(){
		const nombres = ["Josep", "Juan", "María", "Marta", "Mireia", "Luisa", "Carmen", "Felipe", "Jaime", "Clara", 
						 "Elísabeth", "Juanjo", "Miguel", "Rosa", "Montse", "Elena", "Eli", "Mayte", "Roberto", "Antonio", 
						 "Esther", "Enrique", "Rubén", "Teresa", "Isabel", "Cristina", "Román", "Miguel Ángel", "Rafael", 
						 "Sara", "Blanca", "Carmina", "Alfonso", "Raúl"];
		let indiceAleatorio = Math.floor(Math.random() * (nombres.length - 0)) + 0;
		return nombres[indiceAleatorio];
    }
	
	// genera una puntuación aleatoria entre 1 y numeroMaximo
	puntuacionAleatoria(numeroMaximo){
		return Math.floor(Math.random() * (numeroMaximo)) + 1;
	}
	
	generarArrayRanking(){
	  this.arrayRanking = [];
	  for (let i=0; i<numeroJugadoresRanking; i++){
	    const jugador = {};
		jugador.nombre = this.nombreJugadorAleatorio();
		jugador.puntos = this.puntuacionAleatoria(puntuacionAleatoriaTope);
		this.arrayRanking.push(jugador);
	  }
	  this.ordenarRanking();
	}
	
	ordenarRanking(){
	  this.arrayRanking.sort(function(a, b) {
  	  return b.puntos - a.puntos;
      });		
	}
	
	mostrarRanking(){
      console.log("----------------------------------------");
      console.log("------- RÁNKING DE PUNTUACIONES --------");
      console.log("----------------------------------------");
	  for (let i=0; i<this.arrayRanking.length; i++){
	    console.log("PUNTOS: ", this.arrayRanking[i].puntos, "\t ---> ", "JUGADOR", this.arrayRanking[i].nombre);
	  }
	}
	
	añadirPartidaAlRanking(nombre, puntos){
	  const jugador = {};
	  jugador.nombre = nombre;
	  jugador.puntos = puntos;
	  this.arrayRanking.push(jugador);
      this.ordenarRanking();
	  this.arrayRanking.pop();
	}
   }
			
// ---------------------------
//   CÓDIGO PRINCIPAL
// ---------------------------

// el error importante está solo por si a alguien se le ocurre modificar los valores iniciales y pone un número de turnos mayor que la cantidad de números que se juegan
if (!(errorImportante)) {
	// crea ránking de usuarios con puntuaciones aleatorias usuarioPuntos {nombre:..., puntos:...}
	// el ránking tendrá 'numeroJugadoresRanking' valores como máximo
	let ranking = new ClaseRanking();
	ranking.generarArrayRanking();

	//5 do // se inicia abandonarJuego = false
	abandonarJuego = false;
	do { //5
		// pregunta el nombre del jugador y da la bienvenida
		do { 
		  nombreJugador = prompt("POR FAVOR, ESCRIBA SU NOMBRE (O PULSE 'ESC' PARA SALIR):");
		  if (nombreJugador===null) {break;}
		} while ((nombreJugador==="")||(sonTodoEspacios(nombreJugador)))
		if (!(nombreJugador===null)) {
			// da la bienvenida al jugador	
			alert ("¡BIENVENIDO AL BINGO, " + nombreJugador + "!");
			// se informa sobre el sistema de puntos al usuario (a menos turnos, más puntuación)
			alert ("ESTE ES EL SISTEMA DE PUNTOS:\nEMPIEZA CON UNA PUNTUACIÓN DE " + puntuacionMaximaPorPartida 
				   + " PUNTOS,\nPERO CADA VEZ QUE NO ACIERTE UN NÚMERO, SE LE DESCONTARÁN " + puntuacionPorTurnoPerdido + " PUNTOS.\n" + 
				   "SIN EMBARGO, CUANDO COMPLETE UNA FILA POR PRIMERA VEZ, GANARÁ " + puntuacionPorFilaCompletada + " PUNTOS EXTRA.");
			
			do { // PARA NUEVA PARTIDA
			
				// pregunta si desea jugar una nueva partida  
				nuevaPartida = confirm("¿DESEA JUGAR UNA NUEVA PARTIDA?");
				// si se escoge nueva partida, mostrará cartones hasta que nos parezca bien el que se ha generado
				if (nuevaPartida===true){
					const carton = new ClaseCarton();  
					do { //3 PARA ACEPTAR EL CARTÓN
						  
					  carton.generarNuevoCarton();
					  carton.mostrarCartonEnConsola();

					  puntuacionJugador = puntuacionAleatoriaTope;
					  
					  // se pregunta si se quiere ese cartón u otro 
					  // aquí se podría poner un prompt con la opción de 's' o 'n' para poder salir con 'Esc' por ser null
					  cartonAceptado = confirm ("¿LE PARECE BIEN ESTE CARTÓN?\nSI NO ACEPTA, SE GENERARÁ OTRO.");
					  
					} while (cartonAceptado===false)//3 hasta que se acepte el cartón
					
					const turno = new ClaseTurno();
					turno.iniciarTurno();
					
					let siguenLosTurnos=true;
					do { //1 PARA JUGAR UN NUEVO TURNO
						  nuevoTurno = confirm("¿DESEA JUGAR UN NUEVO TURNO?");
						  console.log("----------------------------------------");
						  if (nuevoTurno===true) {
							  console.log("EL NÚMERO GENERADO ES: " + turno.numeroGenerado());
							  if (!(carton.marcarNumeroSiAcertado(turno.numeroGenerado())===true)) {
									 puntuacionJugador -= puntuacionPorTurnoPerdido;
									 console.log("LO SENTIMOS. HA PERDIDO ", puntuacionPorTurnoPerdido, " PUNTOS.");
							  }
							  carton.mostrarCartonEnConsola();
							  if (carton.hayCartonCompleto()) {
								  console.log("¡¡HA CANTADO BINGO!!");
								  console.log("LE HA COSTADO ", (turno.numTurno + 1), " TURNOS LLEGAR AL BINGO. HA OBTENIDO ", puntuacionJugador, "PUNTOS."); 
								  // aquí se añade al jungador y los puntos obtenidos al ránquing
								  ranking.añadirPartidaAlRanking(nombreJugador, puntuacionJugador);
								  // aquí se mostrarán los resultados del ránquing ordenados
								  ranking.mostrarRanking();							  
								  siguenLosTurnos=false;
								  console.log("----------------------------------------");
								  console.log("---------- FINAL DE PARTIDA ------------");
								  console.log("----------------------------------------");
							  } else { // si no se ha cantado BINGO, puede que haya cantado línea
								  if (carton.seHaCantadoLineaYa===false){
									  if (carton.hayFilaCompleta()){
										puntuacionJugador += puntuacionPorFilaCompletada; // se le suman 100 puntos por cantar línea
									    console.log("¡¡TIENE UNA FILA COMPLETA!!"); 
										console.log("HA GANADO USTED " + puntuacionPorFilaCompletada + " PUNTOS EXTRA.");
								      }
								  }
							  }
							  turno.incrementarTurno();

							} else {
								// si no se quieren más turnos
								siguenLosTurnos=false;
								console.log("----------------------------------------");
								console.log("YA NO QUIERE SEGUIR JUGANDO,");
								console.log("POR TANTO NO ENTRA EN EL RÁNQUING");
								console.log("----------------------------------------");
							}
						  
					} while (siguenLosTurnos===true)
					
				}
			
			} while (nuevaPartida===true)
		  
		} else {
			alert ("HASTA PRONTO. CUANDO DESEE JUGAR, YA SABE DÓNDE ESTAMOS.");	
			abandonarJuego=true;
		}

	} while (abandonarJuego===false) //5
} else {
	alert("NO SE PUEDE JUGAR SI LA CANTIDAD DE NÚMEROS DE LOS CARTONES\nES MAYOR QUE LA CANTIDAD DE  NÚMEROS QUE SE CANTAN");
}

// -----------------------------------------------------
// ------------------ FUNCIONES ------------------------
// -----------------------------------------------------

// comprueba si un string son todo espacios; devuelve false si hay algún carácter que no sea espacio; 
// devuelve true si todo son espacios
function sonTodoEspacios(cadena){
  let todoEspacios = true;
  for (let i=0; i<cadena.length; i++){
    if (!(cadena[i]===" ")) {todoEspacios = false; break;} 
  }
  return todoEspacios;
}

