const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            id:{
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    suspended: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, obj){
            obj.id = obj._id
            delete obj._id
        }
    }
})

module.exports = mongoose.model('Comment', CommentSchema)