import { prisma } from "./index";

export const createUser = async (userDto) => {

    await prisma.user.create({
        data: userDto
    })
}


export const findAllUser = async () => {
    await prisma.user.findMany()
}


export const updateUser = async (updateUserDto) => {
    const { email, firstName, lastName, confirmPassword, password } = updateUserDto
    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            confirmPassword: confirmPassword,
            password: password
        }
    })
}
