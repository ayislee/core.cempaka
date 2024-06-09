'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up () {
        this.create('users', (table) => {
            table.increments('user_id')
            table.string('firstname', 80).notNullable()
            table.string('lastname', 80).notNullable()
            table.string('email', 254).notNullable().unique()
            table.string('password', 60)
            table.string('phone',25)
            table.string('image_profile')
            table.enu('type',['member','admin']).defaultTo('member')
            table.enu('status',['active','not active','suspend']).defaultTo('not active')
            table.string('token')
            table.string('via_sso')
            table.timestamps()
            table.datetime('deleted_at')
        })
    }

    down () {
        this.drop('users')
    }
}

module.exports = UserSchema

