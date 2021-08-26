const Post = require('../models/post');
const { fireError } = require('../config/error');

module.exports.create = async (req, res, next) => {
    try {
        //getting all required fields
        const { title, slug, body, cover } = req.body;
        //getting the content inside the token
        console.log(req.user)
        return res.status(200).json({
            message: "Doing what ?",
            data: []
        })
  
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}