"use client";  

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
import { useState, useContext } from "react";  
import Link from "next/link";  
import { Separator } from "../ui/separator";  
import { useRouter } from "next/navigation";  
import jwtDecode from 'jwt-decode';   
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({  
  email: z.string().email({  
    message: "Invalid email address.",  
  }),  
  password: z.string().min(5, {  
    message: "Password must be at least 5 characters.",  
  }),  
}); 

interface User {  
  userId: string;  
  username: string;  
  fname: string;  
  email: string; 
} 

export const SignIn = () => {  
  const [hidePWD, setHidePWD] = useState(false);  
  const [errorMessage, setErrorMessage] = useState("");  
  const { login } = useAuth();
  const router = useRouter();  

  const form = useForm<z.infer<typeof formSchema>>({  
    resolver: zodResolver(formSchema),  
    defaultValues: {  
      email: "",  
      password: "",  
    },  
  });  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {  
    const { email, password } = values;  
    
    try {  
      const res = await fetch("/api/auth/login", {  
        method: 'POST',  
        body: JSON.stringify({ email, password }),  
        headers: { 'Content-Type': 'application/json' },  
        credentials: 'include',  
      });  

      if (!res.ok) {  
        const errorData = await res.json();  
        setErrorMessage(errorData.message || "Invalid email or password.");  
        return;  
      }  

      const data = await res.json();  

      // Ensure the token exists  
      if (!data.token) {  
        setErrorMessage("No token received.");  
        return;  
      }  
      
      // Decode the token  
      const decodedToken: User = jwtDecode(data.token); 

      // Set user data in Context  
      login(decodedToken);
      localStorage.setItem('token', data.token);   

      // Redirect or perform any other action  
      router.push("/");  
    } catch (error) {  
      console.error("Error:", error);  
      setErrorMessage("Something went wrong. Please try again.");  
    }  
  };  

  return (  
    <section className="w-full min-h-screen flex items-center">  
      <Card className="lg:w-5/12 mx-auto p-10">  
        <CardHeader className="text-center">  
          <h1 className="text-2xl font-mono font-bold tracking-wide">  
            Sign In To Chatting App  
          </h1>  
        </CardHeader>  
        <CardContent>  
          <Form {...form}>  
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">  
              {errorMessage && (  
                <div className="text-red-500 text-center">{errorMessage}</div>  
              )}  
              <FormField  
                control={form.control}  
                name="email"  
                render={({ field }) => (  
                  <FormItem>  
                    <FormLabel>Email</FormLabel>  
                    <FormControl>  
                      <Input type="email" placeholder="Email Or Username" {...field} />  
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

            <div className="space-y-5 w-full mt-5">  
              <div className="flex items-center gap-5">  
                <Separator />  
                {/* OR <Separator /> */}  
              </div>  
              <div className="flex gap-5 w-full">  
                <Button  
                  className="bg-transparent hover:text-white border-black border text-black w-full"  
                >  
                  Sign in with Google  
                </Button>  
                <Button className="w-full">  
                  Sign in with Github  
                </Button>  
              </div>  
            </div>  
          </Form>  
        </CardContent>  

        <CardFooter className="flex gap-2 font-mono justify-center">  
          <p>I don't have an account,</p>  
          <Link href={"signup"} className="text-blue-500 hover:underline">  
            Sign Up  
          </Link>  
          <span>here?</span>  
        </CardFooter>  
      </Card>  
    </section>  
  );  
};