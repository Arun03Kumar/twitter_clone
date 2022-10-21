const express = require("express");
const User = require("../schema/userSchema")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));


router.get("/", (req, res) => {
  res.status(200).render("login.pug", { pageTitle: "login" });
}) 

router.post('/', async (req, res) => {
  const userdata = req.body
  // console.log(userdata)
  const finduser = await User.findOne({
    $or: [{username: userdata.username}, {email : userdata.email}]})
  // console.log(finduser)
  if(!finduser){
     res.render("login", {err: "User not exist"})
     return
  }
  else{
    const hashp = await bcrypt.compare(req.body.password, finduser.password)
    // console.log(hashp, req.body.password)
    if(hashp === true){
      req.session.user = finduser
      return res.redirect('/')
    }
  }
})

module.exports = router;
