const express = require('express');
const mongoose = require('mongoose');
const Document = require('./models/document');
var bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017/knowledgeBase';

const app = express();
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.static('dist'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/getAll', (req, res) => {
    // Find all documents in the collection
    res.send({ ciao: 'ciao' });
});

app.post('/api/save', (req, res) => {
    var obj = req.body;
    var doc = new Document(obj);

    doc.save(err => {
        if (err) return res.status(500).send({ err });
        return res.status(200).send({ doc });
    });
});

app.put('/api/save', (req, res) => {
    const id = req.body.id;
    let doc = req.body;
    delete doc['id'];
    console.log(id, doc);
    let objectId = mongoose.Types.ObjectId(id);
    Document.findByIdAndUpdate(objectId, doc, { new: true }, (err, doc) => {
        // Handle any possible database errors
        if (err) return res.status(500).send({ err });
        return res.send({ doc });
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
