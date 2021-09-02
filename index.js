const { response } = require('express')
const express = require('express')

const get_module_name = require('./utils/module_name')

const app = express()

const startServer = ({ port }) => {
    const moduleName = get_module_name()
    const appPath = `/${moduleName}`

    app.get(appPath, (request, response) => {
        response.send(`
            <body>
                <h1>Hello ${moduleName}</h1>
            </body>
        `)
    })

    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}${appPath}`)
    })
}

module.exports = startServer