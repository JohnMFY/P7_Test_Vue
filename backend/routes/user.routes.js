const express = require('express');
const router = express.Router();

const passwordValidator = require('../middleware/password');
const userCtrl = require('../controller/userC');

router.get('/', userCtrl.getAllUser)
router.get('/:id', userCtrl.getOneUser)
router.post('/signup', /*passwordValidator,*/ userCtrl.signup)
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.updateOneUser)
router.delete('/:id', userCtrl.deleteOneUser)

module.exports = router;