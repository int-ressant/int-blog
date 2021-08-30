const Newsletter = require('../models/newsletter');
const Post = require('../models/post');
const Tag = require('../models/tag');
const { fireError } = require('../config/error');

module.exports.create = async (req, res, next) => {
    try {
        //getting all required fields
        let { title, slug, body, cover, tags, schedule } = req.body;
        if (req.user.type != 'Staff' && req.user.type != 'Admin') fireError({message: "Você não tem permissão para realizar esta ação", status: 403});

        //getting the content inside the token
        if (!title) fireError({ message: "Indique um titulo para a postagem", status: 401 });
        if (!slug) fireError({ message: "Indique o link para a postagem", status: 401 });
        if (body.length < 100) fireError({ message: "Adicione mais conteudo para a postagem", status: 401 });

        //check if we have an post with the same title or slug
        const exists = await Post.findOne({ $or: [{ title: title }, { slug: slug }] });

        //fetch for post tag
        const tagExists = await Tag.exists({ _id: { $in: tags } });

        if (!tagExists) fireError({ message: "Selecione uma tag para a tua postagem.", status: 401 })

        if (exists && title == exists.title) fireError({ message: "Já existe uma postagem com o mesmo título.Escolha outro título", status: 401 })

        if (exists && slug == exists.slug) fireError({ message: "Já existe uma postagem com o mesmo link.Escolha outro link", status: 401 })

        let approved = false;
        if (req.user.type == 'Staff' || req.user.type == 'Admin') approved = true;
        
        //set post tags
        let _tags = []
        tags.map(tag => {
            return _tags.push({id: tag})
        })
        if(!schedule) schedule = {
            released: true,
            immediately: true,
            date: Date.now()
        } 
        const newPost = {
            title,
            slug: slug.toLowerCase(),
            body,
            tags: _tags,
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
        const posts = await Post.find({"schedule.released": true, approved: true, suspended: false}).populate('tags.id', 'id name slug')

        return res.status(200).json({
            message: "Sucesso",
            data: posts
        })

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const posts = await Post.find({});

        return res.status(200).json({
            message: "Sucesso",
            data: posts
        })

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.approvePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        //check if this user is an admin or staff to complete post approvement
        if (req.user.type != 'Staff' && req.user.type != 'Admin') fireError({message: "Você não tem permissão para realizar esta ação", status: 403});


        const exists = await Post.exists({_id: id});
        if(!exists) fireError({message: "Postagem inexistente", status: 404});

        //if post exists, we must approve it
        const approvedPost = await Post.findOneAndUpdate({_id: id}, { $set: { approved: true }}, {
            new: true,
            useFindAndModify: false
        });
        if(approvedPost){
            return res.status(200).json({
                message: "Postagem aprovada com sucesso",
                data: approvedPost
            })
        }
        fireError({message: "Houve um erro ao aprovar postagem", status: 304})

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}