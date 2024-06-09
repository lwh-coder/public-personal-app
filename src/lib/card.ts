import { logoGithub, logoYoutube } from 'ionicons/icons'
export type CardType = {
    title: string;
    description: string;
    text: string[];
    coverImage: string;
    socials: {
        logo: any;
        href: string;
        name: string;
    }[]
} 
export const Card: CardType = {
    title: "Lwh's Card",
    description: "Hey this is my card!",
    coverImage: "/logo.png",
    text: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio fugiat dolor nostrum, velit nam deserunt maxime temporibus a corporis, voluptatibus iusto voluptates repellat blanditiis quidem nulla voluptate, consectetur ex cumque." 
    ],
    socials: [
        {
            logo: logoGithub,
            href: "https://github.com/lwh-coder",
            name: "Github"
        },
        {
            logo: logoYoutube,
            href: "https://youtube.com/",
            name: "Youtube"
        }
    ]
}


 