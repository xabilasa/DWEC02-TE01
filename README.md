# 📘 DWEC02 - Tarea de Evaluación

## Calculadora de Costos de Combustible para una Empresa de Reparto

### 📝 Descripción general

Se desarrollará una aplicación web para calcular los costos de combustible de una empresa de reparto. Inicialmente, se cargará en el `localStorage` una lista de datos en formato JSON con un histórico de gastos de los viajes realizados por diferentes vehículos entre 2015 y 2020. Además, se almacenará en el `sessionStorage` la suma de los gastos de cada año.

Finalmente, la aplicación generará un gasto con datos aleatorios y habrá que sumar su importe al valor almacenado en el `sessionStorage`, en función del año al que corresponda dicho gasto.

> [!IMPORTANT]
> 
> - *En esta tarea no tienes que programar el funcionamiento del formulario ni modificar la interfaz. Estos elementos forman parte de la plantilla que te facilito.*
> 
> - *La parte correspondiente a la generación aleatoria de un gasto te la doy programada.*
> 
> - *Al final del fichero `main.js` encontrarás un bloque marcado como `(! NO TOCAR)`. No modifiques su contenido.*
> 
> - *Cuando hayas completado la tarea, descomenta el bloque completo para comenzar a generar gastos automáticamente y comprobar que funciona.*

### 🎯 Objetivos de aprendizaje

- Conocer e implementar la arquitectura de una aplicación web en entorno cliente.

- Utilizar estructuras de datos en JavaScript.

- Trabajar con el formato de intercambio de datos JSON.

- Repasar conceptos de Lenguaje de Marcas.

### 🛠️ Ejercicios

#### Ejercicio 1: Arquitectura

- Crea una estructura de directorios siguiendo la separación de responsabilidades explicada en la teoría e incluye los ficheros adjuntos en los directorios que correspondan.

- Enlaza el archivo `main.js` para que se ejecute cuando arranque la aplicación.

- Enlaza el archivo `style.css` para que se carguen los estilos cuando arranque la aplicación.

- Respeta el flujo de dependencias `main`,`service`,`data`y`model`, evitando dependencias innecesarias entre los distintos módulos.

#### Ejercicio 2: Acceso a datos

- Crea el modelo de datos `GastoCombustible` con los siguientes atributos:
  
  - `id` - int
  
  - `vehicleType` - string
  
  - `date` - Date
  
  - `kilometers` - float
  
  - `precioViaje` - float

> [!IMPORTANT]  
> Ten en cuenta que las fechas almacenadas en el JSON son cadenas de texto. Al crear cada objeto `GastoCombustible`, el atributo `date` debe contener un objeto de tipo `Date`.

- En el archivo `gasto.data.js`:
  
  - Copia el contenido de `historico.json` dentro de la constante `jsonHistorico` y procesa ese contenido como JSON para obtener los registros del histórico.
  
  - Haciendo uso del modelo de datos, guarda en `GASTOS_DB` un objeto de tipo `GastoCombustible` por cada registro que exista en el histórico.

#### Ejercicio 3: Servicio

En `gasto.service.js` tendrás que programar las siguientes funciones:

- `almacenarGastos()`
  
  - Recorre `GASTOS_DB` y almacena cada registro en el `localStorage`.
  
  - Guarda como clave el ID del gasto y, como valor, el objeto completo en formato JSON.
  
  - Calcula el gasto total para cada año utilizando la variable `gastoAnual` y guárdalo en el `sessionStorage`, teniendo en cuenta que la clave debe ser el año y el valor, el gasto total correspondiente a ese año.
  
  - Exporta las funciones del servicio a través de un objeto llamado `GastoService`.

> [!IMPORTANT]  
> Desde `main.js`, importa `GastoService` y ejecuta `almacenarGastos()` al arrancar la aplicación para cargar los datos iniciales en Web Storage.

- `procesarGasto()`
  
  - Descomenta el bloque indicado en la *Descripción general* de la tarea.
  
  - El programa empezará a generar un gasto con datos aleatorios cada 5 segundos —*gasto actual*— y llamará a la función `procesarGasto()`, pasándole el gasto actual en formato JSON como parámetro.
  
  - Para cada gasto actual, crea un objeto `GastoCombustible` y, en función del año en el que se realizó ese gasto, recupera del `sessionStorage` el gasto total de ese año, súmale el importe del gasto actual y actualiza el valor almacenado en `sessionStorage`.
