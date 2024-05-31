import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import slugify from 'slugify';
import { nanoid } from 'nanoid';
import { makeRouter } from '@/utils/routes';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { getId } from '@/utils/get-id';
import { NotFoundError } from '@/utils/error';
import { mapPage, pagerSchema } from '@/utils/pages';
import { mapPost, mapShallowPost } from '@/mappings/post';
import { assertAuth } from '../utils/auth';

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
    handler(async ({ req, body }) => {
      assertAuth(req);
      let slug = slugify(body.title);
      const existingSlug = await prisma.post.findUnique({
        where: {
          slug,
        },
      });
      if (existingSlug) slug = `${slug}-${nanoid(4)}`;
      const newPost = await prisma.post.create({
        data: {
          id: getId('pst'),
          slug,
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
          type: z.enum(['id', 'slug']).default('id'),
        }),
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ req, params, query }) => {
      assertAuth(req);
      const postQuery: Prisma.PostWhereUniqueInput =
        query.type === 'id'
          ? {
              id: params.id,
            }
          : {
              slug: params.id,
            };
      const post = await prisma.post.findUnique({
        where: postQuery,
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
    handler(async ({ req, query }) => {
      assertAuth(req);
      const total = await prisma.post.count();
      const posts = await prisma.post.findMany({
        take: query.limit,
        skip: query.offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return mapPage(query, posts.map(mapShallowPost), total);
    }),
  );
});
