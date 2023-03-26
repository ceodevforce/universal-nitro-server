import jwt from "jsonwebtoken"

function nitroJwt(nitroSecretToken) {
    return function (event) {
        const headers = getHeaders(event)
        console.log(headers)
        const { token } = headers.authorization
        if (!token) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: "Token not provided"
            }))
        }
    }
}
