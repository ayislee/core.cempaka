'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VisitorSchema extends Schema {
    up() {
        this.create('visitors', (table) => {
            table.increments('visitor_id')
            table.string('ip')
            table.text('geolocation')
            table.string('page')
            table.timestamps()
        })
    }

    down() {
        this.drop('visitors')
    }
}

module.exports = VisitorSchema
