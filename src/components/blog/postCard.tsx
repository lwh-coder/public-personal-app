import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export const PostCard = ({ post, ...props }: any) => {
return(
    <Card className="shadow-md" {...props}>
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
        {post.data.tags.map((tag:string, index:number) => (
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
) 
}  