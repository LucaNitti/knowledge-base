const express = require('express');
var expressMongoDb = require('express-mongo-db');
var bodyParser = require('body-parser');
const mongo = require('mongodb');
const url = 'mongodb://localhost:27017/knowledgeBase';

const app = express();
app.use(expressMongoDb(url));

app.use(express.static('dist'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/getAll', (req, res) => {
    // Find all documents in the collection
    console.log(req.db);
    req.db
        .collection('document')
        .find()
        .toArray((err, docs) => {
            res.send(docs);
        });
});
app.post('/api/save', (req, res) => {
    req.db.collection('document').insert(req.body);
    res.send({ greet: 'ciao' });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
