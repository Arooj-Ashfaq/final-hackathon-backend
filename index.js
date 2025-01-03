const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()
const mongodbUrl = 'mongodb://localhost:27017/finalhackathon'
const port = 5000

app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use('/user' ,userRoutes )
app.use('/note' ,noteRoutes )


mongoose.connect(mongodbUrl).then(() => {
  console.log("Database is connected")
}).catch((err) => {
  console.log(err)
})
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
