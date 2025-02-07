import { prisma } from "../src/utils/prisma";

(async () => {
    await prisma.user.deleteMany()
})()