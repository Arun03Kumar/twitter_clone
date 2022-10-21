const express = require("express");
const middleware = require("./middleware");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session")

const app = express();
app.use(express.json())

// telling the express that we are using pug template engine
app.set("view engine", "pug");
// telling express that when you need views then go to folder called as views
app.set("views", "views");
// telling express where public folder is and server static files
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

// session middleware 
app.use(session({
  secret: "session_secret", 
  resave: true,
  saveUninitialized: false 
}))

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/register");
const logout = require('./routes/logout')

const postapi = require("./routes/api/post")


app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use('/logout', logout)

app.use('/api/posts', postapi)


app.get("/", middleware.checkLogin, (req, res) => {
  const payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user
  }
  res.status(200).render("index", payload );
});

app.listen(3000, () => {
  console.log("started at 3000");
});
