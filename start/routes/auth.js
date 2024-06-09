'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Env = use('Env')

const prefix='/api/v1/auth'

Route.group(()=>{
    Route.post('/register','Auth/AuthController.register')
    Route.post("/login/google", "Auth/AuthController.postLoginViaGoogle").middleware(['VerifyGoogleSSOToken'])
		.validator("FormGoogleSSO")
    Route.post('/','Auth/AuthController.auth')
}).prefix(prefix)

