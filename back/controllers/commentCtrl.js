const db = require("../models");
const jwt = require("../middleware/jwt");



// CREATION DE COMMENTAIRE //

exports.createComment = async (req, res) => {

    try {

        const PostId = req.body.PostId
        const content = req.body.content;
        const userId = await jwt.getUserId(req);

        if(!content) {

            return res.status(400).json({ error: "Informations manquantes"});

        }

        let Comment = await db.Comment.create({

            content,
            UserId : userId,
            PostId,
            
        });

        return res.status(201).json({ message: "Commentaire Ajouté !", Comment});
        
    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}




// AFFICHER TOUS LES COMMENTAIRES //

exports.getAllComment = async (req, res) => {

    try {

        let PostId = req.params.id
        const Comment = await db.Comment.findAll({

            where : { 
                PostId: PostId },
                include: [{ 
                    model: db.User, 
                    attributes: ['firstname'] }],
                order: [["createdAt", "DESC"]]
            
        }) 
        
        if(!Comment) {

            return res.status(400).json({ error: "Aucun Commentaire" });

        }

        return res.status(201).json(Comment);

    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}



