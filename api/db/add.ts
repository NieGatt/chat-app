import { prisma } from "../src/utils/prisma";
import { v4 as uuid } from "uuid";
import { faker } from '@faker-js/faker';

(async () => {
    for (let value = 1; value < 200; value++) {
        await prisma.user.create({
            data: {
                id: uuid(),
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                verified: true
            }
        })
    }
})()