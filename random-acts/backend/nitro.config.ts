import { defineNitroConfig } from "nitropack";

export default defineNitroConfig({
    runtimeConfig: {
        secretKey: process.env.NITRO_SECRET_KEY,
        dataBaseUrl: process.env.DATABASE_URL
    }
})
