import { type LibSQLDatabase } from 'drizzle-orm/libsql';
import { type Client } from '@libsql/client';
import * as schema from './schema.ts';

export type DB = LibSQLDatabase<typeof schema>;
export type TursoClient = Client;
