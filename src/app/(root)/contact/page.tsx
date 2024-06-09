"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { config } from "@/lib/config";
import { ToastAction } from "@/components/ui/toast";
const pageConfig = {
  title: "Contact",
};
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function Page() {
  const [state, handleSubmit] = useForm("xeqywaad");
  const { toast } = useToast();
  useEffect(() => {
    document.title = `${config.title} | ${pageConfig.title}`;
  }, []);

  if (state.succeeded) {
    return(
      <>
        <center className="p-12 py-12 my-28  w-full max-w-3xl container border rounded-lg ">
          <h1 className="text-4xl font-bold mb-4">Thank you!</h1>
          <p className="py-6">I will hopefully reach out to you as soon as possible!</p>
          <Button onClick={() => window.location.href = "/"} variant={"default"} className="m-4 p-6">Return to HomePage</Button>
        </center>
      </>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <dialog id="cust-modal">
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</dialog>

      <div className="flex flex-wrap items-center justify-between ">
        <div className="w-full md:w-1/2 lg:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-4">Contact me</h1>
          <p className="text-lg mb-6">Want to hire me or reach out to me?</p>
          <form
            className="w-full p-8 rounded shadow-md "
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex">
              <div className="mr-4 w-1/2">
                <Label className="block text-xl font-bold mb-2">
                  First Name
                </Label>
                <Input
                  required
                  id="first_name"
                  name="firstName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-1/2">
                <Label className="block text-xl font-bold mb-2">
                  Last Name
                </Label>
                <Input
                  required
                  id="last_name"
                  name="lastName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label className="block text-xl font-bold mb-2">
                Email address
              </Label>
              <Input
                required
                id="email"
                type="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <div className="mb-6">
              <Label className="block text-xl font-bold mb-2">
                Your message
              </Label>
              <Textarea
                required
                id="message"
                name="message"
                className="shadow appearance-none border rounded w-full py-2 px-3 h-48 resize-none leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                className=" font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={state.submitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 p-4">
          <img
            src="https://placehold.co/400x500"
            alt="Contact Image"
            className="w-full h-auto rounded-lg mt-8"
          />
        </div>
      </div>
    </div>
  );
}
