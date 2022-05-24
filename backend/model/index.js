require('dotenv').config()
const DB = process.env.DB
const USER = process.env.USER
const PWD = process.env.PWD
const HOST = process.env.HOST

/////////////////// SEQUILIZE ///////////////////
const { Sequelize } = require('sequelize');

const { post } = require('../app');
const bdd = new Sequelize(DB, USER, PWD, {
    dialect: "mysql",
    host: HOST
});
const connect = async() =>{
try {
    await bdd.authenticate();
    console.log('Connected to database');
} catch (error) {
    console.error('ERROR of connection :', error);
}
}
//////////////////////////////////////////////////

const loadModel = async () =>{
    const Post = require('../model/postsM');
    const User = require('../model/userM');
    const Comment = require('../model/commentM');

    Post.belongsTo(User,{foreignKey: 'userId', onDelete: 'cascade' })
    Comment.belongsTo(User,{foreignKey: 'userId', onDelete: 'cascade' })
    Post.hasMany(Comment,{foreignKey: 'postId', onDelete: 'cascade' })
    bdd.sync({alter:true})
}

module.exports = {bdd, connect, loadModel}; 