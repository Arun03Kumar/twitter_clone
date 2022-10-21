const express = require('express')
const app = express()
const router = express.Router()

router.get('/', (req, res) => {
    if(req.session.user){
        req.session.destroy(() => {
            return res.redirect("/login");
        })  
    }
    res.redirect('/')
})

module.exports = router