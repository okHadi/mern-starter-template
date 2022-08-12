const express = require('express')
const app = express()
const port = 8081

const route = require('./route')

app.use('blogs/api/v1', route)



app.listen(port, () => {
    console.log("App is running on the port", port)
})