import formidable from 'formidable'
import * as fs from "fs";

import {createError, H3Event} from "h3";


export async function formUpload (event: H3Event) {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(event.node.req, async (err, fields, files) => {
        console.log('fields: ', fields)
        if (err) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: "Profile image could not be uploaded"
            }))
        }

        if (files.profileImage) {
            let photo
            photo = fs.readFileSync(files.profileImage.path)
        }
    })
}
