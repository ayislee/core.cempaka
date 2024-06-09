'use strict'
const User = use('App/Models/User')
const Utility = use("Utility");
const PointLib = use('App/Lib/PointLib')

class AuthController {


	async register({request, response}) {
        try {
            const user = new User()
            user.firstname = request.all()?.firstname
            user.lastname = request.all()?.lastname
            user.email = request.all().email
            user.password = request.all().password  
            user.type = 'member'   
            user.status = 'active'
            await user.save()
            return response.json({
                status: true,
                message: 'User created'
            })

        } catch (error) {
            console.log(error)
            return response.json({
                status: false,
                message: 'Something wrong'
            })
        }
	}
	
	async auth({auth, request, response}){
        try {
            const data = await auth.attempt(request.all().email, request.all().password)

            let user = await User.query().where('email',request.all().email).first()
            data.user = user
            if(user.status === '0'){
                // return 0
                return response.status(400).json({
                     status: false,
                     message: "user not active"
                 })
            } if (user.type !== 'admin') {
                return response.json({
                    status: false,
                    message: "invalid user"
                })
            }else{
                // return 1
                
                return response.json({
                    status: true,
                    data: data
                }

                )
            }

        } catch (error) {
			console.log(error)
            return response.status(400).json({
                status: false,
                message: "invalid email or password"
            })
        }

    }

    //==============================================================================
	//	Google SSO
	//	Frontend : https://developers.google.com/identity/sign-in/web/sign-in
	//	Backend : https://developers.google.com/identity/sign-in/web/backend-auth
	//==============================================================================
	async postLoginViaGoogle({ auth, request, response }) {
        // return response.json(request.sso_payload)
        try {
			let user, token,point;

            // cek apakah sso_payload sudah teregister ?
            user = await User.query().where('email',request.sso_payload.email).first()
            if(user) {
                // loginkan
                // update base profile with google account
                user.firstname = request.sso_payload.given_name
                user.lastname = request.sso_payload.family_name
                user.image_profile = request.sso_payload.picture
                await user.save()
                token = await auth.generate(user);


            } else {
                // daftarkan user
                const usr = new User();
                usr.email = request.sso_payload.email
                usr.firstname = request.sso_payload.given_name
                usr.lastname = request.sso_payload.family_name
                usr.image_profile = request.sso_payload.picture
                usr.type = 'member'
                usr.status = 'active'
                await usr.save();
                token = await auth.generate(usr);
				user = usr;

                
            }
            // const reg = await PointLib.registration(user)
			//proses info tambahan
                      
            return response.json({
                status: true,
                data: {
                    token: token,
                    user: user
                }
            })
			
		} catch (error) {
            console.log(error)
			Utility.catchError(request, response, error);
		}
	}

}

module.exports = AuthController
