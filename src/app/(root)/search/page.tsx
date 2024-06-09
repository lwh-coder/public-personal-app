"use client";
import { Button } from '@/components/ui/button';
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import debounce from "lodash.debounce";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [results, setResults] = useState<any>([]);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const q = searchParams.get("q") || content;
    setContent(q);
    fetchData();
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    try {
      const [postsResponse, projectsResponse] = await Promise.all([
        axios.get("/api/posts"),
        axios.get("/api/projects"),
      ]);
      setPosts(postsResponse.data);
      setProjects(projectsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const debouncedSearch = useMemo(() => debounce((searchTerm) => {
    if (searchTerm) {
      const filteredPosts = posts.filter((post: any) =>
        post.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.data.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filteredProjects = projects.filter((project: any) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults([...filteredPosts, ...filteredProjects]);
    } else {
      setResults([]);
    }
  }, 300), [posts, projects]);

  useEffect(() => {
    debouncedSearch(content);
    return () => debouncedSearch.cancel();
  }, [content, debouncedSearch]);

  const formatHighlightedText = (text: any, keyword: any) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, "<b>$1</b>");
  };

  const handleLimit = () => setLimit((prevLimit) => prevLimit + 5);

  return (
    <div className="flex flex-col items-center min-h-screen py-4 bg-gray-50 dark:bg-background">
      <div className="w-full max-w-3xl px-4">
        <Label htmlFor="search-bar" className="block text-lg font-medium text-gray-700 mb-2 dark:text-white">Search</Label>
        <Input
          id="search-bar"
          type="search"
          placeholder="Search"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
        />
        {results.length === 0 && <p className="mt-4 text-center text-gray-500">No results found.</p>}
        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            {results.slice(0, limit).map((result: any, index: number) => (
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-inherit dark:border" key={index}>
                <Link href={result.slug ? `/blog/${result.slug}` : result.href} className="text-xl text-blue-600 hover:underline" dangerouslySetInnerHTML={{
                    __html: formatHighlightedText(result.title || result.data.title, content),
                  }}>
                </Link>
                <div className="text-sm text-gray-500 mt-1">{result.data ? "Post" : "Project"}</div>
                <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{
                  __html: formatHighlightedText(result.description || result.data.description, content),
                }}></p>
                <div className="flex flex-wrap mt-2 space-x-2">
                  {(result.data?.tags || result.tags)?.map((tag: any, index: number) => (
                    <span className="px-2 py-1 text-sm bg-gray-200 rounded-full dark:bg-inherit dark:border" key={index}>#{tag}</span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-400">{result.data?.date || new Date(result.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
        {results.length > limit ? (
          <div className="flex justify-center mt-6">
            <Button onClick={handleLimit} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Load 5 more results
            </Button>
          </div>
        ) : (
          <div className="flex justify-center mt-6">
            <Button disabled className="px-4 py-2 text-gray-500 bg-gray-300 rounded-md cursor-not-allowed">
              No more results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
