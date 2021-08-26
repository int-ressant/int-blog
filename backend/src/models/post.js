const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    cover: {
        type: String,
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
    approved: {
        type: Boolean,
        default: false
    },
    suspended: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
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
    views: {
        count:{
            type: Number,
            default: 0       
        },
        firstView:{
            type: Date,
            default: Date.now()
        },
        lastView: {
            type: Date,
            default: Date.now()
        }
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

module.exports = mongoose.model('Post', PostSchema)