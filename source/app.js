const express = require('express')
const app = express()
const { port, start } = require("./modules/port")
const session = require("express-session")
const cookie = require("cookie-parser")
const recordame = require("./middlewares/recordame.middleware")
const cors = require("cors")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, start)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors());

app.use(session({
  secret: 'nodejs',
  saveUninitialized: true,
  resave: true
}))

app.use(cookie())
app.use(recordame)

app.use("/users", require("./routes/user.routes"))
app.use("/products", require("./routes/product.routes"))
app.use("/orders", require("./routes/order.routes"))