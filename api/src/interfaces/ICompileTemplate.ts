import { ISendEmail } from "./ISendEmail";

export interface ICompileTemplate extends Omit<ISendEmail, "email"> { }