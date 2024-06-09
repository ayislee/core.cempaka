'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogSchema extends Schema {
    up() {
        this.table('blogs', (table) => {
            // alter table
            table.dropColumn('user_id');
        })
    }

    down() {
        this.table('blogs', (table) => {
            // reverse alternations
        })
    }
}

module.exports = BlogSchema
