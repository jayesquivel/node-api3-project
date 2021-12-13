const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(req.url, req.method)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const {id} = req.params
    const user = await User.getById(id)
    if(!user){
      res.status(404).json(`no user with ${id}`)
    } else {
      req.user = user
      next ()
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

function validateUser(req, res, next) {
  if(!req.body.name){
    res.status(400).json("Name required")
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body.text) {
    res.status(400).json("Text is required")
  } else {
    next()
  }
}

module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost
}