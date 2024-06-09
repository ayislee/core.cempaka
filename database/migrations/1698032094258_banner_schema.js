'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BannerSchema extends Schema {
    up() {
        this.table('banners', (table) => {
            // alter table
            table.string('link')
        })
    }

    down() {
        this.table('banners', (table) => {
            // reverse alternations
        })
    }
}

module.exports = BannerSchema
