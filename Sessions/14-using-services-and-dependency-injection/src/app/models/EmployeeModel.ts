export interface EmployeeModel {
    id: number;
    name: string;
    position: string;
}

export interface DepartmentEmployeesModel {
    id: number;
    name: string;
    employees: EmployeeModel[];

}


// type Department = '.NET' | 'Angular' | 'Sales' | 'Marketing';

 