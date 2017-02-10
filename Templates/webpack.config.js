"use strict";

var path = require("path");

module.exports = {
    entry: {
        "RadioSystems.React": "./Modules/RadioSystems.React/ReactBase/index.js"
    },
    output: {
        filename: "./Modules/[name]/Scripts/Orchard.React.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: "./node_modules/",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.json$/,
                exclude: "./node_modules/",
                loader: 'json'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                exclude: "./node_modules/",
                loaders: ['file']
            },
            {
                test: /(\.css|\.scss)$/,
                exclude: "./node_modules/",
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                exclude: "./node_modules/",
                loaders: ['file']
            }
        ]
    }
};