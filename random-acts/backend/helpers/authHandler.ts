import {compareSync, hashSync} from "bcrypt";
import {prisma} from "../api/db";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {H3Event} from "h3";
import {NitroSign} from "./nitro-sign";
import {readRecipeById} from "../api/db/recipe";
import {readUserById} from "../api/db/user";

const config = useRuntimeConfig()
export const generateToken = async (user) => {
    return jwt.sign({userId: user.id}, config.secretKey ,{
        expiresIn: '1d'
    })
}

export const verifyToken = async (event) => {
    const token = getCookie(event, "token")
    const config = useRuntimeConfig()
    return jwt.verify(token, config.secretKey)
}

export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}


// Helper function to generate a hashed password
export const hashPassword = (password: string) => {
    const saltRounds = 10
    return hashSync(password, saltRounds)
}

// Helper function to verify a password
export const verifyPassword = (password: string, passwordHash: string) => {
    return compareSync(password, passwordHash)
}


// Login function
// const login = async (email: string, password: string) => {
//     // Retrieve the user from the database
//     const user = await prisma.user.findUnique({
//         where: { email: email }
//     })
//
//     if (!user) {
//         // User does not exist
//         throw new Error('Invalid login')
//     }
//
//     // Verify the entered password with the stored hash
//     const passwordMatches = verifyPassword(password, user.passwordHash)
//
//     if (!passwordMatches) {
//         // Password is incorrect
//         throw new Error('Invalid login')
//     }
//
//     // Login successful, return the user object
//     return user
// }

export const requiredSignin = async (event) => {
    const config = useRuntimeConfig()

    const t = getCookie(event, 'token')
    console.log("TOKEN", t)
    if (!t) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: "Unauthorized access"
        }))
    }

    try {
        const { userId } = jwt.verify(t, config.secretKey)
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: "Unauthorized access"
            }))
        }
        return user
    } catch (e) {
        console.error(e)
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: "Unauthorized access"
        }))
    }
}

export const hasAuthorization = async (event: H3Event) => {
    // const user = await NitroSign(event)
    // @ts-ignore
    const { id } = await readUserById(event)
    const { userId } = await verifyToken(event)
    console.log("USERID: ", userId)
    // const recipe = await readRecipeById(event)
    const authorized = id === userId
    if (!authorized) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        }))
    }

    // if (user.role !== "admin") {
    //     return sendError(event, createError({
    //         statusCode: 403,
    //         statusMessage: "Forbidden"
    //     }))
    // }
}
