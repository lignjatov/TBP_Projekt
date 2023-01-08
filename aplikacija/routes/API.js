var express = require('express');
var http = require('http');
var router = express.Router();


router.get('/test1', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT * FROM PREGLED_PODATAKA WHERE uredaj='paps';"});
  returnData(data,res);
});

router.get('/test2', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT * FROM PREGLED_PODATAKA WHERE uredaj='tekst';"});
  returnData(data,res);
});

router.get('/aktivniSvi', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT id_senzora FROM svi_senzori WHERE zadnja_vrijednost>0;"});
  returnData(data,res);
});

router.get('/aktivniVrste', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT * FROM aktivni_senzori_po_grupi WHERE count>0;"});
  returnData(data,res);
});

router.get('/upitiSat', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT * FROM broji_upite_vrsta_u_vremenu;"});
  returnData(data,res);
});

router.get('/brzine/senzori', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT * FROM brzineInfo;"});
  returnData(data,res);
});


router.get('/topline/senzori', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT * FROM toplineInfo;"});
  returnData(data,res);
});

router.get('/svjetlost/senzori', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT * FROM svjetlostInfo;"});
  returnData(data,res);
});

router.get('/broj_upita_ukupno_u_satu', function(req, res, next) {
  var data = JSON.stringify({ksql: "SELECT * FROM senzori WHERE vrijeme>=FORMAT_TIMESTAMP(TIMESTAMPSUB(HOURS,1,FROM_UNIXTIME(UNIX_TIMESTAMP())),'HH:mm:ss','GMT+01') and vrijeme<=FORMAT_TIMESTAMP(FROM_UNIXTIME(UNIX_TIMESTAMP()),'HH:mm:ss','GMT+01');"});
  returnData(data,res);
});

function returnData(data, res){
  var options = {
    host: 'localhost',
    port: 8088,
    path: '/query',
    method: 'POST',
    headers: {
      'Accept':'application/vnd.ksql.v1+json'
  }};

  var str='';
  var request = http.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      str += chunk;
    });
  
    res.on('end', () => {
      console.log("Handing out data");
    });
  });
  request.on('error', function(e){
    console.log("Ne može se spojiti na server");
  })
  request.write(data);
  request.end();
  setTimeout(function(){
    res.setHeader("Content-Type","application/json");
    res.send(str);
  },1000);
}



module.exports = router;