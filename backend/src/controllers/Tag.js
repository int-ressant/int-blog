const Tag = require('../models/tags');
const { fireError } = require('../config/error')
module.exports.createTag = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        if(!name) fireError({status: 401, message: "Insira o nome da tag"});
        if(!slug) fireError({status: 401, message: "Insira o link da tag"});
        const createdTag = await Tag.create({
            slug: slug.toLowerCase(),
            name: name
        })
        if(createdTag){
            return res.status(201).json({
                message: "Tag criada com sucesso",
                data: createdTag
            })
        }
  
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}