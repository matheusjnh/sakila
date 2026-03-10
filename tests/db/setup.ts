import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createConnection, Connection } from 'mysql2/promise';

import path from 'node:path';

export type DbCtx = {
  client: Connection;
  db: MySql2Database;
  container: StartedMySqlContainer;
};

export const setupDb = async (): Promise<DbCtx> => {
  const container = await new MySqlContainer('mysql:8.0-debian').start();

  const client = await createConnection({
    host: container.getHost(),
    port: container.getPort(),
    database: container.getDatabase(),
    user: container.getUserPassword(),
    password: container.getUserPassword(),
  });

  const db = drizzle(client);
  await migrate(db, {
    migrationsFolder: path.resolve(path.join(__filename, '../../../drizzle')),
  });

  return {
    db,
    client,
    container,
  };
};

export const closeCtx = async (ctx: DbCtx) => {
  try {
    await ctx.client.end();
    await ctx.container.stop();
  } catch {}
};
