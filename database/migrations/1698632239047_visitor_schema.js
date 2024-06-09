'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VisitorSchema extends Schema {
    up() {
        this.table('visitors', (table) => {
            // alter table
            table.string('country')
            table.string('region')
            table.string('timezone')
            table.string('lat')
            table.string('long')
            table.string('city')
        })
    }

    down() {
        this.table('visitors', (table) => {
            // reverse alternations
        })
    }
}

module.exports = VisitorSchema
