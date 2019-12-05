const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});
module.exports = mongoose.model('Document', documentSchema, 'documents');
