const db = require("../models");
const jwt = require("../middleware/jwt");


// CRUD //

// CREATION DE POST //

exports.createPost = async (req, res) => {
    
    try {
        
        const title = req.body.title;
        const content = req.body.content;
        const imageUrl = req.body.imageUrl;
        const UserId = await jwt.getUserId(req);
        if(!title || !content) {

            return res.status(400).json({ error: "Informations manquantes"});

        }

        let Post = await db.Post.findOne({ where: { title }});
        
        if(Post) {

            return res.status(400).json({ error: "Titre déjà Existant"});

        }
        
        Post = await db.Post.create({

            title,
            content,
            imageUrl, 
            UserId,

        });

        return res.status(200).json({ message: "Post Ajouté !", Post });

        } catch (error) {

            return res.status(500).json({ message: error.message  });
            
        }

    }




// AFFICHER UN SEUL POST EN FONCTION DE SON ID //

exports.getOnePost = async (req, res) => {

try {

    const PostId = req.params.id;
    const Post = await db.Post.findOne({ 
        where: { id: PostId }, 
        include: [db.User],
    
    });

    if(!Post) {

        return res.status(400).json({ error: "Le Post est Inexistant" });

    }

    
    return res.status(200).json({ Post });
        
    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

};




// AFFICHER TOUS LES POSTS //

exports.getAllPost = async (req, res) => {

    try {

        const Post = await db.Post.findAll({ 
        include: [{ 
            model: db.User, 
            attributes: ["firstname"] }],
            order: [["createdAt", "DESC"]]
        })

        if(!Post) {

            return res.status(400).json({ error: "Aucun Post" });
        }

        return res.status(200).json({ Post });
    
    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}



// MODIFIER LE POST //

exports.modifyPost = async (req, res) => {

    try {
        const UserId = await jwt.getUserId(req);
        const PostId = req.params.id;

        if(!req.body) {

            return res.status(400).json({ error: "Ce message ne doit pas être vide" });
        }

        db.Post.findOne({ 

            where: { 
                id: PostId, 
                UserId: UserId 
            }, 
        
        })

        .then((Post) => {

            if(!Post) {

                return res.status(403).json({ error: "Vous n'avez pas l'authorisation ou que le post n'existe pas" });

            } else {

                return Post.update({ 
                    content: req.body.content, 
                    title: req.body.title 
                })
            }

        })

        .then(() => {

            return res.status(201).json({ message: "Post modifié" });

        })
        
    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}




// SUPPRIMER LE POST //


exports.deletePost = async (req, res) => {

    try {
        const UserId = await jwt.getUserId(req);
        const PostId = req.params.id;

        if(!req.body) {

            return res.status(400).json({ error: "Ce message ne doit pas être vide" });
        }


        // RECUPERER LE POST DEPUIS LA BASE DE DONNEES //

        db.Post.findOne({ 

            where: { 
                id: PostId, 
                UserId: UserId 
            }, 
        
        })

        // LA PROMESSE : RECUPERER LE REUSLTAT DE LA PREMIERE FONCTION POUR LA DEUXIEME//

        .then((Post) => {

            if(!Post) {

                return res.status(403).json({ error: "La publication n'est pas là ou vous n'avez pas l'authorisation" });

            } else {

                return Post.destroy({ })
            }

        })

        .then(() => {

            return res.status(201).json({ message: "Post supprimé" });

        })


        // EN CAS D'ERREUR //
        
    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }
    

}
