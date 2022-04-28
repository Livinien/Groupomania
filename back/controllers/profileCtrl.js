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

        console.log("body:" + req.body, "file:" + req.file)
    
        const profile = JSON.parse(req.body.profile);
        profile.imageUrl = req.file.filename;
        const userId = await jwt.getUserId(req);
        
        

        // UPLOADER L'IMAGE DE PROFILE //
        const profileForm = await db.User.findByPk(userId);

        if(profileForm === null) {
            return res.status(404).json({ error: "L'avatar est introuvable"});
        }

        if(profileForm.UserId != userId) {
            return res.status(403).json({ error: "Vous n'avez pas l'authorisation ou l'avatar n'existe pas" });
        }





        // SUPPRIMER L'IMAGE // 

        //fs.unlink(`img_posts/${profileForm.imageUrl}`, async (error) => {
          
            profileForm.imageUrl = profile.imageUrl
    
            await profileForm.save();
    
            return res.status(201).json({ message: "L'avatar vient d'être modifié" });
        
        //});

    } catch(error) {

        return res.status(500).json({ message: error.message });
    }

}



