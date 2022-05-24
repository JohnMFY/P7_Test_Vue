const {DataTypes} = require('sequelize');
const {bdd} = require('./index');

const Post = bdd.define('posts',{

    title: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = Post;