var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1024;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    //client.emit('end'); 
    client.write('I am Chuck Norris!');
    

});

// ?��?�ݲK�[��data���ƥ�?�z��?
// data�O�A?��?�^��?�u
client.on('data', function(data) {

    console.log('DATA: ' + data);
    
   // client.destroy();

});

// ?��?�ݲK�[��close���ƥ�?�z��?
client.on('close', function() {
    console.log('Connection closed');
});