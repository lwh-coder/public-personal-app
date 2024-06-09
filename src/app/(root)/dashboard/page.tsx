"use client";
import { config } from "@/lib/config";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";

const pageConfig = {
  title: "Dashboard",
};

const Page = () => {
  const [id, setID] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [primaryImage, setPrimaryImage] = useState("");
  const [secondaryImage, setSecondaryImage] = useState("");
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");
  const [expectedUsername, setExpectedUsername] = useState("")
  const [expectedPassword, setExpectedPassword] = useState("")
  const [apiPassword, setApiPassword] = useState("")
  useEffect(() => {
    setExpectedPassword(process.env.NEXT_PUBLIC_PASSWORD!)
    setExpectedUsername(process.env.NEXT_PUBLIC_USERNAME!)
    setApiPassword(process.env.API_PSWD!)

  }, []);
  console.log(apiPassword)
  useEffect(() => {
    document.title = `${config.title} | ${pageConfig.title}`;
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      JSON.stringify(password.toString()) == JSON.stringify(expectedPassword.toString()) && JSON.stringify(username.toString()) == JSON.stringify(expectedUsername.toString())
    ) {
      setLoggedIn(true);
    } else {
      setError("Invalid username or password");
      console.log(JSON.stringify(username.toString()), JSON.stringify(password.toString()))
      console.log(JSON.stringify(expectedPassword.toString()), JSON.stringify(expectedUsername.toString()))
    }
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/projects/?id=${id}`);
      if (response.status === 200) {
        console.log("Deleted");
        setMessage("Project deleted successfully!");
      } else {
        console.log("Error");
        setMessage("Failed to delete project");
      }
    } catch (error: any) {
      console.error("Error deleting project:", error);
      setMessage("Error deleting project: " + error.message);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const projectData = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim().toUpperCase()),
      author,
      image: {
        cover: coverImage,
        avatar: avatarImage,
        primary: primaryImage,
        secondary: secondaryImage,
      },
      createdAt: Date.now(),
      slug,
    };

    try {
      const data = JSON.stringify(projectData);
      const response = await axios.post("/api/projects", {
        proj: data,
        id: "650ccc9c-65d6-43a7-ad25-b0f9bdb568cd"
    });
      const result = await response.data;
      console.log(result)
      console.log(response)
      console.log(data)
      console.log(projectData)
      if (response.status === 200) {
        setMessage("Project added successfully!");
      } else {
        setMessage("Failed to add project: " + result.message);
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
    }
  };

  if (loggedIn) {
    return (
      <div className="container mx-auto p-6">
        <form onSubmit={handleDelete} className="space-y-6">
          <Input
            value={id}
            onChange={(e) => setID(e.target.value)}
            placeholder="ID"
            required
          />
          <Button type="submit">Delete</Button>
        </form>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold">Add New Project</h2>
          {message && <p className="text-red-500">{message}</p>}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            required
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            className="resize-none h-48"
            required
          />
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            required
          />
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
          />
          <Input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Cover Image URL"
            required
          />
          <Input
            value={avatarImage}
            onChange={(e) => setAvatarImage(e.target.value)}
            placeholder="Avatar Image URL"
            required
          />
          <Input
            value={primaryImage}
            onChange={(e) => setPrimaryImage(e.target.value)}
            placeholder="Primary Image URL"
            required
          />
          <Input
            value={secondaryImage}
            onChange={(e) => setSecondaryImage(e.target.value)}
            placeholder="Secondary Image URL"
            required
          />
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            required
          />
          <Button type="submit" className="w-full">
            Add Project
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleLogin} className="space-y-6">
        <h2 className="text-3xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <Label htmlFor="user">Username</Label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          id="user"
          required
        />
        <Label htmlFor="pass">Password</Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          id="pass"
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Page;
