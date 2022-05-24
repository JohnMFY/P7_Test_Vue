
const {DataTypes} = require('sequelize');
const {bdd} = require('./index');

const Comment = bdd.define('comments',{

    content: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },   
})

module.exports = Comment;
