export interface LoginResponseModel {
    userId:number;
    userName:string;
    email:string;
    role:string;
    accessToken:string;
    expiresInSeconds:number;
    refreshToken:string;
}

export interface LoginRequestModel{
    email:string;
    password:string;
}

export interface RegisterRequestModel{
    userName:string;
    email:string;
    password:string;
    FirstName:string;
    LastName:string;
}