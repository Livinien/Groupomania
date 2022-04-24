

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
            oneDelete: "SET NULL", 
            onUpdate: "CASCADE",
        }),

        User.hasMany(models.Comment, { 
            foreignKey: {
                allowNull: true,

            },  
            oneDelete: "SET NULL", 
            onUpdate: "CASCADE",
        })

        User.hasMany(models.Like, { 
            foreignKey: {
                allowNull: true,

            },  
            oneDelete: "SET NULL", 
            onUpdate: "CASCADE",
        })


    }

    return User;

};



