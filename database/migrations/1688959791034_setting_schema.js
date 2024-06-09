'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SettingSchema extends Schema {
    up() {
        this.create('settings', (table) => {
            table.increments('setting_id')
            table.string('key').notNullable().unique()
            table.string('value').notNullable()
            table.string('desc').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('settings')
    }
}

module.exports = SettingSchema
