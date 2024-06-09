import { logoGithub, logoYoutube } from 'ionicons/icons';
import dotenv from "dotenv";
dotenv.config();
interface Config {
  title: string;
  description: string;
  links: {
    name: string;
    href: string;
  }[];
  socials: {
    name: string;
    href: string;
    icon: any;
  }[];
  pages: {
    name: string;
  }[];
}
export const conf = {
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,
};
export const config: Config = {
  title: "Lwh",
  description: "Hey, Im Lwh.",
  links: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Blog",
      href: "/blog",
    }
  ],
  socials: [
    {
      name: "Github",
      href: "https://github.com/lwh-coder",
      icon: logoGithub,
    },
    {
      name: "Youtube",
      href: "https://www.youtube.com/channel/UCJnZ1219D_VSZp1k-Vh7a4A",
      icon: logoYoutube,
    },
  ],
  pages: [
    {
      name: "Home",
    },
    {
      name: "About",
    },
    {
      name: "Contact",
    },
    {
      name: "Projects",
    },
  ],
};
