import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { z } from 'zod';
import argon2 from 'argon2';
import { db, schema } from '$lib/server/db/client';
import { employeeDetailsDtoCols } from '$lib/server/db/views';
import { eq } from 'drizzle-orm';

const { employees } = schema;

const idSchema = z.string().uuid();


const updateSchema = z.object({
    name: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    status: z.enum(['active', 'inactive', 'on_leave']).optional(),
    phone: z.string().min(3).optional(),
    login: z.string().min(3).optional(),      
    password: z.string().min(6).optional(),   
    note: z.string().optional()
}).refine((o) => Object.keys(o).length > 0, 'No fields to update');

// GET /api/employees/:id
export const GET: RequestHandler = async ({ params }) => {
    const id = idSchema.parse(params.id);
    const [row] = await db
        .select(employeeDetailsDtoCols)
        .from(employees)
        .where(eq(employees.id, id))
        .limit(1);

    if (!row) throw error(404, 'Employee not found');
    return json(row);
};

// PATCH /api/employees/:id 
export const PATCH: RequestHandler = async ({ params, request }) => {
    const id = idSchema.parse(params.id);
    const body = await request.json().catch(() => ({}));
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
        throw error(400, { message: 'Invalid payload', details: parsed.error.format() });
    }

    const data = parsed.data;

    // соберём set-объект без undefined
    const set: Partial<typeof employees.$inferInsert> = {};
    if (data.name !== undefined) set.name = data.name;
    if (data.category !== undefined) set.category = data.category;
    if (data.status !== undefined) set.status = data.status;
    if (data.phone !== undefined) set.phone = data.phone;
    if (data.login !== undefined) set.login = data.login;
    if (data.note !== undefined) set.note = data.note;
    if (data.password !== undefined) set.passwordHash = await argon2.hash(data.password);

    try {
        const [row] = await db
            .update(employees)
            .set(set)
            .where(eq(employees.id, id))
            .returning(employeeDetailsDtoCols);

        if (!row) throw error(404, 'Employee not found');
        return json(row); // отдаём обновлённые поля (без login/password_hash)
    } catch (e: any) {
        if (e?.code === '23505') throw error(409, 'Login already exists');
        throw error(500, 'Failed to update employee');
    }
};

// DELETE /api/employees/:id
export const DELETE: RequestHandler = async ({ params }) => {
    const id = idSchema.parse(params.id);
    const deleted = await db
        .delete(employees)
        .where(eq(employees.id, id))
        .returning({ id: employees.id });

    if (deleted.length === 0) throw error(404, 'Employee not found');
    return new Response(null, { status: 204 }); 
};
