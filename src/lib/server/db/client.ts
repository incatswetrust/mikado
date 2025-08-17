import { drizzle } from 'drizzle-orm/node-postgres';
import {Pool} from 'pg'
import { DATABASE_URL } from '$env/static/private';
import * as schema from './schema';

const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle(pool, { schema });
export { schema, pool };