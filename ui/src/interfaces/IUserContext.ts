import { IUserData } from "./IUserData";

export interface IUserContext {
    user: IUserData | null;
    handleUser: () => Promise<void>;
    loading: boolean
}