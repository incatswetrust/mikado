import axios from 'axios';
import { EmployeeListItemDtoSchema, type EmployeeListItemDto } from '$lib/dto/employee';

export async function getEmployees(): Promise<EmployeeListItemDto[]> {
    const { data } = await axios.get('/api/employees');
    return EmployeeListItemDtoSchema.array().parse(data); 
}
