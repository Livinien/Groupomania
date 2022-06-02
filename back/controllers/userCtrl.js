
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/jwt");




// S'INSCRIRE //

exports.signup = async (req, res) => {

    try {

        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const imageUrl = ''
        const pseudo = ''
        const description = ''
        let password = req.body.password;
        let user = await db.User.findOne({ where: {

            firstname,
            lastname,
            email,
            imageUrl,
            pseudo,
            description
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
            imageUrl,
            pseudo,
            description
            


        });

        const token = jwt.generateToken(user);
        return res.status(200).json({ token, userId: user.id, message: "Utilisateur Créer" });



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
        return res.status(200).json({ token, userId: User.id });


    } catch (error) {

        return res.status(500).json({ message: error.message })
    }

}




exports.getPostsLiked = async (req, res) => {
    //Qui ?
    const userId = req.body.userId; //Par exemple (ou via param, ou via token)

    const user = await db.User.findOne({
        where: { id: userId },
        include: [db.Like],
        include: [{ model: db.like, include: [db.Post] }],
    });
    if (!user) {
        return res.status(404).json({ error: "Erreur !" });
    }
    return res.status(200).json({ user });

};









