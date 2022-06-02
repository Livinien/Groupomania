const db = require("../models");
const jwt = require("../middleware/jwt");
const fs = require('fs');


// RÉCUPÉRER L'IMAGE DANS L'ORDINATEUR //

exports.getProfile = async (req, res) => {

    try {

        const UserId = await jwt.getUserId(req);
        const user = await db.User.findByPk(UserId);

        console.log(user);

        const userModel =  {

            pseudo : user.pseudo,
            description : user.description,
            imageUrl : user.imageUrl,

        }

        return res.status(201).json(userModel);

    
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






// MODIFIER LA BIOGRAPHIE //

exports.modifyBiography = async (req, res) => {

    try {
      
        const pseudo_description_token = await jwt.getUserId(req);
        const user = await db.User.findByPk(pseudo_description_token);


        user.pseudo = req.body.pseudo
        user.description = req.body.description
        


        // REMPLACER L'IMAGE DE PROFILE //

        const replacePicture = user.imageUrl.split('/img_posts/')[1];

        if(replacePicture && replacePicture !== req.file.filename){
            
            fs.unlink(`img_posts/${replacePicture}`, (error) => {
                
                if(error) {

                    return res.status(404).json({ message: "L'image n'a pas été changée" });

                }
            });
        }

        user.imageUrl = req.protocol + '://' + req.get('host') + "/img_posts/" + req.file.filename;

        
        await user.save();

        return res.status(201).json({ message: "La biographie de l'utilisateur a bien été envoyé !" });

    }



    catch(error) {

        return res.status(500).json({ message: error.message });
    }

}





// SUPPRIMER LE PROFILE DE L'UTILISATEUR //

exports.deleteAccount = async (req, res) => {

    try {

        const userId = jwt.getUserId(req);
        const user = await db.User.findByPk(userId);
        const image = user.imageUrl.split('/img_posts/')[1];

        console.log(image);


            // Supprimer totalement l'image de profile de l'utilisateur //

            fs.unlink(`img_posts/${image}`, (error) => {
            
                if(error) {
                    console.log(error);
                    return res.status(404).json({ message: "L'image de profile a bien été supprimé" });

                }
            });


            // Supprimer totalement les images des posts mis en ligne par l'utilisateur //

            const deletePictures = await db.Post.findAll({
                
                where : {
                    userId : userId
                } 
            });
            console.log(deletePictures);

            

            fs.unlink(`img_posts/${image}}`, (error) => {
            
                if(error) {
                    console.log(error);
                    return res.status(404).json({ message: "Les images des posts ont bien tous été supprimé" });   
                }
            });
              

            await user.destroy();
            
            return res.status(200).json({ message: "L'utilisateur a bien été supprimé" });

    }

    catch(error) {

        return res.status(500).json({ message: error.message });
    }

}



