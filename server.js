var http = require('http');
var fs = require('fs');

function parseInstCust(str){
    var result = 0;
    for(var i=str.length-1;i>=0;i--){
      if(str[i].search(/\D/ig)!= -1)
        return false;
      else{
        result += str[i]*Math.pow(10,str.length-1-i);
      }
    }
    return result;
}

http.createServer(function(req, res){
  if(req.url.indexOf('/api') != -1){
      var x = req.url;
      var arr = x.split('/api/');
      // check if it is unix or natural time based data;
      var intVal = parseInstCust(arr[1]);
      console.log(intVal);
      if(intVal != false){
      var date = new Date(intVal);
    }
    else {
      var st = arr[1].replace(/%20/g," " );
      console.log(st);
      var date = new Date(st);
    }
    console.log(date);
    if(date != 'Invalid Date'){
      res.writeHead(200, {'content-type' : 'application/json' });
      res.end(JSON.stringify({
          unix : date.getTime(),
          natural : date.toDateString()
       }));
     }
     else{
       res.writeHead(200, {'content-type' : 'application/json' });
       res.end(JSON.stringify({
           unix : null,
           natural : null
        }));
     }
  }
  else if(req.url === "/"){
    res.writeHead(200 , {'content-type' : 'text/html'});
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  }
  else{
      res.writeHead(404 , {'content-type' : 'text/html'});
      fs.createReadStream(__dirname + '/notfound.html').pipe(res);
  }
}).listen(1337,'127.0.0.1');
