'use strict'
const Database = use('Database')
const Setting = use('App/Models/Setting')
const Point = use('App/Models/Point')
const PointHistory = use('App/Models/PointHistory')

const Env = use('Env')
const Mail = use('App/Lib/BasicEmailService')
const sortArray = use('sort-array')




module.exports = {
    async registration(user){
        let point
        console.log('user',user.toJSON())
        if(user){

            const trx = await Database.beginTransaction()
            // return response.json(Env.get('REVENUE_REGISTRATION'))
            
            try {
                // check register point
                const check = await PointHistory.query().where('user_id',user.user_id).where('ref',`REG-USR-${user.user_id}`).first()
                if(check){
                    return {
                        status: false,
                        message: 'bonus register already reaceived'
                    }
                }
                
                const point_history = new PointHistory()
                point_history.user_id = user.user_id
                point_history.debet = Env.get('REVENUE_REGISTRATION')
                point_history.kredit = 0
                point_history.desc = 'Registration bonus'
                point_history.ref = `REG-USR-${user.user_id}`
                await point_history.save(trx)

                point = await Point.query().where('user_id',user.user_id).first()
                if(!point){
                    point = new Point()
                    point.user_id = user.user_id
                    point.point = Env.get('REVENUE_REGISTRATION')
                    
                }else{

                    point.point = point.point + parseInt(Env.get('REVENUE_REGISTRATION'))

                }
                await point.save(trx)
                await trx.commit()
                return {
                    status: true,
                    message: 'success'
                }
            } catch (error) {
                await trx.rollback()
                return {
                    status: false,
                    message: error.message
                }
                
            }
            

        }
        return user

    },  
}