

module.exports = (sequelize, DataType) => {

    const User = sequelize.define("User",  {

        firstname: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },

        lastname: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },

       
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        

        password: {

            type: DataType.STRING,
            allowNull: false,
        },


        pseudo: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },


        description: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },

        
        imageUrl: {

            type: DataType.STRING,
            allowNull: false,
        },

    });


    User.associate = (models) => {

        User.hasMany(models.Post, { 
            foreignKey: {
                allowNull: true,

            },  
            onDelete: "CASCADE", 
            onUpdate: "CASCADE",
        }),

        User.hasMany(models.Comment, { 
            foreignKey: {
                allowNull: true,

            },  
            onDelete: "CASCADE", 
            onUpdate: "CASCADE",
        })

        User.hasMany(models.Like, { 
            foreignKey: {
                allowNull: true,

            },  
            onDelete: "CASCADE", 
            onUpdate: "CASCADE",
        })

    }

    return User;

};



