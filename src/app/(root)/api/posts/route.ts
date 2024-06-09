import * as fs from 'node:fs';
import * as path from 'node:path';
import { parse } from 'yaml';
import type { Post } from "@/lib/schema";
import type { Comment } from "@/lib/schema"
export const GET = async (req: Request) => {
  const folder = path.join(process.cwd(), '/src/app/posts-files/');
  let posts: Post[] = [];

  fs.readdirSync(folder).forEach((file) => {
    if (file.endsWith('.mdx')) {
      const filePath = path.join(folder, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const [yaml, markdown] = fileContent.split(/\n---\n/);

      const data = parse(yaml);
      const slug = file.replace('.mdx', ''); // remove file extension

      posts.push({
        slug,
        data: {
          title: data.title,
          description: data.description,
          date: data.date,
          tags: data.tags,
          coverImage: data.coverImage,
        },
        content: markdown.trim(),
      });
    }
  });

  return new Response(JSON.stringify(posts));
};

