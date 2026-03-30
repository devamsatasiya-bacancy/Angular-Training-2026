export interface Company {
    name: string;
    email: string;
    website: string;
    phoneNumber: string;
    projectsId: string[];
}

export interface Project{
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
}