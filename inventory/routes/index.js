var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/inventory', function(req, res, next) {
  var order=(req.body);
 order.status="submitted";
 order["inventory-version"] = "v3";
   console.log(order);
 // var inv = {"id": order.id, qty:1000};
 // inv.qty -= order.qty;  
  setTimeout(function() {
    console.log("done...");

    res.send(JSON.stringify(order));
  }
   
  , process.env.TIMEOUT ||  3000);
  //res.send(JSON.stringify(order));
});
module.exports = router;
