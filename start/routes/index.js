'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Env = use('Env')

require('./auth')
require('./livechat')
require('./premium')
require('./public')
require('./admin')
if(Env.get('NODE_ENV')==='development'){
    require('./test')
}

Route.get('/',()=>{
    return "welcome to Core MIC Streaming"
})
