const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
        mode: 'development',
        devtool: 'source-map',
        entry: './src/client/index.js',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
          
            host: 'localhost', // Defaults to `localhost`
            //port: 3000, // Defaults to 8080
            proxy: {
              '/test': 'http://localhost:8081'
            }
        },  
        output: {
            libraryTarget: 'var',
            library: 'Client'
        },
        module: {
            rules: [
                {
                    test: '/\.js$/',
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/client/views/index.html",
                filename: "index.html",
            }),
            new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
        })
        ]
}