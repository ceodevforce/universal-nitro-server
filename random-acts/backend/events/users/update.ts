import { readUserById, updateUser } from "../../api/db/user";

import { createError, H3Event } from "h3";
import { User } from "@prisma/client";
import formidable from "formidable";
import * as fs from "fs";
import multer from "multer";
import storageDriver from "../../helpers/storageDriver";
import { prisma } from "../../api/db";

import { hasAuthorization, requiredSignin } from "../../helpers/authHandler";

export default defineEventHandler(async (event: H3Event) => {
  await requiredSignin(event);
  await hasAuthorization(event);
  const form = new formidable.IncomingForm({ multiples: true });
  form.keepExtensions = true;
  form.parse(event.node.req, async (err, fields, files) => {
    // console.log("files: ", files);
    if (err) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Profile image could not uploaded",
        })
      );
    }

    try {
      const user: void | User = await readUserById(event);

      // const { firstName, lastName, password, about, profileImage } =
      //   await readBody(event);

      const { firstName, lastName, about, profileImage } = fields;

      user.firstName = firstName;
      user.lastName = lastName;
      user.about = about;

      user.updated = new Date();
        if (files.profileImage) {
            await storageDriver.setItem("profileImage", files.profileImage)
            const profileImageUrl = await storageDriver.getItem("profileImage")
            console.log("Image: ", profileImageUrl);
            user.profileImage = profileImageUrl.filepath;
        // user.profileImage = fs.readFileSync(files.profileImage.filepath);
      }

      const { id } = user;

      //   const updateUserDto = {
      //     id,

      //     updated: Date.now(),
      //   };

      const status = getResponseStatus(event);
      const response = await updateUser(user);
      user.password = undefined;
      user.passwordHash = undefined;
      return {
        status,
        user,
        response,
      };

      //
    } catch (e) {
      console.error(e);
      sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: "Error updating user",
        })
      );
    }

    //   const { firstName, lastName, password, about, profileImage } = await readBody(event)

    // @ts-ignore
    //   const { id } = user
    //   const updateUserDto = {
    //       id,
    //       firstName,
    //       lastName,
    //       password,
    //       about,
    //       profileImage
    //   }

    //   if (files.profileImage) {
    //       updateUserDto.profileImage = fs.readFileSync(files.profileImage.path)
    //   }

    //   const response = await updateUser(updateUserDto)
    //   return {
    //       status,
    //       response
    //   }
  });
});
