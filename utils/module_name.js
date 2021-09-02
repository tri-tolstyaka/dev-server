const path = require('path')

function get_module_name() {
    // find relative to the place where process was started
    const packagepath = path.resolve('package.json') 
    const module = require(packagepath)
    return cut_prefix(module.name)
}

function cut_prefix(packageName) {
    return packageName.replace(/^@.*\//,"")
}

module.exports = get_module_name