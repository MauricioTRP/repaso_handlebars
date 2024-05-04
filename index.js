// 1.- Importamos librerías
const express = require('express')
const exphbs = require('express-handlebars')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const _ = require('lodash')
const axios = require('axios')

// 2.- Instancia del servidor
const app = express()
app.listen(3000, () => {
  console.log("App escuchando el puerto 3000")
})

// 3.- Configurar motor de vistas
app.set("view engine", "handlebars")
app.engine("handlebars", exphbs.engine())

// 4.- importamos archivos de bootstrap y popper
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"))
app.use("/popper", express.static(__dirname + "/node_modules/@popperjs/core/dist/umd"))


// 5.- Definimos rutas
app.get("/admin", (req, res) => {
  console.log(uuidv4())
  res.render("admin", {
    layout: 'con_footer',
    configuraciones: ["dato1", "dato2", "dato3"]
  })
})

app.get("/productos", (req, res) => {
  // 30/05/1960
  // 30 de abril

  console.log(moment().format("DD/MM/YYYY"))
  console.log(moment().format("[Hoy es] DD [de] MMMM"))
  res.render("productos")
})

app.get("/usuarios", (req, res) => {
  res.render("usuarios")
})

app.get("/futuro", (req, res) => {
  const futuro = moment().add(10000, "days").format("[Estamos en el año] YYYY [y han pasado] YY [años], [hoy es:] DD/MMMM")

  res.send(futuro)
})

app.get("/separados", (req, res) => {
  const numeros = [1, 2, 3, 4, 5]

  console.log(_.partition(numeros, n => n % 2))
  res.send("Revisa la consola")
})

app.get("/rickymorty", (req, res) => {
  const url = "https://rickandmortyapi.com/api/character/1"

  axios
    .get(url)
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      res.send("Problemas al conseguir la data, intentalo de nuevo")
    })
})