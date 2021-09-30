const path = require("path");

module.exports = () => {
    const packagepath = path.resolve('tolst.config.js');
    return require(packagepath);
};
