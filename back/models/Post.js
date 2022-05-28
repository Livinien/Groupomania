

module.exports = (sequelize, DataType) => {

    const Post = sequelize.define("Post",  {

        title: {
            type: DataType.STRING,
            allowNull: false,
            
        },
        
        content: {

            type: DataType.TEXT,
            allowNull: false,
            
        },

        imageUrl: {

            type: DataType.STRING,
            allowNull: true,

        }


    });

    Post.associate = (models) => {

        Post.hasMany(models.Comment, { 
            foreignKey: {
                allowNull: true,

            },  
            
            //ON DELETE = Que fais la ligne en cas de suppression du propriétaire ? (ici User)
            onDelete: "SET NULL", 
            //ON UPDATE = Que fais la ligne en cas de modification du propriétaire ? (ici User)
            //SET NULL = Remplacer l'id du propriétaire par NULL
            //CASCADE = Appliquer les changement du propriétaire sur la ligne (En cas d'update on met à jour et ATTENTION en cas de suppression on supprime la ligne)
            onUpdate: "CASCADE",
        });

        // Pour faire la jonction entre Le Post et l'utilisateur qui le like.
        Post.hasMany(models.Like, {
            foreignKey: {
                allowNull: true,

            },  
            onDelete: "SET NULL", 
            onUpdate: "CASCADE",
        });

    };

    return Post;

};


