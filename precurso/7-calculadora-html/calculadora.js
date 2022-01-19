
//-------------------------------------------------------------------------------------------------------------------
//       VARIABLES
//-------------------------------------------------------------------------------------------------------------------

let operacion = "";
let operandos = []; // para almacenar los operandos y las operaciones e ir actualizándolo
let resultado = document.getElementById("resultado");
let seAcabaDePulsarOperador = false;
let seAcabaDePulsarIgual = false;
let seAcabaDePulsarNumero = false;
let esPrimerNumero0 = true;
let seAcabaDePulsarDecimal = false;
let numeroMaximo = 10; // número máximo de dígitos en la pantalla


//-------------------------------------------------------------------------------------------------------------------
//       CÓDIGO DOM
//-------------------------------------------------------------------------------------------------------------------

  document.getElementById("n0").addEventListener("click", pulsar0);
  document.getElementById("n1").addEventListener("click", pulsar1);
  document.getElementById("n2").addEventListener("click", pulsar2);
  document.getElementById("n3").addEventListener("click", pulsar3);
  document.getElementById("n4").addEventListener("click", pulsar4);
  document.getElementById("n5").addEventListener("click", pulsar5);
  document.getElementById("n6").addEventListener("click", pulsar6);
  document.getElementById("n7").addEventListener("click", pulsar7);
  document.getElementById("n8").addEventListener("click", pulsar8);
  document.getElementById("n9").addEventListener("click", pulsar9);
  document.getElementById("decimal").addEventListener("click", pulsarDecimal);
  document.getElementById("AC").addEventListener("click", pulsarAC);
  document.getElementById("borrar").addEventListener("click", pulsarBorrar);

  document.getElementById("sumar").addEventListener("click", pulsarSumar);
  document.getElementById("restar").addEventListener("click", pulsarRestar);
  document.getElementById("multiplicar").addEventListener("click", pulsarMultiplicar);
  document.getElementById("dividir").addEventListener("click", pulsarDividir);
  document.getElementById("igual").addEventListener("click", pulsarIgual);


//-------------------------------------------------------------------------------------------------------------------
//       FUNCIONES PRINCIPALES
//-------------------------------------------------------------------------------------------------------------------


  function borrarTodo(){
    resultado.textContent = 0;
    operandos = [];
    operacion = "";
    esPrimerNumero0 = true;
    seAcabaDePulsarNumero = false;
    seAcabaDePulsarOperador = false;
    seAcabaDePulsarIgual = false;
    seAcabaDePulsarDecimal = false;
  }


//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

  function borrarUnCaracter(){

	if (resultado.textContent!=="E"){

		if (seAcabaDePulsarNumero) {
		  if (resultado.textContent.length===1) {resultado.textContent = 0;}
		  else {resultado.textContent = resultado.textContent.substr(0, resultado.textContent.length-1);}
		}

		if (seAcabaDePulsarDecimal) {
		  resultado.textContent = resultado.textContent.substr(0, resultado.textContent.length-1);
		}

	}

  }

//----------------------------------------------------------------------------------------------

  function añadirDecimal(){

    if (resultado.textContent!=="E"){

		if (esPrimerNumero0) {
		  resultado.textContent =  "0.";
		}

		if (seAcabaDePulsarNumero) { 
		  if (resultado.textContent==="0") {resultado.textContent = "0.";} // si es 0, se sustituye por 0.
		  else {
			if (resultado.textContent.indexOf(".")===-1) { // <-------------------- ya está
				if (resultado.textContent.length < numeroMaximo){
					resultado.textContent += ".";
				}
			} 
		  }
		}

		if (seAcabaDePulsarOperador) {
		  resultado.textContent =  "0.";
		}

		if (seAcabaDePulsarIgual) {
		  resultado.textContent = "0.";
		  operandos = [];
		}

		//if (seAcabaDePulsarDecimal===true) {}  // no hace nada

		esPrimerNumero0 = false;
		seAcabaDePulsarNumero = false;
		seAcabaDePulsarOperador = false;
		seAcabaDePulsarIgual = false;
		seAcabaDePulsarDecimal = true;

    }

  }

