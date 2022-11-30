const express = require('express')
const app = express()
const { port, start } = require("./modules/port")
const session = require("express-session")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, start)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
  secret: 'nodejs',
  saveUninitialized: true,
  resave: true
}))

app.use("/users", require("./routes/user.routes"))