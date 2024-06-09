import clientPromise from "@/lib/db/client"
import { ObjectId } from "mongodb"
import { type NextRequest } from 'next/server'
 

export const GET = async(req: Request) => {
    const client = await clientPromise
    const ur = req.headers.get("referer")
    console.log(ur)
    const db = client?.db("pers")
    const col = db?.collection("projects")
    const Projects = await col?.find({}).toArray()
    return Response.json(Projects)
}
export const POST = async(req: Request) => {
    const body = await req.json()
    console.log(body)
    if(!body.id) {
        return Response.json({ message: "No id provided" })
    } if(body.id && body.id == process.env.API_PSWD && body.proj)  {
        const client = await clientPromise
        const db = client?.db("pers")
        const col = db?.collection("projects")
        const Project = await col?.insertOne(JSON.parse(body.proj))
        return Response.json({ message: "suc", Project })
    } else {
        return Response.json({ message: "Id is incorrect"})
    }
}   

export const DELETE = async(req: NextRequest) => {
    const data = await req.json()
    if(!data.id) {
        return Response.json({ message: "No id provided" })
    } if(data.id && data.id == process.env.API_PSWD)  {
        const searchParams = req.nextUrl.searchParams
        const query = searchParams.get('id')
        const client = await clientPromise
        const db = client?.db("pers")
        const col = db?.collection("projects")
        let Projects;
        if(query) {
            Projects = await col?.deleteOne({ "_id": new ObjectId(query)})
        } else {
            Projects = { message: "No id provided" }
        }
        return Response.json({ Projects })
    } else {
        return Response.json({ message: "Wrong password" })
    }
}