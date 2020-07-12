var express = require('express');
var router = express.Router();
var http = require("http");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.send("hello-v2");
});
module.exports = router;

router.post('/submit', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.product);
  console.log(req.body.id);
  req.body["order-version"] = "v3"; 
  var headers = {
      "Content-type": "application/json"
  }

  if (req.headers['end-user'] )
  {
    console.log(req.headers['end-user']);
    headers["end-user"] = req.headers["end-user"];
  }
  console.log(headers);
  var post_options = {
      host: process.env.BACKEND_URL || "192.168.0.110",
      port: process.env.BACKEND_PORT || "8080",
      path: "/inventory",
      method: "POST",
      headers: headers
  };
  console.log(post_options.host);
  var post_req = http.request(post_options, function(post_res) {
      var response='';
      post_res.setEncoding("utf8");
      post_res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          response+=chunk;
      });
      post_res.on('end', function () {
          res.send(response);
      });

  });

  post_req.write(JSON.stringify(req.body));
  post_req.end();

});

