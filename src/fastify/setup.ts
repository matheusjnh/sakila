import { db } from '@src/db';
import { MySql2Database } from 'drizzle-orm/mysql2';
import fastify, { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    db: MySql2Database;
  }
}

const setupFastify: FastifyPluginAsync = async (app) => {
  app.decorate('db', db);
};

export default fp(setupFastify);
