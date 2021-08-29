const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = Schema({
    email: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        required: true,
        min: 120
    },
    allTags: {
        type: Boolean,
        default: true
    },
    tags: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Tag'
            }
        }
    ]
})

module.exports = mongoose.model('Newsletter', newsletterSchema);