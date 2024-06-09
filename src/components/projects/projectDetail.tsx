import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
export const ProjectDetail = ({ project, ...props }: any) => {
    return(
        <>
              <div className="container mx-auto p-6">
        <main className="my-8">
          <section className="mb-8">
            <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
            <div className="mb-4">
              <h3 className="text-2xl font-bold">Tags</h3>
              <ul className="flex space-x-2 mt-2">
                {project.tags.map((tag:string, index:number) => (
                  <Badge key={tag} className="px-2 py-1 rounded-full text-sm">
                    {tag}
                  </Badge>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold">Author</h3>
              <div className="flex items-center">
                <Avatar className="mr-3">
                  <AvatarImage src={project.image.avatar} alt={project.author} />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <p className="text-lg">{project.author}</p>
              </div>
            </div>
            <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: project.description }}></p>
            <div className="mb-6">
              <img
                src={project.image.cover}
                alt="Cover"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <img
                src={project.image.primary}
                alt="Primary"
                className="w-full h-auto rounded-lg"
              />
              <img
                src={project.image.secondary}
                alt="Secondary"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Created At</h3>
              <p className="text-lg">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </section>
        </main>
      </div>
        </>
    )
}