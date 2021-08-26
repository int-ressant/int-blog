const Tag = require('../models/tags');
const { fireError } = require('../config/error')
module.exports.createTag = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        if(!name) fireError({status: 401, message: "Insira o nome da tag"});
        
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}