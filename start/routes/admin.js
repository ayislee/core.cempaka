'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Env = use('Env')

const prefix='/api/v1/admin'

Route.group(()=>{
    Route.get('/banner','BannerController.get')
    Route.post('/banner','BannerController.create')
    Route.put('/banner','BannerController.update')
    Route.delete('/banner','BannerController.delete')
    Route.get('/banner/get','BannerController.getone')


    Route.get('/blog','BlogController.get')
    Route.post('/blog','BlogController.create')
    Route.put('/blog','BlogController.update')
    Route.delete('/blog','BlogController.delete')
    Route.get('/blog/get','BlogController.getone')

    Route.get('/micchart','MicchartController.get')
    Route.post('/micchart','MicchartController.create')
    Route.put('/micchart','MicchartController.update')
    Route.delete('/micchart','MicchartController.delete')
    Route.get('/micchart/get','MicchartController.getone')


   
}).prefix(prefix).middleware('auth')