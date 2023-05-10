'use strict';

const express = require('express');
const morgan = require('morgan');
const dao = require('./qa-dao.js');
const { Question, Answer } = require('./qa.js');

const app = express();
app.use( morgan() );
app.use( express.json() );

// app.post('/api/vi/questions', (req, res) => {
// if we want ot have different version of the same API che can resolve it 
// by adding a prefix to the route v1, v2, and so on
app.post('/api/questions', (req, res) => {
    // console.log(req.body);
    const question = new Question(null, req.body.text, req.body.author, req.body.date);
    dao.createQuestion(question).then( (result) => {
        res.end()
    }).catch((error) => {
        res.status(500).send(error)
    }); 
});

app.get('/api/questions', (req, res) => {
    dao.listQuestions().then( (result) => {
        res.json(result)
    }).catch((error) => {
        res.status(500).send(error)
    });
});

app.get('/api/questions/:questionId/answers', (req, res) => {
});

app.post('/api/questions/:questionId/answers', (req, res) => {
});

app.delete('/api/anwers/:answerId', (req, res) => {
});

app.put('/api/answers/:answerId', (req, res) => {
});

app.put('/api/answers/:answerId/vote', (req, res) => {
});

// Start the server
app.listen(3000, () => console.log('Server started'));
//         ^^^^^ is the port number for the server on localhost in our case
