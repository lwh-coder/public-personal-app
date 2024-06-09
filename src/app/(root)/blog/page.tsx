"use client";
import { PostCard } from "@/components/blog/postCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import type { Post } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [limit, setLimit] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
        // Extract unique tags from posts
        const uniqueTags: string[] = Array.from(new Set(response.data.flatMap((post: Post) => post.data.tags)));
        setTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomPost = () => {
    if (posts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
  };

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.data.tags.includes(selectedTag))
    : posts;

  const randomPost = getRandomPost();

  return (
    <div className="container mx-auto p-6">
      {randomPost && (
        <Button>
          <Link href={`/blog/${randomPost.slug}`}>
            Go to a random post
          </Link>
        </Button>
      )}

      <div className="flex justify-center mb-6">
        <Badge className="m-2 rounded-sm w-auto h-10" onClick={() => setSelectedTag("")}>
          All posts
        </Badge>
          {tags.map((tag, index) => (
            <Badge key={index}  onClick={() => setSelectedTag(tag)} className="m-2 rounded-sm w-auto h-10">
              {tag}
            </Badge>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.slice(0, limit).map((post, index) => (
            <PostCard key={index} post={post} />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      {limit < filteredPosts.length ? (
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setLimit(limit + 5)}>Load 5 more</Button>
        </div>
      ) : (
        <div className="mt-6 flex justify-center">
          <Button disabled>No more posts</Button>
        </div>
      )}
    </div>
  );
}
