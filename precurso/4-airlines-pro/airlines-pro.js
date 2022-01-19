
// declaración de variables

let nombreUsuario = "";
let flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

let totalPrecios = 0;
let costeMedioVuelos = 0;
let numeroVuelosConEscalas = 0;
let ultimos5Destinos = [];
let cadenaUltimos5Destinos = "";
let tipoUsuario = "";
let deseaComprar = true;
let precioMaximo = 0;
let esPrecioValido = true;
let arrayIDs = [];
let deseaSalir = false;
let idDeseado = 0;
let esIDValido = true;
let accionAdmin;
let vueloParaBorrar;
let seguirBorrando = true;
let deseaAñadir = true;
let nuevoID;
let nuevoOrigen = "";
let nuevoDestino = "";
let nuevoPrecio = 0;
let tieneEscalas;

// código principal

do {
  nombreUsuario = prompt("Introduce tu nombre :");
} while ((nombreUsuario==="")||(sonTodoEspacios(nombreUsuario)))

if (!(nombreUsuario===null)) {alert ("¡Bienvenido a SkyLab Airlines, " + nombreUsuario + "!");}

// se muestran los datos de los vuelos de forma amigable
flights.forEach(function(item, index, array) {
  let vuelo = item.id;
  let origen = item.from;
  let destino = item.to;
  let precio = item.cost;
  let realizaEscala = (item.scale===true) ? "realiza varias escalas." : "no realiza ninguna escala.";
  // muestra de forma amigable los vuelos
  console.log ("El vuelo número " + vuelo + " con origen: '" + origen + "' y destino: '" + destino + "' tiene un coste de " +
                precio + "€ y " + realizaEscala);
  // obtiene la suma de todos los precios para calcular después la media
  totalPrecios += precio;
  // obtiene el número de precios con escalas
  if (item.scale===true) {numeroVuelosConEscalas++;}
  // construye un array con los destinos de los últimos 5 vuelos
  if (index>=(array.length-5)) {ultimos5Destinos.push(destino);}
})

// se calcula y se muestra el coste medio de todos los vuelos
costeMedioVuelos = (totalPrecios/flights.length).toFixed(2);
console.log("El coste medio de los vuelos es de " + costeMedioVuelos + "€.");

// se muestra el número de vuelos que efectúan escalas
console.log("Hay " + numeroVuelosConEscalas + " vuelos que efectúan escalas.");

// se muestran los últimos 5 destinos del día
cadenaUltimos5Destinos = "Los destinos de los últimos 5 vuelos de hoy son ";
for (let i=0; i<ultimos5Destinos.length;i++){
  if (i===ultimos5Destinos.length-1) { // el último elemento del array de destinos
    cadenaUltimos5Destinos += " y " + ultimos5Destinos[i] + ".";
  } else {
          if (i===0) { // el primer elemento del array de destinos
            cadenaUltimos5Destinos += ultimos5Destinos[i];
          } else { // el resto de elementos siempre que no sean el primero o el último
                  cadenaUltimos5Destinos += ", " + ultimos5Destinos[i];
                 }
         }
}
// se muestran los 5 últimos destinos en la consola
console.log(cadenaUltimos5Destinos);

// -------------------------------------------------------------------
// aquí empieza la parte específica que corresponde a airlines-pro.js
// -------------------------------------------------------------------

// pide al usuario si es el 'admin' o el 'user'
do {
  tipoUsuario = prompt("Escribe ADMIN si eres el administrador.\nEscribe USER si eres un usuario.\nPulsa 'Esc' para salir.");
  if (!(tipoUsuario===null)) {tipoUsuario = tipoUsuario.toLowerCase();}
} while ((!(tipoUsuario==="user")) && (!(tipoUsuario==="admin")) && (!(tipoUsuario===null)))

