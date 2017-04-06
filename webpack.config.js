const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        party: "./static/gojuki-client.js",
        shared: "./static/shared/shared.js"
    },
    output: {
        filename: './static/dist/[name].bundle.js'
    },    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015"]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8080
    }
}
