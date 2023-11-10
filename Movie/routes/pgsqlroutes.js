// Importing the PostgreSQL client and setting up the Express app
const client = require('../Models/connectpgsql');
const express = require('express');
const app = express();
const router = new express.Router();
const body = require('body-parser');

// Parsing incoming request body as JSON
app.use(express.json());

// Parsing incoming request body as URL-encoded data
const bodyParser = body.urlencoded({ extended: false });

// Handling POST requests to add new data to the 'Movies' table
router.post('/todo', bodyParser, async (req, res) => {
    // Extracting data from the request body
    const { first_name, last_name } = req.body;

    // Insert query to add new data to the 'Movies' table
    // Note that               This means
    //                         table  and both columns
    //                           |         |      |
    const query = 'INSERT INTO Movies(first_name, last_name) VALUES($1, $2) RETURNING *';
    const values = [first_name, last_name];
    const result = await client.query(query, values);

    // Sending the inserted data as a JSON response
    res.json(result.rows);
});

// Handling GET requests to retrieve all data from the 'Movies' table
router.get('/get_todo', async (req, res) => {
    try {
        // Select query to retrieve all data from the 'Movies' table
        const query = 'SELECT * FROM Movies';
        const result = await client.query(query);

        // Sending the retrieved data as a JSON response
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching data');
    }
});

// Handling GET requests to retrieve data based on 'id' from the 'Movies' table
router.get('/todo/:id', async (req, res) => {
    try {
        // Extracting 'id' from the request parameters
        const { id } = req.params;

        // Select query to retrieve data based on 'id' from the 'Movies' table
        const query = 'SELECT * FROM Movies WHERE id = $1';
        const values = [id];
        const result = await client.query(query, values);

        // Sending the retrieved data as a JSON response or appropriate error message
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching data');
    }
});

// Handling PUT requests to update data in the 'Movies' table based on 'id'
router.put('/todo/:id', bodyParser, async (req, res) => {
    // Extracting 'id' from the request parameters and updated data from the request body
    const { id } = req.params;
    const { first_name, last_name } = req.body;

    // Update query to modify data based on 'id' in the 'Movies' table
    const query = 'UPDATE Movies SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *';
    const values = [first_name, last_name, id];
    const result = await client.query(query, values);

    // Sending a success message as a JSON response
    res.json("Name Updated!!");
});

// Handling DELETE requests to delete data from the 'Movies' table based on 'id'
router.delete('/todo/:id', bodyParser, async (req, res) => {
    // Extracting 'id' from the request parameters
    const { id } = req.params;

    // Delete query to remove data based on 'id' from the 'Movies' table
    const query = 'DELETE FROM Movies WHERE id = $1';
    const values = [id];
    const result = await client.query(query, values);

    // Sending a success message as a JSON response
    res.json("Deleted successfully");
});

module.exports = router;
