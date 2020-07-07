var path    = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'none',
    entry:{
       "./minigame-adaptor.js" : "./src/index",
        "../../minigame-physx-demo/minigame-template/assets/minigame-adaptor.js": "./src/index",
        "../../minigame-physx-demo/minigame-template/minigame/assets/minigame-adaptor.js": "./src/index",
        "../../minigame-physx-demo/minigame-template/assets/unity/WXScripts.mgepackage/minigame-adaptor.js": "./src/index"
    },
    output:{
        path: path.resolve(__dirname, ""),
        filename: "[name]", // string

    },
    module: {
        rules: [
            {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
            },
            parser: {
                system: false
            }

            }
        ]
    },
    plugins: [
    ]
};

