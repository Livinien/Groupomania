const Post = require('../models/post');
const mysql = require("mysql");
const fs = require('fs');



// CREER UN POST //

exports.createPost = (req, res, next) => { 
  
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
  
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  
      likes: 0,
      dislikes: 0
      
    });


    post.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };
  

  
  // MODIFIER LE POST //

  exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };




  
  // SUPPRIMER LE POST //

  exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
      .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {

          Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimé !'}))
          .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };



    // RECUPERER LE POST //

    exports.getOnePost = (req, res, next) => {
  
      Post.findOne({_id: req.params.id})
      .then(post => res.status(200).json(post))
      .catch(error => res.status(404).json({ error }));
    
    };
  
  
  
    // RECUPERER TOUTES LES POSTS //
  
    exports.getAllPosts = (req, res, next) => {
      Post.find({})
      .then(post => res.status(200).json(post))
      .catch(error => res.status(400).json({ error }));
  
    };
  

  
  
    // AJOUTER LIKE / DISLIKE //
  
  exports.likePost = (req, res, next) => {
  
    switch(req.body.like){
       
      case 0:
          Post.findOne({_id: req.params.id})
          .then((post) => {
            // Permet de reconnaitre si l'utilisateur à déjà mis un like //
              if(post.usersLiked.find(user => user === req.body.userId)){

                  Post.updateOne(
                    {_id: req.params.id}, {
                    //Inc : permet de rajouter une valeur à une donnée numérique. Cette valeur peut-être positive ou négative.
                    $inc: {likes: -1},
                    //Pull : permet de supprimer un élément
                    $pull : {usersLiked: req.body.userId}

                  })

                  .then(() => res.status(201).json({message: 'Yeah !'}))
                  .catch(error => res.status(500).json({error}));
              }
              

              
              
              //Voir si le bouton a été disliker ou non

              // Permet de reconnaitre si l'utilisateur à déjà mis un dislike //
              if (post.usersDisliked.find(user => user === req.body.userId)){

                  Post.updateOne(
                  { _id: req.params.id},{
                  $inc: {dislikes: -1},
                  $pull: { usersDisliked: req.body.userId}
              })
              .then(() => res.status(201).json({message: 'ça passe pas !'}))
              .catch(error => res.status(500).json({error}));
          }  console.log(req.body)
      })
    
      .catch(error => res.status(500).json({error}));
      break;



        //L'utilisateur clique sur le bouton "LIKE"

      case 1:
            Post.updateOne(
              {_id: req.params.id}, {
              $inc: { likes: 1},
              $push: {usersLiked: req.body.userId}
          })
          .then(()=> res.status(201).json({message: 'I love ce Post !'}))
          .catch(error => res.status(500).json({error}));
          break;



          //L'utilisateur cliquer sur le bouton "DISLIKE"

      case -1:
          Post.updateOne(
              { _id: req.params.id}, {
              $inc: { dislikes: 1},
              $push: { usersDisliked: req.body.userId}
          })
          .then(() => res.status(201).json({message: 'Je deteste ce Post !'}))
          .catch(error => res.status(500).json({error}));
          break;

      
  }
};


exports.createComment = (req, res, next) => {


};



exports.modifyComment = (req, res, next) => {


};


exports.deleteComment = (req, res, next) => {


};