const Users = require('../users')
const userSchema = require('../userSchema')
const db = require('../../config/mongoose')

db.once('open', () => {
  Users.forEach(user => {
    userSchema.create({
      firstName: user.firstName,
      email: user.email,
      password: user.password
    })
      .then(() => {
        console.log('done')
      })
      .catch(err => console.log(err))
  })
  return db.close()  
}) 