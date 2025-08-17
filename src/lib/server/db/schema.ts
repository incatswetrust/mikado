import { pgTable, text, uuid, timestamp, pgEnum, date } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const employeeStatus = pgEnum('employee_status', ['active', 'inactive', 'on_leave']);

export const employees = pgTable('employees', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    category: text('category').notNull(),
    status: employeeStatus('status').notNull(),
    phone: text('phone').notNull(),
    hireDate: date('hire_date').default(sql`CURRENT_DATE`).notNull(),

    login: text('login').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    note: text('note'),
    base64avatar: text('base64avatar'),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});
