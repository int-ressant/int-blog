const Newsletter = require('../models/newsletter');
const Post = require('../models/post');
const Tag = require('../models/tag');
const { fireError } = require('../config/error');
const defaultPaginationSize = parseInt(process.env.DEFAULT_PAGINATION_SIZE);
module.exports.create = async (req, res, next) => {
    try {
        //getting all required fields
        let { title, slug, body, cover, tags, schedule } = req.body;

        //getting the content inside the token
        if (tags.length == 0) fireError({ message: "Indique no mínimo uma tag.", status: 401 });
        if (!title) fireError({ message: "Indique um titulo para a postagem", status: 401 });
        if (!slug) fireError({ message: "Indique o link para a postagem", status: 401 });
        if (body.length < 100) fireError({ message: "Adicione mais conteudo para a postagem", status: 401 });

        //check if we have an post with the same title or slug
        const exists = await Post.findOne({ $or: [{ title: title }, { slug: slug }] });


        if (exists && title == exists.title) fireError({ message: "Já existe uma postagem com o mesmo título.Escolha outro título", status: 401 })

        if (exists && slug == exists.slug) fireError({ message: "Já existe uma postagem com o mesmo link.Escolha outro link", status: 401 })

        let approved = true;
        //if (req.user.type == 'Staff' || req.user.type == 'Admin') approved = true;
        
        if(!schedule) schedule = {
            released: true,
            immediately: true,
            date: Date.now()
        } 
        const newPost = {
            title,
            slug: slug.toLowerCase(),
            body,
            tags: tags,
            approved,
            author: req.user.id,
            schedule: {
                released: schedule.immediately == true ? true : false ,
                immediately: schedule.immediately,
                date: schedule.immediately == true ? Date.now() : schedule.date
            },
            cover: cover || "https://avatars.githubusercontent.com/u/89281927?s=200&v=4"
        }
        const postCreated = await Post.create(newPost);

        if (postCreated) {
            tags.map(async (tag) => {
                let exists = await Tag.exists({name: tag, slug: tag.toLowerCase()});
                if(!exists){
                    await Tag.create({
                        name: tag,
                        slug: tag.toLowerCase(),
                        "createdBy.user": req.user.id,
                        "createdBy.username": req.user.username
                    })
                }
                
            })
            // const activeNewsletter = await Newsletter.find({
            //     $or: [
            //         { allTags: true },
            //         {
            //             tags: { $in: tags }
            //         }
            //     ],
            //     isActive: true
            // });


            let message = approved == true ? "Postagem adicionada com sucesso" : "Postagem adicionada á lista de aprovação";
            return res.status(200).json({
                message: message,
                data: []
            })
        }


    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.getActivePosts = async (req, res, next) => {
    try {
        //pagination
        const _page = parseInt(req.query.page) || 1;
        const _offset = parseInt(req.query.offset) || defaultPaginationSize;
        const _query = {"schedule.released": true, approved: true, suspended: false, deleted: false};
        //const _query = {"schedule.released": true, suspended: false, deleted: false};
        const posts = await Post.find(_query).skip((_page - 1) * _offset).limit(_offset).sort({ createdAt: -1}).populate("tags.id", "id name slug")
        
        const _total = await Post.countDocuments(_query);
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
            data: posts
        })

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        
        if (req.user.type != 'Staff' && req.user.type != 'Admin') fireError({message: "Você não tem permissão para realizar esta ação", status: 403});
        //pagination
        const _page = parseInt(req.query.page) || 1;
        const _offset = parseInt(req.query.offset) || defaultPaginationSize;
        const _query = {};
        const posts = await Post.find(_query).skip((_page -1) * _offset).limit(_offset).populate('tags.id', 'id name slug');
        const _total = await Post.countDocuments(_query);
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
            data: posts
        })

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}


