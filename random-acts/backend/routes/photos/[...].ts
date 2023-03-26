import { createRouter, useBase, defineEventHandler} from "h3";
import storageDriver from "../../helpers/storageDriver";


const router = createRouter()


router.get('/', defineEventHandler(async (event) => {
    const { id } = event.context.params.id
    const storage  = await storageDriver

    return await storage.getItem(`${id}`)
}))


useBase('/photos', router.handler)
