import { z } from 'zod';

export const EmployeeListItemDtoSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    category: z.string(),
    status: z.string(),
    phone: z.string(),
    hire_date: z.string() 
});
export type EmployeeListItemDto = z.infer<typeof EmployeeListItemDtoSchema>;


