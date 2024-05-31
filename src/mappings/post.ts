import type { Post } from '@prisma/client';

export interface PostDto {
  id: string;
  slug: string;
  createdAt: string;
  title: string;
  content: string;
}

export interface ShallowPostDto {
  id: string;
  slug: string;
  createdAt: string;
  title: string;
  excerpt: string;
}

export function mapShallowPost(post: Post): ShallowPostDto {
  return {
    id: post.id,
    slug: post.slug,
    createdAt: post.createdAt.toISOString(),
    title: post.title,
    excerpt: post.content.slice(0, 50),
  };
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
