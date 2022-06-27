

module.exports = (sequelize, DataType) => {

    const user = sequelize.define("User",  {

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

        admin: {
            type: DataType.BOOLEAN,
            allowNull: false,
        },


       
    });


    user.associate = (models) => {

        user.hasMany(models.Post, { 
            foreignKey: {
                allowNull: true,

            },  
            onDelete: "CASCADE", 
            onUpdate: "CASCADE",
        }),

        user.hasMany(models.Comment, { 
            foreignKey: {
                allowNull: true,

            },  
            onDelete: "CASCADE", 
            onUpdate: "CASCADE",
        })

        user.hasMany(models.Like, { 
            foreignKey: {
                allowNull: true,

            },  
            onDelete: "CASCADE", 
            onUpdate: "CASCADE",
        })

    }

    return user;

};



