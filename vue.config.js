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
    }
}
