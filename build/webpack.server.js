const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    target: 'node', // 本身就运行在服务端，不需要将node runtime的代码打包
    entry: './src/server/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        [ "@babel/preset-env", {
                            "targets": {
                                "chrome": "67" 
                            },
                            "useBuiltIns": "usage"
                        }],
                        "@babel/preset-react"
                    ]
                }
            },
            {
                test: /\.css?$/,
                use: [
                    // 'isomorphic-style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        })
    ]
}