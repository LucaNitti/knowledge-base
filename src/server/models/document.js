const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: false,
        default: new Date(),
    },
    lastModified: {
        type: Date,
        required: false,
        default: new Date(),
    },
    content: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Document', documentSchema, 'documents');
