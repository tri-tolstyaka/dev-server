const path = require("path");
const express = require("express");
const webpack = require("webpack");
const applyHbs = require("@tri-tolstiaka/templates");
const getModuleData = require("./utils/module-data");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const baseUrl = "/static";

const startServer = ({ port }) => {
	const moduleData = getModuleData();
	const appPath = `/${moduleData.name}`;
	applyHbs(app);

	const compiler = webpack({
		mode: "development",
		entry: moduleData.entryPoint,
		output: {
			filename: "index.js",
			path: path.resolve("dist"),
			libraryTarget: "umd",
			publicPath: `/static/${moduleData.name}/1.0.0/`,
		},
		resolve: {
			extensions: [".tsx", ".js", ".jsx", ".ts", ".json"],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
				},
			],
		},
	});

	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: `/static/${moduleData.name}/1.0.0/`,
		})
	);

	app.get(appPath, (req, res) => {
		// configuration is now copypasted from templates/start.js
		res.render("index", {
			title: "Tri tolstiaka",
			apps: JSON.stringify({
				[moduleData.name]: {
					version: "1.0.0",
				},
			}),
			// all pages and sub-pages
			navigations: JSON.stringify({
				[moduleData.name]: appPath,
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
		express
			.Router()
			.get(
				/\/([._-\w]+)\/([\w\d._-]+)\/(.*)/,
				require("./utils/get-module")
			)
	);
};

module.exports = startServer;
