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




exports.getOnePost = async (req, res) => {

    try {
        const post = req.params.id;
        const UserId = await jwt.getUserId(req);


        db.Post.findOne({

            where: { 
                UserId, 
                post: post.id,
            },

        })

        .then(() => {

            return res.status(201).json({ message: "Votre post a été supprimé !"})

        })

        
    } catch (error) {

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

        const post = req.params.id;
        const UserId = await jwt.getUserId(req);
        

            db.Post.findOne({

                where: { 
                    UserId,
                    post: post.id

                },
    
            })


        .then((Post) => {

            if(!Post) {

                return res.status(403).json({ error: "Vous n'avez pas l'authorisation ou le post n'existe pas" });

            } else {

                Post.title = post.title,
                Post.content = post.content,
                Post.imageUrl = post.imageUrl

            }
            
            Post.save();
        })



        .then(() => {

            return res.status(201).json({ message: "Le post vient d'être modifié" });

        })


    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}





// SUPPRIMER LE POST //

exports.deletePost = async (req, res) => {

    try {
        const postId = req.params.id;
        await db.Post.destroy({
            
            where: {
                id: postId
            }
        });


        return res.status(201).json({ message: "Votre post vient d'être supprimé !"})

        

    } catch(error) {
        return res.status(500).send(error.message);
    }
};
 




 // const post = JSON.parse(req.body.post);
    // post.imageUrl = req.file.filename;
    // post.UserId = await jwt.getUserId(req);
    

    //     db.Post.findOne({

    //         where: { 
    //             UserId, 
    //             post: post.id,
    //         },

    //     })

    //     try {
    //         await db.Post.destroy(post);
    //         return res.status(201).json({ message: "Le post a été supprimé !"});
    //     } catch {
    //         return res.status(500).json({ message: error.message });
    //     }

// }




// .then((Post) => {

//     if(!Post) {

//         return res.status(403).json({ error: "Vous n'avez pas l'authorisation"})

//     } else {

//         return Post.destroy();

//     }

// })