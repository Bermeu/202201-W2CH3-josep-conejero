// declaración de variables

let nombreUsuario = "";
let flights = [
  { id: 0, to: "Bilbao", from: "Barcelona", cost: 1600, scale: false },

  { id: 1, to: "New York", from: "Barcelona", cost: 700, scale: false },

  { id: 2, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },

  { id: 3, to: "Paris", from: "Barcelona", cost: 210, scale: false },

  { id: 4, to: "Roma", from: "Barcelona", cost: 150, scale: false },

  { id: 5, to: "London", from: "Madrid", cost: 200, scale: false },

  { id: 6, to: "Madrid", from: "Barcelona", cost: 90, scale: false },

  { id: 7, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },

  { id: 8, to: "Shangai", from: "Barcelona", cost: 800, scale: true },

  { id: 9, to: "Sydney", from: "Barcelona", cost: 150, scale: true },

  { id: 10, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

let totalPrecios = 0;
let costeMedioVuelos = 0;
let numeroVuelosConEscalas = 0;
let ultimos5Destinos = [];
let cadenaUltimos5Destinos = "";

// código principal

do {
  nombreUsuario = prompt("Introduce tu nombre :");
} while (nombreUsuario === "");

if (nombreUsuario !== null) {
  alert("¡Bienvenido a SkyLab Airlines, " + nombreUsuario + "!");
}

// se muestran los vuelos de forma amigable

flights.forEach(function (item, index, array) {
  let vuelo = item.id;
  let origen = item.from;
  let destino = item.to;
  let precio = item.cost;
  let realizaEscala =
    item.scale === true
      ? "realiza varias escalas."
      : "no realiza ninguna escala.";
  // muestra de forma amigable los vuelos
  console.log(
    "El vuelo número " +
      vuelo +
      " con origen: '" +
      origen +
      "' y destino: '" +
      destino +
      "' tiene un coste de " +
      precio +
      "€ y " +
      realizaEscala
  );
  // obtiene la suma de todos los precios para calcular después la media
  totalPrecios += precio;
  // obtiene el número de precios con escalas
  if (item.scale === true) {
    numeroVuelosConEscalas++;
  }
  // construye un array con los destinos de los últimos 5 vuelos
  if (index >= array.length - 5) {
    ultimos5Destinos.push(destino);
  }
});

// se calcula y se muestra el coste medio de todos los vuelos
costeMedioVuelos = (totalPrecios / flights.length).toFixed(2);
console.log("El coste medio de los vuelos es de " + costeMedioVuelos + "€.");

// se muestra el número de vuelos que efectúan escalas
console.log("Hay " + numeroVuelosConEscalas + " vuelos que efectúan escalas.");

// se muestran los últimos 5 destinos del día
cadenaUltimos5Destinos = "Los destinos de los últimos 5 vuelos de hoy son ";
for (let i = 0; i < ultimos5Destinos.length; i++) {
  if (i === ultimos5Destinos.length - 1) {
    // el último elemento del array de destinos
    cadenaUltimos5Destinos += " y " + ultimos5Destinos[i] + ".";
  } else {
    if (i === 0) {
      // el primer elemento del array de destinos
      cadenaUltimos5Destinos += ultimos5Destinos[i];
    } else {
      // el resto de elementos siempre que no sean el primero o el último
      cadenaUltimos5Destinos += ", " + ultimos5Destinos[i];
    }
  }
}
console.log(cadenaUltimos5Destinos);
