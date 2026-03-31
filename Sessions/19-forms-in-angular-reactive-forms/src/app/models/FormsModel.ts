export interface Company {
    id:string;
    name: string;
    email: string;
    website: string;
    phoneNumber: string;
    projects: Project[];
    message?: string;
}

export interface Project{
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
}