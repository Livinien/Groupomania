const db = require("../models");
const jwt = require("../middleware/jwt");



// CREATION DE COMMENTAIRE //

exports.createComment = async (req, res) => {

    try {

        const PostId = req.body.PostId
        const content = req.body.content;
        const UserId = await jwt.getUserId(req);

        if(!content) {

            return res.status(400).json({ error: "Informations manquantes"});

        }

        let Comment = await db.Comment.create({

            content,
            UserId,
            PostId,

        });

        return res.status(201).json({ message: "Commentaire Ajouté !", Comment});
        
    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}


// AFFICHER UN SEUL COMMENTAIRE EN FONCTION DE L'ID DE L'UTILISATEUR //

exports.getOneComment = async (req, res) => {

    try {

      const CommentOne = req.params.id;
      const Comment = await db.Comment.findOne({

        where: { id: CommentOne },
        include: [db.User],

      });

      if(!Comment) {

        return res.status(400).json({ error: "Le Commentaire est Inexistant"});

      }


      return res.status(201).json({ Comment });

    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

};



// AFFICHER TOUS LES COMMENTAIRES //

exports.getAllComment = async (req, res) => {

    try {

        const Comment = await db.Comment.getAllComment({

            include: [{ model: db.User, attributes: ['pseudo'] }],
            order: [["createAt", "DESC"]]

        })

        if(!Comment) {

            return res.status(400).json({ error: "Aucun Commentaire" });

        }


        return res.status(201).json(({ Comment }));


    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}



// MODIFIER LE COMMENTAIRE //

exports.modifyComment = async (req, res) => {

    try {

        const modifyComment = req.params.id;
        
        if(!req.body) {

            return res.status(400).json({ error: "Ce commentaire ne peut pas être modifié" });

        }

        db.Comment.findOne({

            where: { id: modifyComment },

        })


        .then((Comment) => {

            if(!Comment) {

                return res.status(400).json({ error: "Le commentaire ne peut pas s'afficher" });

            } else {

                return Comment.update({ content: req.body.content })

            }

        })


        .then(() => {

            return res.status(201).json({ message: "Le commentaire vient d'être modifié" });

        })


    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}





// SUPPRIMER LE COMMENTAIRE //

exports.deleteComment = async (req, res) => {

    try {

        const deleteComment = req.params.id;

        if(!req.body) {

            return res.status(400).json({ error: "Le commentaire à été supprimé !"})

        }


        db.Comment.findOne({

            where: { id: deleteComment },

        })

        .then((deleteComment) => {

            if(!deleteComment) {

                return res.status(400).json({ error: "Le commentainre ne peut pas être supprimé"})

            } else {

                return deleteComment.destroy({})

            }

        })


        .then(() => {

            return res.status(201).json({ message: "Votre commentaire a été supprimé !"})

        })

        
    } catch (error) {

        return res.status(500).json({ message: error.message });
        
    }

}