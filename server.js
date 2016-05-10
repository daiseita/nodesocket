var server = require('http').createServer(handler), 
        ip = "127.0.0.1", 
        port = 3100, 
        fs = require('fs'), 
        si = require('socket.io');

var path = require('path');　

//透過網 
function handler(request, response) { 
        fs.readFile('./index.html', function(err, data) { 
                if (err) 
                { 
                        response.writeHead(500, {'Content-Type':'text/plain'}); 
                        return response.end('Error loading msg.html'); 
                } 
                
                
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data); 
        }); 
}

　

server.listen(port, ip, function(){ 
        //node.js server 啟動並監聽時，所呈現的伺服器訊息 
        console.log("Server has started."); 
        console.log("WebSocket IP : " + ip); 
        console.log("WebSocket Port : " + port); 
});

function getThisTimeFormat(){
	   var n = new Date();	  
	   var year = n.getFullYear();
	   var month = n.getMonth()+1;
	   var Day = n.getDate();
	   var hour = n.getHours();
	   var minute = n.getMinutes();
	   var sec = n.getSeconds();
	   return  year + "/" + month + "/" + Day + " " + hour + ":" + minute + ":" +sec ;
}
//檢查alarm log
function FindLog(dir){
    var results = [];
     //console.log( "檔案搜尋:"); 
     fs.readdir(dir, function(err, list) {
       if (err){
       	console.log( err.toString()); 
        return "";
       }
       
       var pending = list.length;
       //console.log( "檔案數量:" + pending); 
       
       
       list.forEach(function(file) {
         file = path.resolve(dir, file);
         //console.log( file.toString()); 
         // ex:   Eq92055,F035,網路斷線,2016/04/16 12:33:20,3,11
         fs.readFile(file,'utf8', function(err, data) { 
                if (err) 
                { 
                   console.log("read file fail -");     
                }else{
                   console.log(data); 
                   //發送告警至客端
                   io.sockets.emit('msg', data); 
                }                                 
         });
         fs.unlink(file, function(err) {
            if (err) {
                console.log("delete file fail -");     
            }
            //刪除alarm log
            //console.log("File deleted successfully!");
         }); 
         
                   
       });
     });
 
    	
 }       
 
 function startFindLog(){
     setInterval(function() {                                                 
              FindLog("./alarm");
     }, 1000); 	
 }
 


var io = si.listen(server); 
var IsSearching ; IsSearching = false;

io.sockets.on('connection', function(socket) {
       if(IsSearching==false){startFindLog(); IsSearching=true;}
       
        //登入初始化 
        socket.on('login', function(data) 
        { 
                //伺服端訊息 
                console.log("-----------------------------"); 
                                
                var obj = new Object; 
                obj.name = data.name; 
                obj.msg = data.name + ' 已上線';                                 
                socket.name = data.name; 
                var timeInMs = getThisTimeFormat();
                console.log( timeInMs.toString()+" ["+  socket.name + "] 已登入"); 
               
                
        }); 
        //使用者離線
        socket.on('disconnect', function() 
        {               
               var timeInMs = getThisTimeFormat();
               console.log("-----------------------------"); 
               console.log( timeInMs.toString()+" ["+  socket.name + "] 已離線"); 
        });
        
        
        
});


