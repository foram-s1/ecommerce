const express = require('express')
const bodyParser = require('body-parser')
var api = require('./route')
const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// MySQL Code goes here


app.use('/api', api)

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))