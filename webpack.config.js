const path = require('path');
const {IgnorePlugin} = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const {merge} = require('webpack-merge');

const drawPath = path.resolve(__dirname, 'node_modules/@olympeio/draw');

const common = {
    entry: './src/main.js',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {test: /\.js$/, enforce: "pre", use: "source-map-loader"},
            {test: /\.js$/, enforce: "pre", use: "webpack-import-glob-loader"},

        ]
    },
    resolve: {
        alias: {
            '@olympeio': path.resolve(__dirname, 'node_modules/@olympeio'),
            '@olympeio-extensions': path.resolve(__dirname, 'node_modules/@olympeio-extensions')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Copy({patterns: [
            {from: 'res'},
            {from: drawPath + '/version.json', to: 'version.json'}
        ]})
    ],
    ignoreWarnings: [{message: /Empty results for "import '\.\/bricks\/\*\*\/\*\.js'"/}]
};

const server = {
    devServer: {
        port: 8888,
        client: {
            overlay: {
                warnings: false
            }
        },
        static: {
            directory: path.join(__dirname, 'dist/server')
        },
        devMiddleware: {
            writeToDisk: true
        }
    }
};

const draw = {
    name: 'draw',
    output: {path: path.join(__dirname, 'dist/draw'), globalObject: 'this'},
    resolve: {
        alias: {olympe: drawPath}
    },
    plugins: [
        new Copy({patterns: [
            {from: drawPath + '/index.html', to: 'index.html'},
            {from: drawPath + '/images', to: 'images'},
            {from: drawPath + '/fonts', to: 'fonts'},
            {from: drawPath + '/css', to: 'css'},
            {from: drawPath + '/doc', to: 'doc'},
            {from: drawPath + '/maintenance', to: 'maintenance'},
        ]})
    ]
};

const web = {
    name: 'web',
    output: {path: path.join(__dirname, 'dist/web'), globalObject: 'this'},
    resolve: {
        alias: {olympe: path.resolve(__dirname, 'node_modules/@olympeio/runtime-web')}
    }
};

const node = {
    name: 'node',
    output: {path: path.join(__dirname, 'dist/node'), globalObject: 'this'},
    target: 'node',
    resolve: {
        alias: {olympe: path.resolve(__dirname, 'node_modules/@olympeio/runtime-node')}
    },
    plugins: [new IgnorePlugin({resourceRegExp: /better-sqlite3|tedious|mysql|mysql2|oracledb|pg-native|pg-query-stream|@vscode\/sqlite3/})],
    ignoreWarnings: [
        {module: /fast-json-stringify/, message: /Can't resolve 'long'/},
        {module: /pino/, message: /Can't resolve 'pino-pretty'/},
        {module: /knex/, message: /Critical dependency: the request of a dependency is an expression/},
    ]
};

module.exports = [merge(common, server, draw), merge(common, server, web), merge(common, node)];
