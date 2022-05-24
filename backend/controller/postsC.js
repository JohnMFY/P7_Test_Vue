const Posts = require('../model/postsM');
const fs = require('fs');
const User = require('../model/userM');
const Comment = require('../model/commentM');
// toujours avoir la req avant le userId auth : https://jsfiddle.net/grLv0s4z/1/

//////////// GET ALL POSTS ////////////
  exports.getAllPosts = (req, res) => {
    Posts.findAll({include:[
      {model:User,attributes:['userName']}, 
      {model:Comment, include:{model:User,attributes:['userName']}}
    ]})
    .then((posts) => {res.status(200).json(posts);})
    .catch((error) => {res.status(400).json({error: error});});
  };
//////////////////////////////////////////////////

//////////////// GET ONE POST ////////////////
  exports.getOnePosts = (req, res) => {
    Posts.findOne({ where: {id: req.params.id}})
    .then((posts) => {res.status(200).json(posts);})
    .catch((error) => {res.status(404).json({error: error});});
  };
//////////////////////////////////////////////////

////////////////// CREATE POST //////////////////
  exports.createOnePosts = (req, res) => {
      Posts.create({
          title: req.body.title,
          content: req.body.content,
          userId: req.auth.userId
      })
      .then((posts) => {res.status(200).json(posts);})
      .catch((error) => {res.status(400).json({error: error});});
  };
//////////////////////////////////////////////////

//////////////// UPDATE POST ////////////////
  exports.updateOnePosts = (req, res, next) => {
    Posts.findOne({ where: {id: req.params.id}})
    const postObject = req.file ?
      {
        ...JSON.parse(req.body.posts),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }; 

    // SECURITY CHECK //
    if (posts.userId !== req.auth.userId && !req.auth.admin) {
      res.status(400).json({error: 'Unauthorized modification'});
    }else{
      Posts.update({ where: {id: req.params.id}}, { ...postObject, id: req.params.id })
      .then(() => res.status(200).json({ message: 'Post modify'}))
      .catch(error => res.status(400).json({ error }));  
    }  
  };
//////////////////////////////////////////////////

////////////////// DELETE POST //////////////////
  exports.deleteOnePosts = (req, res, next) => {
    Posts.findOne({ where: {id: req.params.id}})
    .then((posts) =>{
      
      // SECURITY CHECK //
      if (posts.userId !== req.auth.userId && !req.auth.admin) {
        res.status(400).json({error: 'Unauthorized suppression'});
      }else{
        const filename = posts.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Posts.destroy({ where: {id: req.params.id}})
          .then(() => res.status(200).json({ message: 'Post deleted' }))
          .catch(error => res.status(400).json({ error }));
        })
      }
    })
    .catch(error => res.status(500).json({ error }));
  };
//////////////////////////////////////////////////