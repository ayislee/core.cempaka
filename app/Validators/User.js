'use strict'

class Customer {
    get rules () {
		return {
			firstname: "string",
            lastname: "string",
            phone: "string",
            status: "required|in:0,1",
		}
	}

	get messages(){
		return {
            "status.required": "status is required",
            "status.in": "invalid status",
            "email.email": "invalid email",
            "email.required": "email is required",
            "email.email": "invalid email format",
            "email.required": "email is required",
            "email.unique": "email already registered"

		}
	}

	async fails(errorMessages) {
		return this.ctx.response.json({
			status: false,
			message: errorMessages[0].message
		});
	}
}

module.exports = Customer
