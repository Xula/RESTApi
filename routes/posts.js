const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
// creates a middleware function, that's intercept the request when we access /posts
// app.use('/posts', (req, res, next) => {
//     console.log('Middleware interrupts when we go to /posts');
//     next();
// });



// GET all the posts
router.get('/', (req, res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.json({ message:err }));
});

// submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});

//GET a specific post
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.json(err));
});

// DELETE  a specific post
router.delete('/:deleteId', (req, res) => {
    Post.remove({ _id:  req.params.deleteId })
    .then(removed => res.json(removed))
    .catch(err => res.json(err));
});

// UPDATE a post
router.patch('/:updateId', (req, res) => {
    Post.update(
        {_id: req.params.updateId},
        {$set :{title: req.body.title, description: req.body.description}}
    ).then(updated => res.json(updated))
    .catch(err => res.json(err));
});

module.exports = router;