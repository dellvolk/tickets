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

app.get("/cart", (req, res) => {
  connection.query(query.CART(getUID(req)), function(error, results, fields) {
    if (error) {
      res.statusCode = 400;
      res.send([]);
      return void 0;
    }
    res.send(results.map(i => ({
      ...i,
      date: getDate(i.date),
      data_attr: 1,
      total: i.price
    })));
  });
});

app.get("/user", (req, res) => {
  connection.query(query.CART(getUID(req)), function(error, results, fields) {
    if (error) {
      res.statusCode = 400;
      res.send({ cart_count: 0 });
      return void 0;
    }
    res.send({ cart_count: results.length });
  });
});

app.get("/archive", (req, res) => {
  connection.query(query.ARCHIVE(getUID(req)), function(error, results, fields) {
    if (error) {
      res.statusCode = 400;
      res.send(error);
      return void 0;
    }
    res.send(results.map(i => ({
      ...i,
      date: getDate(i.date)
    })));
  });
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
        res.send({ categories: [], cities: [] });
      } else {
        res.statusCode = 200;
        res.send({ categories, cities });
      }
    });
  });
  // res.send(productsData)
});

app.post("/cart", (req, res) => {
  const uid = getUID(req);
  connection.query(query.IS_CART_BY_ID_AT_USER(req.body.ticket, uid), function(error, results) {
    const count = results?.length || 0;
    if (count === 0) {
      connection.query(query.ADD_TO_CART(req.body.ticket, uid), function(error, results, fields) {
        if (error) {
          res.statusCode = 400;
          res.send("Щось пішло не так. Спробуйте пізніше");
          return void 0;
        }
        res.send("Квиток успішно доданий у корзину");
      });
    } else {
      res.statusCode = 400;
      res.send("Цей квиток уже наявний у корзині");
    }
  });
});

app.post("/password-change", (req, res) => {

});

app.delete("/cart/:id", (req, res) => {
  connection.query(query.DELETE_FROM_CART(req.params.id), (error) => {
    if (error) {
      res.statusCode = 400;
      res.send("Something went wrong");
    } else {
      res.send("");
    }
  });
});

app.post("/buy", (req, res) => {
  connection.query(query.ADD_TO_ARCHIVE(getUID(req), req.body), function(error, results, fields) {
    if (error) {
      console.log(error);
      res.statusCode = 400;
      res.send("Something went wrong");
      return void 0;
    }
    if (req.body.cart_id) {
      connection.query(query.DELETE_FROM_CART(req.body.cart_id), () => {
      });
    }
    res.send({});
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
