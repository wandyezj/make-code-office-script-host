const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devCerts = require("office-addin-dev-certs");

const localhost = true;

// Domain for the embedded data science editor iframe.
const domain = localhost
    ? "http://localhost:3232"
    : "";

const config = {
    mode: "production",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node-modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Make Code",
            template: "index.ejs",
            domain,
        }),
    ],
};

module.exports = async (env, argv) => {
    const o = config;

    // Only need to configure webserver in development mode
    if (argv.mode === "development") {
        config.devServer = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            https: getHttpsOptions(),
            port: 8080,
        };
    }
    return o;
};

async function getHttpsOptions() {
    const options = await devCerts.getHttpsServerOptions();

    return {
        cacert: options.ca,
        key: options.key,
        cert: options.cert,
    };
}
