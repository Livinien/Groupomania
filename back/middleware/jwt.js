require("dotenv").config();

const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;




exports.generateToken = (user) => {

    return jwt.sign(

        {
        userId: user.id,
        pseudo: user.pseudo,

        },

        JWT_SIGN_SECRET,
        { expiresIn: "24h" }


    );

};


exports.auth = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId != userId ) {

            return res.status(401).json({ error: "Utilisateur non identifié" });
        }
        next();

    } catch (error) {

        return res.status(401).json({ error: "Authentification non valide" });
        
    }

};


exports.getUserId = (req) => {

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
    const userId = decodedToken.userId;
    

    return userId;

}







