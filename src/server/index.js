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

app.get('/api/get', (req, res) => {
    // Find all documents in the collection
    Document.find((error, documents) => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({ documents });
    });
});

app.get('/api/get/:id', (req, res) => {
    let id = req.params.id;
    if (!id) res.status(500).send({ error: 'not valid id' });
    Document.findById(id, (error, document) => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({ document });
    });
});

app.post('/api/save', (req, res) => {
    var obj = req.body;
    var document = new Document(obj);
    document.save(error => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({ document });
    });
});

app.put('/api/save', (req, res) => {
    const id = req.body.id;
    let document = req.body;
    delete document['id'];
    console.log(id, document);
    let documentId = mongoose.Types.ObjectId(id);
    Document.findByIdAndUpdate(documentId, document, { new: true }, (error, document) => {
        // Handle any possible database errors
        if (error) return res.status(500).send({ error });
        return res.send({ document });
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
