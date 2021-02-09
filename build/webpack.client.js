const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: './src/client/index.jsx',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../public')
    },
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
                    // 'style-loader',
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