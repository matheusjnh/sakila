import fastify from 'fastify';
import autoload from '@fastify/autoload';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
