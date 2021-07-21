// LES PACKAGES NPM INSTALLES //

const express = require('express');
const helmet = require("helmet");
const path = require('path');

const app = express();
app.use(helmet());


require('dotenv').config()

// ROUTES PERMETTENT D'ALLER CHERCHER LES INFORMATIONS DANS L'API

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user'); 



// SE CONNECTER A LA BASE DE DONNEES MYSQL //

const db = mysql.createConnection ({

  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE,
  
});


db.connect(function (error) {

    if(error) {

      console.log(error);

    } else {

      console.log("Connecté à MYSQL");

    }

})




// AUTORISE //

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// LES ROUTES POUR ACCEDER A L'API //

app.use(bodyParser.json());

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
