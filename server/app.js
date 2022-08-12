const express = require('express')
const app = express()
const port = 8081
const cors = require('cors')
const route = require('./route')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors("http://localhost:3000"))

app.use('/api/v1', route)



app.listen(port, () => {
    console.log("App is running on the port", port)
})