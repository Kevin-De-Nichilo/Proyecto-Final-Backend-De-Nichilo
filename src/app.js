const mongoose = require("mongoose");
const OrderModel = require("./models/order.js");

const main = async () => {
  mongoose.connect(
    "mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/Pizza?retryWrites=true&w=majority&appName=Cluster0"
  );

  const resultado = await OrderModel.paginate(
    { tam: "familiar" },
    { limit: 2, page: 1 }
  );
  console.log(resultado);
};

main();

//2) Paginacion:
//Es un proceso que consiste en dividir los resultados de una consulta en bloques de datos.

//Instalamos: npm install mongoose-paginate-v2
//Usamos el método plugin en el order.js

const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas

app.get("/pizzas", async (req, res) => {
  const page = req.query.page || 1;
  const limit = 2;
  try {
    const pizzasListado = await OrderModel.paginate({}, { limit, page });

    //Recuperamos el docs:

    const pizzasResultadoFinal = pizzasListado.docs.map((pizza) => {
      const { _id, ...rest } = pizza.toObject();
      return rest;
    });

    res.render("pizzas", {
      pizzas: pizzasResultadoFinal,
      hasPrevPage: pizzasListado.hasPrevPage,
      hasNextPage: pizzasListado.hasNextPage,
      prevPage: pizzasListado.prevPage,
      nextPage: pizzasListado.nextPage,
      currentPage: pizzasListado.page,
      totalPages: pizzasListado.totalPages,
    });
  } catch (error) {
    console.log("Error en la paginacion", error);
    res.status(500).send("Error en el servidor, vamos a re morir todos");
  }
});

//Listen

app.listen(PUERTO);
