const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    createdBy:{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: String
    },
    lastEditBy:{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tag', TagSchema);