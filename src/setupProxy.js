const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://arcane-reaches-18869.herokuapp.com',
            changeOrigin: true,
        })
    );
};