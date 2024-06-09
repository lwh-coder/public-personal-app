"use client";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { useState } from "react";
import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { config } from "@/lib/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const { setTheme } = useTheme();
  const [content, setContent] = useState<any>("");
  const handleRedirect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(content)}`;
  };
  return (
    <>
      <header className="flex z-20 sticky top-0 justify-between items-center p-4 border-b bg-background">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">{config.title}</div>
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleRedirect}>
                  <DialogHeader>
                    <DialogTitle>Search this website</DialogTitle>
                    <DialogDescription>
                      Please know that this search algorithm is inefficient and
                      experimental and also may not show the thing you are
                      looking for.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <Input
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Search..."
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Search</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4" id="amic">
            {config.links.map((link, index) => (
              <Link href={link.href} key={index} className="hover:underline">
                {link.name}
              </Link>
            ))}
          </nav>
          <div id="dyn">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {config.links.map((link, index) => (
                <Link href={link.href} key={index}>
                  <DropdownMenuItem>{link.name}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
