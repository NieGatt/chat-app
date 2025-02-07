import { prisma } from "../src/utils/prisma";

(async () => {
    const users = await prisma.user.findMany()
    console.log(users)
})()