//----------------------------------------------------------------------------------------------
  
  function añadirNumero(numero){

	  if (resultado.textContent!=="E"){

		if (resultado.textContent.length < numeroMaximo){
			if (esPrimerNumero0) {
			  resultado.textContent = numero; // <--- actualiza resultado
			}

			if (seAcabaDePulsarNumero) { // si es 0, es substitueix
			 if (resultado.textContent==="0") {resultado.textContent = numero;}
			 else {resultado.textContent += numero;} //<--- actualiza resultado
			}

			if (seAcabaDePulsarDecimal) {
			  resultado.textContent += numero; // <--- actualiza resultado
			}

		}
			
		if (seAcabaDePulsarOperador) {
		  resultado.textContent = numero;
		}

		if (seAcabaDePulsarIgual) {
		  resultado.textContent = numero;
		  operandos = [];
		}

		esPrimerNumero0 = false;
		seAcabaDePulsarNumero = true;
		seAcabaDePulsarOperador = false;
		seAcabaDePulsarIgual = false;
		seAcabaDePulsarDecimal = false;

	  }
  }
 
//----------------------------------------------------------------------------------------------
 
  function añadirOperador(operador){

  if (resultado.textContent!=="E"){

    if (esPrimerNumero0) {
      operandos.push(resultado.textContent); // operandos.lenght = 1
      operandos.push(operador); // operandos.lenght = 2
    }
   
    if (seAcabaDePulsarNumero){
      operandos.push(resultado.textContent); // operandos.lenght puede ser = 1 o = 2
      operandos.push(operador); // operandos.lenght = 2 o más

      if (operandos.length===2) {}
      if (operandos.length===4) {
        operacion = operandos[1];
        resultado.textContent = limitarNumero(devolverCalculo(operacion));
        let operacionSiguiente = operandos [3];
        operandos = [resultado.textContent, operacionSiguiente];
      }
    }

    if (seAcabaDePulsarOperador){
      operandos[1] = operador;
    }

    if (seAcabaDePulsarIgual){  
      if (operandos.length===1) {operandos.push(operador);}
      if (operandos.length===0) {operandos.push(resultado.textContent); operandos.push(operador);}
    }

    if (seAcabaDePulsarDecimal) {  
      if (resultado.textContent.indexOf(".")!==-1) {resultado.textContent += "0";} // si hay un coma sin decimal  //<--- actualiza resultado
      operandos.push(resultado.textContent); // operandos.lenght puede ser = 1 o = 2
      operandos.push(operador); // operandos.lenght = 2 o más

      if (operandos.length===2) {}
      if (operandos.length===4) {
        operacion = operandos[1];
        resultado.textContent = limitarNumero(devolverCalculo(operacion));
        let operacionSiguiente = operandos [3];
        operandos = [resultado.textContent, operacionSiguiente];
      }
    }

    esPrimerNumero0 = false;
    seAcabaDePulsarNumero = false;
    seAcabaDePulsarOperador = true;
    seAcabaDePulsarIgual = false;
    seAcabaDePulsarDecimal = false;

    }
  }

