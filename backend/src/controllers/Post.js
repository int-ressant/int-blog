const Newsletter = require('../models/newsletter');
const Post = require('../models/post');
const Tag = require('../models/tag');
const { fireError } = require('../config/error');

module.exports.create = async (req, res, next) => {
    try {
        //getting all required fields
        let { title, slug, body, cover, tags, schedule } = req.body;

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
            slug,
            body,
            tags: _tags,
            approved,
            author: req.user.id,
            schedule: {
                released: schedule.released ,
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
        const posts = await Post.find({approved: true, suspended: false, deleted: false})

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