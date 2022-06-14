const express = require('express')
const app = express()
const cors = require('cors')
const users = require('./routes/users')
const food = require('./routes/food')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hesham:R3hab_Ra1n@cluster0.02oql.mongodb.net/food?retryWrites=true&w=majority')

const db = mongoose.connection
db.on('error' , () => console.log('err'))
db.once('open' , () => console.log('db connected'))

app.use(cors())
app.use(express.json())

app.use(users)
app.use(food)

app.listen(5000)