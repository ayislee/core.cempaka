'use strict'
const Visitor = use('App/Models/Visitor')
const axios = use('axios')
const uuid = use('uuid')
const moment = use('moment')

class VisitorController {
    async create({ request, response }) {
        let visitor, field
        try {
            const location = await axios.get(`https://api.sefinek.net/api/v2/geoip/${request.all().ip}`);

            if (location.data.success) {

                if (request.all().session) {
                    visitor = await Visitor.query().where('session', request.all().session).first()
                    if (visitor) {
                        // update
                        visitor.ip = request.all().ip;
                        visitor.session_out = moment().format('YYYY-MM-DD HH:MM:ss')
                    } else {
                        // create
                        visitor = new Visitor()
                        visitor.ip = request.all().ip;
                        visitor.geolocation = JSON.stringify(location.data.data)
                        // visitor.page = request.all().page
                        visitor.platform = request.all().platform
                        visitor.session = uuid.v4()
                        visitor.session_in = moment().format('YYYY-MM-DD HH:MM:ss')
                        visitor.country = location?.data?.data?.country
                        visitor.region = location?.data?.data?.region
                        visitor.city = location?.data?.data?.city
                        visitor.timezone = location?.data?.data?.timezone
                        visitor.lat = location?.data?.data?.ll[0]
                        visitor.long = location?.data?.data?.ll[1]

                    }
                } else {
                    // create
                    visitor = new Visitor()
                    visitor.ip = request.all().ip;
                    visitor.geolocation = JSON.stringify(location.data.data)
                    visitor.page = request.all().page
                    visitor.platform = request.all().platform
                    visitor.session = uuid.v4()
                    visitor.session_in = moment().format('YYYY-MM-DD HH:MM:ss')
                    visitor.country = location?.data?.data?.country
                    visitor.region = location?.data?.data?.region
                    visitor.city = location?.data?.data?.city
                    visitor.timezone = location?.data?.data?.timezone
                    visitor.lat = location?.data?.data?.ll[0]
                    visitor.long = location?.data?.data?.ll[1]
                }

                await visitor.save()
                return response.json({
                    status: true,
                    message: "success",
                    session: visitor.session
                })

            } else {
                visitor = new Visitor()
                visitor.ip = request.all().ip;
                visitor.geolocation = ''
                visitor.page = request.all().page
                visitor.platform = request.all().platform
                visitor.session = uuid.v4()
                visitor.session_in = moment().format('YYYY-MM-DD HH:MM:ss')

                await visitor.save()
                return response.json({
                    status: true,
                    message: "success",
                    session: visitor.session
                })
            }
        } catch (error) {

            visitor = new Visitor()
            visitor.ip = request.all().ip;
            visitor.geolocation = ''
            visitor.page = request.all().page
            visitor.platform = request.all().platform
            visitor.session = uuid.v4()
            visitor.session_in = moment().format('YYYY-MM-DD HH:MM:ss')

            await visitor.save()
            return response.json({
                status: true,
                message: "success",
                session: visitor.session
            })


        }
    }

    async jsontofields({ request, response }) {
        let geo, vis
        const visitors = await Visitor.query().fetch()

        for (const visitor of visitors.rows) {
            try {
                geo = JSON.parse(visitor.geolocation)
                vis = await Visitor.find(visitor.visitor_id)
                vis.city = geo.city
                vis.country = geo.country
                vis.region = geo.region
                vis.timezone = geo.timezone
                vis.lat = geo.ll[0]
                vis.long = geo.ll[1]
                await vis.save()
            } catch (error) {

            }
        }
    }
}

module.exports = VisitorController
