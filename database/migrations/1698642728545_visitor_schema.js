'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VisitorSchema extends Schema {
    up() {
        this.table('visitors', (table) => {
            // alter table
            table.string('session')
            table.datetime('session_in')
            table.datetime('session_out')
        })
    }

    down() {
        this.table('visitors', (table) => {
            // reverse alternations
        })
    }
}

module.exports = VisitorSchema
