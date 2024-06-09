// /src/app/api/posts/[slug]/comments.ts
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Comment } from '@/lib/schema';

export const POST = async (req: Request, context: { params: { slug: string } }) => {
    const { params } = context;
    const { slug } = params;
  const folder = path.join(process.cwd(), '/src/app/posts-files/');
  const commentsFile = `${folder}${slug}-comments.json`;

  switch (req.method) {
    case 'GET':
      if (fs.existsSync(commentsFile)) {
        const commentsContent = fs.readFileSync(commentsFile, 'utf-8');
        const comments: Comment[] = JSON.parse(commentsContent);
        return Response.json(comments,{ status: 200});
      } else {
        return Response.json([], { status: 200 });
      }
      break;

    case 'POST':
      const { author, content } = await req.json()
      let comments: Comment[] = [];

      if (fs.existsSync(commentsFile)) {
        const commentsContent = fs.readFileSync(commentsFile, 'utf-8');
        comments = JSON.parse(commentsContent);
      }

      const newComment: Comment = {
        author,
        content,
        date: new Date().toISOString(),
      };

      comments.push(newComment);
      fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2), 'utf-8');
      Response.json({ message: 'Comment added' }, { status: 201 });
      break;

  }
};
export const DELETE = async(req: Request, context: { params: { slug: string } }) => {
  const body = await req.json()
  try {
      const folder = path.join(process.cwd(), '/src/app/posts-files/');
      const commentsFile = `${folder}${context.params.slug}-comments.json`;
      let jsonFile:any;
      if(fs.existsSync(commentsFile)) {
          jsonFile = fs.readFileSync(commentsFile, 'utf-8');
          let comments = JSON.parse(jsonFile);
          const commentIndex = comments.findIndex((c: Comment) => c.id === body.id);
          if (commentIndex !== -1) {
              comments.splice(commentIndex, 1); // This will delete the comment
              fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2), 'utf-8');
              return Response.json({ message: 'Comment deleted' }, { status: 200 });
          } else {
              return Response.json({ message: 'Comment not found' }, { status: 404 });
          }
      } else {
          return Response.json({ message: 'Comments file not found' }, { status: 404 });
      }
  } catch(err) {
      return Response.json(err, { status: 500 })
  }
}