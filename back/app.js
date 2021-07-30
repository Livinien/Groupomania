// LES PACKAGES NPM INSTALLES //

const express = require('express');
const path = require('path');
const app = express();





// ROUTES PERMETTENT D'ALLER CHERCHER LES INFORMATIONS DANS L'API

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

// AUTORISE //

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use(express.json());


// LES ROUTES POUR ACCEDER A L'API //

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/Comment", commentRoutes);




app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
