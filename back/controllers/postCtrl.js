const db = require("../models");
const jwt = require("../middleware/jwt");
const fs = require('fs');




// CRÉATION DE POST //

exports.createPost = async (req, res) => {
    
    const post = JSON.parse(req.body.post);
    post.imageUrl = req.file.filename;
    post.UserId = await jwt.getUserId(req);


    try {
        await db.Post.create(post);
        return res.status(201).json({ message: "Post Ajouté !"});
    } catch {
        return res.status(500).json({ message: error.message });
    }
}




// AFFICHER TOUS LES POSTS //

exports.getAllPost = async (req, res) => {

    const allPosts = await db.Post.findAll({

        order: [
            ['createdAt', 'DESC'],
        ]
        
    })
    
    return res.status(200).json(allPosts)
}





// MODIFIER LE POST //

exports.modifyPost = async (req, res) => {

    try {

        const modifiedPost = JSON.parse(req.body.post);
        modifiedPost.imageUrl = req.file.filename;
        const userId = await jwt.getUserId(req);
        
        const post = await db.Post.findByPk(req.params.id);
        const user = await db.User.findByPk(userId);
        
        if(post === null) {
            return res.status(404).json({ error: "article introuvable"});
        }


        if(post.UserId != userId && !user.admin) {
            return res.status(403).json({ error: "Vous n'êtes pas authorisé à modifier/supprimer tous les posts" });
        }


        
        
        
        // SUPPRIMER L'IMAGE //

        fs.unlink(`img_posts/${post.imageUrl}`, async (error) => {
            
            // Modifier tout le contenu du post //
            post.title = modifiedPost.title
            post.content = modifiedPost.content
            post.imageUrl = modifiedPost.imageUrl
            
            user.admin = modifiedPost.admin
    
            await post.save();
    
            return res.status(201).json({ message: "Le post vient d'être modifié" });
            
        });

    } catch(error) {

        return res.status(500).json({ message: error.message });
        
    }

}





// SUPPRIMER LE POST //

exports.deletePost = async (req, res) => {

    try {
        const post = await db.Post.findByPk(req.params.id);
        const userIdDeletePost = await jwt.getUserId(req);
        
       const user = await db.User.findByPk(userIdDeletePost);
        
        if(post === null) {
            return res.status(404).json({ error: "article introuvable"});
        }

        if(post.UserId != userIdDeletePost && !user.admin) {
            return res.status(403).json({ error: "Vous n'êtes pas authorisé à modifier/supprimer tous les posts" });
        }

        fs.unlink(`img_posts/${post.imageUrl}`, async (error) => {

            await post.destroy();

            return res.status(201).json({ message: "Votre post vient d'être supprimé !"})
            
        });

    } catch(error) {
        return res.status(500).send(error.message);
    }
};
 



// LIKES //

exports.likePost = async (req, res) => {
    // Sur quel post on est ?
    const PostId = req.params.id;
    // Qui veut liker ?
    const userId = await jwt.getUserId(req);
    // Existe-t-il un like ?
    let like = await db.Like.findOne({
        where: {
            PostId, // quoi
            UserId : userId, // qui
        },
    });
    // Si oui
    if (like) {
        //Je le suprime
        await like.destroy();
        // Et je stop la requête
        return res.status(200).json(false);
    }
    // Si non
    // Je le crée
    like = await db.Like.create({
        PostId, // quoi
        UserId : userId, // qui
    });
    // Et je stop la requête
    return res.status(201).json(true);
};



// ENLEVER LE LIKE DU POST //

exports.likedPost = async (req, res) => {
    
    // Sur quel post on est ?
    const PostId = req.params.id;
    // Qui veut liker ?
    const userId = await jwt.getUserId(req);
    // Existe-t-il un like ?
    let liked = await db.Like.findOne({
        where: {
            PostId, // quoi
            UserId : userId, // qui
        },
    });
    // Si oui
    return res.status(200).json(liked !== null);

}

