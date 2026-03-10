import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import fp from 'fastify-plugin';
import z from 'zod';
import { getFilmsByCategory } from '@src/db/query/film';

const filmsRouter: FastifyPluginAsyncZod = async (app) => {
  app.route({
    method: 'GET',
    url: '/films',
    schema: {
      querystring: z.object({
        category: z.string(),
      }),
    },
    handler: async (req, reply) => {
      const result = await getFilmsByCategory(app.db, 'teste');
      reply.send(result);
    },
  });
};

export default fp(filmsRouter);
