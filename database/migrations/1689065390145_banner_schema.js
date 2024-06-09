'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BannerSchema extends Schema {
    up() {
        this.create('banners', (table) => {
            table.increments('banner_id')
            table.string('url').notNullable()
            table.enu('status',['0','1']).defaultTo('1')
            table.timestamps()
        })
    }

    down() {
        this.drop('banners')
    }
}

module.exports = BannerSchema
