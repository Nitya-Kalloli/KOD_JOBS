const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_API_KEY}`);
      },
    })
  );
}; 