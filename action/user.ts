"use server"

import { createClient } from "@/auth/server"
import { handleError } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth/server";
export async function loginAction({email, password}: {email: string, password: string}) {
  try{
    const { auth } = await createClient();
    const {error} = await auth.signInWithPassword({email, password});
    if(error){
      throw error;
    }
    return {error: null}
  } catch(error){
    handleError(error);
  }
}
export async function signupAction({email, password}: {email: string, password: string}) {
  try {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.signUp({email, password});
    if(error){
      throw error;
    }
    const userId = data.user?.id;
    if(!userId) {
      throw new Error("User ID not found after sign up");
    }

    // store user info in your database here, using the userId as a reference
    await prisma.user.create({
      data: {
        id: userId,
        email: email
      }
    });


    return {error: null};
  } catch(error){
    handleError(error);
  }
}


export async function logOutAction() {
  try {
    const supabase = await createClient();
    const {error} = await supabase.auth.signOut();
    if(error){
      throw error;
    }

    return {error: null};
  } catch(error){
    handleError(error);
  }
}

export async function getUserClient(){
  const user = await getUser();
  return user

}