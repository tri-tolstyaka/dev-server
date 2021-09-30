const path = require('path')

function cutPrefix(packageName) {
    return packageName.replace(/^@.*\//, "")
}

function getModuleData() {
    // find relative to the place where process was started
    const packagePath = path.resolve('package.json') 
    const moduleData = require(packagePath)
    return {
        version: moduleData.version,
        entryPoint: moduleData.main,
        name: cutPrefix(moduleData.name),
    }
}

module.exports = getModuleData