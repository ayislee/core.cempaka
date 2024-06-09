'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VisitorSchema extends Schema {
    up() {
        this.table('visitors', (table) => {
            // alter table
            table.string('platform')
        })
    }

    down() {
        this.table('visitors', (table) => {
            // reverse alternations
        })
    }
}

module.exports = VisitorSchema
