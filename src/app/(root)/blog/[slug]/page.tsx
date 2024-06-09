"use client";
import "@/styles/highlight-js/github-dark.css";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import type { Post, Comment } from "@/lib/schema";
import axios from "axios";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { IonIcon } from "@ionic/react";
import { clipboard } from "ionicons/icons";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { comment } from "postcss";
const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
};

type PostWithSerializedContent = Post & { content: any };

export const dynamic = "force-dynamic";
const CommentCard = ({
  comment,
  setNewComment,
  handleDeleteComment,
  newComment,
  user,
}: { comment: Comment, setNewComment: any, handleDeleteComment: any, newComment: string, user: any }) => {
  return (
    <>
      <p className="text-lg font-bold">{comment.author.username}</p>
      <h2>{comment.author.email}</h2>
      <img src={comment.author.avatar} alt="author avatar" />
      <p>{comment.content}</p>
      <p className="text-sm text-gray-500">
        {new Date(comment.date).toLocaleString()}
      </p>

      <Button
        onClick={() =>
          setNewComment(`@${comment.author.username}` + newComment)
        }
      >
        {user?.id === comment.author.id && (
          <Button onClick={() => handleDeleteComment(comment.id)}>
            Delete Comment
          </Button>
        )}
        Add Reply
      </Button>
    </>
  );
};
export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<PostWithSerializedContent | undefined>(
    undefined
  );
  const [state, setState] = useState<"loading" | "done" | "error">("loading");
  const [error, setError] = useState<string>("");
  const { theme } = useTheme();
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  const { user, isSignedIn } = useUser();

  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/posts/${params.slug}/comments`, {
        slug: params.slug,
        author: {
          id: user?.id as string,
          email: user?.emailAddresses[0].emailAddress as string,
          username: user?.username as string,
          avatar: user?.imageUrl as string,
        },
        content: newComment,
      });
      if (res.status === 201) {
        setComments([
          ...comments,
          {
            author: {
              id: user?.id as string,
              email: user?.emailAddresses[0].emailAddress as string,
              username: user?.username as string,
              avatar: user?.imageUrl as string,
            },
            content: newComment,
            date: new Date().toISOString(),
          },
        ]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const res = await axios.delete(`/api/posts/${params.slug}/comments/`, {
        data: {
          id: commentId,
        },
      });
      if (res.status === 200) {
        setComments(comments.filter((comment) => comment.id !== commentId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${params.slug}`);
        if (response.status === 200) {
          const mdxSource = response.data.content;
          const serializedSource = await serialize(mdxSource, options);
          setPost({ ...response.data, content: serializedSource });
          setComments(response.data.comments || []);
          setState("done");
        } else {
          setState("error");
          setError("404 this post was not found");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setState("error");
          setError("404 this post was not found");
        } else {
          console.error("Error fetching post:", error);
          setState("error");
          setError("Error fetching post " + error.message);
        }
      }
    };

    fetchPost().catch((error) => {
      console.error("Error in fetchPost:", error);
    });
  }, [params.slug]);

  if (state === "loading") {
    return <h1>Loading...</h1>;
  }

  if (state === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          This post was not found.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Go back home
        </a>
      </div>
    );
  }

  if (state === "done" && post) {
    return (
      <div className="p-12 m-auto w-full max-w-3xl">
        <center className="mt-6 mb-10">
          <h1 className="text-6xl font-bold">{post?.data.title}</h1>
          <p className="py-6 text-2xl font-semibold">
            {post?.data.description}
          </p>
          <img
            src={post?.data.coverImage}
            width={"500px"}
            height={"500px"}
            className="rounded-lg"
            alt="Cover Image"
          />
          <p className="py-6 text-xl font-semibold">{post?.data.date}</p>
          {post?.data.tags.map((tags: any, index: any) => (
            <Badge key={index} className="m-2 rounded-sm w-auto h-10">
              {tags}
            </Badge>
          ))}
        </center>
        <div className="prose dark:prose-dark lg:prose-xl">
          {post && (
            <MDXRemote
              {...post.content}
              components={{
                code: ({ children, className }: any) => {
                  const getCodeText: any = (child: any) => {
                    if (typeof child === "string") return child;
                    if (Array.isArray(child))
                      return child.map(getCodeText).join("");
                    if (child.props && child.props.children)
                      return getCodeText(child.props.children);
                    return "";
                  };

                  if (theme === "light") {
                    return (
                      <div className="relative hljs-code-container">
                        <code className={className}>{children}</code>
                        <button
                          className="hljs-copy-btn"
                          onClick={() => {
                            const text = getCodeText(children);
                            navigator.clipboard.writeText(text);
                          }}
                        >
                          <IonIcon icon={clipboard} />
                        </button>
                      </div>
                    );
                  } else {
                    return (
                      <div className="relative hljs-code-container">
                        <code
                          className={
                            className
                              ?.toString()
                              .replace("hljs", "hljs-dark") && ""
                          }
                        >
                          {children}
                          <div className="">
                            <button
                              className="hljs-copy-btn inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 shadow-none hover:text-accent-foreground h-8 w-8 p-0 text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
                              onClick={() => {
                                const text = getCodeText(children);
                                navigator.clipboard.writeText(text);
                              }}
                            >
                              <IonIcon icon={clipboard} className="" />
                            </button>
                          </div>
                        </code>
                      </div>
                    );
                  }
                },
              }}
            />
          )}
          {user?.id && user && isSignedIn ? (
            <>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Comments</h2>
                {comments.map((comment, index) => (
                  <div key={index} className="mt-4 p-4 border rounded-lg">
                    <CommentCard comment={comment} setNewComment={setNewComment} handleDeleteComment={handleDeleteComment} newComment={newComment} user={user}/>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <form onSubmit={handleNewComment}>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={4}
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <Button type="submit" className="mt-2">
                    Add Comment
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">You need to sign in to view comments</h1>
              <Button><a href="/sign-in">Sign in</a></Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return null; // fallback return in case none of the states match
}
