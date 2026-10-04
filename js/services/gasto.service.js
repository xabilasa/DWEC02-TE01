var gastoAnual = {
  2020: 0,
  2019: 0,
  2018: 0,
  2017: 0,
  2016: 0,
  2015: 0,
};

function almacenarGastos() {
  //Primer bucle para recorrer el array de históricos, escribir e ir sumando los valores actualizados en localStorage
  GASTOS_DB.forEach((registro) => {
    let entrada = JSON.stringify(registro); // Se convierte cada elemento de la BBDD en string para localstorage
    let id = registro.id; //se recupera la id para asociar la entrada en localstorage
    localStorage.setItem(id, entrada); // se añade la entrada a localstorage
    //A partir de aqui se suman los valores en el objeto gastoAnual antes de llevarla a sessionStorage
    let anio = registro.date.getFullYear();
    let importe = registro.precioViaje;
    //Se comprueba si el valor de gasto anual es cero (o no existe) para actualizar su valor y que funcione al inicio del programa
    if (gastoAnual[anio] !== undefined) {
      gastoAnual[anio] += importe;
    } else {
      //si el valor es 0 se actualiza con el valor de la nueva entrada
      gastoAnual[anio] = importe;
    }
  });
  // Segundo bucle para escribir los valores actualizados después de cargar el histórico
  for (let anio in gastoAnual) {
    let valor = gastoAnual[anio].toFixed(2);
    sessionStorage.setItem(anio, valor);
  }
  pintarGastos();
}

function procesarGasto(jsonNuevoGasto) {
  let procesaJson = JSON.parse(jsonNuevoGasto); //parsea la nueva entrada de gastos en JSON
  //Genera un objeto de la clase desde el nuevo gasto recibido:
  const gasto = new GastoCombustible(
    procesaJson.id,
    procesaJson.vehicleType,
    procesaJson.date,
    procesaJson.kilometers,
    procesaJson.precioViaje,
  );
  // Se recoge el año de date y se recupera el valor desde sessionStorage para actualizarlo
  let anio = gasto.date.getFullYear();
  let valorAnio;
  // si existe (no es cero) el valor para el año del nuevo dato,  se actualiza sumando el nuevo valor
  if (sessionStorage.getItem(anio)) {
    valorAnio = parseFloat(sessionStorage.getItem(anio));
    valorAnio += gasto.precioViaje;
  } else {
    // si no existe (es cero) el nuevo valor es el mismo
    valorAnio = gasto.precioViaje;
  } //Aunque podría prescindir de la condición y sumar precioViaje en todos los casos, es más fiable comprobar si existe el valor.
  sessionStorage.setItem(anio, valorAnio.toFixed(2)); // Se añade el valor actualizado del año con el nuevo objeto
  pintarGastos();
}

//Función para pintar los valores actualizados en la interfaz
function pintarGastos() {
  for (let anio in gastoAnual) {
    // Se recorren los años con un bucle for-in
    let totalAnio = sessionStorage.getItem(anio);
    let elementoPintar = document.getElementById("gasto" + anio); //Se recogen las ids de
    if (elementoPintar) {
      //Nuevamente podríamos ahorrarnos la comprobación pero es más fiable hacerla
      elementoPintar.innerText = totalAnio + " €"; //Si la id del elelmento a pintar existe (coincide) se pinta el valor actualizado
    }
  }
}
//Variable para almacenar las funciones e invocarlas desde Main
const GastoService = {
  almacenarGastos,
  procesarGasto,
  pintarGastos,
};
