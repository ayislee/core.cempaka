'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Env = use('Env')

const prefix='/api/v1/public'

Route.group(()=>{
    Route.get('/banners','BannerController.public_get')
    Route.get('/micchart','MicchartController.public_get')
    Route.get('/blogs','BlogController.public_get')
    Route.get('/blog','BlogController.blog')
    Route.post('/ip','VisitorController.create')
    Route.post('/tofield','VisitorController.jsontofields')

   
}).prefix(prefix)