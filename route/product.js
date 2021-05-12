const jwt = require("jsonwebtoken");

module.exports = function (router, connection) {

  router.post("/login", (req, res)=> {
    connection.query("SELECT c_id, name, email FROM customer WHERE email='"+ req.body.email +"' and password = md5('"+ req.body.password +"')", function(err, docs){
      if(docs !=""){
        console.log(docs);
        const payload = {
          c_id: docs[0].c_id,
          name: docs[0].name,
        }
        let token = jwt.sign(payload, 'secret', {
          expiresIn: '24h'
        })
        res.json({ token: token })
      } else {
        res.json({ error: 'User does not exist' })
      }
      if (err) res.json({err});
    })
  })

  router.post("/register", (req, res)=> {

    connection.query("CALL register('"+ req.body.name +"','"+ req.body.email +"','"+ req.body.password +"',"+ req.body.phone +",'"+ req.body.address+"')", function(err,docs){
      if (err) res.json({err});

      res.json({ docs });
    })
  })

  router.post("/product", (req, res) => {

    connection.query("CALL get_product('"+req.body.search+ "',"+req.body.cat_id+"); SELECT * from category where cat_id>0;" , function (err, docs, fields) {
        if (err) res.json({err});
        
        else res.json({ docs });
    }); 
  });
  
  router.get("/order", (req, res) => {

    var decoded = jwt.verify(req.headers["authorization"], "secret");

    connection.query("CALL get_order("+decoded.c_id+")",  function (err, docs, fields) {
      if (err) res.json({err});
      else res.json({ order:docs[0]});
    });
    
  });

  router.post("/order-item", (req, res) => {
    connection.query("CALL get_order_item("+req.body.o_id+");",  function (err, docs, fields) {
      if (err) res.json({err});
      else res.json({ docs: docs[0] });
    });
    
  });
  
  router.post("/delorder", (req, res) => {
    connection.query("DELETE FROM orders where orders.o_id="+req.body.o_id+";",  function (err, docs, fields) {
      if (err) res.json({err});
      else res.json({ docs: docs[0] });
    });
    
  });
  
  router.get("/transact", (req, res) => {
    var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("SELECT * from transact where c_id="+decoded.c_id+" order by transact.date desc, transact.t_id desc;",  function (err, docs, fields) {
      if (err) res.json({err});
      else res.json({ transact:docs });
    });
    
  });
  
  router.post("/addcoins", (req, res) => {
    var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("SELECT add_coins("+decoded.c_id+","+req.body.amt+") AS result;",  function (err, docs, fields) {
      if (docs[0].result==0) res.json({"msg0": "Exceeding the maximum limit"});
      else res.json({"msg1": "Coins added successfully" });
    });
    
  });
  
  router.get("/details", (req, res) => {
    var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("SELECT * from customer where c_id="+decoded.c_id+";",  function (err, docs, fields) {
      if (err) res.json({err});
      else res.json({ details:docs });
    });
  });

  router.post("/update", (req, res) => {
    var decoded = jwt.verify(req.headers["authorization"], "secret");
    connection.query("SELECT updDetails("+decoded.c_id+",'"+req.body.name+"',"+req.body.phone+",'"+req.body.address+"') AS msg;",  function (err, docs, fields) {
      console.log("SELECT updDetails("+decoded.c_id+",'"+req.body.name+"',"+req.body.phone+",'"+req.body.address+"') AS msg;");
      if (err) res.json({err});
      else res.json({docs: docs[0].msg});
    });
  });

};
