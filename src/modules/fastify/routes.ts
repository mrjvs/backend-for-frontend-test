import { type FastifyInstance } from 'fastify';
import { postsRouter } from '@/routes/posts';

export async function setupRoutes(app: FastifyInstance) {
  await app.register(postsRouter.register);
}
