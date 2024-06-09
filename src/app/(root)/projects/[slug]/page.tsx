"use client";

import { useState, useEffect } from "react";
import type { ProjectType } from "@/lib/db/schemas/projects";
import { ProjectDetail } from "@/components/projects/projectDetail";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
export default function Page({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<ProjectType>();
  const [loading, setLoading] = useState("loading");
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.slug}`);
        const data = await response.json();

        if (response.status === 200 && data) {
          setProject(data);
          setLoading("done");
        } else {
          console.log("Project not found");
          setLoading("error");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading("error");
      }
    };
    fetchProject();
  }, [params.slug]);
  useEffect(() => {
    document.title = `${config.title} | ${params.slug}`;
  })
  if (loading === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (loading === "error") {
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

  if (loading === "done" && project) {
    return (
      <ProjectDetail project={project} />
    );
  }

  return null;
}

