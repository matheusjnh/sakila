import { db } from '@src/db/index.js';
import { actor } from '@src/db/schema.js';
import fp from 'fastify-plugin';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

const sakilaRouter: FastifyPluginAsyncZod = async (app) => {
  app.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: z.object({
        teste: z.string(),
      }),
    },
    handler: async (req, reply) => {
      const result = await db.select().from(actor);
      reply.send(result);
    },
  });
};

export default fp(sakilaRouter);
