import { createStorage } from "unstorage";
import planetScaleDriver from "unstorage/drivers/planetscale"


const config = useRuntimeConfig()
const storageDriver = createStorage({
    driver: planetScaleDriver({
        url: config.dataBaseUrl,
        table: "STORAGE"
    })
})

export default storageDriver
