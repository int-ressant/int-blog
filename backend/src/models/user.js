const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    githubId: {
        type: String
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    password: {
        type: String
    },
    profilePicture:{
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    suspended: {
        status: {
            type: Boolean,
            default: false
        },
        reason: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Undefined"],
        default: "Undefined"
    },
    type: {
        type: String,
        enum: ["Staff", "Admin", "Member", "Regular" ],
        default: "Regular"
    },
    // set loginAttempts to 8
    loginAttempts: {
        type: Number,
        default: 8
    },
    followers: [
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
    ]
}, {
    timestamps: true,
    toJSON: {
        transform(doc, obj){
            obj.id = obj._id
            delete obj._id
        }
    }
});

module.exports = mongoose.model("User", UserSchema);

