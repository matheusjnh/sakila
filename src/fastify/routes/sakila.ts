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
      reply.status(200).send(req.query.teste);
    },
  });
};

export default fp(sakilaRouter);
