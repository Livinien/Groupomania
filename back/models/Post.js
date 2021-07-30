

module.exports = (sequelize, DataType) => {

    const Post = sequelize.define("Post",  {

        title: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
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

        Post.belongsTo(models.User),

        Post.hasMany(models.Comment, { 
            foreignKey: {
                allowNull: true,

            },  
            oneDelete: "SET NULL", 
            onUpdate: "CASCADE",
        })


    };

    return Post;

};


