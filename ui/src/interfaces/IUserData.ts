export interface IUserData {
    id: string;
    name: string;
    email: string;
    pictureUrl?: string;
    type: "STANDARD_AUTH" | "GOOGLE_OAUTH20"
}