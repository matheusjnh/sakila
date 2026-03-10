import fastify from 'fastify';
import autoload from '@fastify/autoload';
import path from 'path';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(autoload, {
  dir: path.join(__dirname, 'fastify'),
});

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
