
  // variables de inicio
  let valorIntroducido = "";
  let sigoMostrando = false;
  let otroValor = true;

  do {

    let listaNumeros = [];

    do {

      let esNumerico = false;

      do {
        valorIntroducido=prompt("Introduzca un número.");
	if (isNaN(valorIntroducido)) {
          esNumerico=false;
          alert("Esto no es un número.");
        } else {
                 esNumerico=true;
                 if (!(valorIntroducido===null)) {
                   // se le quitan los espacios a los números introducidos con espacios porque no los considera NaN
		   listaNumeros.push(valorIntroducido.trim());
		 }
               }
      } while (esNumerico===false)

      console.log("Valores del array: ", listaNumeros);
      otroValor=confirm("¿Deseas introducir más valores?");

    } while (otroValor === true)

    //realiza las operaciones y las muestra
    if (listaNumeros.length>0) {calcularYMostrarResultados(listaNumeros);}

    sigoMostrando=confirm("¿Desea volver a realizar otra operación?");

  } while (sigoMostrando===true)

  if (sigoMostrando===false){alert("¡Hasta la próxima!");}


// -------------- a partir de aquí están las funciones ------------------
  

function esEntero(numero){
// esta función devulve true si el número no tiene decimales
  if (numero % 1 === 0) {
    return true;
  } else {
           return false;
         }
}


function calcularYMostrarResultados(arrayNumeros) {
  // esta función calcula y muestra los resultados de las operaciones con los números introducidos

  console.log("Resultados:");
  // en el caso de que haya un solo número  
  if (arrayNumeros.length === 1){
    let numero1 = arrayNumeros[0];
      if (numero1 >= 0) {
        let raiz = Math.sqrt(numero1);
        let raizCon0Decimales = raiz.toFixed(0); 
        let raizCon3Decimales = raiz.toFixed(3); 
        if (esEntero(raiz)) {
          console.log("El resultado de la raíz cuadrada es: " + raizCon0Decimales);
        } else {
                console.log("El resultado de la raíz cuadrada de " + numero1 + " es: " + raizCon3Decimales);
               }
      } else {
              alert("No se puede calcular la raíz cuadrada de un número negativo.");
             }
  } else {
  // en el caso de que haya dos o más números
  
           let suma = sumarNumerosArray(arrayNumeros);
           let resta = restarNumerosArray(arrayNumeros);
           let multiplicacion = multiplicarNumerosArray(arrayNumeros);
           let division = dividirNumerosArray(arrayNumeros);

	   suma = valorConDecimales(suma, 3);
	   resta = valorConDecimales(resta, 3);
	   multiplicacion = valorConDecimales(multiplicacion, 3);
                     
           console.log("El resultado de la suma de los valores introducidos es: " + suma);
           console.log("El resultado de la resta de los valores introducidos es: " + resta);
           console.log("El resultado de la multiplicación de los valores introducidos es: " + multiplicacion);

           // si se divide por '0', no se puede obtener un resultado
           if (!(isNaN(division))) {
             division = valorConDecimales(division, 3);
             console.log("El resultado de la división de los valores introducidos es: " + division);
           } else {
		   console.log("El resultado de la división no es posible. No se puede dividir entre 0.");
                  }

	   // arrayResultados muestra los resultados de todas las operaciones
           let arrayResultados = [suma, resta, multiplicacion, division];
           console.log (arrayResultados);
         }
}


function sumarNumerosArray(arrayNumeros) {
  let suma = 0;
  arrayNumeros.forEach(function(item, index, array) {
    suma += parseFloat(item); //    suma += parseFloat(array[index]); //también funcionaría
    })
  return suma;
}


function restarNumerosArray(arrayNumeros) {
  // al primer elemento del array se le restarán el resto de elementos
  let resta = parseFloat(arrayNumeros[0]);
  for (let i=1; i<arrayNumeros.length; i++){
    resta -= parseFloat(arrayNumeros[i]);
  }
  return resta;
}


function multiplicarNumerosArray(arrayNumeros) {
  let multiplicacion = 1;
  arrayNumeros.forEach(function(item, index, array) {
    multiplicacion *= parseFloat(item); //    multiplicacion *= parseFloat(array[index]); //también funcionaría
    })
  return multiplicacion;
}


function dividirNumerosArray(arrayNumeros) {
  // el primer elemento del array se dividirá entre el resto de elementos
  let division = parseFloat(arrayNumeros[0]);
  for (let i=1; i<arrayNumeros.length; i++){
    division /= parseFloat(arrayNumeros[i]);
  }
  return division;
}

function valorConDecimales(numero, decimales){
// esta función devuelve un número que tuviera decimales con un número determinado de decimales (solo si no es entero)
if (esEntero(numero)){
  return numero;
} else {
	return numero.toFixed(decimales);
       }
}