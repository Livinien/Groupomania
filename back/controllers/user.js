
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const CryptoJS = require("crypto-js");



const db = mysql.createConnection ({

    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE

});



    // SE CONNECTER //


exports.login = (req, res) => {


    try {

        const { email, password } = req.body;

        if(!email || !password)
            return res.status(400).render('login', {

                message: 'Veuillez fournir un email et un mot de passe'

        })

        db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
            console.log(results);

            if( !results || !(await bcrypt.compare(password, results[0].password))) {

                res.status(401).render('login', {

                    message: 'Email ou le Password sont Incorrect'

                })


            } else {

                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {

                    expiresIn: process.env.JWT_EXPIRES_IN

                });


                console.log("The token is: " + token);

                const cookieOptions = {

                    expires: new Date(

                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000

                    ),


                    httpOnly: true

                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");

            }

        })

    } catch (error) {

        console.log(error);

    }

}




            // S'INSCRIRE //


exports.register = (req, res) => {

    console.log(req.body);

    const { firstname, lastname, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, results) => {

        if(error) {

            console.log(error);

        }
        

        if(results.length > 0) {

            return res.render('register', {

                message: 'Cet Email est déjà Utilisé'

            })
        

        } else if(password !== passwordConfirm) {

            return res.render('register', {

                message: 'Le Mot de Passe est Incorrect'


            });

        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);


        
  
        db.query('INSERT INTO user SET ?', { firstname: firstname, lastname: lastname, email: email, password: hashedPassword }, (error, results) => {

            if(error) {

                console.log(error);

            } else {
                console.log(results);
                return res.render('register', {

                    message: 'Utilisateur Enregistrer'
    
    
                });

            }

        })

    });

}




// AFFICHER LE NOM DE L'UTILISATEUR SUR SA PAGE PROFILE //

exports.isLoggedIn = async (req, res, next) => {

    //console.log(req.cookies);

    if(req.cookies.jwt) {

        try {
            // 1) Vérifier le token //
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
            console.log(decoded);


            // 2) Vérifier si l'utilisateur existe //

            db.query('SELECT * FROM user WHERE id = ?', [decoded.id], (error, result) => {

                console.log(result);

                if(!result) {

                    return next();

                }

                req.user = result[0];
                return next();

            });

        } catch (error) {

            console.log(error);
            return next();
        } 


        } else {

        next();

    }
    
}




        // SE DECONNECTER //


exports.logout = async (req, res) => {

    res.cookie('jwt', 'logout', {

        expires: new Date(Date.now() + 2*1000),
        httpOnly: true

    });

    res.status(200).redirect('/');

}

