//Declaramos clase GastoCombustible.
class GastoCombustible {
  // Definimos el método constructor
  constructor(id, tipoVehiculo, fecha, kilometros, precioViaje) {
    this.id = id; //integer
    this.vehicleType = tipoVehiculo; //string
    this.date = new Date(fecha); //date
    this.kilometers = kilometros; //float
    this.precioViaje = precioViaje; //float
  }
}
