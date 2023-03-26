import multer from "multer"
import storageDriver from "../../../helpers/storageDriver";
export default eventHandler(async(event) => {
    try {
        const storage = storageDriver
        const body = await readBody(event)

        const { profilePhoto } = body

        const data = await storage.setItem('profileImage', profilePhoto)

        const upload = multer({
            des: data
        })

        await upload.single('profileImage')

        const status = getResponseStatus(event)

        return {
            status,
            message: "File uploaded"
        }
    } catch (e) {
        console.error(e)
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Something went wrong with file upload"
        }))
    }
})
