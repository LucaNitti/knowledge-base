const express = require('express');
const router = express.Router({ mergeParams: true });
const Tag = require('../models/tag');

router.get('/', (req, res) => {
    // Find all documents in the collection
    Tag.find((error, tags) => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({ tags });
    });
});

router.post('/save', (req, res) => {
    let tag = new Tag(req.body);
    tag.save(error => {
        if (error) return res.status(500).send({ error });
        Tag.find((error, tags) => {
            if (error) return res.status(500).send({ error });
            return res.status(200).send({ tags, tag: newTag });
        });
    });
});

module.exports = router;
