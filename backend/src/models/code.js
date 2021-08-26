const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeSchema = Schema({
    email: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
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
module.exports = mongoose.model('Codes', CodeSchema)