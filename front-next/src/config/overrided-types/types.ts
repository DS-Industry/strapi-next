import { DefaultSession, DefaultUser, User } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User,
    jwt: JWT,
  }
  interface User extends DefaultUser {
    id: string,
    username: string,
    provider: string,
    confirmated: string,
    blocked: boolean,
    createdAt: Date,
    updatedAt: Date,
  }
  interface AdapterUser extends User {}
  interface JWT extends DefaultJWT {
    user: User,
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User,
  }
}