//----------------------------------------------------------------------------------------------
 
  function sePulsaIgual(){ // si se pulsa '='
   
  if (resultado.textContent!=="E"){

  //if (esPrimerNumero0===true) {}// no hace nada 
   
  if (seAcabaDePulsarNumero){
    if (operandos.length===2) {
      operandos.push(resultado.textContent);
      operacion = operandos[1];
      resultado.textContent = limitarNumero(devolverCalculo(operacion));
      operandos = [resultado.textContent]; // aquí el array tiene length = 1
    }
  }

    if (seAcabaDePulsarOperador){
      operandos.push(resultado.textContent);
      operacion = operandos[1];
      resultado.textContent = limitarNumero(devolverCalculo(operacion));
      operandos = [resultado.textContent];
    }

    //if (seAcabaDePulsarIgual===true){}  // no hace nada

    if (seAcabaDePulsarDecimal) {  
      if (operandos.length===2) {
        operandos.push(resultado.textContent+"0");
        operacion = operandos[1];
        resultado.textContent = limitarNumero(devolverCalculo(operacion));
        operandos = [resultado.textContent]; // aquí el array tiene length = 1
      }
    }


    esPrimerNumero0 = false;
    seAcabaDePulsarNumero = false;
    seAcabaDePulsarOperador = false;
    seAcabaDePulsarIgual = true;
    seAcabaDePulsarDecimal = false;

    }

}

//-------------------------------------------------------------------------------------------------------------------
//   OTRAS FUNCIONES
//----------------------------------------------------------------------------------------------
 
  function devolverCalculo(operacion){
     let res = 0;
     switch(operacion){
         case '+': res = Number(operandos[0]) + Number(operandos[2]); break;
         case '-': res = Number(operandos[0]) - Number(operandos[2]); break;
         case '*': res = Number(operandos[0]) * Number(operandos[2]); break;
         case '/': res = Number(operandos[0]) / Number(operandos[2]); break;
     }
     if (isNaN(res)||res===Infinity||res===-Infinity) {return "E";}
     else {return res;}
  }
  
  function limitarNumero(numero){
	 // esta función no tiene en cuenta números en coma flotante muy pequeños ni números negativos
     let max = ""; 
	 let resultado = "";
	 for (let i=0; i<numeroMaximo;i++) {max += 9;} // max aquí tendrá el máximo número representable en la pantalla
	 if (esEntero(numero)===true) { // si el número es entero (no tiene decimales)
		 // si el número tiene más de numeroMaximo dígitos y no tiene comas, sale E
		 if (Math.abs(Number(numero))>Number(max)) {resultado = "E";}
		 else {resultado = numero;}
	 } else { // si el número tiene decimales
	     // si el número tiene comas y la parte entera tiene más de numeroMaximo dígitos, sale E
		 if (Math.abs(Math.trunc(numero))>Number(max)) {resultado = "E";}
		 else {
		   // si el número tiene comas y la parte entera tiene menos de numeroMaximo dígitos, recorta el número (excepto si es un decimal "raro"
		   if (numero.toString().length>numeroMaximo) {
		      resultado = numero.toString().substr(0, numeroMaximo);
	          if (resultado==="0.0") {resultado="0";}
		   } else {
		     resultado = numero;
		   }
           
		 }
	 
	 }
    return resultado;
  }
  
  function esEntero(numero){
	  // esta función devulve true si el número no tiene decimales
	  if (numero % 1 === 0) {
		return true;
	  } else {
			   return false;
			 }
}
  
  function pulsar0(){añadirNumero(0);}
  function pulsar1(){añadirNumero(1);}
  function pulsar2(){añadirNumero(2);}
  function pulsar3(){añadirNumero(3);}
  function pulsar4(){añadirNumero(4);}
  function pulsar5(){añadirNumero(5);}
  function pulsar6(){añadirNumero(6);}
  function pulsar7(){añadirNumero(7);}
  function pulsar8(){añadirNumero(8);}
  function pulsar9(){añadirNumero(9);}
  function pulsarDecimal(){añadirDecimal();}
  function pulsarAC(){borrarTodo();}
  function pulsarBorrar(){borrarUnCaracter();}
 
  function pulsarSumar() {añadirOperador("+");}
  function pulsarRestar() {añadirOperador("-");}
  function pulsarMultiplicar() {añadirOperador("*");}
  function pulsarDividir() {añadirOperador("/");}
  function pulsarIgual() {sePulsaIgual();}

