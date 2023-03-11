import { H3Event } from "h3";
import { createUser } from "../db/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, username, password, confirmPassword, firstName, lastName } = body

    if (!email || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Email, Password are not found"
        }))
    }

    const userDto = {
        email,
        username,
        password,
        firstName,
        lastName,
        confirmPassword
    }

    await createUser(userDto)

    return {
        message: "User data created",
        userDto
    }
})
