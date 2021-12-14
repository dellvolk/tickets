const express = require("express");
const app = express();
const connection = require('./database');
const cors = require('cors')
const consts = require('./const')

const { cartData, productsData } = consts

app.use(cors())

app.get('/', function(req, res) {
  let sql = "SELECT * FROM users";
  connection.query(sql, function(err, results){
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.get('/cart', (req, res) => {
  res.send(cartData)
})

app.get('/products', (req, res) => {
  res.send(productsData)
})

app.get('/product/:id', (req, res) => {
  const product = productsData.find(i => i.id.toString() === req.params.id.toString())

  if (product) {
    res.send(product)
  } else {
    res.statusCode = 404;
    res.send('Not found')
  }
})

app.listen(9000, function(){
  console.log('App Listening on port 9000');
  connection.connect(function(err){
    if(err) console.error(err);
    console.log('Database connected!');
  })
  // connection.end();
});
