
// ------------------------------------
//   DECLARACIÓN DE VARIABLES GLOBALES
// ------------------------------------

let numeroJugadoresRanking = 10; // número de filas del ránking de puntuaciones
let numeroDePreguntas = 27; // aquí se puede poner menos para probar el juego, pero también hay que convertir en comentarios el número de palabras del array de palabras apropiado
let seguirJugando=true;
let seguirPidiendoNombre=true;
let seguirPreguntandoNuevaPartida=true;
let nombre = "";
let nuevaPartida = true;
let seguirPidiendoPalabra=true;
let numeroPalabrasPorLetra = 3; // número de definiciones que habrá para cada letra; en este ejemplo se han utilizado tres palabras con sus definiciones

//--------------------------------------------------
//    CLASES
//--------------------------------------------------



class ClaseJugador {
	constructor(){
		this.nombreJugador = "";
		this.puntos = 0;
		this.juego = "PASAPALABRA"
	}
	
	crearJugador(nombre){
		this.nombreJugador = nombre;
	}
	
	saludarJugador() {
		// pregunta el nombre del jugador y da la bienvenida
		alert ("¡BIENVENIDO AL " + this.juego + ", " + this.nombreJugador + "!");
	}
}


class ClaseJuego {
	constructor(){
		this.posicionRonda = 0; //la posición dentro del array
		this.numeroDeLetrasCompletadas = 0;
		this.numeroDePalabrasAcertadas = 0;
		this.numeroDePalabrasFalladas = 0;
		this.arrayPalabrasEscogidasParaCadaLetra = []; // array donde se guardará el número de palabra que saldrá en cada ronda (como hay 3 palabras, será 0, 1 o 2)
		// estado (0=no respondida / 1=acertada / 2=fallada)
		this.preguntas = [ 
			{ letra: "a", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien.", respuesta: "abducir"},
															  {pregunta: "CON LA A. Limpieza, curiosidad.", respuesta: "aseo"},
															  {pregunta: "CON LA A. Artificio o astucia para engañar a alguien, o para otro fin.", respuesta: "artimaña"}
												  ]},
			{ letra: "b", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso.", respuesta: "bingo"},
															  {pregunta: "CON LA B. Escobilla de cerda atada al extremo de una varita o mango, que sirve para pintar y también para otros usos.", respuesta: "brocha"},
														  	  {pregunta: "CON LA B. Esquivar a quien va a impedir el paso o a detenerlo.", respuesta: "burlar"}
												  ]},
			{ letra: "c", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA C. Delito grave.", respuesta: "crimen"},
															  {pregunta: "CON LA C. Guisar, aderezar los alimentos. ", respuesta: "cocinar"},
															  {pregunta: "CON LA C. Niño recién nacido o de poco tiempo.", respuesta: "criatura"}
												  ]},
			{ letra: "d", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida.", respuesta: "diarrea"},
															  {pregunta: "CON LA D. Estar en aquel reposo que consiste en la inacción o suspensión de los sentidos y de todo movimiento voluntario. ", respuesta: "dormir"},
												   			  {pregunta: "CON LA D. Alegre, festivo y de buen humor.", respuesta: "divertido"}
												  ]},
			{ letra: "e", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación.", respuesta: "ectoplasma"},
												   			  {pregunta: "CON LA E. Respiración anhelosa, generalmente ronca o silbante, propia de la agonía y del coma.", respuesta: "estertor"},
												   			  {pregunta: "CON LA E. Dicho o conjunto de palabras de sentido artificiosamente encubierto para que sea difícil entenderlo o interpretarlo.", respuesta: "enigma"}
												  ]},
			{ letra: "f", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad.", respuesta: "fácil"},
												   			  {pregunta: "CON LA F. Usual, común.", respuesta: "frecuente"},
												   			  {pregunta: "CON LA F. oscilar, crecer y disminuir alternativamente.", respuesta: "fluctuar"}
												  ]},
			{ letra: "g", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas.", respuesta: "galaxia"},
												   			  {pregunta: "CON LA G. Pluralidad de seres o cosas que forman un conjunto, material o mentalmente considerado.", respuesta: "grupo"},
												   			  {pregunta: "CON LA G. Dicho de juegos, batallas, oposiciones, pleitos, etc., obtener lo que en ellos se disputa.", respuesta: "ganar"}
												  ]},
			{ letra: "h", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA H. Suicidio ritual japonés por desentrañamiento.", respuesta: "harakiri"},
												   			  {pregunta: "CON LA H. Escarbar entre varias cosas.", respuesta: "hurgar"},
												   			  {pregunta: "CON LA H. Perteneciente al hombre o propio de él.", respuesta: "humano"}
												  ]},
			{ letra: "i", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA I. Templo cristiano.", respuesta: "Iglesia"},
												   			  {pregunta: "CON LA I. Libre de culpa.", respuesta: "inocente"},
												   			  {pregunta: "CON LA I. Dícese de la persona recta, proba, intachable.", respuesta: "íntegro"}
												  ]},
			{ letra: "j", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba.", respuesta: "jabalí"},
												   			  {pregunta: "CON LA J. Superior o cabeza de un cuerpo u oficio.", respuesta: "jefe"},
												   			  {pregunta: "CON LA J. Unir unas cosas con otras.", respuesta: "juntar"}
												  ]},
			{ letra: "k", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA K. Persona que se juega la vida realizando una acción temeraria.", respuesta: "kamikaze"},
												   			  {pregunta: "CON LA K. Leche fermentada artificialmente y que contiene ácido láctico, alcohol y ácido carbónico.", respuesta: "kéfir"},
												   			  {pregunta: "CON LA K. Título de algunos emperadores de Alemania.", respuesta: "káiser"}
												  ]},
			{ letra: "l", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA L. Hombre lobo.", respuesta: "licántropo"},
												   			  {pregunta: "CON LA L. Que tiene facultad para obrar o no obrar.", respuesta: "libre"},
												   			  {pregunta: "CON LA L. Que habla mucho o demasiado.", respuesta: "locuaz"}
												  ]},
			{ letra: "m", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas.", respuesta: "misántropo"},
												   			  {pregunta: "CON LA M. Traslación que se hace de una casa o de una habitación a otra.", respuesta: "mudanza"},
												   			  {pregunta: "CON LA M. Cantidad muy grande, pero indefinida.", respuesta: "miríada"}
												  ]},
			{ letra: "n", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA N. Demostración de poca inteligencia.", respuesta: "necedad"},
												   			  {pregunta: "CON LA N. Mortificación o gangrena de los tejidos del organismo. Se dice principalmente hablando del tejido óseo.", respuesta: "necrosis"},
												   			  {pregunta: "CON LA N. Limpio, terso, claro, puro, resplandeciente.", respuesta: "nítido"}
												  ]},
			{ letra: "ñ", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", respuesta: "señal"},
												   			  {pregunta: "CONTIENE LA Ñ. Que pide con frecuencia e importunidad", respuesta: "pedigüeño"},
												   			  {pregunta: "CONTIENE LA Ñ. Tela de lana muy tupida y con pelo tanto más corto cuanto más fino es el tejido.", respuesta: "paño"}
												  ]},
			{ letra: "o", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien.", respuesta: "orco"},
												   			  {pregunta: "CON LA O. Grueso, gordo.", respuesta: "orondo"},
												   			  {pregunta: "CON LA O. Bola o lío que se forma devanando hilo de lino, algodón, seda, lana, etc.", respuesta: "ovillo"}
												  ]},
			{ letra: "p", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA P. Falto de ánimo y valor para tolerar las desgracias o para intentar cosas grandes.", respuesta: "pusilánime"},
												   			  {pregunta: "CON LA P. Bolita que se hace mezclando un medicamento con un excipiente adecuado para ser administrado por vía oral.", respuesta: "píldora"},
												   			  {pregunta: "CON LA P. Hoja de tocino entreverada con magro.", respuesta: "panceta"}
												  ]},
			{ letra: "q", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche.", respuesta: "queso"},
												   			  {pregunta: "CON LA Q. Bebida caliente, originaria de Galicia, que se prepara quemando aguardiente de orujo con limón y azúcar.", respuesta: "queimada"},
												   			  {pregunta: "CON LA Q. Que no tiene o no hace movimiento.", respuesta: "quieto"}
												  ]},
			{ letra: "r", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA R. Roedor.", respuesta: "ratón"},
												   			  {pregunta: "CON LA R. Ostentoso, llamativo.", respuesta: "rimbombante"},
												   			  {pregunta: "CON LA R. Hombre sin honor, perverso, despreciable.", respuesta: "rufián"}
												  ]},
			{ letra: "s", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA S. Comunidad salvadora de todo desarrollador informático.", respuesta: "Stackoverflow"},
												   			  {pregunta: "CON LA S. Astucia o disimulo acompañados de burla encubierta.", respuesta: "socarronería"},
												   			  {pregunta: "CON LA S. Restituir a uno la salud que había perdido.", respuesta: "sanar"}
												  ]},
			{ letra: "t", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984.", respuesta: "terminator"},
												   			  {pregunta: "CON LA T. Desorden y camorra entre varias personas.", respuesta: "trifulca"},
												   			  {pregunta: "CON LA T. Esfuerzo humano aplicado a la producción de riqueza.", respuesta: "trabajo"}
												  ]},
			{ letra: "u", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914.", respuesta: "Unamuno"},
												   			  {pregunta: "CON LA U. Igual, conforme, semejante.", respuesta: "uniforme"},
												   			  {pregunta: "CON LA U. Producir sonido el viento.", respuesta: "ulular"}
												  ]},
			{ letra: "v", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa.", respuesta: "vikingos"},
												   			  {pregunta: "CON LA V. Trastorno del sentido del equilibrio caracterizado por una sensación de movimiento rotatorio del cuerpo o de los objetos que lo rodean.", respuesta: "vértigo"},
												   			  {pregunta: "CON LA V. Descanso temporal de una actividad habitual, principalmente del trabajo remunerado o de los estudios.", respuesta: "vacaciones"}
												  ]},
			{ letra: "w", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso.", respuesta: "sándwich"},
												   			  {pregunta: "CONTIENE LA W. Fruta con pulpa de color verde y a la que se le atribuye mucha vitamina C.", respuesta: "kiwi"},
												   			  {pregunta: "CONTIENE LA W. Compositor alemán responsable de 'El anillo de los Nibelungos'", respuesta: "Wagner"}
												  ]},
			{ letra: "x", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética.", respuesta: "bótox"},
												   			  {pregunta: "CONTIENE LA X. Suspensión o dificultad en la respiración.", respuesta: "asfixia"},
												   			  {pregunta: "CONTIENE LA X. Conjuro contra el espíritu maligno", respuesta: "exorcismo"}
												  ]},
			{ letra: "y", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos.", respuesta: "peyote"},
												   			  {pregunta: "CONTIENE LA Y. Consorte, marido y mujer respectivamente.", respuesta: "cónyuge"},
												   			  {pregunta: "CONTIENE LA Y. Relación de sucesos que tienen más de tradicionales o maravillosos que de históricos o verdaderos.", respuesta: "leyenda"}
												  ]},
			{ letra: "z", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional.", respuesta: "zen"},
												   			  {pregunta: "CON LA Z. Buscar o seguir a las aves, fieras y otras muchas clases de animales para cobrarlos o matarlos.", respuesta: "cazar"},
												   			  {pregunta: "CON LA Z. Principio, origen y raíz de una cosa.", respuesta: "comienzo"}
												  ]}
		];
		
	}
	
	generarRondaPalabras(){
		for (let i=0; i<this.preguntas.length; i++){
			let min = 0;
			let max = numeroPalabrasPorLetra;
			let numAleatorio = Math.floor(Math.random() * (max - min)) + min;
			this.arrayPalabrasEscogidasParaCadaLetra.push(numAleatorio);
			//this.preguntas.escogida = numAleatorio;
		}
	}

	esPalabraNoRespondida() {return (this.preguntas[this.posicionRonda].estado===0);}

	esPalabraAcertada() {return (this.preguntas[this.posicionRonda].estado===1);}

	esPalabraFallada() {return (this.preguntas[this.posicionRonda].estado===2);}
	
	estaElRoscoCompletado(){
		let roscoCompletado = (this.numeroDeLetrasCompletadas===this.preguntas.length);
		return roscoCompletado;
	}
	
	siguienteLetra(){
		this.posicionRonda++;
		if (this.posicionRonda===this.preguntas.length){
			this.posicionRonda=0;
		}
	}
	
	iniciarPartida(){
	    this.generarRondaPalabras();
	}
	
	pedirPalabra(){
		let respuesta = "";
		let otraPalabraMas = true;
		
			if (this.esPalabraNoRespondida()){
				do { 
				  let posicionActual = this.posicionRonda;
				  let preguntaDe3 = this.arrayPalabrasEscogidasParaCadaLetra[posicionActual]; // devuelve 0, 1 o 2 para escoger la pregunta concreta
				  console.log(this.preguntas[posicionActual].arrayPreguntaRespuesta[preguntaDe3].pregunta);
				  respuesta = prompt("POR FAVOR, RESPONDA A LA PREGUNTA HECHA EN LA CONSOLA.\nESCRIBA UNA SOLA PALABRA PARA RESPONDER O 'END' SI QUIERE SALIR.");
				  if (respuesta===null) {
					 otraPalabraMas=false;
					 break;
				  }
				} while ((respuesta==="")||(sonTodoEspacios(respuesta)))
				if (!(respuesta===null)) {
					respuesta = respuesta.toLowerCase();
					if (respuesta==="end"){
						otraPalabraMas=false;
					} else {
					  if (!(respuesta==="pasapalabra"))	{
						let posicionActual = this.posicionRonda;  
						let preguntaDe3 = this.arrayPalabrasEscogidasParaCadaLetra[posicionActual]; // devuelve 0, 1 o 2 para escoger la pregunta concreta  
						if (respuesta===this.preguntas[posicionActual].arrayPreguntaRespuesta[preguntaDe3].respuesta) { // si acierta
							console.log("HA ACERTADO. ERA: ", this.preguntas[posicionActual].arrayPreguntaRespuesta[preguntaDe3].respuesta.toUpperCase());
							this.numeroDeLetrasCompletadas++;
							this.numeroDePalabrasAcertadas++;
							console.log("LETRAS ACERTADAS: ", this.numeroDePalabrasAcertadas);
							console.log("-----------------------------------------------");
							// se actualiza el estado
							this.preguntas[this.posicionRonda].estado = 1;
						
						} else { // si falla
							console.log("HA FALLADO. LA RESPUESTA ERA ---> ", this.preguntas[posicionActual].arrayPreguntaRespuesta[preguntaDe3].respuesta.toUpperCase());
							this.numeroDeLetrasCompletadas++;
							this.numeroDePalabrasFalladas++;
							console.log("LETRAS ACERTADAS: ", this.numeroDePalabrasAcertadas);
							console.log("-----------------------------------------------");
							// se actualiza el estado
							this.preguntas[this.posicionRonda].estado = 2;
						}
					  } else {
						  console.log("HA PASADO A LA SIGUIENTE LETRA.");
						  console.log("-----------------------------------------------");
						  
					  }
					  this.siguienteLetra();
					}
					
					
				}

			} else {
				this.siguienteLetra();
			}
		
		return otraPalabraMas;
	}

	mostrarResultados(){
		if (this.numeroDePalabrasAcertadas===1){console.log("HA ACERTADO: " + this.numeroDePalabrasAcertadas + " LETRA.");} else {console.log("HA ACERTADO: " + this.numeroDePalabrasAcertadas + " LETRAS.");}
		if (this.numeroDePalabrasFalladas===1){console.log("HA FALLADO: " + this.numeroDePalabrasFalladas + " LETRA.");} else {console.log("HA FALLADO: " + this.numeroDePalabrasFalladas + " LETRAS.");}
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
	
	generarArrayRanking(puntuacionMaxima){
	  this.arrayRanking = [];
	  for (let i=0; i<numeroJugadoresRanking; i++){
	    const jugador = {};
		jugador.nombre = this.nombreJugadorAleatorio();
		jugador.puntos = this.puntuacionAleatoria(puntuacionMaxima);
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
	    console.log("ACIERTOS: ", this.arrayRanking[i].puntos, "\t ---> ", "JUGADOR", this.arrayRanking[i].nombre);
	  }
      console.log("----------------------------------------");
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

	
	// crea ránking de usuarios con puntuaciones aleatorias usuarioPuntos {nombre:..., puntos:...}
	// el ránking tendrá 'numeroJugadoresRanking' valores como máximo
	let ranking = new ClaseRanking();
	ranking.generarArrayRanking(numeroDePreguntas);
	// crea un jugador nuevo
	let jugador = new ClaseJugador();

	do {
		seguirJugando=true;
		
		do {	
			seguirPidiendoNombre=true;
			nombre = prompt("POR FAVOR, ESCRIBA SU NOMBRE (O PULSE 'ESC' PARA SALIR):");
			if (nombre===null) {
				seguirJugando=false;
				seguirPidiendoNombre=false;
			} else {
				if (!(nombre==="")&&(!sonTodoEspacios(nombre))){
					seguirPidiendoNombre=false;
					jugador.crearJugador(nombre.toUpperCase());
					jugador.saludarJugador();
				}
			}
		} while (seguirPidiendoNombre===true)
			
		if (seguirJugando===true) {
			
			do {
				seguirPreguntandoNuevaPartida=true;
				let nuevaPartida = confirm("¿DESEA JUGAR UNA NUEVA PARTIDA?");
				if (nuevaPartida===false){
					seguirPreguntandoNuevaPartida=false;
				} else {
					console.clear();
					// se crea el juego en sí para utilizar opciones habituales
					let juego = new ClaseJuego();
					juego.iniciarPartida();

					do {
						
						seguirPidiendoPalabra = juego.pedirPalabra();
						
						if (seguirPidiendoPalabra===false){
							alert("NO QUIERE SEGUIR JUGANDO.");
							console.log("HA INTERRUMPIDO EL JUEGO. ESTAS SON LAS PUNTUACIONES:");
							ranking.mostrarRanking();
						}
						
						if (juego.estaElRoscoCompletado()===true){
							console.log("HA RESPONDIDO A TODAS LAS PREGUNTAS DEL ROSCO Y HA TERMINADO LA PARTIDA.");
							console.log("ESTAS SON LAS PUNTUACIONES:");
							juego.mostrarResultados();
							ranking.añadirPartidaAlRanking(jugador.nombreJugador, juego.numeroDePalabrasAcertadas);
							ranking.mostrarRanking();
							seguirPidiendoPalabra=false;
						}						
						
					} while (seguirPidiendoPalabra===true)

				}

			} while (seguirPreguntandoNuevaPartida===true)

		}
				
	} while(seguirJugando===true)
	
	alert ("HASTA PRONTO. CUANDO DESEE JUGAR, YA SABE DÓNDE ESTAMOS.");


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

