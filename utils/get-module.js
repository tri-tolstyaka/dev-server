const path = require("path");

// if there are global node_modules at the project root directory
const getModulePath = (libName, libFilePath) =>
	path.resolve("node_modules", libName, libFilePath);

module.exports = (req, res) => {
	const libName = req.params[0];
	const libVersion = req.params[1];
	const libFilePath = req.params[2];

	let filePath;
	if (libName === "fire.app") {
		// If you are using npm links locally, then the search should be in the root node_modules
		filePath = getModulePath("@tri-tolstiaka/fire.app", `dist/${libFilePath}`);
	} else {
		// usual case
		filePath = path.resolve("node_modules", libName, libFilePath);
	}

	res.sendFile(filePath);
};
