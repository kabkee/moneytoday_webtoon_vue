module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://[::1]:3000',
                changeOrigin: true,
            },
            '/data': {
                target: 'http://[::1]:3000',
                changeOrigin: true,
            }
        }
    }
}
