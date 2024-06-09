'use strict'
const Ws = use('Ws')

class RunningTextController {
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

module.exports = RunningTextController
