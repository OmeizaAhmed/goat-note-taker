"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/action/user";

export default function LogoutBtn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleLogOut = async() => {
    setLoading(true);
    console.log("Logging out...");
    const response = await logOutAction();
    if(!response?.error){
      toast.success("Log out", {description: "You have been logged out successfully."});
      router.push("/login");
    } else{
      toast.error("Log out", {description: "Failed to log out. Please try again."});
    }
    setLoading(false);
  }
  return (
    <Button 
    className="w-24"
    variant="outline"
    onClick={() => handleLogOut()}
    disabled={loading}
    >
      {loading? <Loader2 className="animate-spin" />: "Log Out"}
    </Button>
  );
}