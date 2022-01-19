// variables de inicio
let valorIntroducido = "";
let sigoMostrando=true;
let palabraDeSalida = "q";

do {
  // se pide que se escriba algo
  valorIntroducido = window.prompt("Por favor, introduzca\nuno o dos números\nseparados por un espacio\n(escriba 'q' para salir)");

  // si es la palabra de salida, se sale del do
  if (valorIntroducido === palabraDeSalida) {sigoMostrando=false; break;}

  // recoge en un array todos los valores introducidos que haya separados por espacios
  let miArray = valorIntroducido.split(" ");

  // se eliminan los elementos vacíos del array para que solo queden strings no vacíos en el array
  let indice;
  do {
    indice = miArray.indexOf("");
    if (!(indice===-1)) {miArray.splice(indice,1);}
  }while (!(indice===-1))
 
  // si se ha introducido algún valor, comprobará si solo hay números y si el array es de 1 o 2 elementos
  if ((!(valorIntroducido === ""))&&(miArray.length>0)) {
    if (esArrayDeNumeros(miArray)){
      if (miArray.length>2) {
        alert ("Esto no es lo que se ha pedido.\nIntroduzca uno o dos números solo o bien 'q' para salir.");
      } else {
              console.log("Resultados:");
              switch(miArray.length){
                  case 1: // en el caso de que haya un solo número
                    let numero1 = miArray[0];
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
                  break;
                  case 2: // en el caso de que haya dos números
                    let valor1 = parseFloat(miArray[0]);
                    let valor2 = parseFloat(miArray[1]);
                    // faltaría añadir aquí una función para que se eliminen los ceros a la derecha del todo de la parte decimal
                    // esto no lo he hecho porque creo que no lo solicitaba así el enunciado
                    let suma = (valor1 + valor2).toFixed(3);
                    let resta = (valor1 - valor2).toFixed(3);
                    let multiplicacion = (valor1 * valor2).toFixed(3);
                    let division = (valor1 / valor2).toFixed(3);
                    let arrayResultados = [suma, resta, multiplicacion, division];

                    console.log("El resultado de la suma de " + valor1 + " más " + valor2 + " es: " + suma);
                    console.log("El resultado de la resta de " + valor1 + " menos " + valor2 + " es: " + resta);
                    console.log("El resultado de la multiplicación de " + valor1 + " por " + valor2 + " es: " + multiplicacion);
                    console.log("El resultado de la división entre " + valor1 + " y " + valor2 + " es: " + division);
                    
                    //console.log (arrayResultados);
                  break;
                }
              }
             }
    else {
      alert ("Esto no es lo que se ha pedido.\nIntroduzca uno o dos números solo o introduzca 'q' para salir.");
    }

  }
} while (sigoMostrando)


function esArrayDeNumeros(unArray){
  let todoNumeros=true;
  for (let i=0; i<unArray.length;i++){
    if (isNaN(unArray[i])) {
      todoNumeros=false;
      break;
    }
  }
  return todoNumeros;
}


function esEntero(numero){
  if (numero % 1 === 0) {
    return true;
  } else {
           return false;
         }
}

