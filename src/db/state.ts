import { DB, TursoClient } from './types.ts';

let db: DB | null = null;
let client: TursoClient | null = null;

export function setDb(database: DB) {
  db = database;
}

export function setClient(c: TursoClient) {
  client = c;
}

export function getDb(): DB | null {
  return db;
}

export function getClient(): TursoClient | null {
  return client;
}
