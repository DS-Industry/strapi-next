import axios from "axios";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../nextauth/auth";

async function getSession () {
  const session :Session | null = await getServerSession(authOptions);
  return session;
}

const session = getSession();

console.log(session);

  
  
