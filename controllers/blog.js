const post = require('../models/blog')
const userModel = require('../models/user')

const getPosts =  async (req, res) => {
    const page = req.query.page * 1 || 1;
	const limit = 20;
	const skip = (page - 1) * limit;

    const author = req.query.author
    const title = req.query.title
    const state = req.query.state
    const readCount = req.query.readCount
    const IDpost = await post.find({}).or(
        [{author: author}, {title: title}, {state:state}, {readCount: readCount}]
        ).skip(skip).limit(limit)
    res.send(IDpost)
}

const getAll = async (req, res) =>{
    const IDpost = await post.find({}).limit(20)
    res.send(IDpost)
}

const getPostsByID = async(req, res) =>{
    const id = req.params.id
    const IDpost = await post.findById({_id: id})
    IDpost.readCount++
    IDpost.save()
    res.json({author: IDpost.author, readcount: IDpost.readCount, blog: IDpost.body})
}

const createPost = async(req, res) =>{
    const postData = req.body
    const IDpost = await post.create({
    title: postData.title,
    description: postData.description,
    author: postData.author,
    state: postData.state,
    readCount: postData.readCount,
    readingTime: postData.readingTime,
    tags: postData.tags,
    body: postData.body,
    timeStamp: new Date()
})

res.send(IDpost)
}

const updateById = async(req, res) =>{
    const id = req.params.id
    const info = req.body

    const userInfo = req.user // get userID from token generated 

    // verify if the user is an admin(owner of the blog)
    const verifyAdmin = await userModel.find({_id: userInfo, userType:"admin"})
    if (verifyAdmin.length == 0) {
        res.status(401).send('unauthorised')
    
    }else{

    let Idpost = await post.findByIdAndUpdate(id, info)
    Idpost = await post.findById(id)

    res.send(Idpost)
}
}

const deleteById = async(req, res) =>{
    const id = req.params.id

    const userInfo = req.user // get userID from token generated

    //verify if user is an admin(owner of the blog)
    const verifyAdmin = await userModel.find({_id: userInfo, userType:"admin"})
    if (verifyAdmin.length == 0) {
        res.status(401).send('unauthorised')
    
    }else{

    const IDpost = await post.findByIdAndDelete(id)
    res.send('deletion successful')
}
}


module.exports = { getPosts, 
                    getAll,
                getPostsByID, 
                createPost,
                updateById,
                deleteById
}
