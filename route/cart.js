const jwt = require("jsonwebtoken");

module.exports = function (router, connection) {
    

  router.get("/cart", (req, res) => {

    var decoded = jwt.verify(req.headers["authorization"], "secret");

      connection.query("CALL get_cart("+decoded.c_id+"); SELECT tot_amount_cart("+decoded.c_id+") AS total;", [2,1],  function (err, docs, fields) {
        if (err) res.json({err});
        else res.json({ docs:docs[0], total:docs[2][0].total });
      });
  });

  router.post("/updcart", (req, res) => {
    var decoded = jwt.verify(req.headers["authorization"], "secret");
    
    if(req.body.quantity!=0){
        connection.query("CALL addToCart("+decoded.c_id+","+req.body.p_id+","+req.body.quantity+");",  function (err, docs, fields) {
          if (err) res.json({err});
          else res.json({ docs });
        });
      }
      else{
        connection.query("DELETE from cart where c_id="+decoded.c_id+" and p_id="+req.body.p_id+";",  function (err, docs, fields) {
          if (err) res.json({ err });
          else  res.json({ docs });
        });
      }
  })

  router.get("/placeorder", (req, res) => {
    var decoded = jwt.verify(req.headers["authorization"], "secret");

    connection.query("CALL place_order("+decoded.c_id+");",  function (err, docs, fields) {
      if (err) res.json({err});
      else res.json({ docs });
    });

  })
}