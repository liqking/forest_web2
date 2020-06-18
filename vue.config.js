module.exports = {
  lintOnSave: false
}


module.exports = {
    devServer: {
        port:8888,
        proxy: {
            "/forest_sys": {
                target: "http://localhost:8080",
                // pathRewrite: {
                //     "^/api": "/"
                // }
            }
        }
    }
};