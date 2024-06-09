'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Livechat extends Model {
    static get table() {
		return "livechats";
	}

	static get primaryKey() {
		return "livechat_id";
	}

    static get fillable() {
        return ['message'];
    }

    static boot () {
        super.boot()

        /**
        * A hook to hash the user password before saving
        * it to the database.
        */

        // this.addTrait('@provider:Lucid/SoftDeletes')
        
    }

    user() {
        return this,this.belongsTo('App/Models/User','user_id','user_id')
    }
}

module.exports = Livechat
