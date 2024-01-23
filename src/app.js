const http = require("http");

// const server = http.createServer( (request, response)=> {
//     console.log("Se realizó una petición al servidor");
//     response.end("Miren, estoy programando sin manos!");
// } )

const PUERTO = 8080;

const express = require("express");

//Creamos una aplicación de express.

const app = express();

app.get("/", (req, res) => {
  //Cuando utilizo "/" estoy haciendo referencia a la ruta raíz de mi aplicación.
  res.send("Mi respuesta desde Express");
});

app.get("/tienda", (req, res) => {
  res.send("Bienvenido a la tienda");
});

app.get("/contacto", (req, res) => {
  res.send("Estamos en contacto ahora");
});

//Los métodos HTTP o verbos son los que nos permiten indicarle al servidor que tipo de acción queremos realizar. Los más utilizados:

//GET: pido datos al servidor.
//POST: envio info al servidor.
//PUT: lo uso para actualizar info en el servidor.
//DELETE: lo uso para borrar datos en el servidor.

app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

const arrayProductos = [
  { id: 1, nombre: "fideos", precio: 150 },
  { id: 2, nombre: "arroz", precio: 250 },
  { id: 3, nombre: "pan", precio: 350 },
  { id: 4, nombre: "leche", precio: 450 },
  { id: 5, nombre: "aceite", precio: 550 },
];

app.get("/productos", (req, res) => {
  //lo podemos retornar así:
  res.send(arrayProductos);
});

app.get("/productos/:id", (req, res) => {
  let id = req.params.id;
  //Viene como string.

  //console.log(id, typeof id);

  let producto = arrayProductos.find((producto) => producto.id == id);

  if (producto) {
    res.send(producto);
  } else {
    res.send("Producto no encontrado, vamos a morir!");
  }
});

//datos complejos se recomienda usar la linea:

app.use(express.urlencoded({ extended: true }));

app.get("/clientes", (req, res) => {
  let nombre = req.query.nombre;
  let apellido = req.query.apellido;

  res.send(`Bienvenido ${nombre} ${apellido}`);
});
