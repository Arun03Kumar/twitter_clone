const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    content: {type: String, trim: true},
    // this is refrencing to other schema
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    pinned: Boolean,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema)

module.exports = Post