export type ProjectType = {
    title: string,
    description: string,
    slug: string,
    href: string,
    image: {
        cover: string,
        primary: string,
        secondary: string,
        avatar: string
    },
    author: string,
    createdAt: any,
    tags: string[],
}