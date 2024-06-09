'use strict'
const Banner = use('App/Models/Banner')

class BannerController {
    async public_get({request, response}) {
        const data = await Banner.query()
        .where('status','1').fetch()
        return response.json({
            status: true,
            data: data
        })
    }

    async get({request, response}) {
        const banner = await Banner.query()
        .paginate(request.all().page,request.all().rows)

        return response.json({
            status: true,
            data: banner
        })
    }

    async create({request, response}) {
        try {
            const banner = new Banner()
            banner.url = request.all().url
            banner.status = request.all().status
            banner.link = request.all().link
            await banner.save()
            return response.json({
                status: true,
                message: 'success',
                data: banner
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
            const banner = await Banner.query().where('banner_id',request.all().banner_id).first()
            banner.url = request.all().url
            banner.status = request.all().status
            banner.link = request.all().link
            await banner.save()
            return response.json({
                status: true,
                message: 'success',
                data: banner
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
            const banner = await Banner.query().where('banner_id',request.all().banner_id).first()
            await banner.delete()
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
            const banner = await Banner.query().where('banner_id',request.all().banner_id).first()
            return response.json({
                status: true,
                data: banner,
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

module.exports = BannerController
