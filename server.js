const express = require('express')
const app = express()
const port = 8080

app.use('/api', require('./server/routers/containers.router')());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})