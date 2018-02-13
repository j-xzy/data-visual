const express = require('express');
const webpack = require('webpack');
const opn = require('opn');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const config = require('./webpack.dev');
let compiler = webpack(config);

// 代码更新后刷新页面
io.on('connection', function (socket) {
  if (compiler._plugins['done'].length > 1) {
    delete compiler._plugins['done'].pop();
  }
  compiler.plugin('done', function () {
    socket.emit('reload');
  }.bind(this));
});

const proxy = require('http-proxy-middleware');
let proxyConfig = proxy({
  target: 'http://localhost:8000',
  changeOrigin: true
});

app.use('/proxy', proxyConfig);

app.use(require('connect-history-api-fallback')());

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  quiet: true
});
app.use(devMiddleware);

server.listen('8080', () => {
  opn('http://localhost:8080');
});