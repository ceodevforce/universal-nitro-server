import { readUserById, updateUser } from "../../api/db/user";

import {createError, H3Event} from "h3";
import {User} from "@prisma/client";
import formidable from "formidable"
import * as fs from "fs";
import multer from "multer"
import storageDriver from "../../helpers/storageDriver";

import {hasAuthorization} from "../../helpers/authHandler";



export default defineEventHandler(async (event: H3Event) => {
    // await hasAuthorization(event)
    try {
        await hasAuthorization(event)
        const user: void | User = await readUserById(event)
        const { firstName, lastName, password, about, profileImage } = await readBody(event)

        // const cookies = setCookie(event, "randomacts", "Cookies are good")
        // const storage = storageDriver


        const { id } = user

        // const upload = multer({
        //     des: await storage.setItem(`${firstName+lastName} + ${id}`, profileImage)
        // })

        // await upload.single('profileImage')
        // const data = await storage.getItem(`${firstName+lastName} + ${id}`)
        const updateUserDto = {
            id,
            firstName,
            lastName,
            password,
            about,
            updated: Date.now(),

        }
        const status = getResponseStatus(event)
        const response = await updateUser(updateUserDto)
        return {
            status,
            response
        }


        // const form = new formidable.IncomingForm({ multiples: true})
        // form.keepExtensions = true
        // form.parse(event.node.req, async (err, fields, files) => {
        //     console.log('fields: ', fields)
        //     if (err) {
        //         return sendError(event, createError({
        //             statusCode: 400,
        //             statusMessage: "Profile image could not uploaded"
        //         }))
        //     }
        //
        //     const { firstName, lastName, password, about, profileImage } = await readBody(event)
        //     // @ts-ignore
        //     const { id } = user
        //     const updateUserDto = {
        //         id,
        //         firstName,
        //         lastName,
        //         password,
        //         about,
        //         profileImage
        //     }
        //
        //     if (files.profileImage) {
        //         updateUserDto.profileImage = fs.readFileSync(files.profileImage.path)
        //     }
        //
        //     const response = await updateUser(updateUserDto)
        //     return {
        //         status,
        //         response
        //     }
        // })


    } catch (e) {
        console.error(e)
        sendError(event, createError({
            statusCode: 500,
            statusMessage: "Error updating user"
        }))
    }


})
