const db = require("../models");
const jwt = require("../middleware/jwt");
const fs = require('fs');




// CREATION DE POST //

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
    return res.status(200).json(await db.Post.findAll())
}


// MODIFIER LE POST //

exports.modifyPost = async (req, res) => {

    try {

        const modifiedPost = JSON.parse(req.body.post);
        modifiedPost.imageUrl = req.file.filename;
        const userId = await jwt.getUserId(req);
        
        const post = await db.Post.findByPk(req.params.id);
        if(post === null) {
            return res.status(404).json({ error: "article introuvable"});
        }
        if(post.UserId != userId) {
            return res.status(403).json({ error: "Vous n'avez pas l'authorisation ou le post n'existe pas" });
        }

        
        
        // SUPPRIMER L'IMAGE //

        fs.unlink(`img_posts/${post.imageUrl}`, async (error) => {
            console.log(error);
            post.title = modifiedPost.title
            post.content = modifiedPost.content
            post.imageUrl = modifiedPost.imageUrl
    
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

        const userId = await jwt.getUserId(req);
        
        if(post.UserId != userId) {
            return res.status(403).json({ error: "Vous n'avez pas l'authorisation ou le post n'existe pas" });
        }

        fs.unlink(`img_posts/${post.imageUrl}`, async (error) => {
            console.log(error);

            await post.destroy();

            return res.status(201).json({ message: "Votre post vient d'être supprimé !"})
            
        });

    } catch(error) {
        return res.status(500).send(error.message);
    }
};
 



// LIKES //

exports.likePost = async (req, res) => {
    //Sur quel post on est ?
    const PostId = req.params.id;
    //Qui veut liker ?
    const UserId = await jwt.getUserId(req);
    //Existe-t-il un like ?
    let like = await db.Like.findOne({
        where: {
            PostId, //quoi
            UserId, //qui
        },
    });
    //Si oui
    if (like) {
        //Je le suprime
        await like.destroy();
        //Et je stop la requête
        return res.status(200).json(false);
    }
    //Si non
    //Je le crée
    like = await db.Like.create({
        PostId, //quoi
        UserId, //qui
    });
    //Et je stop la requête
    return res.status(201).json(true);
};





exports.likedPost = async (req, res) => {
    

}