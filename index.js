const { response } = require("express");
const express = require("express");

const get_module_name = require("./utils/module_name");
const applyHbs = require("@tri-tolstiaka/templates");

const app = express();
const baseUrl = "/static";

const startServer = ({ port }) => {
	const moduleName = get_module_name();
	const appPath = `/${moduleName}`;
	applyHbs(app);

	app.get(appPath, (request, response) => {
		// cnfiguration is now copypasted from templates/start.js
		response.render("index", {
			title: "My app",
			apps: JSON.stringify({
				foo: {
					version: "1.0.0",
				},
			}),
			// all pages and sub-pages
			navigations: JSON.stringify({
				"dummy.main": "/dummy",
				"dummy.login": "dummy/login",
			}),
			config: JSON.stringify({}),
			baseUrl: "/static",
			fireAppVersion: "0.0.2",
		});
	});

	app.listen(port, () => {
		console.log(`server started at http://localhost:${port}${appPath}`);
	});

	app.use(
		baseUrl,
		(req, res, next) => {
			console.log("rq", req);
			next();
		},
		express.Router().get(/\/([\w.-_]+)\/([-\w\d.])\/(.*)/, (req, res) => {
			console.log(req.params);
		})
	);
};

module.exports = startServer;
