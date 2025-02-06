import * as bcrypt from "bcrypt";

export class HashingHandler {
    static hashData(data: string) {
        return bcrypt.hashSync(data, 10);
    }

    static compareData(data: string, hashedData: string) {
        return bcrypt.compareSync(data, hashedData);
    }
}