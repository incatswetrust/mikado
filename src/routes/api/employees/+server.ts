import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { z } from 'zod';
import argon2 from 'argon2';
import { db, schema } from '$lib/server/db/client';

const { employees } = schema;

const createEmployeeSchema = z.object({
    name: z.string().min(1),
    category: z.string().min(1),
    status: z.enum(['active', 'inactive', 'on_leave']),
    phone: z.string().min(3),
    login: z.string().min(3),
    password: z.string().min(6),
    note: z.string().optional().default('')
});

// GET /api/employees  -> список (только нужные поля)
export const GET: RequestHandler = async () => {
    const rows = await db
        .select({
            id: employees.id,
            name: employees.name,
            category: employees.category,
            status: employees.status,
            phone: employees.phone,
            hire_date: employees.hireDate
        })
        .from(employees)
        .orderBy(employees.name);

    return json(rows);
};

// POST /api/employees -> создать (возвращаем те же поля)
export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json().catch(() => null);
    const parsed = createEmployeeSchema.safeParse(body);
    if (!parsed.success) {
        throw error(400, { message: 'Invalid payload'});
    }

    const { name, category, status, phone, login, password, note } = parsed.data;
    const passwordHash = await argon2.hash(password);

    try {
        const [row] = await db
            .insert(employees)
            .values({ name, category, status, phone, login, passwordHash, note })
            .returning({
                id: employees.id,
                name: employees.name,
                category: employees.category,
                status: employees.status,
                phone: employees.phone,
                hire_date: employees.hireDate
            });

        return json(row, { status: 201 });
    } catch (e: any) {
        if (e?.code === '23505') { // unique_violation (login)
            throw error(409, 'Login already exists');
        }
        throw error(500, 'Failed to create employee');
    }
};
