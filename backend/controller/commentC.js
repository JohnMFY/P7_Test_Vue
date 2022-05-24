const Comment = require('../model/commentM');

//////////////// GET ALL COMMENT //////////////////
    exports.getAllComment = (req, res, next) => {
        Comment.findAll()
        .then((comment) => {res.status(200).json(comment);})
        .catch((error) => {res.status(400).json({error: error});});
    };
//////////////////////////////////////////////////

////////////////// GET ONE COMMENT //////////////////
    exports.getOneComment = (req, res, next) => {
        Comment.findOne({ where: {id: req.params.id}})
        .then((comment) => {res.status(200).json(comment);})
        .catch((error) => {res.status(404).json({error: error});});
    };
//////////////////////////////////////////////////

//////////////// CREATE COMMENT //////////////////
    exports.createOneComment = (req, res) => {
        Comment.create({
            id: req.body.id,
            content: req.body.content,
            userId: req.auth.userId
        })
        .then((comment) => {res.status(200).json(comment);})
        .catch((error) => {res.status(400).json({error: error});});
    };
//////////////////////////////////////////////////

//////////////// UPDATE COMMENT ////////////////
    exports.updateOneComment = (req, res, next) => {
        Comment.findOne({ where: {id: req.params.id}})
        const commentObject = req.file ?
        {
            ...JSON.parse(req.body.comment),
        } : { ...req.body }; 

        // SECURITY CHECK //
        if (comment.userId !== req.auth.userId && !req.auth.admin) {
        res.status(400).json({error: 'Unauthorized modification'});
        }else{
        Comment.update({ where: {id: req.params.id}}, { ...commentObject, id: req.params.id })
        .then(() => res.status(200).json({ message: 'Comment modify'}))
        .catch(error => res.status(400).json({ error }));  
        }  
    };
//////////////////////////////////////////////////

///////////////// DELETE COMMENT ///////////////////// 
    exports.deleteOneComment = (req, res, next) => {
        Comment.findOne({ where: {id: req.params.id}})
        .then((comment) =>{
        
        // SECURITY CHECK //
            if (comment.userId !== req.auth.userId && !req.auth.admin) {
                res.status(400).json({error: 'Unauthorized suppression'});
            }else{
                comment.destroy({ where: {id: req.params.id}})
                .then(() => res.status(200).json({ message: 'Comment deleted' }))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
    };
//////////////////////////////////////////////////