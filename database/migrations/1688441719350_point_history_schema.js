'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PointHistorySchema extends Schema {
    up() {
        this.create('point_histories', (table) => {
            table.increments('point_history_id')
            table.integer('user_id').notNullable().unsigned()
            table.integer('debet').unsigned().notNullable().defaultTo(0)
            table.integer('kredit').unsigned().notNullable().defaultTo(0)
            table.string('desc')
            table.string('ref')
            table.timestamps()
        })
    }

    down() {
        this.drop('point_histories')
    }
}

module.exports = PointHistorySchema
