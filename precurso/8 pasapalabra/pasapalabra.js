
//-------------------------------------------------------------------------------------------------------------------
//       VARIABLES
//-------------------------------------------------------------------------------------------------------------------

let numeroDePreguntas = 27; // 
let numeroPalabrasPorLetra = 3; // número de definiciones que habrá para cada letra; en este ejemplo se han utilizado tres palabras con sus definiciones
let textoDefinicion = "";

let temporizador; // para el evento del TIMER
let posicionResiduo = 0; // sirve para limpiar el dibujo en la posición en la que se ha quedado la línea

let canvasRosco = document.querySelector("#rosco");
let elementoCanvasPaneles = canvasRosco.getContext("2d");

let canvasPaneles = document.querySelector("#marcadores");
let elementoCanvasRosco = canvasPaneles.getContext("2d");

let bienvenidos = document.querySelector("#bienvenidos");
let instrucciones = document.querySelector("#instrucciones");
let definicion = document.querySelector("#definicion");
let botonJugar = document.querySelector("#botonJugar");

let escribaLaPalabra = document.querySelector("#escribaLaPalabra");
let definicionesPalabras = document.querySelector("#definicionesPalabras");
let mensajeFinal = document.querySelector("#mensajeFinal");
let resumenResultados = document.querySelector("#resumenResultados");

let botonRespuestaCorrecta = document.querySelector("#botonRespuestaCorrecta");

let campoPalabra = document.querySelector("#campoPalabra");
let botonOK = document.querySelector("#botonOK");
let botonPasapalabra = document.querySelector("#botonPasapalabra");
let botonAcabar = document.querySelector("#botonAcabar");

botonRespuestaCorrecta.addEventListener("click", volverADefiniciones);

botonJugar.addEventListener("click", activarTimer);
campoPalabra.addEventListener("keydown", detectarTecla); // cuando se pulse enter
botonOK.addEventListener("click", aceptarPalabraPorBotonOK);
botonPasapalabra.addEventListener("click", pasarPalabra);
botonAcabar.addEventListener("click", interrumpirTemporizador);

let alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let arco = 2*Math.PI/27; // está en radianes
let xOffset=250;
let yOffset=250;
let r=225;
let angulo;
let x, y;
let grd;

let valorTiempo = 200; // tiempo en segundos que durará el temporizador
let contadorTimer;


//---------------------------------------------------------------------------
//      CLASES
//---------------------------------------------------------------------------

