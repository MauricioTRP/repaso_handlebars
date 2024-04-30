// 1.- Importamos librerías
const express = require('express')
const exphbs = require('express-handlebars')

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
  res.render("admin", {
    layout: 'con_footer',
    configuraciones: ["dato1", "dato2", "dato3"]
  })
})

app.get("/productos", (req, res) => {
  res.render("productos")
})

app.get("/usuarios", (req, res) => {
  res.render("usuarios")
})