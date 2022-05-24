
const express = require('express');
const router = express.Router();

const postsCtrl = require('../controller/postsC');

router.get('/',postsCtrl.getAllPosts)
router.get('/:id', postsCtrl.getOnePosts)
router.post('/', postsCtrl.createOnePosts)
router.put('/:id', postsCtrl.updateOnePosts)
router.delete('/:id', postsCtrl.deleteOnePosts)

module.exports = router;