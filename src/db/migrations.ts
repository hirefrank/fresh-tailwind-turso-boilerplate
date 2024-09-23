import { migrate } from 'drizzle-orm/libsql/migrator';
import { initDb } from './initialize.ts';

const { db, client } = await initDb();
await migrate(db, { migrationsFolder: './drizzle' });
client.close();