class ClaseJuego {
	constructor(){
		this.posicionRonda = 0; //la posición dentro del array
		this.numeroDeLetrasCompletadas = 0;
		this.numeroDePalabrasAcertadas = 0;
		this.numeroDePalabrasFalladas = 0;
		this.arrayPalabrasEscogidasParaCadaLetra = []; // array donde se guardará el número de palabra que saldrá en cada ronda (como hay 3 palabras, será 0, 1 o 2)
		// estado (0=no respondida / 1=acertada / 2=fallada)
		this.preguntas = [ 
			{ letra: "a", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA A:<br>Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien.", respuesta: "abducir"},
															  {pregunta: "CON LA A:<br>Limpieza, curiosidad.", respuesta: "aseo"},
															  {pregunta: "CON LA A:<br>Artificio o astucia para engañar a alguien, o para otro fin.", respuesta: "artimaña"}
												  ]},
			{ letra: "b", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA B:<br>Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso.", respuesta: "bingo"},
															  {pregunta: "CON LA B:<br>Escobilla de cerda atada al extremo de una varita o mango, que sirve para pintar y también para otros usos.", respuesta: "brocha"},
														  	  {pregunta: "CON LA B:<br>Esquivar a quien va a impedir el paso o a detenerlo.", respuesta: "burlar"}
												  ]},
			{ letra: "c", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA C:<br>Delito grave.", respuesta: "crimen"},
															  {pregunta: "CON LA C:<br>Guisar, aderezar los alimentos.", respuesta: "cocinar"},
															  {pregunta: "CON LA C:<br>Niño recién nacido o de poco tiempo.", respuesta: "criatura"}
												  ]},
			{ letra: "d", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA D:<br>Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida.", respuesta: "diarrea"},
															  {pregunta: "CON LA D:<br>Estar en aquel reposo que consiste en la inacción o suspensión de los sentidos y de todo movimiento voluntario.", respuesta: "dormir"},
												   			  {pregunta: "CON LA D:<br>Alegre, festivo y de buen humor.", respuesta: "divertido"}
												  ]},
			{ letra: "e", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA E:<br>Gelatinoso y se encuentra debajo de la membrana plasmática:<br>Los cazafantasmas medían su radiación.", respuesta: "ectoplasma"},
												   			  {pregunta: "CON LA E:<br>Respiración anhelosa, generalmente ronca o silbante, propia de la agonía y del coma.", respuesta: "estertor"},
												   			  {pregunta: "CON LA E:<br>Dicho o conjunto de palabras de sentido artificiosamente encubierto para que sea difícil entenderlo o interpretarlo.", respuesta: "enigma"}
												  ]},
			{ letra: "f", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA F:<br>Que no requiere gran esfuerzo, capacidad o dificultad.", respuesta: "fácil"},
												   			  {pregunta: "CON LA F:<br>Usual, común.", respuesta: "frecuente"},
												   			  {pregunta: "CON LA F:<br>Oscilar, crecer y disminuir alternativamente.", respuesta: "fluctuar"}
												  ]},
			{ letra: "g", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA G:<br>Conjunto enorme de estrellas, polvo interestelar, gases y partículas.", respuesta: "galaxia"},
												   			  {pregunta: "CON LA G:<br>Pluralidad de seres o cosas que forman un conjunto, material o mentalmente considerado.", respuesta: "grupo"},
												   			  {pregunta: "CON LA G:<br>Dicho de juegos, batallas, oposiciones, pleitos, etc., obtener lo que en ellos se disputa.", respuesta: "ganar"}
												  ]},
			{ letra: "h", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA H:<br>Suicidio ritual japonés por desentrañamiento.", respuesta: "harakiri"},
												   			  {pregunta: "CON LA H:<br>Escarbar entre varias cosas.", respuesta: "hurgar"},
												   			  {pregunta: "CON LA H:<br>Perteneciente al hombre o propio de él.", respuesta: "humano"}
												  ]},
			{ letra: "i", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA I:<br>Templo cristiano.", respuesta: "iglesia"},
												   			  {pregunta: "CON LA I:<br>Libre de culpa.", respuesta: "inocente"},
												   			  {pregunta: "CON LA I:<br>Dícese de la persona recta, proba, intachable.", respuesta: "íntegra"}
												  ]},
			{ letra: "j", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA J:<br>Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba.", respuesta: "jabalí"},
												   			  {pregunta: "CON LA J:<br>Superior o cabeza de un cuerpo u oficio.", respuesta: "jefe"},
												   			  {pregunta: "CON LA J:<br>Unir unas cosas con otras.", respuesta: "juntar"}
												  ]},
			{ letra: "k", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA K:<br>Persona que se juega la vida realizando una acción temeraria.", respuesta: "kamikaze"},
												   			  {pregunta: "CON LA K:<br>Leche fermentada artificialmente y que contiene ácido láctico, alcohol y ácido carbónico.", respuesta: "kéfir"},
												   			  {pregunta: "CON LA K:<br>Título de algunos emperadores de Alemania.", respuesta: "káiser"}
												  ]},
			{ letra: "l", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA L:<br>Hombre lobo.", respuesta: "licántropo"},
												   			  {pregunta: "CON LA L:<br>Que tiene facultad para obrar o no obrar.", respuesta: "libre"},
												   			  {pregunta: "CON LA L:<br>Que habla mucho o demasiado.", respuesta: "locuaz"}
												  ]},
			{ letra: "m", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA M:<br>Persona que huye del trato con otras personas o siente gran aversión hacia ellas.", respuesta: "misántropo"},
												   			  {pregunta: "CON LA M:<br>Traslación que se hace de una casa o de una habitación a otra.", respuesta: "mudanza"},
												   			  {pregunta: "CON LA M:<br>Cantidad muy grande, pero indefinida.", respuesta: "miríada"}
												  ]},
			{ letra: "n", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA N:<br>Demostración de poca inteligencia.", respuesta: "necedad"},
												   			  {pregunta: "CON LA N:<br>Mortificación o gangrena de los tejidos del organismo. Se dice principalmente hablando del tejido óseo.", respuesta: "necrosis"},
												   			  {pregunta: "CON LA N:<br>Limpio, terso, claro, puro, resplandeciente.", respuesta: "nítido"}
												  ]},
			{ letra: "ñ", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CONTIENE LA Ñ:<br>Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", respuesta: "señal"},
												   			  {pregunta: "CONTIENE LA Ñ:<br>Que pide con frecuencia e importunidad", respuesta: "pedigüeño"},
												   			  {pregunta: "CONTIENE LA Ñ:<br>Tela de lana muy tupida y con pelo tanto más corto cuanto más fino es el tejido.", respuesta: "paño"}
												  ]},
			{ letra: "o", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA O:<br>Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien.", respuesta: "orco"},
												   			  {pregunta: "CON LA O:<br>Grueso, gordo.", respuesta: "orondo"},
												   			  {pregunta: "CON LA O:<br>Bola o lío que se forma devanando hilo de lino, algodón, seda, lana, etc.", respuesta: "ovillo"}
												  ]},
			{ letra: "p", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA P:<br>Falto de ánimo y valor para tolerar las desgracias o para intentar cosas grandes.", respuesta: "pusilánime"},
												   			  {pregunta: "CON LA P:<br>Bolita que se hace mezclando un medicamento con un excipiente adecuado para ser administrado por vía oral.", respuesta: "píldora"},
												   			  {pregunta: "CON LA P:<br>Hoja de tocino entreverada con magro.", respuesta: "panceta"}
												  ]},
			{ letra: "q", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA Q:<br>Producto obtenido por la maduración de la cuajada de la leche.", respuesta: "queso"},
												   			  {pregunta: "CON LA Q:<br>Bebida caliente, originaria de Galicia, que se prepara quemando aguardiente de orujo con limón y azúcar.", respuesta: "queimada"},
												   			  {pregunta: "CON LA Q:<br>Que no tiene o no hace movimiento.", respuesta: "quieto"}
												  ]},
			{ letra: "r", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA R:<br>Roedor.", respuesta: "ratón"},
												   			  {pregunta: "CON LA R:<br>Ostentoso, llamativo.", respuesta: "rimbombante"},
												   			  {pregunta: "CON LA R:<br>Hombre sin honor, perverso, despreciable.", respuesta: "rufián"}
												  ]},
			{ letra: "s", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA S:<br>Comunidad salvadora de todo desarrollador informático.", respuesta: "Stackoverflow"},
												   			  {pregunta: "CON LA S:<br>Astucia o disimulo acompañados de burla encubierta.", respuesta: "socarronería"},
												   			  {pregunta: "CON LA S:<br>Restituir a uno la salud que había perdido.", respuesta: "sanar"}
												  ]},
			{ letra: "t", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA T:<br>Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984.", respuesta: "terminator"},
												   			  {pregunta: "CON LA T:<br>Desorden y camorra entre varias personas.", respuesta: "trifulca"},
												   			  {pregunta: "CON LA T:<br>Esfuerzo humano aplicado a la producción de riqueza.", respuesta: "trabajo"}
												  ]},
			{ letra: "u", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA U:<br>Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914.", respuesta: "Unamuno"},
												   			  {pregunta: "CON LA U:<br>Igual, conforme, semejante.", respuesta: "uniforme"},
												   			  {pregunta: "CON LA U:<br>Producir sonido el viento.", respuesta: "ulular"}
												  ]},
			{ letra: "v", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA V:<br>Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa.", respuesta: "vikingos"},
												   			  {pregunta: "CON LA V:<br>Trastorno del sentido del equilibrio caracterizado por una sensación de movimiento rotatorio del cuerpo o de los objetos que lo rodean.", respuesta: "vértigo"},
												   			  {pregunta: "CON LA V:<br>Descanso temporal de una actividad habitual, principalmente del trabajo remunerado o de los estudios.", respuesta: "vacaciones"}
												  ]},
			{ letra: "w", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CONTIENE LA W:<br>Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso.", respuesta: "sándwich"},
												   			  {pregunta: "CONTIENE LA W:<br>Fruta con pulpa de color verde y a la que se le atribuye mucha vitamina C.", respuesta: "kiwi"},
												   			  {pregunta: "CONTIENE LA W:<br>Compositor alemán responsable de 'El anillo de los Nibelungos'.", respuesta: "Wagner"}
												  ]},
			{ letra: "x", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CONTIENE LA X:<br>Toxina bacteriana utilizada en cirujía estética.", respuesta: "bótox"},
												   			  {pregunta: "CONTIENE LA X:<br>Suspensión o dificultad en la respiración.", respuesta: "asfixia"},
												   			  {pregunta: "CONTIENE LA X:<br>Conjuro contra el espíritu maligno.", respuesta: "exorcismo"}
												  ]},
			{ letra: "y", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CONTIENE LA Y:<br>Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos.", respuesta: "peyote"},
												   			  {pregunta: "CONTIENE LA Y:<br>Consorte, marido y mujer respectivamente.", respuesta: "cónyuge"},
												   			  {pregunta: "CONTIENE LA Y:<br>Relación de sucesos que tienen más de tradicionales o maravillosos que de históricos o verdaderos.", respuesta: "leyenda"}
												  ]},
			{ letra: "z", estado: 0, escogida: 0, arrayPreguntaRespuesta: [{pregunta: "CON LA Z:<br>Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional.", respuesta: "zen"},
												   			  {pregunta: "CON LA Z:<br>Buscar o seguir a las aves, fieras y otras muchas clases de animales para cobrarlos o matarlos.", respuesta: "cazar"},
												   			  {pregunta: "CON LA Z:<br>Principio, origen y raíz de una cosa.", respuesta: "comienzo"}
												  ]}
		];
		
	}

	iniciarPartida(){
	    this.generarRondaPalabras();
	}
	
	// genera arrayPalabrasEscogidasParaCadaLetra
	generarRondaPalabras(){
		for (let i=0; i<this.preguntas.length; i++){
			let min = 0;
			let max = numeroPalabrasPorLetra;
			let numAleatorio = Math.floor(Math.random() * (max - min)) + min;
			this.arrayPalabrasEscogidasParaCadaLetra.push(numAleatorio);
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
	
	comprobarPalabra(palabra){
                // se pasa a minúscula y se quitan los acentos
		let respuesta = quitarAcentos(palabra.toLowerCase()); 
		
		let posicionActual = this.posicionRonda;  
		let preguntaDe3 = this.arrayPalabrasEscogidasParaCadaLetra[posicionActual]; // devuelve 0, 1 o 2 para escoger la pregunta concreta
                let respuestaArray = quitarAcentos(this.preguntas[posicionActual].arrayPreguntaRespuesta[preguntaDe3].respuesta.toLowerCase());
        let coinciden = (respuesta===respuestaArray);
		if (coinciden) { // si acierta
			this.numeroDeLetrasCompletadas++;
			this.numeroDePalabrasAcertadas++;
			// se actualiza el estado
			this.preguntas[this.posicionRonda].estado = 1;
		} else { // si falla
			this.numeroDeLetrasCompletadas++;
			this.numeroDePalabrasFalladas++;
			// se actualiza el estado
			this.preguntas[this.posicionRonda].estado = 2;
		}
		return coinciden;
	}
	
	irASiguienteLetraValida(){
		// aquí se comprueba que quedan palabras por leer
		if (this.estaElRoscoCompletado()===false){
			do {
			  this.siguienteLetra();	
			} while ((this.esPalabraNoRespondida()===false)&&(this.estaElRoscoCompletado()===false))
		}
	}
	
	pedirUnaDefinicion(){
		let posicionActual = this.posicionRonda;
		let preguntaDe3 = this.arrayPalabrasEscogidasParaCadaLetra[posicionActual]; // devuelve 0, 1 o 2 para escoger la pregunta concreta
		return this.preguntas[posicionActual].arrayPreguntaRespuesta[preguntaDe3].pregunta;
	}

    resetearValores(){
		this.posicionRonda = 0; //la posición dentro del array
		this.numeroDeLetrasCompletadas = 0;
		this.numeroDePalabrasAcertadas = 0;
		this.numeroDePalabrasFalladas = 0;
		this.arrayPalabrasEscogidasParaCadaLetra = []; // array donde se guardará el número de palabra que saldrá en cada ronda (como hay 3 palabras, será 0, 1 o 2)
		for (let i=0; i<this.preguntas.length;i++){
		  this.preguntas[i].estado = 0;
		  this.preguntas[i].escogida = 0;
		}
	}
}

//---------------------------------------------------------------------------------------------------------
//  CÓDIGO PRINCIPAL
//---------------------------------------------------------------------------------------------------------

//se crea el objeto juego
let juego = new ClaseJuego();

// muestra la pantalla de presentación inicial
iniciarTextosPresentacion();
mostrarPantallaPrincipal();

//-------------------------------------------------------------------------------------------------------------------
//      FUNCIONES PRINCIPALES
//-------------------------------------------------------------------------------------------------------------------

function pedirPalabra(){
	escribaLaPalabra.style.textAlign = "center";
	escribaLaPalabra.textContent = "ESCRIBA LA RESPUESTA EN EL RECUADRO.";
	definicionesPalabras.style.textAlign = "center";
	definicionesPalabras.innerHTML = juego.pedirUnaDefinicion();
	campoPalabra.value = ""
	campoPalabra.focus();
}

function iniciarJuego(){
	// se inicia la partida
	juego.iniciarPartida();
	pedirPalabra();
}


//-------------------------------------------------------------------------------------------------------------------
//       OTRAS FUNCIONES
//-------------------------------------------------------------------------------------------------------------------


// ESTAS FUNCIONES PINTAN LETRAS, TIEMPO Y ACERTADAS/FALLADAS

function pintarLetra(posicionEnArray, estado){
  switch(estado){

    case 0:// no respondida
      angulo = (arco*posicionEnArray)-(Math.PI/2); //posicionEnArray será de 0 a 26, una posición por letra
      x = xOffset+r*Math.cos(angulo);
      y = yOffset+r*Math.sin(angulo);
      elementoCanvasPaneles.beginPath();

      grd = elementoCanvasPaneles.createRadialGradient(x, y, 0, x+8, y+6, 30);
      grd.addColorStop(0, "#00a9ff"); // más interno
      grd.addColorStop(1, "#0000bb"); // más externo

      elementoCanvasPaneles.arc(x, y, 20, 0, 2 * Math.PI);
      elementoCanvasPaneles.fillStyle = grd;
      elementoCanvasPaneles.fill();
    
      elementoCanvasPaneles.strokeStyle = "#e5ffff";
      elementoCanvasPaneles.lineWidth = 1.5;
      elementoCanvasPaneles.stroke();

      elementoCanvasPaneles.font = "20px Arial";
      elementoCanvasPaneles.textAlign = "center";
      elementoCanvasPaneles.fillStyle = "#e5ffff";
      elementoCanvasPaneles.fillText(alfabeto[posicionEnArray], x, y+7);
    break;

    case 1: // acertada
      angulo = (arco*posicionEnArray)-(Math.PI/2); //posicionEnArray será de 0 a 26, una posición por letra
      x = xOffset+r*Math.cos(angulo);
      y = yOffset+r*Math.sin(angulo);
      
      elementoCanvasPaneles.beginPath();
      grd = elementoCanvasPaneles.createRadialGradient(x, y, 0, x+8, y+6, 30);
      grd.addColorStop(0, "#00ff00"); // más interno
      grd.addColorStop(1, "#00bd00"); // más externo

      elementoCanvasPaneles.arc(x, y, 20, 0, 2 * Math.PI);
      elementoCanvasPaneles.fillStyle = grd;
      elementoCanvasPaneles.fill();
    
      elementoCanvasPaneles.strokeStyle = "#e5ffff";
      elementoCanvasPaneles.lineWidth = 1.5;
      elementoCanvasPaneles.stroke();

      elementoCanvasPaneles.font = "20px Arial";
      elementoCanvasPaneles.textAlign = "center";
      elementoCanvasPaneles.fillStyle = "#e5ffff";
      elementoCanvasPaneles.fillText(alfabeto[posicionEnArray], x, y+7);
    break;

    case 2: // fallada
      angulo = (arco*posicionEnArray)-(Math.PI/2); //posicionEnArray será de 0 a 26, una posición por letra
      x = xOffset+r*Math.cos(angulo);
      y = yOffset+r*Math.sin(angulo);
      elementoCanvasPaneles.beginPath();

      grd = elementoCanvasPaneles.createRadialGradient(x, y, 0, x+8, y+6, 30);
      grd.addColorStop(0, "#ff0000"); // más interno
      grd.addColorStop(1, "#b80000"); // más externo

      elementoCanvasPaneles.arc(x, y, 20, 0, 2 * Math.PI);
      elementoCanvasPaneles.fillStyle = grd;
      elementoCanvasPaneles.fill();
    
      elementoCanvasPaneles.strokeStyle = "#e5ffff";
      elementoCanvasPaneles.lineWidth = 1.5;
      elementoCanvasPaneles.stroke();

      elementoCanvasPaneles.font = "20px Arial";
      elementoCanvasPaneles.textAlign = "center";
      elementoCanvasPaneles.fillStyle = "#e5ffff";
      elementoCanvasPaneles.fillText(alfabeto[posicionEnArray], x, y+7);
    break;

    case 3: // letra que se está intentando averiguar en estos momentos
      angulo = (arco*posicionEnArray)-(Math.PI/2); //posicionEnArray será de 0 a 26, una posición por letra
      x = xOffset+r*Math.cos(angulo);
      y = yOffset+r*Math.sin(angulo);

      elementoCanvasPaneles.beginPath();


      // crea una línea hasta el centro
      elementoCanvasPaneles.moveTo(xOffset, yOffset);
      elementoCanvasPaneles.strokeStyle = "yellow";
      elementoCanvasPaneles.lineWidth = 3;
      elementoCanvasPaneles.lineTo(x, y);
      elementoCanvasPaneles.stroke();

      elementoCanvasPaneles.beginPath();


      grd = elementoCanvasPaneles.createRadialGradient(x, y, 0, x+10, y+8, 30);
      grd.addColorStop(0, "#00a9ff"); // más interno
      grd.addColorStop(1, "#0000bb"); // más externo

      elementoCanvasPaneles.arc(x, y, 23, 0, 2 * Math.PI);
      elementoCanvasPaneles.fillStyle = grd;
      elementoCanvasPaneles.fill();
    
      elementoCanvasPaneles.strokeStyle = "yellow";
      elementoCanvasPaneles.lineWidth = 3;
      elementoCanvasPaneles.stroke();

      elementoCanvasPaneles.font = "34px Arial";
      elementoCanvasPaneles.textAlign = "center";
      elementoCanvasPaneles.fillStyle = "yellow";
      elementoCanvasPaneles.fillText(alfabeto[posicionEnArray], x, y+12);

      // letra en el centro
      elementoCanvasPaneles.beginPath();

      // círculo central para la letra
      grd = elementoCanvasPaneles.createRadialGradient(xOffset, yOffset, 0, xOffset+18, yOffset+16, 50);
      grd.addColorStop(0, "#00a9ff"); // más interno
      grd.addColorStop(1, "#0000ec"); // más externo
      elementoCanvasPaneles.arc(xOffset, yOffset, 50, 0, 2 * Math.PI);
      elementoCanvasPaneles.fillStyle = grd;
      elementoCanvasPaneles.fill();
    
      elementoCanvasPaneles.strokeStyle = "yellow";
      elementoCanvasPaneles.lineWidth = 5;
      elementoCanvasPaneles.stroke();

      elementoCanvasPaneles.font = "80px Arial";
      elementoCanvasPaneles.textAlign = "center";
      elementoCanvasPaneles.fillStyle = "yellow";
      elementoCanvasPaneles.fillText(alfabeto[posicionEnArray], xOffset, yOffset+27);
    break;

    case 4:// desactivado
      angulo = (arco*posicionEnArray)-(Math.PI/2); //posicionEnArray será de 0 a 26, una posición por letra
      x = xOffset+r*Math.cos(angulo);
      y = yOffset+r*Math.sin(angulo);
      elementoCanvasPaneles.beginPath();

      grd = elementoCanvasPaneles.createRadialGradient(x, y, 0, x, y, 20);
      grd.addColorStop(0, "#7200ff"); // más interno
      grd.addColorStop(1, "#7200ff"); // más externo

      elementoCanvasPaneles.arc(x, y, 20, 0, 2 * Math.PI);
      elementoCanvasPaneles.fillStyle = grd;
      elementoCanvasPaneles.fill();
    
      elementoCanvasPaneles.strokeStyle = "#d0d0d0";
      elementoCanvasPaneles.lineWidth = 1.5;
      elementoCanvasPaneles.stroke();

      elementoCanvasPaneles.font = "20px Arial";
      elementoCanvasPaneles.textAlign = "center";
      elementoCanvasPaneles.fillStyle = "#d0d0d0";
      elementoCanvasPaneles.fillText(alfabeto[posicionEnArray], x, y+7);
    break;

  }

}

function borrarLetra(posicionEnArray){
      angulo = (arco*posicionEnArray)-(Math.PI/2); //posicionEnArray será de 0 a 26, una posición por letra
      x = xOffset+r*Math.cos(angulo);
      y = yOffset+r*Math.sin(angulo);

      elementoCanvasPaneles.beginPath();

      // crea una línea hasta el centro
      elementoCanvasPaneles.moveTo(xOffset, yOffset);
      elementoCanvasPaneles.strokeStyle = "#7200ff";
      elementoCanvasPaneles.lineWidth = 5;
      elementoCanvasPaneles.lineTo(x, y);
      elementoCanvasPaneles.stroke();

      elementoCanvasPaneles.beginPath();

      grd = elementoCanvasPaneles.createRadialGradient(x, y, 0, x+10, y+8, 32);
      grd.addColorStop(0, "#7200ff"); // más interno
      grd.addColorStop(1, "#7200ff"); // más externo

      elementoCanvasPaneles.arc(x, y, 25, 0, 2 * Math.PI);
      elementoCanvasPaneles.fillStyle = grd;
      elementoCanvasPaneles.fill();
    
      elementoCanvasPaneles.strokeStyle = "#7200ff";
      elementoCanvasPaneles.lineWidth = 5;
      elementoCanvasPaneles.stroke();

      // letra en el centro
      elementoCanvasPaneles.beginPath();

      // círculo central para la letra
      grd = elementoCanvasPaneles.createRadialGradient(xOffset, yOffset, 0, xOffset+18, yOffset+16, 50);
      grd.addColorStop(0, "#7200ff"); // más interno
      grd.addColorStop(1, "#7200ff"); // más externo
      elementoCanvasPaneles.arc(xOffset, yOffset, 52, 0, 2 * Math.PI);
      elementoCanvasPaneles.fillStyle = grd;
      elementoCanvasPaneles.fill();
    
      elementoCanvasPaneles.strokeStyle = "#7200ff";
      elementoCanvasPaneles.lineWidth = 7;
      elementoCanvasPaneles.stroke();
}
  
function pintarMarcadorTiempo(tiempo, estado){
  let x=20;
  let y=80;

  switch(estado){
    case 0: // inactivo
        elementoCanvasRosco.beginPath();

        elementoCanvasRosco.strokeStyle = "white";
        elementoCanvasRosco.lineWidth = 1.5;
        elementoCanvasRosco.rect(x, y, 120, 60);
        elementoCanvasRosco.stroke();

        grd = elementoCanvasRosco.createRadialGradient(x+60, y+30, 0, x+40, y+40, 90);
        grd.addColorStop(0, "#7200ff"); // más interno
        grd.addColorStop(1, "#7200ff"); // más externo
        elementoCanvasRosco.fillStyle = grd;
        elementoCanvasRosco.fillRect(x, y, 120, 60);
        elementoCanvasRosco.fill();

        elementoCanvasRosco.font = "40px Arial";
        elementoCanvasRosco.textAlign = "center";
        elementoCanvasRosco.fillStyle = "#bcbcbc";
        elementoCanvasRosco.fillText(tiempo, x+60, y+45);
    break;
    case 1: // activo
        elementoCanvasRosco.beginPath();

        elementoCanvasRosco.strokeStyle = "white";
        elementoCanvasRosco.lineWidth = 2;
        elementoCanvasRosco.rect(x, y, 120, 60);
        elementoCanvasRosco.stroke();
      
        grd = elementoCanvasRosco.createRadialGradient(x+60, y+30, 0, x+40, y+40, 90);
        grd.addColorStop(0, "#00a9ff"); // más interno
        grd.addColorStop(1, "#0000bb"); // más externo
        elementoCanvasRosco.fillStyle = grd;
        elementoCanvasRosco.fillRect(x, y, 120, 60);
        elementoCanvasRosco.fill();
      
        elementoCanvasRosco.font = "40px Arial";
        elementoCanvasRosco.textAlign = "center";
        elementoCanvasRosco.fillStyle = "yellow";
        elementoCanvasRosco.fillText(tiempo, x+60, y+45);
    break;
  }
}

function pintarMarcadorAcertadas(aciertos, estado){
  let x=40;
  let y=370;

  switch (estado){  
    case 0: // inactivo
      elementoCanvasRosco.beginPath();
      grd = elementoCanvasRosco.createRadialGradient(x, y, 0, x+8, y+6, 30);
      grd.addColorStop(0, "#7200ff"); // más interno
      grd.addColorStop(1, "#7200ff"); // más externo

      elementoCanvasRosco.arc(x, y, 20, 0, 2 * Math.PI);
      elementoCanvasRosco.fillStyle = grd;
      elementoCanvasRosco.fill();

      elementoCanvasRosco.strokeStyle = "#bcbcbc";
      elementoCanvasRosco.lineWidth = 1.5;
      elementoCanvasRosco.stroke();

      elementoCanvasRosco.font = "20px Arial";
      elementoCanvasRosco.textAlign = "center";
      elementoCanvasRosco.fillStyle = "#bcbcbc";
      elementoCanvasRosco.fillText(aciertos, x, y+7);

      elementoCanvasRosco.font = "18px Arial";
      elementoCanvasRosco.textAlign = "left";
      elementoCanvasRosco.fillStyle = "#bcbcbc";
      elementoCanvasRosco.fillText("ACIERTOS", x+40, y+6);
    break;  
    case 1: // activo
      elementoCanvasRosco.beginPath();
      grd = elementoCanvasRosco.createRadialGradient(x, y, 0, x+8, y+6, 30);
      grd.addColorStop(0, "#00ff00"); // más interno
      grd.addColorStop(1, "#00bd00"); // más externo

      elementoCanvasRosco.arc(x, y, 20, 0, 2 * Math.PI);
      elementoCanvasRosco.fillStyle = grd;
      elementoCanvasRosco.fill();

      elementoCanvasRosco.strokeStyle = "white";
      elementoCanvasRosco.lineWidth = 2;
      elementoCanvasRosco.stroke();

      elementoCanvasRosco.font = "20px Arial";
      elementoCanvasRosco.textAlign = "center";
      elementoCanvasRosco.fillStyle = "white";
      elementoCanvasRosco.fillText(aciertos, x, y+7);

      elementoCanvasRosco.font = "18px Arial";
      elementoCanvasRosco.textAlign = "left";
      elementoCanvasRosco.fillStyle = "white";
      elementoCanvasRosco.fillText("ACIERTOS", x+40, y+6);
    break;  
      }
}

function pintarMarcadorFalladas(fallos, estado){
  let x=40;
  let y=430;

  switch (estado){  
    case 0: // inactivo
      elementoCanvasRosco.beginPath();
      grd = elementoCanvasRosco.createRadialGradient(x, y, 0, x+8, y+6, 30);
      grd.addColorStop(0, "#7200ff"); // más interno
      grd.addColorStop(1, "#7200ff"); // más externo

      elementoCanvasRosco.arc(x, y, 20, 0, 2 * Math.PI);
      elementoCanvasRosco.fillStyle = grd;
      elementoCanvasRosco.fill();

      elementoCanvasRosco.strokeStyle = "#bcbcbc";
      elementoCanvasRosco.lineWidth = 1.5;
      elementoCanvasRosco.stroke();

      elementoCanvasRosco.font = "20px Arial";
      elementoCanvasRosco.textAlign = "center";
      elementoCanvasRosco.fillStyle = "#bcbcbc";
      elementoCanvasRosco.fillText(fallos, x, y+7);

      elementoCanvasRosco.font = "18px Arial";
      elementoCanvasRosco.textAlign = "left";
      elementoCanvasRosco.fillStyle = "#bcbcbc";
      elementoCanvasRosco.fillText("FALLOS", x+40, y+6);
    break;  
    case 1: // activo
      elementoCanvasRosco.beginPath();
      grd = elementoCanvasRosco.createRadialGradient(x, y, 0, x+8, y+6, 30);
      grd.addColorStop(0, "#ff0000"); // más interno
      grd.addColorStop(1, "#b80000"); // más externo

      elementoCanvasRosco.arc(x, y, 20, 0, 2 * Math.PI);
      elementoCanvasRosco.fillStyle = grd;
      elementoCanvasRosco.fill();

      elementoCanvasRosco.strokeStyle = "white";
      elementoCanvasRosco.lineWidth = 2;
      elementoCanvasRosco.stroke();

      elementoCanvasRosco.font = "20px Arial";
      elementoCanvasRosco.textAlign = "center";
      elementoCanvasRosco.fillStyle = "white";
      elementoCanvasRosco.fillText(fallos, x, y+7);

      elementoCanvasRosco.font = "18px Arial";
      elementoCanvasRosco.textAlign = "left";
      elementoCanvasRosco.fillStyle = "white";
      elementoCanvasRosco.fillText("FALLOS", x+40, y+6);
    break;  
  }

}


// ESTAS FUNCIONES MUESTRAN Y OCULTAN LA PARTE INTERACTIVA (ABAJO - DERECHA)

function mostrarPanelBotonJugar(){document.querySelector("#panelInfoInferiorBotonJugar").style.display = "block";}

function ocultarPanelBotonJugar(){document.querySelector("#panelInfoInferiorBotonJugar").style.display = "none";}

function mostrarPanelIntroduccionDePalabra(){document.querySelector("#panelInfoInferiorIntroducirPalabra").style.display = "block";}

function ocultarPanelIntroduccionDePalabra(){document.querySelector("#panelInfoInferiorIntroducirPalabra").style.display = "none";}

function ocultarPanelDefinicion(){document.querySelector("#panelInfoSuperior").style.display = "none";}

function mostrarPanelDefinicion(){document.querySelector("#panelInfoSuperior").style.display = "block";}



// ESTAS FUNCIONES PREPARAN LA PANTALLA INICIAL Y ACTIVAN TIMER

function mostrarPantallaPrincipal(){
  // dibuja las letra inactivas
  dibujarLetrasInactivas();
  // escribe el nombre del juego en el centro del rosco  
  mostrarNombreJuego(1);
  // dibuja los marcadores de la izquierda cuando están inactivos
  actualizarMarcadores();
  // oculta planel derecho de la pantalla de presentación
  ocultarPanelDerechoDefiniciones();
  // oculta panel de la respuesta correcta en caso de equivocación
  ocultarPanelRespuestaCorrecta() 
  // oculta el panel de introducción de palabra
  ocultarPanelIntroduccionDePalabra();
}

function ocultarPanelDerechoDefiniciones(){
  escribaLaPalabra.style.display = "none";
  definicionesPalabras.style.display = "none";
}

function mostrarPanelDerechoDefiniciones(){
  escribaLaPalabra.style.display = "block";
  definicionesPalabras.style.display = "block";
}

function ocultarPanelDerechoPresentacion(){
  bienvenidos.style.display = "none";
  instrucciones.style.display = "none";
}

function mostrarPanelDerechoPresentacion(){
  bienvenidos.style.display = "block";
  instrucciones.style.display = "block";
}

function ocultarPanelDerechoResumenFinal(){
  mensajeFinal.style.display = "none";
  resumenResultados.style.display = "none";
}

function mostrarPanelDerechoResumenFinal(){
  mensajeFinal.style.display = "block";
  resumenResultados.style.display = "block";
}

function dibujarLetrasInactivas(){
  for (let i=0;i<27;i++){pintarLetra(i, 4);}
}

function mostrarNombreJuego(estado){
  let xRect = 380;
  let yRect = 60;
  x = xOffset-(xRect/2);
  y = yOffset-(yRect/2);

  switch(estado){
    case 0: // inactivo
      elementoCanvasPaneles.fillStyle = "#7200ff";
      elementoCanvasPaneles.fillRect(x, y, xRect, yRect);
      elementoCanvasPaneles.fill();
    break;
    case 1: // activo
      elementoCanvasPaneles.beginPath();
      elementoCanvasPaneles.font = "50px Arial";
      elementoCanvasPaneles.textAlign = "center";
      elementoCanvasPaneles.fillStyle = "yellow";
      elementoCanvasPaneles.fillText("PASAPALABRA", xOffset, yOffset+10);
    break;
  }
}

function actualizarMarcadores(){
  pintarMarcadorTiempo(0, 0);
  pintarMarcadorAcertadas(0, 0);
  pintarMarcadorFalladas(0, 0);
}

function iniciarTextosPresentacion(){
  bienvenidos.textContent="¡Bienvenido a PASAPALABRA!";
  instrucciones.textContent="En este juego deberá adivinar una palabra. Para ello le daremos dos pistas: " + 
         "la definición de la palabra y una letra (que podrá ser aquella por la que empieza la palabra o una de las letras que contiene). " + 
         "Deberá averiguarlas todas antes de que se acabe el tiempo. Podrá pasar a la siguiente pulsando el botón 'PASAPALABRA'. " +
         "Cuando pulse el botón 'ACABAR', terminará el juego.";
}

function activarTimer(){
  ocultarPanelBotonJugar();
  ocultarPanelDerechoPresentacion();
  ocultarPanelDerechoResumenFinal();
  mostrarPanelDerechoDefiniciones();
  mostrarPanelIntroduccionDePalabra();
  pintarMarcadorTiempo(valorTiempo, 1);
  mostrarNombreJuego(0);
  borrarLetra(posicionResiduo); // borra el dibujo que se ha quedado en el juego anterior; por defecto es 0
  pintarRoscoInicio();
  pintarPanelesAcertadasFalladasInicio();
  
  contadorTimer = valorTiempo;
  temporizador = setInterval(activarTemporizador, 1000);
  iniciarJuego();
  
  function activarTemporizador(){
    if (contadorTimer===0){
       seAcabaElTimer();
       clearInterval (temporizador);
    } else {
      contadorTimer--;
      pintarMarcadorTiempo(contadorTimer, 1);
    }
  }

}


// ESTAS FUNCIONES MUESTRAN EL ROSCO Y LOS PANELES IZQUIERDA UNA VEZ SE HA PULSADO JUGAR

  function pintarRoscoInicio(){
	for (let i=1;i<27;i++){pintarLetra(i, 0);}
	pintarLetra(0, 3);
	
  }
 
  function pintarPanelesAcertadasFalladasInicio(){
	pintarMarcadorAcertadas(juego.numeroDePalabrasAcertadas, 1);
	pintarMarcadorFalladas(juego.numeroDePalabrasFalladas, 1);
  }

// ESTAS FUNCIONES ACTÚAN AL PULSAR BOTONES

function aceptarPalabraPorEnter(){ // se ha pulsado 'Enter'
  let coinciden;
  let palabra = campoPalabra.value;
  if (palabra!==null) {
	 if ((palabra!=="")&&(!sonTodoEspacios(palabra))) {
		coinciden = juego.comprobarPalabra(palabra);
        borrarLetra(juego.posicionRonda);
		
		if (coinciden) {
			pintarLetra(juego.posicionRonda, 1);
			pintarMarcadorAcertadas(juego.numeroDePalabrasAcertadas, 1);
		} else {
			pintarLetra(juego.posicionRonda, 2);
			pintarMarcadorFalladas(juego.numeroDePalabrasFalladas, 1);
			mostrarRespuestaCorrecta();
		}
		if (juego.estaElRoscoCompletado()===false){
  		  juego.irASiguienteLetraValida();
  		  pintarLetra(juego.posicionRonda, 3); 
  		  pedirPalabra();
		} else {
                  seAcabaElRosco();
               }
	 } else {
            if (palabra==="") {
               pasarPalabra();
            } else {
               campoPalabra.value = "";
               campoPalabra.focus();
            }
         }
  } else {
    campoPalabra.value = "";
    campoPalabra.focus();
  }
}

function aceptarPalabraPorBotonOK(){ // se ha pulsado 'Enter'
  let coinciden;
  let palabra = campoPalabra.value;
  if (palabra!==null) {
	 if ((palabra!=="")&&(!sonTodoEspacios(palabra))) {
		coinciden = juego.comprobarPalabra(palabra);
        borrarLetra(juego.posicionRonda);
		
		if (coinciden) {
			pintarLetra(juego.posicionRonda, 1);
			pintarMarcadorAcertadas(juego.numeroDePalabrasAcertadas, 1);
		} else {
			pintarLetra(juego.posicionRonda, 2);
			pintarMarcadorFalladas(juego.numeroDePalabrasFalladas, 1);
			mostrarRespuestaCorrecta();
		}
		if (juego.estaElRoscoCompletado()===false){
  		   juego.irASiguienteLetraValida();
  		   pintarLetra(juego.posicionRonda, 3); 
  		   pedirPalabra();
		} else {
           seAcabaElRosco();
        }
	 } else {
	    campoPalabra.value = "";
	    campoPalabra.focus();
     }
  } else {
    campoPalabra.value = "";
    campoPalabra.focus();
  }
}

function mostrarRespuestaCorrecta(){
      ocultarPanelInformacion();
      mostrarPanelRespuestaCorrecta();
      let respuesta = "<b>¡SE EQUIVOCÓ!</b><br><br>";
      respuesta += "LA RESPUESTA CORRECTA ERA:" + "<br><br>" + juego.preguntas[juego.posicionRonda].arrayPreguntaRespuesta[juego.arrayPalabrasEscogidasParaCadaLetra[juego.posicionRonda]].respuesta.toUpperCase();
      document.querySelector("#textoRespuestaCorrecta").innerHTML = respuesta;
}

function mostrarPanelInformacion(){
  document.querySelector("#panelInformacion").style.display = "block";
}

function ocultarPanelInformacion(){
  document.querySelector("#panelInformacion").style.display = "none";
}

function mostrarPanelRespuestaCorrecta(){
  document.querySelector("#panelRespuestaCorrecta").style.display = "block";
  //botonRespuestaCorrecta.focus();  // *** ESTO HACE QUE NO SE PUEDA MOSTRAR EL PANEL CUANDO EL FOCO ESTABA EN UN INPUT TEXT Y NO SÉ POR QUÉ
}

function ocultarPanelRespuestaCorrecta(){
  document.querySelector("#panelRespuestaCorrecta").style.display = "none";
}

function volverADefiniciones(){
  ocultarPanelRespuestaCorrecta();
  mostrarPanelInformacion();
  campoPalabra.focus();
}

function pasarPalabra(){ //*** debe pasar a la siguiente libre
  if (juego.estaElRoscoCompletado()===false){
    borrarLetra(juego.posicionRonda);
    pintarLetra(juego.posicionRonda, 0);
    juego.irASiguienteLetraValida();
    pintarLetra(juego.posicionRonda, 3); // aquí habrá q comprobar q no está el rosco lleno
    pedirPalabra();
  }
}

function interrumpirTemporizador(){
  clearInterval (temporizador);
  seInterrumpeTimer();
}

function seAcabaElTimer(){
  posicionResiduo = juego.posicionRonda;
  ocultarPanelDerechoDefiniciones();
  mostrarPanelDerechoResumenFinal();
  mensajeFinal.textContent="¡SE ACABÓ EL TIEMPO!";
  let fraseLetras = "";
  if (juego.numeroDeLetrasCompletadas===1) {fraseLetras = "SOLO HA PROBADO CON 1 LETRA.";}
  else {fraseLetras = (juego.numeroDeLetrasCompletadas===0) ? "NO HA PROBADO CON NINGUNA LETRA." : "HA PROBADO CON " + juego.numeroDeLetrasCompletadas + " LETRAS.";}
  resumenResultados.innerHTML="ESTOS SON SUS RESULTADOS:" + "<br>" + "ACIERTOS: " + juego.numeroDePalabrasAcertadas + "<br>" + "FALLOS: " +
                                  juego.numeroDePalabrasFalladas + "<br>" + fraseLetras;
  ocultarPanelIntroduccionDePalabra();
  mostrarPanelBotonJugar();
  // reiniciar valores
  juego.resetearValores();
}

function seAcabaElRosco(){
  posicionResiduo = juego.posicionRonda;
  clearInterval (temporizador); // se interrumpe el timer
  //alert("entra aquí");
  if (juego.numeroDePalabrasAcertadas===numeroDePreguntas) {
	  ocultarPanelDerechoDefiniciones();
	  mostrarPanelDerechoResumenFinal();
	  mensajeFinal.textContent = "¡ENHORABUENA!";
	  resumenResultados.innerHTML="HA ACERTADO EL ROSCO ENTERO." + "<br><br>" + "¿QUIERE VOLVER A INTENTARLO?";
	  ocultarPanelIntroduccionDePalabra();
	  mostrarPanelBotonJugar();
	  // reiniciar valores
	  juego.resetearValores();
  } else {
	  ocultarPanelDerechoDefiniciones();
	  mostrarPanelDerechoResumenFinal();
	  mensajeFinal.textContent = "¡YA NO LE QUEDAN MÁS LETRAS POR INTENTAR!";
	  let fraseSegundos = (contadorTimer===1) ? "LE SOBRÓ 1 SEGUNDO." : "LE SOBRARON " + contadorTimer + " SEGUNDOS.";
      resumenResultados.innerHTML="ESTOS SON SUS RESULTADOS:" + "<br>" + "ACIERTOS: " + juego.numeroDePalabrasAcertadas + "<br>" + "FALLOS: " +
									  juego.numeroDePalabrasFalladas + "<br>" + fraseSegundos;
	  ocultarPanelIntroduccionDePalabra();
	  mostrarPanelBotonJugar();
	  // reiniciar valores
	  juego.resetearValores();
  }
  
}

function seInterrumpeTimer(){
  posicionResiduo = juego.posicionRonda;
  ocultarPanelDerechoDefiniciones();
  mostrarPanelDerechoResumenFinal();
  mensajeFinal.textContent="¡HA ABANDONADO EL JUEGO!";
  let fraseLetras = "";
  if (juego.numeroDeLetrasCompletadas===1) {fraseLetras = "SOLO HA PROBADO CON 1 LETRA.";}
  else {fraseLetras = (juego.numeroDeLetrasCompletadas===0) ? "NO HA PROBADO CON NINGUNA LETRA." : "HA PROBADO CON " + juego.numeroDeLetrasCompletadas + " LETRAS.";}
  let fraseSegundos = (contadorTimer===1) ? "LE SOBRÓ 1 SEGUNDO." : "LE SOBRARON " + contadorTimer + " SEGUNDOS.";
  resumenResultados.innerHTML="ESTOS SON SUS RESULTADOS:" + "<br>" + "ACIERTOS: " + juego.numeroDePalabrasAcertadas + "<br>" + "FALLOS: " +
                                  juego.numeroDePalabrasFalladas + "<br>" + fraseLetras + "<br>" + fraseSegundos;
  ocultarPanelIntroduccionDePalabra();
  mostrarPanelBotonJugar();
  // reiniciar valores
  juego.resetearValores();
}

function detectarTecla(e){if (e.code==="Enter") {aceptarPalabraPorEnter();}}

//-------------------------------------------------------------------------------------------------------------------
//   OTRAS FUNCIONES
//----------------------------------------------------------------------------------------------
 
  function esEntero(numero){
	  // esta función devulve true si el número no tiene decimales
	  if (numero % 1 === 0) {
		return true;
	  } else {
			   return false;
			 }
}
  
// comprueba si un string son todo espacios; devuelve false si hay algún carácter que no sea espacio; 
// devuelve true si todo son espacios
function sonTodoEspacios(cadena){
  let todoEspacios = true;
  for (let i=0; i<cadena.length; i++){
    if (!(cadena[i]===" ")) {todoEspacios = false; break;} 
  }
  return todoEspacios;
}

function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U','Ü':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

  