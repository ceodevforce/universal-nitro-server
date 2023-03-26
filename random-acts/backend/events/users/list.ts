// import { findAllUser } from "../db/user";
import { prisma } from "../../api/db";

export default defineEventHandler(async (event) => {

    const users = await prisma.user.findMany()
    const status = getResponseStatus(event)
    const cookies = setCookie(event, "randomacts", "Cookies are good", {
        maxAge: 60
    })

    return {
        data: {
            message: "Data successfully retrieved",
            status,
            users,
            cookies
        }
    }
})
