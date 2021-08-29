const Tag = require('../models/tags');
const { fireError } = require('../config/error')

module.exports.createTag = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        if(!name) fireError({status: 401, message: "Insira o nome da tag"});
        if(!slug) fireError({status: 401, message: "Insira o link da tag"});
        const exists = await Tag.exists({ $or: [ { name: name}, { slug: slug } ]})
        if(exists){
            return res.status(400).json({
                message: "Já existe uma tag com este nome ou este link",
                data: []
            })
        }
        const createdTag = await Tag.create({
            slug: slug.toLowerCase(),
            name: name,
            createdBy: {
                user: req.user.id,
                username: req.user.username 
            }
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
module.exports.updateTag = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, slug } = req.body;
        if(!name) fireError({status: 401, message: "Insira o nome da tag"});
        if(!slug) fireError({status: 401, message: "Insira o link da tag"});
        const tag = await Tag.findOne({_id: id})
        
        if(!tag){
            fireError({status: 404, message: "Tag inexistente"});
        }else if(tag.name == name || tag.slug == slug){
            return res.status(400).json({
                message: "Já existe uma tag com este nome ou este link",
                data: []
            })
        }
        tag.name = name;
        tag.slug = slug;
        tag.lastEditBy = {
            user: req.user.id,
            username: req.user.username 
        },
        tag.__v +=1
        if(tag.save()){
            return res.status(201).json({
                message: "Tag editada com sucesso",
                data: tag
            })
        }
  
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.getTags = async (req, res, next) => {
    try {
        const tags = await Tag.find({});
        return res.status(200).json({
            message: "",
            data: tags
        })
  
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}