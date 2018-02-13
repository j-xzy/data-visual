const socket = require('socket.io-client')();

socket.on('reload', function () {
  window.location.reload();
});