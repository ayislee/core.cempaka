'use strict'
const Data = use('App/Models/Blog')
var slugify = require('slugify')

class BlogController {
    async public_get({request, response}) {
        const data = await Data.query()
        .orderBy('blog_id','desc')
        .paginate(request.all().page, request.all().rows) 
        return response.json({
            status: true,
            data: data
        })
    }

    async blog({request, response}) {
        const data = await Data.query()
        .where('slug',request.all().slug)
        .first()

        let other
        other = Data.query()
        if(data) {
            other.where('blog_id', '!=', data.blog_id)
            .orderBy('blog_id','desc')
        
        }else{
            other.orderBy('blog_id','desc')
        }

        const out = await other.paginate(request.all().page, request.all().rows)

        return response.json({
            status: true,
            data: data,
            other: out
        })
    }

    async get({request, response}) {
        const data = await Data.query()
        .paginate(request.all().page,request.all().rows)

        return response.json({
            status: true,
            data: data
        })
    }

    async create({request, response}) {
        try {
            const data = new Data()
            data.title = request.all().title
            data.slug = slugify(request.all().title.toLowerCase())
            data.short_content = request.all().short_content
            data.full_content = request.all().full_content
            data.image = request.all().image
            await data.save()
            return response.json({
                status: true,
                message: 'success',
                data: data
            })
        } catch (error) {
            console.log(error)
            return response.json({
                status: false,
                message: error.message
            })
        }
        
    }

    async update({request, response}) {
        try {
            const data = await Data.query().where('blog_id',request.all().blog_id).first()
            data.title = request.all().title
            data.slug = slugify(request.all().title.toLowerCase())
            data.short_content = request.all().short_content
            data.full_content = request.all().full_content
            data.image = request.all().image
            await data.save()
            return response.json({
                status: true,
                message: 'success',
                data: data
            })
            
        } catch (error) {
            console.log(error)
            return response.json({
                status: false,
                message: error.message
            })
        }
        
    }

    async delete({request, response}) {
        try {
            const data = await Data.query().where('blog_id',request.all().blog_id).first()
            await data.delete()
            return response.json({
                status: true,
                message: 'success',
            })
            
        } catch (error) {
            console.log(error)
            return response.json({
                status: false,
                message: error.message
            })
        }
    }

    async getone({request, response}) {
        try {
            const data = await Data.query().where('blog_id',request.all().blog_id).first()
            return response.json({
                status: true,
                data: data,
            })
            
        } catch (error) {
            console.log(error)
            return response.json({
                status: false,
                message: error.message
            })
        }
    }
}

module.exports = BlogController
