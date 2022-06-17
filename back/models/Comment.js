module.exports = (sequelize, DataType) => {

    const Comment = sequelize.define("Comment",  {
               
        content: {

            type: DataType.TEXT,
            allowNull: false,
        },

        
    });

    Comment.associate = (models) => {

        Comment.belongsTo(models.user);
        Comment.belongsTo(models.Post);

    };

    return Comment;

};
