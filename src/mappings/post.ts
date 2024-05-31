import type { Post } from '@prisma/client';

export interface PostDto {
  id: string;
  slug: string;
  createdAt: string;
  title: string;
  content: string;
}

export function mapPost(post: Post): PostDto {
  return {
    id: post.id,
    slug: post.slug,
    createdAt: post.createdAt.toISOString(),
    title: post.title,
    content: post.content,
  };
}
