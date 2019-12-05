const express = require('express');
const router = express.Router({ mergeParams: true });
const Document = require('../models/document');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    // Find all documents in the collection
    Document.find()
        .populate('tags')
        .exec((error, documents) => {
            if (error) return res.status(500).send({ error });
            return res.status(200).send({ documents });
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    if (!id) res.status(500).send({ error: 'not valid id' });
    Document.findById(id)
        .populate('tags')
        .exec((error, document) => {
            if (error) return res.status(500).send({ error });
            return res.status(200).send({ document });
        });
});

router.get('/search/:search', (req, res) => {
    let search = req.params.search;
    if (!search) res.status(500).send({ error: 'not valid search' });
    let searchObject = {
        $or: [{ title: { $regex: '.*' + search + '.*' } }, { content: { $regex: '.*' + search + '.*' } }],
    };

    Document.find(searchObject, (error, documents) => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({ documents });
    });
});

router.post('/save', (req, res) => {
    var obj = req.body;
    var document = new Document(obj);
    document.save(error => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({ document });
    });
});

router.put('/save', (req, res) => {
    const id = req.body.id;
    let document = req.body;
    document.lastModified = new Date();
    delete document['id'];
    let documentId = mongoose.Types.ObjectId(id);
    Document.findByIdAndUpdate(documentId, document, { new: true }, (error, document) => {
        // Handle any possible database errors
        if (error) return res.status(500).send({ error });
        return res.send({ document });
    });
});

module.exports = router;
