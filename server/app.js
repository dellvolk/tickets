const express = require("express");
const app = express();
const connection = require("./database");
const cors = require("cors");
const consts = require("./const");
const query = require("./query");

const { cartData, productsData, dateFormatter } = consts;

const getDate = date => {
  let d = dateFormatter.format(date).toString().split("");
  d[0] = d[0].toUpperCase();
  return d.join("");
};

const getUID = req => {
  return req.headers.authorization.split("Token ")[1];
};

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
  let sql = "SELECT * FROM users";
  connection.query(sql, function(err, results) {
    // if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.get("/cart", (req, res) => {
  res.send(cartData);
});

app.get("/products", (req, res) => {
  connection.query(query.TICKETS(), function(error, results, fields) {
    if (error) {
      res.statusCode = 400;
      res.send(error);
    }
    res.send(results.map(i => ({
      ...i,
      date: getDate(i.date)
    })));
  });
  // res.send(productsData)
});

app.get("/filters", (req, res) => {
  connection.query(query.CATEGORIES(), function(error1, categories) {
    connection.query(query.CITIES(), function(error2, cities) {
      if (error1 || error2) {
        res.statusCode = 400;
        res.send({categories: [], cities: []});
      } else {
        res.statusCode = 200;
        res.send({categories, cities});
      }
    });
  });
  // res.send(productsData)
});

app.post("/cart", (req, res) => {
  connection.query(query.ADD_TO_CART(req.body), function(error, results, fields) {
    if (error) {
      console.log(error);
      res.statusCode = 400;
      res.send("Something went wrong");
      return void 0;
    }
    res.send(results);
  });
});

app.post("/buy", (req, res) => {
  connection.query(query.ADD_TO_ARCHIVE(req.body), function(error, results, fields) {
    if (error) {
      console.log(error);
      res.statusCode = 400;
      res.send("Something went wrong");
      return void 0;
    }
    res.send(results);
  });
});

app.post("/login", (req, res) => {
  connection.query(query.LOGIN(req.body), function(error, results, fields) {
    if (error || results.length === 0) {
      console.log(error);
      res.statusCode = 400;
      res.send("Username and password are invalid. Please enter correct username and password");
      return void 0;
    }
    res.send(results[0]);
  });
});

app.post("/register", (req, res) => {
  console.log(query.REGISTER(req.body));
  connection.query(query.REGISTER(req.body), function(error, results, fields) {
    if (error) {
      console.log(error);
      res.statusCode = 400;
      res.send("This email is in use");
      return void 0;
    }
    res.send(req.body);
  });
});

app.get("/product/:id", (req, res) => {
    connection.query(query.TICKET_BY_ID(req.params.id), function(error, results, fields) {
    if (error || results.length === 0) {
      res.statusCode = 404;
      res.send(error);
      return void 0;
    }
    res.send({
      ...results[0],
      date: getDate(results[0].date)
    });
  });
});

app.listen(9000, function() {
  console.log("App Listening on port 9000");
  connection.connect(function(err) {
    if (err) console.error(err);
    console.log("Database connected!");
  });
  // connection.end();
});
