const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const get_module_name = require("./utils/module_name");
const applyHbs = require("@tri-tolstiaka/templates");
const path = require("path");

const app = express();
const baseUrl = "/static";

const startServer = ({ port }) => {
	const moduleName = get_module_name();
	const appPath = `/${moduleName}`;
	applyHbs(app);

	const compiler = webpack({
		mode: "development",
		entry: "./src/index.tsx",
		output: {
			filename: "[name].js",
			path: path.resolve("dist"),
			libraryTarget: "umd",
			publicPath: "/static/dummy/1.0.0/",
		},
		resolve: {
			extensions: [".tsx", ".js", ".jsx", ".ts", ".json"],
		},
		module: {
			rules: [
				{
					test: /\.tsx?s/,
					loader: "ts-loader",
				},
			],
		},
	});

	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: "/static/dummy/1.0.0/",
		})
	);

	app.get(appPath, (request, response) => {
		// cnfiguration is now copypasted from templates/start.js
		response.render("index", {
			title: "Our app: Tri-Tolstiaka",
			apps: JSON.stringify({
				[moduleName]: {
					version: "1.0.0",
				},
			}),
			// all pages and sub-pages
			navigations: JSON.stringify({
				[moduleName]: appPath,
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