module.exports.getBySlug = async (req, res, next) => {
    try{
        const { slug } = req.params;
        
        //get the post by slug
        const _post = await Post.findOne({
            slug: slug.toLowerCase(), 
            "schedule.released": true, 
            approved: true, 
            suspended: false
        }).populate('tags.id', 'id name slug');

        //if we have the post we will set the status to 200 else 404
        const status = _post ? 200 : 404;
        
        return res.status(status).json({
            message: _post ? "Postagem encontrada" : "Postagem inexistente",
            data: _post ? _post : {}
        })
    }catch(error){
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}


module.exports.addView = async (req, res, next) => {
    try{
        const { slug } = req.params;
        const validHosts = process.env.VALID_HOST.split(',');

        if(!validHosts.includes(req.headers.host)) fireError({message: "Você não tem permissão para realizar esta ação", status: 403});
        //get the post by slug
        let _post = await Post.findOneAndUpdate({slug: slug.toLowerCase()}, { 
            $set: { "views.lastView": Date.now() },
            $inc: { "views.count": 1}
        }, {
            new: true,
            useFindAndModify: false
        });
        //check if this post was viewed at least once
        if(_post && !_post.views.firstView){
            _post.views.firstView = Date.now();
            _post.save();
        }


        //if we have the post we will set the status to 200 else 404
        const status = _post ? 200 : 404;
        
        return res.status(status).json({
            message: _post ? "View adicionada com sucesso" : "Postagem inexistente",
            data: _post ? _post.views : {}
        })
    }catch(error){
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.adminActions = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { action } = req.query;

        if (req.user.type != 'Staff' && req.user.type != 'Admin') fireError({message: "Você não tem permissão para realizar esta ação", status: 403});
        
        if(!action) fireError({message: "Especifique a ação que deseja realizar", status: 401});
        let setAction;
        let message;
        switch(action){
            case 'approve':
                setAction = { approved: true }
                message: "Postagem aprovada com sucesso"
                break;
            case 'delete' :
                setAction = { deleted: true}
                message: "Postagem removida com sucesso"
                break;
            case 'suspend': 
                setAction = { suspended: true}
                message = "Postagem suspensa com sucesso"
                break;
            case 'unsuspend':
                setAction = { suspended: false}
                message = "Suspenção retirada com sucesso"
                break;
            default:
                fireError({message: "Ação invalida", status: 401});   
        }
        const _editedPost = await Post.findOneAndUpdate({_id: id}, {
            $set: setAction
        }, {
            new: true,
            useFindAndModify: false
        });
        if(_editedPost){
            return res.status(200).json({
                message: message,
                data: _editedPost
            })
        }else{
            return res.status(404).json({
                message: "Postagem inexistente",
                data: []
            })
        }
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.edit = async (req, res, next) => {
    try{
        const { id } = req.params;
        let { title, slug, cover, body, tags } = req.body;

        //check if the post exists
        const _post = await Post.findOne({_id: id});
        if(!_post) fireError({message: "Postagem inexistente", status: 404});

        if(!title && !slug && !cover && !body && !tags) fireError({message: "Todos campos estão vazios", status: 401 });

        if(tags && tags.length == 0) fireError({message: "Escolha uma no mínimo tag"});

        if(_post.author != req.user.id) fireError({message: "Você não pode realizar esta operação", status: 406});

        title = title || _post.title;
        slug = slug || _post.slug;
        cover = cover || _post.cover;
        body = body || _post.body;
        tags = tags || _post.tags;

        //check if any edits were made
        if(_post.title == title && _post.slug == slug && _post.cover == cover && _post.body == body && _post.tags == tags){
            fireError({message: "Nenhum alteração foi realizada", status: 417});
        }


        const editedPost = await Post.findOneAndUpdate({_id: id}, {
            $set: {title: title, slug: slug, cover: cover, body: body, tags: tags}
        }, {
            new: true,
            useFindAndModify: false
        });
        if(editedPost){
            tags.map(async (tag) => {
                let exists = await Tag.exists({name: tag, slug: tag.toLowerCase()});
                if(!exists){
                    await Tag.create({
                        name: tag,
                        slug: tag.toLowerCase(),
                        "createdBy.user": req.user.id,
                        "createdBy.username": req.user.username
                    })
                }  
            })
        }
        return res.status(201).json({
            message: "Postagem editada com sucesso", 
            data: editedPost
        })


    }catch(error){
        if (!error.statusCode) error.statusCode = 500;
        next(error)
    }
}