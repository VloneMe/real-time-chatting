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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const SignIn = () => {
  const [hidePWD, setHidePWD] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section className="w-full min-h-screen flex items-center">
      <Card className="lg:w-5/12 mx-auto p-10">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-mono font-bold tracking-wide">
            SignIn To Chatting App
          </h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email Or Usernme" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="flex flex-col space-y-2">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl className="relative">
                          <div className="flex relative">
                              <Input
                              type={!hidePWD ? "password" : "text"}
                              placeholder="Password"
                              {...field}
                              />
                              <div
                              onClick={() => setHidePWD(!hidePWD)}
                              className="h-full flex absolute items-center right-3 opacity-40 cursor-pointer"
                              >
                                {!hidePWD ? <FaEye /> : <FaEyeSlash />}
                              </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>  

        <CardFooter className="flex gap-2 font-mono justify-center">
          <p>I don't have an account,</p>
          <Link href={"signup"} className="text-blue-500 hover:underline">
            Sign In
          </Link>
          <span>here?</span>
        </CardFooter>
      </Card>
    </section>
  );
};