module.exports = {
  CATEGORIES: () => "SELECT * from categories",
  CITIES: () => "SELECT * from cities",
  CART: id => "select\n" +
    "\tc.id as id,\n" +
    "\tt.id as ticket,\n" +
    "    t.title,\n" +
    "    t.category,\n" +
    "    t.city,\n" +
    "    t.image,\n" +
    "    t.date,\n" +
    "    t.address,\n" +
    "    t.price,\n" +
    "    t.description\n" +
    "from\n" +
    "\tcart as c\n" +
    "\t\tINNER JOIN\n" +
    "\tv_tickets as t on c.ticket = t.id\n" +
    "\t\twhere c.user = " + id,
  IS_CART_BY_ID_AT_USER: (id, user_id) => `select * from cart where user = ${user_id} and ticket = ${id}`,
  ARCHIVE: id => "select\n" +
    "\tc.id as id,\n" +
    "\tt.id as ticket,\n" +
    "    t.title,\n" +
    "    c.count,\n" +
    "    t.category,\n" +
    "    t.city,\n" +
    "    t.image,\n" +
    "    t.date,\n" +
    "    t.address,\n" +
    "    t.price,\n" +
    "    t.description\n" +
    "from\n" +
    "\tarchive as c\n" +
    "\t\tINNER JOIN\n" +
    "\tv_tickets as t on c.ticket = t.id\n" +
    "\t\twhere c.user = " + id,
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
  ADD_TO_CART: (ticket, user ) => `INSERT INTO cart (user, ticket) VALUES ("${user}", "${ticket}")`,
  DELETE_FROM_CART: (id) => `DELETE FROM cart WHERE id = ${id}`,
  ADD_TO_ARCHIVE: (user, { ticket, count }) => `INSERT INTO archive (user, ticket, count) VALUES ("${user}", "${ticket}", "${count}")`,
  LOGIN: ({
            email,
            password
          }) => `SELECT id, email from users where password = "${password}" and email = "${email}" limit 1`,
  REGISTER: ({ email, password }) => `INSERT INTO users (email, password) VALUES ("${email}", "${password}")`
};
