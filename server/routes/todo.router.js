const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo";';
    pool.query(queryText)
        .then((dbResult) => {
            let songs = dbResult.rows;
            res.send(songs);
        })
        .catch((dbError) => {
            console.log('dbError:', dbError);
            res.sendStatus(500);
        })
});
// POST
router.post('/', (req, res) => {
    console.log('req.body', req.body);
    let newTodo = req.body;
    let note = newTodo.note;
    let complete = newTodo.complete;

    let queryText = `INSERT INTO "todo"	("note", "complete")
VALUES	($1, $2);`

    pool.query(queryText, [note, complete])
        .then(dbResult => {
            console.log('dbResult.rows', dbResult.rows);
            res.sendStatus(201);
        })
        .catch(dbError => {
            console.log('dberror', dbError);
            res.sendStatus(500);
        })
});
// PUT

// DELETE
router.delete('/:id', (req, res) => {

    console.log('req.params', req.params);
    let idToDelete = req.params.id

    console.log('typeof idToDelete', typeof idToDelete);
  
    let queryText = `DELETE FROM "songs" WHERE id = $1;`;

    // send it to the database
    pool.query(queryText, [idToDelete])
        .then(dbResult => {
            // unpack the results
            console.log(dbResult);
            // send the client a response, based on the results.
            res.sendStatus(200);
        })
        .catch(dbError => {
            // do error things
            console.log(dbError);
            // send the client a response, based on the results.
            res.sendStatus(500);
        })
});


module.exports = router;
