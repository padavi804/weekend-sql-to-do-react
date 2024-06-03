const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    console.log('in GET request');
    let queryText = 'SELECT * FROM "todo";';
    pool.query(queryText)
        .then((dbResult) => {
            console.log(`Got stuff back from the database`, dbResult);
            let todo = dbResult.rows;
            res.send(todo);
        })
        .catch((dbError) => {
            console.log('dbError:', dbError);
            res.sendStatus(500);
        })
});
// POST
router.post('/', (req, res) => {
    console.log('POST req.body', req.body);
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
router.put('/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let idToupdate = req.params.id;
    let complete = req.body.complete;

    let queryText;
    if (complete === true) {
        complete = false;
        queryText = 'UPDATE "todo" SET transfer=false WHERE id=$1;';
    } else if (complete === false) {
        queryText = 'UPDATE "todo" SET transfer=true WHERE id=$1;';
        complete = true;
        res.sendStatus(400);
    }

    console.log('transfer after if:', complete);

    pool.query(queryText, [idToupdate])
        .then(dbResult => {
            console.log(dbResult);
            res.sendStatus(200);

        })
        .catch(dbError => {
            console.log(dbError);
            res.sendStatus(500);
        })
});
// DELETE
router.delete('/:id', (req, res) => {

    console.log('req.params', req.params);
    let idToDelete = req.params.id

    console.log('typeof idToDelete', typeof idToDelete);

    let queryText = `DELETE FROM "todo" WHERE id = $1;`;

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
