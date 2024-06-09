import { Card } from "@/lib/card"
export const GET = async(req: Request) => {
    return Response.json(Card)
}