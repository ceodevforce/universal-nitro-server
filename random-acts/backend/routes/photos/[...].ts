import { createRouter, useBase, defineEventHandler } from "h3";
import storageDriver from "../../helpers/storageDriver";
import { prisma } from "../../api/db";

const router = createRouter();

router.get(
  "/all",
  defineEventHandler(async (event) => {
    // const { id } = event.context.params.id
    // const storage  = await storageDriver

    // await storage.getItem(`${id}`)
    const photos = await prisma.sTORAGE.findMany();
    return photos;
  })
);

useBase("/photos", router.handler);
