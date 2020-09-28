module.exports = {
    runtimeCompiler: true,
    pluginOptions: {
        proxy: {
            enabled: true,
            context: '/api',
            options: {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
}