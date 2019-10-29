const express = require('express');
const os = require('os');
var bodyParser = require('body-parser');
const path_db = 'db';
var Datastore = require('nedb'),
    db = new Datastore({ filename: path_db, autoload: true });
db.loadDatabase(function(err) {
    // Callback is optional
    // Now commands will be executed
});

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/getAll', (req, res) => {
    // Find all documents in the collection
    db.find({}, function(err, docs) {
        res.send(docs);
    });
});
app.post('/api/save', (req, res) => {
    db.insert(req.body);
    res.send({ greet: 'ciao' });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
