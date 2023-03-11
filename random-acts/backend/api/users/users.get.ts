import { findAllUser } from "../db/user";
import { prisma } from "../db";

export default defineEventHandler(async (event) => {

    const users = await prisma.user.findMany()
    const status = getResponseStatus(event)
    const cookies = setCookie(event, "randomacts", "Cookies are good")

    // if (!users) {
    //     sendError(event, createError({
    //         statusCode: 404,
    //         statusMessage: "No users found"
    //     }))
    // }

    return {
        data: {
            message: "Data successfully retrieved",
            status,
            users,
            cookies
        }
    }
})
