'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PointSchema extends Schema {
    up() {
        this.create('points', (table) => {
            table.increments('point_id')
            table.integer('user_id').notNullable().unsigned().unique()
            table.integer('point').notNullable().unsigned().defaultTo(0)
            table.timestamps()
        })
    }

    down() {
        this.drop('points')
    }
}

module.exports = PointSchema
