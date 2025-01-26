import * as bcrypt from "bcrypt";

export class HashingHandler {
    hashData(data: string) {
        return bcrypt.hashSync(data, 10);
    }

    compareData(data: string, hashedData: string) {
        return bcrypt.compareSync(data, hashedData);
    }
}