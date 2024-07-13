"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  fname: z.string().min(3, { message: "Name must be at least 3 characters." }),
  surname: z.string().min(3, { message: "Surname must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(5, { message: "Password must be at least 5 characters." }),
  confirmPassword: z.string().min(5, { message: "Confirm Password must be at least 5 characters." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SignUp = () => {
  const [hidePWD, setHidePWD] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      surname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section className="w-full min-h-screen flex items-center">
      <Card className="lg:w-6/12 mx-auto p-10 mt-14">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-mono font-bold tracking-wide">
            SignUp TO Chatting App
          </h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 shadow">
              <div className="w-full grid lg:grid-cols-2 lg:gap-3">
                <FormField
                  control={form.control}
                  name="fname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Given Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Given Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Surname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-3">
                <div className="w-full grid lg:grid-cols-2 lg:gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type={!hidePWD ? "password" : "text"}
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type={!hidePWD ? "password" : "text"}
                            placeholder="Confirm Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-3 items-center text-blue-1">
                  <p
                    onClick={() => setHidePWD(!hidePWD)}
                    className="hover:underline cursor-pointer"
                  >
                    {hidePWD ? "Hide passwords" : "Show passwords"}
                  </p>
                  <Separator className="w-[3px] h-7" />
                  <div
                    className="cursor-pointer transition duration-200"
                    onClick={() => setHidePWD(!hidePWD)}
                  >
                    {!hidePWD ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex gap-2 font-mono justify-center">
          <p>I have an account,</p>
          <Link href="signin" className="text-blue-500 hover:underline">
                    Sign In
          </Link>
          <span>here?</span>
        </CardFooter>
      </Card>
    </section>
  );
};