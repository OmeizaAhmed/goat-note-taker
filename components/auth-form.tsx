"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {toast} from "sonner";
import { loginAction, signupAction } from "@/action/user";
import { useRouter } from "next/navigation"

interface Props {
  type: "login" | "signup";
}

export default function AuthForm({ type }: Props) {
  const isLogin = type === "login";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(formData: FormData) {
    console.log("Form submitted:");
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if(isLogin) { 
        const response = await loginAction({email, password});
        if(response?.error !== null) {
          toast.error("error logging in");
        } else {
          toast.success("logged in successfully");
          router.replace('/')
        }
      } else {
        const response = await signupAction({email, password});
        if(response?.error !== null) {
          toast.error("error signing up");
        } else {
          toast.success("signed up successfully");
          router.replace('/')
        }
      }
    });
  }
  return (
      <form action={handleSubmit} className="flex flex-col gap-6 ">
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-bold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                required
                name="email"
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="font-bold">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                name="password"
                disabled={isPending}
              />
            </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLogin ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <CardDescription>
          {isLogin? "Don't have an account?": "Already have an account?"}{" "}
          <Link href={isLogin ? "/signup" : "/login"}
            className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline">
            {isLogin ? "Sign up" : "Login"}
          </Link>
        </CardDescription>
      </CardFooter>
      </form>
  );
}
