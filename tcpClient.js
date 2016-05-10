var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1024;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    //client.emit('end'); 
    client.write('I am Chuck Norris!');
    

});

// ?客?端添加“data”事件?理函?
// data是服?器?回的?据
client.on('data', function(data) {

    console.log('DATA: ' + data);
    
   // client.destroy();

});

// ?客?端添加“close”事件?理函?
client.on('close', function() {
    console.log('Connection closed');
});