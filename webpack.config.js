module.exports = {
    entry: {
        party: "./js/party.jsx",
        game: "./js/game/game.js"
    },
    output: {
        filename: './dist/[name].bundle.js'
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
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080
    }
}
