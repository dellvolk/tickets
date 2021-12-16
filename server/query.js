module.exports = {
  CATEGORIES: () => "SELECT * from categories",
  CITIES: () => "SELECT * from cities",
  CART: id => `SELECT * from cart where user = ${id}`,
  ARCHIVE: id => `SELECT * from archive where user = ${id}`,
  TICKETS: () => "select \n" +
    "\tt.id,\n" +
    "    t.title,\n" +
    "    cat.name as \"category\",\n" +
    "    cat.id as \"category_id\",\n" +
    "    cit.name as \"city\",\n" +
    "    cit.id as \"city_id\",\n" +
    "    t.image,\n" +
    "    t.date,\n" +
    "    t.address,\n" +
    "    t.price,\n" +
    "    t.description\n" +
    "from\n" +
    "\ttickets as t\n" +
    "\t\tINNER JOIN\n" +
    "\tcities as cit on cit.id = t.city\n" +
    "\t\tINNER JOIN\n" +
    "\tcategories as cat on cat.id = t.category",
  TICKET_BY_ID: id => "select \n" +
    "\tt.id,\n" +
    "    t.title,\n" +
    "    cat.name as \"category\",\n" +
    "    cat.id as \"category_id\",\n" +
    "    cit.name as \"city\",\n" +
    "    cit.id as \"city_id\",\n" +
    "    t.image,\n" +
    "    t.date,\n" +
    "    t.address,\n" +
    "    t.price,\n" +
    "    t.description\n" +
    "from\n" +
    "\ttickets as t\n" +
    "\t\tINNER JOIN\n" +
    "\tcities as cit on cit.id = t.city\n" +
    "\t\tINNER JOIN\n" +
    "\tcategories as cat on cat.id = t.category where t.id = " + id,
  ADD_TO_CART: ({ user, ticket }) => `INSERT INTO users (user, ticket) VALUES ("${user}", "${ticket}")`,
  DELETE_FROM_CART: (id) => `DELETE FROM cart WHERE id = ${id}`,
  ADD_TO_ARCHIVE: ({ user, ticket }) => `INSERT INTO users (user, ticket) VALUES ("${user}", "${ticket}")`,
  LOGIN: ({
            email,
            password
          }) => `SELECT id, email from users where password = "${password}" and email = "${email}" limit 1`,
  REGISTER: ({ email, password }) => `INSERT INTO users (email, password) VALUES ("${email}", "${password}")`
};
