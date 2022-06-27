
module.exports = (sequelize, DataType) => {
    //define = Création du model Attention ce n'est pas une ligne de la table , c'est le "patron"
    const Like = sequelize.define("Like", {}); //<- L'objet vide ici veux dire que le like ne contient aucune information par default
    //Je déclare mes associations avec les autres models
    

    Like.associate = (models) => {
        models.User.belongsToMany(models.Post, {through: Like});
        models.Post.belongsToMany(models.User, {through: Like});

        Like.belongsTo(models.User); // Likes est associé à User (BelongsTo veux dire que c'est lui qui as le paramettre UserId)
        Like.belongsTo(models.Post); // Likes est associé à Post
    };

    return Like;
};