if (!(tipoUsuario===null)) {

  switch (tipoUsuario){
    case 'user': // si es el usuario USER
      deseaComprar = confirm("¿Desea comprar un billete?");
      if (deseaComprar) {
        do {
  
          arrayIDs = []; // array de enteros donde se guardarán los ids de los vuelos con precio menor o igual que precioMaximo
          precioMaximo = prompt("Escriba el precio máximo que pagaría por un vuelo (o pulse 'Esc' para salir).");
          if (precioMaximo===null) {deseaSalir=true;}
          else {
                esPrecioValido = esNumeroValido(precioMaximo);
                if (esPrecioValido) {
                  //muestra los vuelos que cuesten igual o menos que el precio máximo
                  crearArrayIDs (precioMaximo);
                  
                  if (arrayIDs.length>0) {
                      // si el arrayIDs no está vacío, se puede comprar el vuelo
                      console.log("Los vuelos con un precio máximo de " + precioMaximo + " son:");
                      mostrarVuelosPorID(arrayIDs); // muestra los vuelos con precio igual o menor que precioMaximo
                      do {
                        idDeseado = prompt("Escriba el ID del vuelo que le interesa comprar (o pulse 'Esc' para salir).");
                          if (idDeseado===null) {
                            deseaSalir=true;
                          } else {
                            if (idEnArray(arrayIDs, idDeseado)===true) {
                              alert("Gracias por su compra, vuelva pronto.");
                              deseaSalir=true;
                            } else {
                              esIDValido=false;
                              alert("Lo que ha introducido no es válido.");
                            }
                          }
                      } while ((esIDValido===false) && (deseaSalir===false))
                  } else { // si el arrayIDs está vacío
                    alert ("No hay ningún vuelo más barato de ese precio.");
                    deseaSalir=false;
                    esPrecioValido=false;
                  }
                } else {
                  esPrecioValido=false;
                  alert("Por favor, introduzca solo un valor numérico (o pulse 'Esc' para salir).");
                }
          } //del else
        } while ((esPrecioValido===false) && (deseaSalir===false)) //del do
  
      } //del if
    break; // del case 'user'

    case 'admin': // si es el usuario ADMIN
      do {
        accionAdmin = prompt("Escriba 'a' para añadir un vuelo, 'b' para borrar un vuelo o pulse 'Esc' para salir.");
        if (!(accionAdmin===null)) {accionAdmin = accionAdmin.toLowerCase();}
      } while (!(accionAdmin==="a") && !(accionAdmin==="b") && !(accionAdmin===null))

      if (!(accionAdmin===null)) { // si no se pulsa 'Esc'
        switch (accionAdmin) {
  
          // para añadir un vuelo
          case 'a':
  	    deseaAñadir = true;
	    do {
	      // comprueba si flights tiene ya 15 vuelos
              if (flights.length<15) {
  	          nuevoID = prompt ("Añada un nuevo ID para un nuevo vuelo\n(ha de ser un número que no exista ya).");
		  // si no se pulsa 'Esc'
	          if (!(nuevoID===null)) {
		      // si es un número válido	
		      if (esNumeroValido(nuevoID)) {
		        // si ya existe el ID
		        if (existeID(flights, nuevoID)) {
			  alert("Este ID ya existe.\nPor favor, introduzca otro que no exista.");
			  deseaAñadir=true;
		        } else {
			         // si no es un número negativo
			         if (nuevoID>=0) {


				   // llama a una function que genera las distintos prompts para añadir un vuelo
				   // devuelve true si se ha conseguido añadir algo y false si no se ha añadido
			           if (vueloCorrecto(nuevoID)===true) {
				           mostrarTodosLosVuelos(); 
                   alert ("El vuelo se ha añadido correctamente.");
				          deseaAñadir=true;
				         } else {
					         alert("No se ha añadido el vuelo. Inténtelo de nuevo.");
					         deseaAñadir=true;
				         } 
			         } else {
					  alert("El ID no puede ser negativo.");
					  deseaAñadir=true;
				        }	
			       }
		      } else {
			       alert("No es válido. Ha de ser un número entero.");
			       deseaAñadir=true;
		             }
	          } else {
			   deseaAñadir=false;
		         }
	      } else {
		       alert("Lo sentimos, pero no puede añadir más de 15 vuelos.\n¡Hasta la próxima!");
		       deseaAñadir=false;
		     }
	    } while (deseaAñadir===true)

          break; // del case 'a'

          // para borrar un vuelo
          case 'b':
            do {
              vueloParaBorrar = prompt("Escriba el ID del vuelo que desea borrar.");
              if (vueloParaBorrar===null) {
                seguirBorrando=false;
              } else {
		       if (esNumeroValido(vueloParaBorrar)) {
                         if (borrarVuelo(flights, vueloParaBorrar)===true) {
                                 mostrarTodosLosVuelos();
                                 // comprobar que ya no quedan vuelos
                                 if (flights.length>0) {
   				   if (confirm("Vuelo borrado. ¿Desea borrar alguno más?")===true) {
   				     seguirBorrando=true;
 		                   } else { // aquí no se desea borrar más
	 			  	    seguirBorrando=false;
        	                          }
                                 } else {alert ("Ya no quedan más vuelos para borrar."); seguirBorrando=false;}
                         } else { //aquí no se ha borrado ningún vuelo
                                  // o no quedan vuelos
                                  alert("El ID que ha introducido no corresponde a ningún vuelo.");
                                }
                       } else { // aquí no es un número válido
                                alert("Lo que ha introducido no es válido.");
                              }
		     }
	    } while (seguirBorrando)
            if (seguirBorrando===false) {alert("¡Hasta la próxima!");}

          break; // del case 'b'

        } // del switch (a, b) variable accionAdmin
      } // del if de si accionAdmin es null


    break; // del case 'admin'

  } // del switch (admin, user)
}


// ------------------ funciones ------------------------

// devuelve true si es un número entero sin espacios; false en caso contrario
function esNumeroValido(valor) {
  if ((isNaN(valor)) || (valor==="")) {
    return false;
  } else {
          if (valor.indexOf(" ")===-1) {return true;} else {return false;}
         }
}


