import clientPromise from "@/lib/db/client"
export const GET = async(req: Request, context: any) => {
    const { params } = context;
    console.log(req.url)
    const slug = params.slug;
    const client = await clientPromise
    const db = client?.db("pers")
    const col = db?.collection("projects")
    const Projects = await col?.findOne({ slug: slug })
    if(!Projects) {
        return Response.json({ message: "Project not found" }, { status: 400 })
    } else {
        return Response.json(Projects)
    }
}