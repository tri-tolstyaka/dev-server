const express = require('express')

const app = express()

const startServer = ({ port }) => {
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`)
    })
}

module.exports = { "startServer": startServer }