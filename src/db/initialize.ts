import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema.ts';
import { config } from '../core/config.ts';
import { getClient, getDb, setClient, setDb } from './state.ts';
import { log } from '../core/utils.ts';
import { LogLevel } from '../core/logging.ts';

export async function initDb() {
  try {
    // Check if db and client already exist
    const existingDb = getDb();
    const existingClient = getClient();

    if (existingDb && existingClient) {
      // Verify the connection is still valid
      try {
        await existingClient.execute('SELECT 1');
        // log(LogLevel.DEBUG, 'Existing database connection is valid');
        return { db: existingDb, client: existingClient };
      } catch (error) {
        log(LogLevel.WARN, 'Existing database connection is invalid, reinitializing:', error);
      }
    }

    // Close any existing client
    if (existingClient) {
      await existingClient.close();
    }

    const client = createClient(config.tursoConfig);

    // Test the new connection
    await client.execute('SELECT 1');

    // deno-lint-ignore no-explicit-any
    const db = drizzle(client as any, { schema });

    setDb(db);
    setClient(client);

    log(LogLevel.INFO, 'Database and client initialized successfully');
    return { db, client };
  } catch (error) {
    log(LogLevel.ERROR, `Failed to initialize database: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
