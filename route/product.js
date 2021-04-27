const jwt = require("jsonwebtoken");

module.exports = function (router, connection) {
  $query = 'CALL get_product("");';

  router.get("/product", (req, res) => {
    // var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("CALL get_product('')", function (err, docs, fields) {
      if (err) throw err;
      res.json({ docs:docs[0] });
    }); 
  });
  
  router.get("/cart", (req, res) => {
    // var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("CALL get_cart(5); SELECT tot_amount_cart(5) AS total;", [2,1],  function (err, docs, fields) {
      if (err) throw err;
      res.json({ docs:docs[0], total:docs[2][0].total });
    });
  });

  router.get("/order", (req, res) => {
    // var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("CALL get_order(5,'')",  function (err, docs, fields) {
      if (err) throw err;
      res.json({ order:docs[0]});
    });
    
  });
  router.get("/order-item", (req, res) => {
    // var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("CALL get_order_item(15);",  function (err, docs, fields) {
      if (err) throw err;
      res.json({ order_item:docs[0]});
    });
    
  });
  
  router.get("/transact", (req, res) => {
    // var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("SELECT * from transact where c_id=5;",  function (err, docs, fields) {
      if (err) throw err;
      res.json({ transact:docs });
    });
    
  });
  
  router.get("/details", (req, res) => {
    // var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("SELECT * from customer where c_id=5;",  function (err, docs, fields) {
      if (err) throw err;
      res.json({ details:docs });
    });
    
  });
};
