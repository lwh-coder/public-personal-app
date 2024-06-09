// src/app/api/posts/[slug]/index.ts
import * as fs from 'node:fs';
import * as path from 'node:path';
import { parse } from 'yaml';
import type { Post, Comment } from '@/lib/schema';

export const GET = async (req: Request, context: { params: { slug: string } }) => {
  const { params } = context;
  const { slug } = params;
  const folder = path.join(process.cwd(), '/src/app/posts-files/');
  const file = `${folder}${slug}.mdx`;
  const commentsFile = `${folder}${slug}-comments.json`;
  let post: Post | { message: string };
  let status: number;

  if (fs.existsSync(file)) {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const [yaml, markdown] = fileContent.split(/\n---\n/);

    const data = parse(yaml);
    let comments: Comment[] = [];

    if (fs.existsSync(commentsFile)) {
      const commentsContent = fs.readFileSync(commentsFile, 'utf-8');
      comments = JSON.parse(commentsContent);
    }

    post = {
      slug,
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags,
        coverImage: data.coverImage,
      },
      content: markdown.trim(),
      comments,
    };
    status = 200;
  } else {
    post = { message: "File not found" };
    status = 404;
  }

  return new Response(JSON.stringify(post), { status });
};
