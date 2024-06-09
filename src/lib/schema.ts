// src/lib/schema.ts
export interface Comment {
  id?: string;
  author: {
    id?: string;
    email: string;
    username: string;
    avatar: string;
  };
  content: string;
  date: string;
}

export type Post = {
  slug: string;
  data: {
    title: string;
    description: string;
    date: string;
    tags: string[];
    coverImage: string;
  };
  content: string;
  comments?: Comment[];
};
