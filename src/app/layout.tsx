import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { config } from "@/lib/config";
import { Toaster } from "@/components/ui/toaster";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import {
  ClerkProvider,
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  authors: {
    name: "Lwh",
  },
  keywords: [
    "Lwh", "Software Developer", "Web Developer", "Code", "code", "programming", 
    "software development", "web development", "JavaScript", "React", "Node.js", 
    "Angular", "Vue.js", "HTML", "CSS", "Python", "Django", "Flask", "Ruby", 
    "Ruby on Rails", "Java", "Spring", "Kotlin", "Swift", "iOS development", 
    "Android development", "C#", ".NET", "ASP.NET", "PHP", "Laravel", "Symfony", 
    "Go", "Golang", "Rust", "TypeScript", "SQL", "MySQL", "PostgreSQL", "MongoDB", 
    "NoSQL", "GraphQL", "REST API", "API development", "Git", "GitHub", "CI/CD", 
    "DevOps", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "cloud computing", 
    "serverless", "microservices", "blockchain", "smart contracts", "Ethereum", 
    "Solidity", "Machine Learning", "AI", "Artificial Intelligence", "data science", 
    "data analysis", "Big Data", "Hadoop", "Spark", "TensorFlow", "PyTorch", 
    "NLP", "Natural Language Processing", "computer vision", "Deep Learning", 
    "augmented reality", "virtual reality", "VR", "AR", "Internet of Things", 
    "IoT", "cybersecurity", "information security", "encryption", "blockchain development", 
    "cryptocurrency", "Bitcoin", "software engineering", "full stack development", 
    "front-end development", "back-end development", "mobile development", "responsive design", 
    "UI/UX", "user interface", "user experience", "accessibility", "agile", "scrum", "kanban"
  ],
  applicationName: config.title,
  creator: "Lwh",
  publisher: "Lwh",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    other: {
      rel: "icon",
      url: "/favicon.ico",
    },
  },
  category: "Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
        {" "}
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} />
  </div>
          {children}
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} />
  </div>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
