
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controller/commentC')

router.get('/',commentCtrl.getAllComment)
router.get('/:id', commentCtrl.getOneComment)
router.post('/', commentCtrl.createOneComment)
router.put('/:id', commentCtrl.updateOneComment)
router.delete('/:id', commentCtrl.deleteOneComment)


module.exports = router;
