import { IUserData } from "./IUserData";

export interface IUserContext {
    user: IUserData | null;
    handleUserData: () => Promise<void>;
    loading: boolean
}