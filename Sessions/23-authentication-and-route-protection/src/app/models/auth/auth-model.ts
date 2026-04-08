export interface LoginResponseModel {
    userId:number;
    username:string;
    email:string;
    role:string;
    accessToken:string;
    expiresInSeconds:number;
    refreshToken:string;
}

export interface LoginRequestModel{
    usernameoremail:string;
    password:string;
}

export interface RegisterRequestModel{
    userName:string;
    email:string;
    password:string;
    FirstName:string;
    LastName:string;
}