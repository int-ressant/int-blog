const Tag = require('../models/tag');
const defaultPaginationSize = parseInt(process.env.DEFAULT_PAGINATION_SIZE);
const { fireError } = require('../config/error')


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
        //pagination
        const _page = parseInt(req.query.page) || 1;
        const _offset = parseInt(req.query.offset) || defaultPaginationSize;
        const _query = {};
        const tags = await Tag.find(_query, { name: 1, slug: 1 }).skip((_page - 1) * _offset).limit(_offset).sort({ createdAt: -1})
        
        const _total = await Tag.countDocuments(_query);
        const _totalPages = Math.ceil(_total / parseInt(_offset));
        let _next = null;
        let _previous = null;
        if (_page < _totalPages) _next = _page + 1;
        if (_page > 1 && _total > 0) _previous = _page - 1;
        return res.status(200).json({
            message: "Sucesso",
            previous: _previous,
            next: _next,
            currentPage: _page,
            total: _total,
            data: tags
        })
  
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}