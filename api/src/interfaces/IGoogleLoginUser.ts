import { IRegisterUser } from "./IRegisterUser";
export interface IGoogleLoginUser extends Omit<IRegisterUser, "password"> {
    pictureUrl?: string
}