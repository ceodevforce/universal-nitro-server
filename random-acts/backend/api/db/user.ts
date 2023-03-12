import { prisma } from "./index";
import {createError, H3Event} from "h3";

export const createUser = async (userDto) => {

    await prisma.user.create({
        data: userDto
    })
}


export const findAllUser = async () => {
    await prisma.user.findMany()
}


export const readUserById = async (event: H3Event) => {
    try {
        // @ts-ignore
        const id = event.context.params.id
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (!user) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: "User not found"
            }))
        }
        return user

    } catch (e) {
        console.error(e)
        sendError(event, createError({
            statusCode: 500,
            statusMessage: "Error retrieving user"
        }))
    }

}


export const updateUser = async (updateUserDto) => {

    const { id, firstName, lastName, password,  profileImage } = updateUserDto
    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            password: password
        }
    })
}

export const deleteUser = async (id, event) => {
    try {
        await prisma.user.delete({
            where: {
                id
            }
        })
        return "User deleted successfully"
    } catch (e) {
        sendError(event, createError({
            statusCode: 500,
            statusMessage: "Error updating user"
        }))
    }
}
