import { DefaultSession, DefaultUser, Role, User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";


declare module "next-auth" {

  interface Role {
    id: number,
    name: string,
    ceratedAt: Date,
    updatedAt: Date
  }
  interface Avatar {
    id: number,
    name: string,
    width: number,
    height: number,
    url: string,
  }

  interface Session extends DefaultSession {
    user: User,
    jwt: JWT,
  }
  interface User extends DefaultUser {
    id?: string,
    username: string,
    email: string,
    role: Role,
    createdAt: Date,
    updatedAt: Date,
    avatar: Avatar,
    jwt?: string,
    lastname: string,
    department: {
      id: number,
      name: string
    },
  } 
  interface AdapterUser extends User {}
  interface JWT extends DefaultJWT {
    user: User,
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User,
    name?: string | null,
    lastname: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
    role: string,
    avatar: string
  }
}