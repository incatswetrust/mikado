import axios from 'axios';

export type EmployeeListItemDto = {
    id: string; name: string; category: string; status: string; phone: string; hire_date: string;
};
export type EmployeeDetailsDto = {
    id: string; name: string; category: string; status: string; phone: string; hire_date: string; note: string;
}
export type Paged<T> = {
    data: T[];
    meta: { page: number; perPage: number; total: number; totalPages: number; hasPrev: boolean; hasNext: boolean; };
};

export async function getEmployees(page = 1): Promise<Paged<EmployeeListItemDto>> {
    const { data } = await axios.get<Paged<EmployeeListItemDto>>(`/api/employees?page=${page}`);
    return data;
};

export async function deleteEmployee(id: string): Promise<void> {
    await axios.delete(`/api/employees/${id}`);
};

export async function getEmployee(id: string): Promise<EmployeeDetailsDto> {
    const {data} = await axios.get<EmployeeDetailsDto>(`/api/employees/${id}`);
    return data;
};