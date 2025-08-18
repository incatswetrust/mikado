import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { z } from 'zod';
import argon2 from 'argon2';
import { db, schema } from '$lib/server/db/client';
import {employeeListDtoCols} from "$lib/server/db/views";
import {sql} from "drizzle-orm";

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


// GET /api/employees
export const GET: RequestHandler = async ({ url }) => {
    const limit = 10;
    const pageParam = url.searchParams.get('page') ?? '1';
    const page = Math.max(1, Number(pageParam) || 1);
    const offset = (page - 1) * limit;

    const [rows, totalRes] = await Promise.all([
        db.select(employeeListDtoCols)
            .from(employees)
            .orderBy(employees.name)     
            .limit(limit)
            .offset(offset),
        db.select({ count: sql<number>`count(*)` }).from(employees)
    ]);

    const total = Number(totalRes[0]?.count ?? 0);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return json({
        data: rows,
        meta: {
            page,
            perPage: limit,
            total,
            totalPages,
            hasPrev: page > 1,
            hasNext: page < totalPages
        }
    });
};
// POST /api/employees 
export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json().catch(() => null);
    const parsed = createEmployeeSchema.safeParse(body);
    if (!parsed.success) {
        throw error(400, { message: 'Invalid payload', details: parsed.error.format()});
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
