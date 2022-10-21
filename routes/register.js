const express = require("express");
const User = require("../schema/userSchema");
const bcrypt = require('bcrypt')

const app = express();

const router = express.Router();
const bodyParser = require("body-parser");
const session = require("express-session");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.status(200).render("register.pug");
});

// for handling post request to parse the data from post request we need body-parser install it form npm then require in the file

router.post("/", async (req, res) => {
  const firstname = req.body.firstname.trim();
  const lastname = req.body.lastname.trim();
  const username = req.body.username.trim();
  const email = req.body.email.trim();
  const pass = req.body.password;
  const passconf = req.body.passwordconf;
//   console.log(req.body)

  if (firstname && lastname && username && email && pass) {
    const user = await User.findOne({ $or: [{ username: username }, { password: pass }] }).catch((err) => {
        res.render("register", {error: "Something went wrong"})
    })

    if(user == null){
        const data = req.body
        data.password = await bcrypt.hash(pass, 10)
        User.create(data).then((newuser) => {
            // console.log(user)
            req.session.user = newuser
            return res.redirect("/")
        }).catch((err) => {
            console.log(err)
        })
    }else{
        console.log("repeted")
        
        if(email == user.email){
            var err = "email already in use"
        }
        else{
            var err = "username is already in use"
        }
        res.status(200).render("register.pug", { error: err });
    }
  } else {
    res.status(200).render("register.pug", {error: "cant be empty"});
  }
});

module.exports = router;
