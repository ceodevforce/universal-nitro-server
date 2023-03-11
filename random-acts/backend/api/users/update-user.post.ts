import { H3Event } from "h3";
import { updateUser } from "../db/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { password, confirmPassword, firstName, lastName } = body


    const updateUserDto = {
        password,
        firstName,
        lastName,
        confirmPassword
    }

    await updateUser(updateUserDto)

    return {
        message: "User data updated",
        updateUserDto
    }
})
