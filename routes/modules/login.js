const express = require('express')
const cookieParser = require('cookie-parser')
const router = express.Router()
const Users = require('../../models/userSchema')
router.use(cookieParser())

router.get('/', (req, res) => {
  if (req.cookies.user !== true) {
    req.email = req.cookies.email
    req.password = req.cookies.password
  }
  res.render('index', req)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await Users.findOne({ email }).lean()
  if (!user) {
    return res.render('index', { errors: "Please check your account." })
  }
  if (user.password !== password) {
    return res.render('index', { user, errors: "Please check your password." })
  }
  //設定 cookie
  //maxAge設定客戶端儲存cookie多長時間(毫秒)
  //httpOnly:true設定cookie只能有伺服器修改
  res.cookie('user', { user }, { maxAge: 60000, httpOnly: false })
  //return res.redirect('/cookie')
  res.render('login', { user })

})


module.exports = router