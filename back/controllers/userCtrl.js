
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/jwt");


// S'INSCRIRE //

exports.signup = async (req, res) => {

    try {

        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        let password = req.body.password;
        let user = await db.User.findOne({ where: { 
            
            firstname, 
            lastname, 
            email 
        }   
        
    });


        if(user) {

            return res.status(400).json({ error: "Utilisateur déjà Existant" });

        }

        // ENCRYPTER LE MOT DE PASSE //

        password = await bcrypt.hash(password, 5);

        user = await db.User.create({

            firstname,
            lastname,
            email, 
            password,

        });

        const token = jwt.generateToken(user);
        return res.status(200).json({ token, message: "Utilisateur Créer" });

        

    } catch (error) {

        return res.status(500).json({ error })
        
    }

}



    // SE CONNECTER //

exports.login = async (req,res) => {

    try {

        const email = req.body.email;
        const password = req.body.password;
        let User = await db.User.findOne({ 
            
            where:{ 

            email 
        
        } 

    });


        if(!User) {

            return res.status(400).json( { error: "Utilisateur Inexistant"});

        }

        const isCorrectPassword = await bcrypt.compare(password, User.password);

        if(!isCorrectPassword) {

            return res.status(405).json({ error: "Mot de Passe Invalide !" });

        }

        const token = jwt.generateToken(User);
        return res.status(200).json({ token });

        

    } catch (error) {
        
        return res.status(500).json({ message: error.message })
    }

}