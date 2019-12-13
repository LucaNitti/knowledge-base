const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Tag', tagSchema, 'tags');
