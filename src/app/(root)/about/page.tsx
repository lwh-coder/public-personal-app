"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post} from "@/lib/schema";
import { config } from "@/lib/config";
const pageConfig = {
  title: "About"
}
export default function Page() {
  const [projects, setProjects] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = `${config.title} | ${pageConfig.title}`
 
  },[])
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();

        if (response.ok && data) {
          setProjects(data);
        } else {
          console.log("Projects not found");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <main>
          <section className="my-8 text-center">
            <h2 className="text-6xl font-bold">About me</h2>
            <p className="text-lg mt-2">
              Subheading that sets up context, shares more info about the
              author, or generally gets people psyched to keep reading
            </p>
              <p className="text-base">
                Body text for your whole article or post. We’ll put in some
                lorem ipsum to show how a filled-out page might look:
              </p>
              <p className="text-base mt-4">
                Excepteur efficient emerging, minim veniam anim aute carefully
                curated Ginza conversation exquisite perfect nostrud nisi
                intricate Content. Qui international first-class nulla ut.
                Punctual adipiscing, essential lovely quem tempor eiusmod iure.
                Exclusive izakaya charming Scandinavian impeccable aute quality
                of life soft power particular Melbourne occaecat discerning. Qui
                wardrobe aliqua, et Porter destination Toto remarkable officia
                Helsinki exceptuer Basset hound. Zurich sleepy perfect
                consectetur.
              </p>
              <p className="text-base mt-4">
                Exquisite sophisticated iconic cutting-edge laborum deserunt
                Addis Ababa esse bureaux cupidatat id minim. Sharp classic the
                best commodo nostrud delightful. Conversation aute Rochester id.
                Qui sunt remarkable deserunt intricate airport handsome K-pop
                exceptuer classic esse Asia-Pacific laboris.
              </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <img
                src="/river.jpeg"
                alt="Additional Project"
                className="w-full h-auto rounded-lg"

              />
              <img
                src="/grass.jpeg"
                alt="Additional Project"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="my-6">
              <p className="text-base">
                Excepteur efficient emerging, minim veniam anim cloying aute
                carefully curated gauche. Espresso exquisite perfect nostrud
                nisi intricate. Punctual adipiscing Borzoi, essential lovely
                tempor eiusmod iure. Exclusive izakaya charming Quezon City
                impeccable aute quality of life soft power particular occaecat
                discerning. Qui wardrobe aliqua, et Amadeus rock opera.
              </p>
              <p className="text-base mt-4">
                Exquisite sophisticated iconic cutting-edge laborum deserunt
                erse bureaux cupidatat id minim. Sharp classic the best commodo
                nostrud delightful. Conversation aute wley id. Qui sunt
                remarkable deserunt intricate airport exceptuer classic esse
                riot gift.
              </p>
            </div>
          </section>
          <section className="my-8">
            <h3 className="text-2xl font-bold">Related blog posts</h3>
            {loading ? (
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold">Loading...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {projects.slice(0, 3).map((post, index) => (
               <Card key={index} className="shadow-md">
               <CardHeader>
                 <CardTitle>{post.data.title}</CardTitle>
                 <CardDescription>{post.data.description}</CardDescription>
               </CardHeader>
               <CardContent>
                 <img
                   src={post.data.coverImage}
                   alt="Cover Image"
                   className="w-full h-52 rounded-lg mb-4 object-cover"
                 />
                 <div className="flex flex-wrap gap-2 mb-4">
                   {post.data.tags.map((tag, index) => (
                     <Badge key={index} className="px-2 py-1 rounded-full text-sm">
                       {tag.toUpperCase()}
                     </Badge>
                   ))}
                 </div>
                 <p className="text-sm">
                   <b>Created At</b>:{" "}
                   {new Date(post.data.date).toLocaleDateString()}
                 </p>
               </CardContent>
               <CardFooter>
                 <Link href={`/blog/${post.slug}`} className="w-full">
                   <Button className="w-full">Read more</Button>
                 </Link>
               </CardFooter>
             </Card>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
