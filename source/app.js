const express = require('express')
const app = express()
const { port, start } = require("./modules/port")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, start)