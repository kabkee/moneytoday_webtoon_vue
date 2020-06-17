const path = require("path");

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://[::1]:3300',
                changeOrigin: true,
            },
            '/data': {
                target: 'http://[::1]:3300',
                changeOrigin: true,
            }
        }
    },
    outputDir: path.resolve(__dirname, "../../NodeJs/moneytoday_webtoon_server_nodejs/dist"),
}
