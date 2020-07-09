var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/inventory', function(req, res, next) {
  var order=(req.body);
 order.status="submitted";
 order["inventory-version"] = "v2";
   console.log(order);
 // var inv = {"id": order.id, qty:1000};
 // inv.qty -= order.qty;  
  res.send(JSON.stringify(order));
});
module.exports = router;