// crea un array de enteros con los ids de los vuelos que tengan un precio igual o menor que precioMaximo
function crearArrayIDs (precioMaximo) {
  flights.forEach(function(item, index, array) {
    let vuelo = item.id;
    let precio = item.cost;
    if (parseFloat(precio)<=parseFloat(precioMaximo)) {arrayIDs.push(vuelo);}
  })
}
 

// muestra todos los datos de los vuelos del array 'flights' 
// cuyos 'id' coincidan con los ids que hay en el array de enteros 'arrayIDs'
function mostrarVuelosPorID(arrayIDs){
  flights.forEach(function(item, index, array) {
    let vuelo = item.id;
    let origen = item.from;
    let destino = item.to;
    let precio = item.cost;
    let realizaEscala = (item.scale===true) ? "realiza varias escalas." : "no realiza ninguna escala.";
    // muestra de forma amigable los vuelos
    for (let i=0; i<arrayIDs.length;i++) {
      if (vuelo===arrayIDs[i]) {
        console.log ("El vuelo número " + vuelo + " con origen: '" + origen + "' y destino: '" + destino + "' tiene un coste de " +
                      precio + "€ y " + realizaEscala);
      }
    }
})

}


// comprueba si en un array de números está el valor 'valor'
// devuelve true si lo encuentra; false en caso contrario
function idEnArray(array, valor){
  let resultado = false;
  for (let i=0; i<array.length; i++){
    if (parseFloat(valor)===parseFloat(array[i])) {resultado=true;} 
  }
  return resultado;
}


// borra un vuelo del array 'flights' que coincida con el identificador 'id'
function borrarVuelo(array, id){
  let borrado = false;
  let i=0;
  if (array.length>0) {
      while (i<array.length) {
          if (parseFloat(array[i].id)===parseFloat(id)) {
            array.splice(i, 1);
            borrado = true;
            break;
          }
          i++;
      }
  }
  return borrado;
}


// muestra todos los datos de los vuelos del array 'flights'
function mostrarTodosLosVuelos(){
  flights.forEach(function(item, index, array) {
    let vuelo = item.id;
    let origen = item.from;
    let destino = item.to;
    let precio = item.cost;
    let realizaEscala = (item.scale===true) ? "realiza varias escalas." : "no realiza ninguna escala.";
    // muestra de forma amigable los vuelos
    console.log ("El vuelo número " + vuelo + " con origen: '" + origen + "' y destino: '" + destino + "' tiene un coste de " +
                  precio + "€ y " + realizaEscala);
  })
}


// devuelve true si en el array 'flights' existe el identificador 'id'
// devuelve false si no existe
function existeID(array, id){
  let existe = false;
  let i=0;
  if (array.length>0) {
      while (i<array.length) {
          if (parseFloat(array[i].id)===parseFloat(id)) {
            existe = true;
            break;
          }
          i++;
      }
  }
  return existe;
}


// añade un vuelo nuevo (pide todos los datos a través de prompts
// devuelve true si lo consigue; false si se cancela y no se añade un nuevo vuelo
function vueloCorrecto(nuevoID) {
  do {
    nuevoOrigen = prompt("Escriba la ciudad de ORIGEN del nuevo vuelo.");
  } while (!(nuevoOrigen===null) && (sonTodoEspacios(nuevoOrigen)))

  // si el origen no es null
  if (!(nuevoOrigen===null)) {
    do {
      nuevoDestino = prompt("Escriba la ciudad de DESTINO del nuevo vuelo.");
    } while (!(nuevoDestino===null) && (sonTodoEspacios(nuevoDestino)))

    // si el destino no es null
    if (!(nuevoDestino===null)) {

      do {
        nuevoPrecio = prompt("Indique el precio del nuevo vuelo. No puede ser negativo.");
      } while (!(nuevoPrecio===null) && !(esNumeroValido(nuevoPrecio)) && (nuevoPrecio<0))

      // si el precio no es null
      if (!(nuevoPrecio===null)) {
        do {
          tieneEscalas = prompt ("Escriba 's' si tiene escalas y 'n' si no tiene escalas.");
          tieneEscalas = tieneEscalas.toLowerCase(); 
        } while (!(tieneEscalas===null) && (!(tieneEscalas==='s')) && (!(tieneEscalas==='n')))

        // si tieneEscalas no es null
        if (!(tieneEscalas===null)) {
          // para pasar a true o false el hecho de que tenga escalas
          let tieneEscalasBoolean;
          if (tieneEscalas==="s") {tieneEscalasBoolean=true;}
          else {if (tieneEscalas==="n") {tieneEscalasBoolean=false;}}
          // se crea un objeto para añadirlo a 'flights'
          let vuelo = {id:nuevoID, to:nuevoOrigen, from:nuevoDestino, cost:nuevoPrecio, scale:tieneEscalasBoolean};
          flights.push(vuelo);
          return true;


        } else { // si tieneEscalas es null
                 return false;
               }
      } else { // si el precio es null
               return false;
             }
    } else { // si el destino es null
             return false;
           }
  } else { // si el origen es null
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