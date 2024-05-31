import { z } from 'zod';
import { makeRouter } from '@/utils/routes';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { getId } from '@/utils/get-id';
import { NotFoundError } from '@/utils/error';
import { mapPage, pagerSchema } from '@/utils/pages';
import { mapPost } from '@/mappings/post';

export const postsRouter = makeRouter((app) => {
  app.post(
    '/api/v1/posts',
    {
      schema: {
        description: 'Create post',
        body: z.object({
          title: z.string().min(1),
          content: z.string().min(1),
        }),
      },
    },
    handler(async ({ body }) => {
      const newPost = await prisma.post.create({
        data: {
          id: getId('pst'),
          slug: "test",
          title: body.title,
          content: body.content,
        },
      });
      return mapPost(newPost);
    }),
  );

  app.get(
    '/api/v1/posts/:id',
    {
      schema: {
        description: 'Get post',
        querystring: z.object({
          type: z.enum(["id", "slug"]),
        }),
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ params }) => {
      const post = await prisma.project.findUnique({
        where: {
          id: params.id,
        },
      });
      if (!post) throw new NotFoundError();

      return mapPost(post);
    }),
  );

  app.get(
    '/api/v1/posts',
    {
      schema: {
        description: 'List posts',
        querystring: pagerSchema(),
      },
    },
    handler(async ({ query }) => {
      const total = await prisma.post.count();
      const posts = await prisma.post.findMany({
        take: query.limit,
        skip: query.offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return mapPage(query, posts.map(mapPost), total);
    }),
  );
});
