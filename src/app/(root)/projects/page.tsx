"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/projectCard";
import type { ProjectType } from '@/lib/db/schemas/projects';
import { RandoButton } from '@/components/projects/randoButton'
 const pageConfig = {
  title: "Projects",
}
import { config } from "@/lib/config";
export default function Page() {
  const [limit, setLimit] = useState(5);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  useEffect(() => {
    document.title = `${config.title} | ${pageConfig.title}`
  },[])
  useEffect(() => {
    fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProjects(
        projects.filter((project) =>
          project.tags.includes(selectedCategory.toUpperCase())
        )
      );
    } else {
      setFilteredProjects(projects);
    }
  }, [selectedCategory, projects]);

  const categories = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
      <RandoButton posts={projects}/>
        <h3 className="text-2xl font-bold mb-4">Filter by Category</h3>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button
            onClick={() => setSelectedCategory("")}
            className={selectedCategory === "" ? "bg-blue-500 text-white" : ""}
          >
            All
          </Button>
          {categories.map((category, index) => (
            <Button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category ? "bg-blue-500 text-white" : ""
              }
            >
              {category.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.slice(0, limit).map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      {limit < filteredProjects.length ? (
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setLimit(limit + 5)}>Load 5 more</Button>
        </div>
      ) : (
        <div className="mt-6 flex justify-center">
          <Button disabled>No more projects</Button>
        </div>
      )}
    </div>
  );
}
