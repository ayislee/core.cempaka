'use strict'
const Ws = use('Ws')
const Livechat = use('App/Models/Livechat')
class LivechatController {
    constructor ({ socket, request }) {
        this.socket = socket
        this.request = request
    }

    async onMessage(message) {
        console.log('message',message)
        this.socket.broadcastToAll('message', message)
    }

    onClose () {
    // same as: socket.on('close')
    }

    onError () {
        // same as: socket.on('error')
    }
}

module.exports = LivechatController
