const path = require("path");

// if there are global node_modules at the project root directory
const getModulePath = (libName, libFilePath) =>
	path.resolve("../node_modules", libName, libFilePath);

module.exports = (req, res) => {
	const libName = req.params[0];
	const libVersion = req.params[1];
	const libFilePath = req.params[2];

	// If you are using npm links locally, then the search shoulf be in the root node_modules
	// if (libName === "fire.app") {
	// filePath = getModulePath("@tri-tolstiaka/fire.app", `dist/${libFilePath}`);
	// } else {...}
	// usual case
	let filePath = path.resolve("node_modules", libName, libFilePath);

	filePath = res.sendFile();
};
