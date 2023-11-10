const Pool  = require("pg").Pool;

const client = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Afraz@143",
    port: 5432,
  });
  client.query(`
  CREATE TABLE IF NOT EXISTS Movies (
    id serial PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
  );
`, (err, result) => {
    if (err) {
        console.error('Error creating the table:', err);
    } else {
        console.log('Table "Movies" created successfully');
    }
});
module.exports = client;