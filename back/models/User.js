

module.exports = (sequelize, DataType) => {

    const User = sequelize.define("User",  {

        pseudo: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        
        password: {

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


    }

    return User;

};


