const express = require ('express')
const controller = require('../controllers/blog')
const passport = require('passport')

require('../middleware/authentication')

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), controller.createPost)

router.get('/', controller.getPosts) // get posts by other parameters

router.get('/all', controller.getAll)  // get all posts

router.get('/:id', controller.getPostsByID) // get posts by id

// find by id and update state and the blog posts
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.updateById)

// find by id and delete
router.delete('/:id',passport.authenticate('jwt', { session: false }), controller.deleteById)


module.exports = router

