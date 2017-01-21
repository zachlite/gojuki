module.exports = {
    entry: './js/game.js',
    output: {
        filename: 'bundle.js'
    },    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080
    }
}
