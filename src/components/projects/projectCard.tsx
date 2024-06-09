"use client"
import { Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const ProjectCard = ({ project, ...props }: any) => {
    return(
        <Card {...props} className="shadow-md">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription dangerouslySetInnerHTML={{ __html: project.description + "..." }} />
            </CardHeader>
            <CardContent>
              <img
                src={project.image.cover}
                alt="Cover"
                className="w-full h-52 rounded-lg mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag: string, index:number) => (
                  <Badge key={index} className="px-2 py-1 rounded-full text-sm">
                    {tag.toUpperCase()}
                  </Badge>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Author</h3>
                <div className="flex items-center">
                  <Avatar className="mr-3">
                    <AvatarImage src={project?.image.avatar} alt="@author" />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <p className="text-lg">{project?.author}</p>
                </div>
              </div>
              <p className="text-sm">
                <b>Created At</b>:{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/projects/${project.slug}`} className="w-full">
                <Button className="w-full">View Project</Button>
              </Link>
            </CardFooter>
          </Card>
    )
}