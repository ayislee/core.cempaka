'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogSchema extends Schema {
    up() {
        this.create('blogs', (table) => {
            table.increments('blog_id')
            table.integer('user_id').unsigned().notNullable()
            table.string('title')
            table.text('short_content')
            table.text('full_content')
            table.string('image')
            table.timestamps()
        })
    }

    down() {
        this.drop('blogs')
    }
}

module.exports = BlogSchema
