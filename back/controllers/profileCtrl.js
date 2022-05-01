const db = require("../models");
const jwt = require("../middleware/jwt");
const fs = require('fs');


// RÉCUPÉRER L'IMAGE DANS L'ORDINATEUR //

exports.getImage = async (req, res) => {

    try {

        const UserId = await jwt.getUserId(req);
        const user = await db.User.findByPk(UserId);

        return res.status(201).json(user.imageUrl);

    
    } catch(error) {

        return res.status(500).json({ message: error.message });
    }
    
}



// ENVOYER L'IMAGE A LA BDD //

exports.postImage = async (req, res) => {

    try {
        
        const userId = await jwt.getUserId(req);


        // UPLOADER L'IMAGE DE PROFILE //
        const profileForm = await db.User.findByPk(userId);

        if(profileForm.id === null) {
            return res.status(404).json({ error: "L'avatar est introuvable"});
        }


        if(profileForm.id !== userId) {
            return res.status(403).json({ error: "Vous n'avez pas l'authorisation ou l'avatar n'existe pas" });
        }

        
    

        // REMPLACER L'IMAGE // 

        const sendPicture = profileForm.imageUrl.split('/img_posts/')[1];

        // Si sendPicture existe dans le dossier et si l'image du dossier est différente de l'image envoyée
        if(sendPicture && sendPicture !== req.file.filename){

            fs.unlink(`img_posts/${sendPicture}`, (error) => {
            
                if(error) {
    
                    return res.status(404).json({ message: "L'image n'a pas été changée" });
    
                }
                    
            });
        }


        profileForm.imageUrl = req.protocol + '://' + req.get('host') + "/img_posts/" + req.file.filename;

        await profileForm.save();

        return res.status(201).json(profileForm.imageUrl);


    } catch(error) {

        return res.status(500).json({ message: error.message });
    }

}