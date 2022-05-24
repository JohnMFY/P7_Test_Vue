const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { unsubscribe } = require('../app');
const User = require('../model/userM');


//// GET ALL USERS DATA ////
  exports.getAllUser = (req, res) => {
    User.findAll()
    .then((user) => {res.status(200).json(user);})
    .catch((error) => {res.status(400).json({error: error});});
  };
//////////////////////////////////////////////////

//// GET ONE USER DATA ////
  exports.getOneUser = (req, res) => {
    User.findOne({ where: {id: req.params.id}})
    .then((user) => {res.status(200).json(user);})
    .catch((error) => {res.status(404).json({error: error});});
  };
//////////////////////////////////////////////////

/////////////////// signup //////////////////////
  exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      User.create({
        email: req.body.email,
        userName: req.body.userName,
        password: hash,
      })
      .then((user) => {res.status(200).json(user);})
      .catch((error) => {res.status(500).json({error: error});});
    })
    .catch((error) => {res.status(500).json({error: error});});
  };
//////////////////////////////////////////////////

/////////////////// Login ///////////////////////
  require('dotenv').config();
    const TOKEN = process.env.TOKEN;

    exports.login = (req, res, next) => {
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            return res.status(401).json({error: 'User not found'});
          }
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({error: 'incorrect password'});
              }
              res.status(200).json({
                userId: user.id,
                admin: user.admin,
                token: jwt.sign(
                  { userId: user.id, admin: user.admin },
                  TOKEN,
                  { expiresIn: '4h'}
                )
              });
            })
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    };
//////////////////////////////////////////////////

//////////////// UPDATE USER //////////////////////
  exports.updateOneUser = (req, res, next) => {
    User.findOne({ where: {id: req.params.id}})
    .then(user => {
      const userObject = req.file ?
      {
        ...JSON.parse(req.body.user),
      } : { ...req.body }; 

      // SECURITY CHECK //
      if (user.userId !== req.auth.userId && !req.auth.admin) {
        res.status(400).json({error: 'Unauthorized modification'});
      }else{
        User.update({ where: {id: req.params.id}}, { ...userObject, id: req.params.id })
        .then(() => res.status(200).json({ message: 'User modify'}))
        .catch(error => res.status(400).json({ error }));  
      }
    })
    .catch(error => res.status(500).json({error}));  
  };
//////////////////////////////////////////////////

////////////////// DELETE USER //////////////////
  exports.deleteOneUser = (req, res) => {
    User.findOne({ where: {id: req.params.id}})
    .then((user) =>{
      
      // SECURITY CHECK //
      if (user.userId !== req.auth.userId && !req.auth.admin) {
          res.status(400).json({error: 'Unauthorized suppression'});
        }else{
        User.destroy({ where: {id: req.params.id}})
        .then(() => res.status(200).json({ message: 'User deleted' }))
        .catch(error => res.status(400).json({ message: error}));
      }
    })
    .catch(error => res.status(500).json({message: error }));
  };
//////////////////////////////////////////////////