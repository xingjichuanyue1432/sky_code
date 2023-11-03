module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', 
        changeOrigin: true,      
        ws: true,            
        secure: false,          
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
