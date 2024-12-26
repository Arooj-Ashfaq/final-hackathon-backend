const express = require('express')
const {validateToken} = require('../helper/jwt')
const { getUser, creatUser, deleteUser, updateUser , loginUser, getUserById , getUserByStudent} = require('../controller/userController')
const routes = express.Router()

routes.post('/', creatUser)
routes.post('/login',loginUser )
routes.get('/:id', getUserById)

routes.get('/', validateToken ,  getUser)
routes.get('/student', validateToken ,  getUserByStudent)

routes.delete('/:id',  deleteUser)
routes.patch('/:id',  updateUser)

module.exports = routes