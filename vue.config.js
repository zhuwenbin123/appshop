module.exports = {
    productionSourceMap:false,
    // 关闭eslint
    lintOnSave: false,
    devServer: {
        proxy: {
            "/api": {
                target: "http://39.98.123.211",
            },
        },
    },
}