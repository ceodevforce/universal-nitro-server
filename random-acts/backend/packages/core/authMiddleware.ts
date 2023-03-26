import {MiddlewareStack} from "./middleware";
import jwt from "jsonwebtoken"

export class AuthMiddleware extends MiddlewareStack {
    constructor() {
        super();
    }

    checkAuthentication(event) {
        const config = useRuntimeConfig()
        const authToken = getCookie(event, 'token')
        if (!authToken) {
            return false;
        }

        try {
            const decodedToken = jwt.verify(authToken, config.secretKey);
            return decodedToken.user;
        } catch (error) {
            return false;
        }
    }

    middlewareFn() {
        return (event) => {
            const isAuthenticated = this.checkAuthentication(event);
            if (!isAuthenticated) {
                return sendError(event, createError({
                    statusCode: 400,
                    statusMessage: "Unauthorized"
                }))
            }

            // req.user = isAuthenticated;
        };
    }
}
