
var net = require('net');
var clients = [];

net.createServer(function (socket) {
	socket.name = socket.remoteAddress + ":" + socket.remotePort 
	clients.push(socket);
	socket.on('data', function (data) {
     console.log(data.toString());
     sendMsg(socket.name + " abc \r\n", socket);
     
  });
  
  socket.on('end', function (data) {
     console.log('«ÈºÝ¤wÂ÷½u-'+ socket.name);
  });
  
  
  function sendMsg(message, sender) {
    clients.forEach(function (client) {
      
       //if (client === sender) return;
       client.write(message);
    });
    
    process.stdout.write(message)
  }
	
}).listen(1024);
console.log("socket running at port 1024\n");


