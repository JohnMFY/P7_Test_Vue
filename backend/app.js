const express = require ('express');
const path = require ('path');

const app = express();
app.use(express.json());

// call of the routes here //
const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/posts.routes');
const commentRoutes = require('./routes/comment.routes');

///////////////////// SEQUELIZE /////////////////////

const {connect, loadModel}= require ('./model/index')
connect();
loadModel();

//////////////////////////////////////////////////

///////////////////// HELMET /////////////////////

  const helmet = require("helmet");
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

 ///////////////// Cross-Origin /////////////////
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//////////////////////////////////////////////////

app.use('/user', userRoutes);
app.use('/posts', postsRoutes);
app.use('/comment', commentRoutes);

module.exports = app;