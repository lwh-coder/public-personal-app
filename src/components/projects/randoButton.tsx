import Link from 'next/link'
import { Button } from '@/components/ui/button'
export const RandoButton = ({ posts, ...props }: any) => {
    return(
        <>
        <Link href={`/projects/${posts[Math.floor(Math.random() * posts.length)]?.slug}`}>
            <Button>Go to random Post</Button>
        </Link>
        </>
    )
}