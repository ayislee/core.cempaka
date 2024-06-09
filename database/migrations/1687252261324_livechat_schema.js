'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LivechatSchema extends Schema {
    up () {
        this.create('livechats', (table) => {
            table.increments('livechat_id')
            table.integer('user_id').notNullable()
            table.enu('action',['join','chat'])
            table.string('message')
            table.timestamps()
        })
    }
    
    down () {
        this.drop('livechats')
    }
}

module.exports = LivechatSchema
