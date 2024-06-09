'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Micchart extends Model {
    static get table() {
		return "miccharts";
	}

	static get primaryKey() {
		return "micchart_id";
	}

    static boot () {
        super.boot()

        /**
        * A hook to hash the user password before saving
        * it to the database.
        */

        // this.addTrait('@provider:Lucid/SoftDeletes')
        
    }

    
}

module.exports = Micchart
