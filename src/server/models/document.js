const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Document', documentSchema, 'documents');
