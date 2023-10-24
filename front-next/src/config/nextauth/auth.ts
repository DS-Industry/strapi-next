import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = { 

    // any secret word like: "i am a stegosaurus"
    secret: process.env.NEXTAUTH_SECRET,

    // enabe JWT
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
        signOut: "http://localhost:3000/"
    }, 

    callbacks: {
        jwt: async ({token, user}) => {
            if (user) {
              token.user = user;
            }
            return token;
          },
        session: async ({session, token }) => {
            session.user = token.user;
            return session;
          },
      },

    providers : [
        CredentialsProvider({ 
            id: 'credentials',
        // the button text displayed on the sign in form
            name: "Sign In With Credentials",
        // the input fields on the default sign in form
            // you can use your custom login page instead 
            credentials: {
                email: { 
                    label: "email", 
                    type: "text", 
                    placeholder:"Enter Your email..." 
               },
                password: { 
                    label: "Password", 
                    type: "password", 
                    placeholder:"Enter Your Password..." 
                }
            },

        // The authorize function is where we validate the user input 
        async authorize(credentials) { 

            // Here you add authentication logic: 
            // look for the user, compare the passwords... 
            try {
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
                    identifier: credentials && credentials.email,
                    password: credentials && credentials.password
                })
                const { data : role } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=role`, {
                    headers: {
                        Authorization: `Bearer ${data.jwt}`
                    }
                }) 
                const fullDataUser = Object.assign(data.user, role);
                console.log(fullDataUser);
                return fullDataUser ? fullDataUser : null
            } catch (error: any) {
                const errorMessage = error.response.data.message[0].messages[0].message
                console.log(error);
                throw Error(errorMessage);
            }
        }

    })

    ]

}