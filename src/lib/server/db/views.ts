import { employees } from './schema';

export const employeeListDtoCols = {
    id: employees.id,
    name: employees.name,
    category: employees.category,
    status: employees.status,
    phone: employees.phone,
    hire_date: employees.hireDate  
} as const;
