const express = require('express')
const router = express.Router()


const  homeController = require('../controllers/homeController')

module.exports = function(){

    router.get('/',homeController.redireccion)
    router.get('/:page',homeController.home)
    router.get('/busqueda',homeController.busqueda)
    router.get('/libro/subir',homeController.formLibros)
    router.post('/subir',homeController.subirLibros)

    return router
}