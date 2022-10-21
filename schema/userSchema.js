const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true},
  profilePic: {type: String, default: "images/profile.png"},
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
}, { timestamps: true });

var User = mongoose.model('User', userSchema)
module.exports = User