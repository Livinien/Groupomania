
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/jwt");




exports.signup = async (req, res) => {

    try {

        const pseudo = req.body.pseudo;
        let password = req.body.password;
        let user = await db.User.findOne({where: { pseudo } });
        if(user) {

            return res.status(400).json({ error: "Utilisateur déjà Existant" });

        }

        // ENCRYPTER LE MOT DE PASSE //

        password = await bcrypt.hash(password, 5);

        user = await db.User.create({

            pseudo, 
            password,

        });

        return res.status(201).json({ message: "Utilisateur crée"});

    } catch (error) {

        return res.status(500).json({ error })
        
    }

}





exports.login = async (req,res) => {

    try {

        const pseudo = req.body.pseudo;
        const password = req.body.password;
        let User = await db.User.findOne({ where:{ pseudo } });
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