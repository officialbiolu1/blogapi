const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title:{type: String},
    description:{type: String},
    author:{type: String},
    state:{type: String, default: 'draft', enum: ['draft', 'published']},
    readCount:{type: Number, default: 0},
    readingTime:{type: String, default: "0 min"},
    tags:{type: Array},
    body:{type: String},
    timeStamp:{type: Date, default: Date.now}
})

postSchema.pre(
    'save',
    async function (next) {
        const post = this
        function countWords(str) {
            const arr = str.split(' ');
            return arr.filter(word => word !== '').length;}
        this.readingTime = ((countWords(this.body) / 200).toFixed(1)) + " min"
        next()}
)


const post = mongoose.model('posts', postSchema)

module.exports = post